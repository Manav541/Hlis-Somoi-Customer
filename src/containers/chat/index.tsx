import React, { useEffect, useRef, useState } from "react";
import ChatComponent from "../../components/chat";
import GlobalBackButton from "../../global/GlobalBackButton";
import { images } from "../../constants/Images";
import { Keyboard, Linking, StatusBar, Text } from "react-native";
import { Asset } from "react-native-image-picker";
import { ImagePickerManager } from "../../constants/utils/NativeImagePicker";
import {
  cameraPermission,
  checkPermission,
  flashMessageWarning,
  galleryPermission,
  messages,
  toggleLoader,
} from "../../constants/GConstant";
import { ChatMessage } from "../../constants/interfaces";
import { constnatStyles } from "../../constants/Styles";
import { useFocusEffect } from "@react-navigation/native";
import { apiBaseURL, statusCodes } from "../../api/APIConstant";
import SocketIOClient from "socket.io-client";
import { zustandStore } from "../../store";
import { APIManager } from "../../api/ApiManager";
import { PlatformVersion } from "../../constants/utils/Platform";
import {
  AWS_FOLDER_NAME,
  getMimeTypeFromPath,
  uploadMultipleFilesToS3,
} from "../../api/AWSUpload";

var myMsgDetails: any = {};

const ChatConatiner = ({ navigation, route }: any) => {
  // API Zustand store
  const chatHistoryApi = zustandStore.ChatHistoryStore(
    (state) => state.chatHistory
  );
  const { setReceiverId } = zustandStore.ChatNotificationStore();
  const s3ImageUploadApi = zustandStore.S3ImageUploadStore(
    (state) => state.s3ImageUpload
  );
  const socketRef = useRef<any>(null);
  const customer_id = route?.params?.customer_id;
  const driver_id = route?.params?.driver_id;
  const sender_role = "customer";
  const receiver_role = "driver";
  const [driverName, setDriverName] = useState("");
  const [driverMobileNumber, setDriverMobileNumber] = useState("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isEmojiPickerVisible, setEmojiPickerVisible] = useState(false);
  const [messageValue, setMessageValue] = useState("");
  const [isMsgInputFocused, setIsMsgInputFocused] = useState(false);

  // handleApiUploadImages
  const handleApiUploadImages = async (uri: string, type: string) => {
    try {
      const localFormattedImages = [
        {
          folder_name: AWS_FOLDER_NAME.CHAT_MEDIA,
          file_type: type,
          is_video: false,
          local_path: uri,
        },
      ];

      const dictData = { images: localFormattedImages };

      // Pass dictData and navigation as separate arguments
      const response = await s3ImageUploadApi(dictData, navigation);
      console.log("UPLOAD IMAGES RESPONSE===>", JSON.stringify(response));

      if (response.code === statusCodes.success) {
        const imageData = response.data as any;
        // 1️⃣ Prepare array of files for S3 upload
        const filesToUpload = imageData.map((fileItem: any) => ({
          localPath: fileItem.local_path,
          signedUrl: fileItem.link,
          mimeType: getMimeTypeFromPath(fileItem.local_path),
        }));

        // 2️⃣ Upload all files in parallel
        const uploadResults = await uploadMultipleFilesToS3(filesToUpload);

        // 3️⃣ Log results and extract uploaded URLs
        uploadResults.forEach((result) => {
          if (result.error) {
            console.log(`❌ Upload failed: ${result.localPath}`, result.error);
          } else {
            console.log(
              `✅ Uploaded: ${result.localPath} -> ${result.uploadedUrl}`
            );
          }
        });

        // 4️⃣ Call your final form API with uploaded URLs
        const uploadedUrls = uploadResults
          .map((r) => r.uploadedUrl)
          .filter(Boolean) as string[];

        console.log("UPLOADED S3 URLS===>", uploadedUrls);

        // 5️⃣ Extract only file names from uploaded URLs
        const uploadedFileNames = uploadedUrls.map((url) => {
          // Split by '/' and take the last part of the URL
          return url.substring(url.lastIndexOf("/") + 1);
        });

        console.log("UPLOADED S3 FILE NAMES===>", uploadedFileNames);

        // Send the uploaded media via socket
        const socket = socketRef.current;
        if (!socket || !socket.connected) {
          console.warn("Socket not connected. Cannot send message.");
          return;
        }

        const fullUrl = uploadedUrls[0]; // Use the first uploaded URL
        const sendMessagePayload = {
          sender_role: sender_role,
          sender_id: customer_id,
          receiver_role: receiver_role,
          receiver_id: driver_id,
          message: null,
          message_type: "image",
          media_url: uploadedFileNames[0], // Use file name for payload
        };

        APIManager.encryptData(
          JSON.stringify(sendMessagePayload),
          (encryptedData: string) => {
            socket.emit("send_message", encryptedData);
            console.log("sendMessagePayload==>", sendMessagePayload);

            const messageObj: ChatMessage = {
              sender_role: sender_role,
              receiver_role: receiver_role,
              sender_id: customer_id,
              receiver_id: driver_id,
              message: null,
              created_at: new Date().toISOString(),
              message_type: "image",
              media_url: fullUrl, // Use full URL for chat history
            };

            console.log("messageObj => ", messageObj);
            if (fullUrl) {
              setChatHistory((prev) => [...prev, messageObj]);
            }
          }
        );
      } else if (response.code === statusCodes.invaildOrFail) {
        flashMessageWarning(response.message);
      }
    } catch (error) {
      console.log("Error===>", error);
      flashMessageWarning("Failed to upload media");
    }
  };

  const handleOnChangeText = (text: string) => {
    setMessageValue(text);
  };

  const handleOnFocusBlur = (type: string) => {
    if (type === "focus") {
      setIsMsgInputFocused(true);
    } else if (type === "blur") {
      setIsMsgInputFocused(false);
    }
  };

  const handleOnPressSendMessage = () => {
    const socket = socketRef.current;
    if (!socket || !socket.connected) {
      console.warn("Socket not connected. Cannot send message.");
      return;
    }
    const sendMessagePayload = {
      sender_role: sender_role,
      sender_id: customer_id,
      receiver_role: receiver_role,
      receiver_id: driver_id,
      message: messageValue.trim(),
      message_type: "text",
    };
    APIManager.encryptData(
      JSON.stringify(sendMessagePayload),
      (encryptedData: string) => {
        socket.emit("send_message", encryptedData);

        const messageObj: ChatMessage = {
          sender_role: sender_role,
          receiver_role: receiver_role,
          sender_id: customer_id,
          receiver_id: driver_id,
          message: messageValue.trim(),
          created_at: new Date().toISOString(),
          message_type: "text",
          media_url: "",
        };

        if (messageValue.trim() !== "") {
          setChatHistory((prev) => [...prev, messageObj]);
          setMessageValue("");
        }
      }
    );
  };

  const handleOnPressAttachment = () => {
    checkPermission(cameraPermission, messages.cameraPermission).then(
      (isAllow) => {
        if (isAllow) {
          checkPermission(galleryPermission, messages.galleryPermission).then(
            (isAllow) => {
              if (isAllow) {
                ImagePickerManager.choosePickerOptions("photo")
                  .then((result: unknown) => {
                    const pickerResponse = result as Asset[];
                    console.log("Response==>", result);
                    if (pickerResponse[0].uri) {
                      const response = pickerResponse[0].uri;
                      const uri = pickerResponse[0].uri;
                      const file_type = pickerResponse[0].type
                        ? pickerResponse[0].type.split("/")[1]
                        : "";
                      toggleLoader(false);

                      // uploadImage(response);
                      handleApiUploadImages(uri, file_type);
                    } else {
                      __DEV__ && console.log("No media selected or captured");
                    }
                  })
                  .catch((error: string) => {
                    __DEV__ && console.log("Error capturing media:", error);
                  });
              }
            }
          );
        }
      }
    );
  };

  const handleOnPressEmoji = () => {
    Keyboard.dismiss();
    setTimeout(
      () => {
        setEmojiPickerVisible(true);
      },
      PlatformVersion.isAndroid ? 50 : 200
    );
  };

  const handleEmojiSelected = (emoji: string) => {
    setMessageValue((prevText) => prevText + emoji);
  };

  const onPressCallDriver = () => {
    Linking.openURL(`tel:${driverMobileNumber}`);
  };

  const header = () => {
    navigation.setOptions({
      headerLeft: () => (
        <GlobalBackButton
          onPress={() => {
            navigation.goBack();
          }}
        />
      ),
      headerTitle: () => (
        <Text style={constnatStyles.lblHeaderTitle}>{driverName}</Text>
      ),
      headerRight: () => (
        <GlobalBackButton
          onPress={onPressCallDriver}
          isRight
          rightImage={images.call}
        />
      ),
    });
  };

  useEffect(() => {
    header();
  }, [driverName]);

  // ------------------------API Calling---------------------------
  // handleChatHistoryApi
  const handleChatHistoryApi = async () => {
    const dictData = {
      receiver_role: receiver_role,
      sender_id: customer_id,
      sender_role: sender_role,
      receiver_id: driver_id,
    };
    try {
      const response = await chatHistoryApi(dictData, navigation);
      if (response !== undefined && response !== null) {
        __DEV__ &&
          console.log("CHAT HISTORY RESPONSE===>", JSON.stringify(response));
        if (response.code === statusCodes.success) {
          const driverData = (response?.data as { receiver_details?: any })
            ?.receiver_details;
          setDriverName(driverData?.name);
          setDriverMobileNumber(driverData?.mobile_number);
          myMsgDetails = driverData;
          const chatdata =
            response?.data && "chat_history" in response.data
              ? (response.data.chat_history as ChatMessage[])
              : [];
          setChatHistory(chatdata);
          setReceiverId(driverData?.id);
        } else if (response.code === statusCodes.invaildOrFail) {
          setChatHistory([]);
        } else if (response.code === statusCodes.emptyData) {
          setChatHistory([]);
        }
      }
    } catch (error) {
      __DEV__ && console.log(error);
    }
  };

  // Socket Connection
  useFocusEffect(
    React.useCallback(() => {
      const socket = SocketIOClient(
        `${apiBaseURL.socketUrl}${customer_id}&role=${sender_role}`
      );

      socket.connect();
      console.log("Socket connected:", socket.active);
      socketRef.current = socket;

      socket.on("receive_message", (msg) => {
        console.log("receive_message msg===>:", msg);
        APIManager.decryptData(JSON.stringify(msg), (decryptData: string) => {
          if (decryptData !== undefined) {
            const parsedData = JSON.parse(decryptData);
            console.log("Received parsed message:", parsedData.data);
            if (
              myMsgDetails?.id == parsedData.data?.sender_id &&
              myMsgDetails?.role == parsedData?.data?.sender_role
            ) {
              setChatHistory((prev) => [...prev, parsedData.data]);
            }
          }
        });
      });

      return () => {
        if (socketRef.current) {
          console.log("Disconnecting socket...");
          setReceiverId("");
          socketRef.current.disconnect();
          socketRef.current = null;
        }
      };
    }, [])
  );

  useEffect(() => {
    handleChatHistoryApi();
  }, [route]);

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle("dark-content");
      return () => {};
    }, [navigation])
  );

  return (
    <ChatComponent
      chatHistory={chatHistory}
      messageValue={messageValue}
      isMsgInputFocused={isMsgInputFocused}
      handleOnChangeText={handleOnChangeText}
      handleOnFocusBlur={handleOnFocusBlur}
      handleOnPressEmoji={handleOnPressEmoji}
      handleOnPressSendMessage={handleOnPressSendMessage}
      handleOnPressAttachment={handleOnPressAttachment}
      isEmojiPickerVisible={isEmojiPickerVisible}
      handleEmojiSelected={handleEmojiSelected}
    />
  );
};

export default ChatConatiner;
