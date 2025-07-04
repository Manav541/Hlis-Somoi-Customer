import React, { useEffect, useRef, useState } from "react";
import ChatComponent from "../../components/chat";
import GlobalBackButton from "../../global/GlobalBackButton";
import { images } from "../../constants/Images";
import { Linking, StatusBar, Text } from "react-native";
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
import { ChatMessage, SecretKeyItem } from "../../constants/interfaces";
import { constnatStyles } from "../../constants/Styles";
import { getTranslation } from "../../localization/i18n/i18n.config";
import { MmkvManager } from "../../constants/utils/MmkvManager";
import { useFocusEffect } from "@react-navigation/native";
import { apiBaseURL, statusCodes } from "../../api/APIConstant";
import SocketIOClient, { Socket } from "socket.io-client";
import { zustandStore } from "../../store";
import { APIManager } from "../../api/ApiManager";
import ImageUpload, { FolderName } from "../../constants/utils/S3ImageUpload";

const ChatConatiner = ({ navigation, route }: any) => {
  // API Zustand store
  const chatHistoryApi = zustandStore.ChatHistoryStore(
    (state) => state.chatHistory
  );
  const secretKeyApi = zustandStore.KeyStore((state) => state.secretKey);
  const [s3AccessKey, setS3AccessKey] = useState<string>("");
  const [s3SecretAccessKey, setS3SecretAccessKey] = useState<string>("");
  const socketRef = useRef<any>(null);
  const driver_details = route?.params?.driver_details;
  const customer_details = route?.params?.customer_details;
  const [messagesList, setMessagesList] = useState<ChatMessage[]>([
    // {
    //   text: "",
    //   time: "2025-03-15T14:20:00Z",
    //   isSender: false,
    //   type: "image",
    //   image: "https://randomuser.me/api/portraits/men/32.jpg",
    //   status: "Delivered",
    // },
    // {
    //   text: "Look at above image like this.",
    //   time: "2025-03-15T14:20:00Z",
    //   isSender: false,
    //   type: "text",
    // },
    // {
    //   text: "Of course, let me know if you're on your Of course, let me know if you're on your Of course, let me know if you're on your.",
    //   time: "2025-03-15T14:21:00Z",
    //   isSender: false,
    //   type: "text",
    // },
    // {
    //   text: "K, I’m on the way",
    //   time: "2025-03-15T14:22:00Z",
    //   isSender: true,
    //   status: "Read",
    //   type: "text",
    // },
    // {
    //   text: "Good morning",
    //   time: "2025-03-17T06:45:00Z",
    //   isSender: false,
    //   type: "text",
    // },
    // {
    //   text: "How are you?",
    //   time: "2025-03-17T06:45:00Z",
    //   isSender: false,
    //   type: "text",
    // },
    // {
    //   text: "Very Good Morning Very Good Morning Very Good Morning Very Good Morning.",
    //   time: "2025-04-05T13:35:00.000Z",
    //   isSender: true,
    //   type: "text",
    //   image: "https://randomuser.me/api/portraits/men/32.jpg",
    //   status: "Delivered",
    // },
    // {
    //   text: "",
    //   time: "2025-04-05T13:35:00.000Z",
    //   isSender: true,
    //   type: "image",
    //   image: "https://randomuser.me/api/portraits/men/32.jpg",
    //   status: "Delivered",
    // },
  ]);

  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);

  const [messageValue, setMessageValue] = useState("");
  const [isMsgInputFocused, setIsMsgInputFocused] = useState(false);

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
      sender_role: "customer",
      sender_id: customer_details?.customer_id,
      receiver_role: "driver",
      receiver_id: driver_details?.id,
      message: messageValue.trim(),
      message_type: "text",
    };
    APIManager.encryptData(
      JSON.stringify(sendMessagePayload),
      (encryptedData: string) => {
        socket.emit("send_message", encryptedData);

        const messageObj: ChatMessage = {
          sender_role: "customer",
          receiver_role: "driver",
          sender_id: customer_details?.customer_id,
          receiver_id: driver_details?.id,
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

                      toggleLoader(false);
                      const isImage =
                        pickerResponse[0].type?.startsWith("image/") || false;

                      if (isImage) {
                        uploadImage(response);
                      } else {
                        const fileExtension = response.split(".").pop();
                        const type = `video/${fileExtension}` || "video/mp4";
                        const ext = `.${fileExtension}`;
                        // uploadVideo(response, type, ext);
                      }
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

  // Image uplaod
  const uploadImage = async (url: any) => {
    const socket = socketRef.current;

    if (!socket || !socket.connected) {
      console.warn("Socket not connected. Cannot send message.");
      return;
    }
    await ImageUpload.uploadImage(
      s3AccessKey,
      s3SecretAccessKey,
      url,
      FolderName.CHAT_MEDIA,
      "image/png",
      ".png",
      (response: any, fullUrl: any) => {
        console.log("Media uploaded sucessfully ===>", response);
        if (response) {
          const sendMessagePayload = {
            sender_role: "customer",
            sender_id: customer_details?.customer_id,
            receiver_role: "driver",
            receiver_id: driver_details?.id,
            message: messageValue.trim(),
            message_type: "image",
            media_url: response,
          };

          APIManager.encryptData(
            JSON.stringify(sendMessagePayload),
            (encryptedData: string) => {
              socket.emit("send_message", encryptedData);
              console.log("sendMessagePayload==>", sendMessagePayload);

              const messageObj: ChatMessage = {
                sender_role: "customer",
                receiver_role: "driver",
                sender_id: customer_details?.customer_id,
                receiver_id: driver_details?.id,
                message: messageValue.trim(),
                created_at: new Date().toISOString(),
                message_type: "image",
                media_url: fullUrl,
              };

              console.log("messageObj => ", messageObj);
              if (fullUrl) {
                setChatHistory((prev) => [...prev, messageObj]);
              }
            }
          );
        }
      }
    );
  };

  const handleOnPressEmoji = () => {
    flashMessageWarning(getTranslation("underDevelopment"));
  };

  const onPressCallDriver = () => {
    Linking.openURL(`tel:${driver_details?.mobile_number}`);
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
        <Text style={constnatStyles.lblHeaderTitle}>
          {route?.params?.driver_details?.name}
        </Text>
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
  }, [route?.params]);

  // ------------------------API Calling---------------------------
  // handleChatHistoryApi
  const handleChatHistoryApi = async () => {
    const dictData = {
      receiver_role: "driver",
      sender_id: customer_details?.customer_id,
      sender_role: "customer",
      receiver_id: driver_details?.id,
    };
    try {
      const response = await chatHistoryApi(dictData, navigation);
      if (response !== undefined && response !== null) {
        __DEV__ &&
          console.log("CHAT HISTORY RESPONSE===>", JSON.stringify(response));
        if (response.code === statusCodes.success) {
          const chatdata =
            response?.data && "chat_history" in response.data
              ? (response.data.chat_history as ChatMessage[])
              : [];
          setChatHistory(chatdata);
          //       {
          //   text: "",
          //   time: "2025-03-15T14:20:00Z",
          //   isSender: false,
          //   type: "image",
          //   image: "https://randomuser.me/api/portraits/men/32.jpg",
          //   status: "Delivered",
          // },
        } else if (response.code === statusCodes.invaildOrFail) {
          flashMessageWarning(response.message);
        } else if (response.code === statusCodes.emptyData) {
          flashMessageWarning(response.message);
        }
      }
    } catch (error) {
      __DEV__ && console.log(error);
    }
  };

  // handleSecretKeyApi
  const handleSecretKeyApi = async () => {
    try {
      const response = await secretKeyApi({}, navigation);
      if (
        response?.code === statusCodes.success &&
        Array.isArray(response.data)
      ) {
        const keysData = response.data as SecretKeyItem[];
        keysData.forEach((item) => {
          switch (item.name) {
            case "S3_ACCESS_KEY":
              if (item.keys) setS3AccessKey(item.keys);
              break;
            case "S3_SECRET_KEY":
              if (item.keys) setS3SecretAccessKey(item.keys);
              break;
            default:
              break;
          }
        });
      } else if (response?.code === statusCodes.invaildOrFail) {
        flashMessageWarning(response.message);
      }
    } catch (error) {
      __DEV__ && console.log("Secret Key API Error:", error);
    }
  };

  // Socket Connection
  const handleSocketConnection = () => {
    MmkvManager.getData(MmkvManager.Keys.customerId, (customerId) => {
      if (customerId) {
        const socket = SocketIOClient(
          `${apiBaseURL.socketUrl}${customerId}&role=customer`
        );
        socket.connect();
        console.log("Socket connected:", socket.active);

        socket.on("receive_message", (msg) => {
          console.log("receive_message msg===>:", msg);
          APIManager.decryptData(JSON.stringify(msg), (decryptData: string) => {
            console.log("Sending message:", decryptData);

            console.log("decryptData:", decryptData);
            if (decryptData != undefined) {
              const parsedData = JSON.parse(decryptData);
              setChatHistory([...chatHistory, parsedData.data]);
            }
          });
        });
        socketRef.current = socket;
      }
    });
  };

  useFocusEffect(
    React.useCallback(() => {
      const socket = SocketIOClient(
        `${apiBaseURL.socketUrl}${customer_details?.customer_id}&role=customer`
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
            setChatHistory((prev) => [...prev, parsedData.data]);
          }
        });
      });
      handleSecretKeyApi();
      handleChatHistoryApi();

      return () => {
        if (socketRef.current) {
          console.log("Disconnecting socket...");
          socketRef.current.disconnect();
          socketRef.current = null;
        }
      };
    }, [])
  );

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
    />
  );
};

export default ChatConatiner;
