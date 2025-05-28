import React, { useEffect, useState } from "react";
import ChatComponent from "../../components/chat";
import GlobalBackButton from "../../global/GlobalBackButton";
import { images } from "../../constants/Images";
import { Linking, Text } from "react-native";
import { Asset } from "react-native-image-picker";
import { ImagePickerManager } from "../../constants/utils/NativeImagePicker";
import {
  cameraPermission,
  checkPermission,
  flashMessageWarning,
  galleryPermission,
  messages,
} from "../../constants/GConstant";
import { ChatMessage } from "../../constants/interfaces";
import { constnatStyles } from "../../constants/Styles";
import { getTranslation } from "../../localization/i18n/i18n.config";

const ChatConatiner = ({ navigation, route }: any) => {
  const [messagesList, setMessagesList] = useState<ChatMessage[]>([
    {
      text: "",
      time: "2025-03-15T14:20:00Z",
      isSender: false,
      type: "image",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      status: "Delivered",
    },
    {
      text: "Look at above image like this.",
      time: "2025-03-15T14:20:00Z",
      isSender: false,
      type: "text",
    },
    {
      text: "Of course, let me know if you're on your Of course, let me know if you're on your Of course, let me know if you're on your.",
      time: "2025-03-15T14:21:00Z",
      isSender: false,
      type: "text",
    },
    {
      text: "K, I’m on the way",
      time: "2025-03-15T14:22:00Z",
      isSender: true,
      status: "Read",
      type: "text",
    },
    {
      text: "Good morning",
      time: "2025-03-17T06:45:00Z",
      isSender: false,
      type: "text",
    },
    {
      text: "How are you?",
      time: "2025-03-17T06:45:00Z",
      isSender: false,
      type: "text",
    },
    {
      text: "Very Good Morning Very Good Morning Very Good Morning Very Good Morning.",
      time: "2025-04-05T13:35:00.000Z",
      isSender: true,
      type: "text",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      status: "Delivered",
    },
    {
      text: "",
      time: "2025-04-05T13:35:00.000Z",
      isSender: true,
      type: "image",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      status: "Delivered",
    },
  ]);

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
    const messageObj: ChatMessage = {
      text: messageValue.trim(),
      time: new Date().toISOString(),
      isSender: true,
      type: "text",
      image: "",
      status: "Read",
    };
    if (messageValue.trim() !== "") {
      setMessagesList([...messagesList, messageObj]);
      setMessageValue("");
    }
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
                      const image = pickerResponse[0].uri;
                      const messageObj: ChatMessage = {
                        text: "",
                        time: new Date().toISOString(),
                        isSender: true,
                        type: "image",
                        image: image,
                        status: "Read",
                      };
                      setMessagesList([...messagesList, messageObj]);
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
    flashMessageWarning(getTranslation('underDevelopment'))
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
      headerTitle: (
        <Text style={constnatStyles.lblHeaderTitle}>
          {route?.params?.driverName}
        </Text>
      ),
      headerRight: () => (
        <GlobalBackButton
          onPress={() => {
            Linking.openURL(`tel:₹{route?.params?.driverMobileNumber}`);
          }}
          isRight
          rightImage={images.call}
        />
      ),
    });
  };

  useEffect(() => {
    header();
  }, [route?.params]);

  return (
    <ChatComponent
      messagesList={messagesList}
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
