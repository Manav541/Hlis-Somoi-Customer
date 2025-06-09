import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  StatusBar,
} from "react-native";
import React from "react";
import { colors } from "../../constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { PlatformVersion } from "../../constants/utils/Platform";
import { images } from "../../constants/Images";
import { constnatStyles } from "../../constants/Styles";
import { activityOpacity, hitSlop } from "../../constants/GConstant";
import { getTranslation } from "../../localization/i18n/i18n.config";
import { styles } from "./styles";
import { DateFormatsManager } from "../../constants/utils/DateFormats";
import FastImage from "react-native-fast-image";
import { ChatMessage } from "../../constants/interfaces";

interface PropsType {
  messagesList: ChatMessage[];
  messageValue: string;
  isMsgInputFocused: boolean;
  handleOnChangeText: (text: string) => void;
  handleOnFocusBlur: (type: string) => void;
  handleOnPressEmoji: () => void;
  handleOnPressSendMessage: () => void;
  handleOnPressAttachment: () => void;
}

const ChatComponent = (props: PropsType) => {
  const insets = useSafeAreaInsets();

  const renderItemMessages = ({
    item,
    index,
  }: {
    item: ChatMessage;
    index: number;
  }) => {
    // Logic for comparsion of current and previous dates
    const reversedMessages = props?.messagesList?.slice().reverse();
    const currentDate = DateFormatsManager.formatDate(
      item.time,
      DateFormatsManager.DateFormats.YYYYMMDD
    );
    const nextMessage =
      index < reversedMessages.length - 1 ? reversedMessages[index + 1] : null;
    const nextDate = nextMessage
      ? DateFormatsManager.formatDate(
          nextMessage.time,
          DateFormatsManager.DateFormats.YYYYMMDD
        )
      : null;

    const shouldShowDateHeader = currentDate !== nextDate;

    return (
      <View style={{ gap: 14 }}>
        {/* View Time Line */}
        {shouldShowDateHeader && (
          <View style={styles.vwTimeLine}>
            <View style={styles.vwTimeLineInner} />
            <Text style={styles.lblMainTime}>
              {DateFormatsManager.formatDate(
                item?.time,
                DateFormatsManager.DateFormats.dddDDMM
              )}
            </Text>
            <View style={styles.vwTimeLineInner} />
          </View>
        )}

        {/* View Message */}
        <View
          style={{ alignItems: item.isSender ? "flex-end" : "flex-start" }}
          key={index}
        >
          <View
            style={[
              styles.vwFlatlistMessage,
              {
                backgroundColor: item?.isSender
                  ? colors.orange1c
                  : colors.white,
                borderBottomLeftRadius: item.isSender ? 16 : 0,
                borderBottomRightRadius: item.isSender ? 0 : 16,
                alignItems: item.isSender ? "flex-end" : "flex-start",
              },
            ]}
          >
            {/* Text Message */}
            {item?.type === "text" && item?.text != "" && (
              <Text style={styles.lblMessage}>{item.text}</Text>
            )}

            {/* Image Message */}
            {item?.type === "image" && item?.image != "" && (
              <TouchableOpacity
                disabled
                style={{ borderRadius: 10 }}
                activeOpacity={activityOpacity}
              >
                <FastImage
                  source={{ uri: item?.image }}
                  style={{ height: 150, width: 230, borderRadius: 10 }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            )}

            {/* Text Messsage Time - Status */}
            {item?.time && (
              <View style={{ alignItems: "center", flexDirection: "row" }}>
                <Text
                  style={[
                    styles.lblTime,
                    { color: item?.isSender ? colors.black35 : colors.greya7 },
                  ]}
                >
                  {DateFormatsManager.formatDate(
                    item.time,
                    DateFormatsManager.TimeFormats.HH_mm
                  )}
                </Text>
                {item?.isSender && (
                  <Text
                    style={[
                      styles.lblTime,
                      {
                        color: item?.isSender ? colors.black35 : colors.greya7,
                      },
                    ]}
                  >
                    {" "}
                    · {item?.status}
                  </Text>
                )}
              </View>
            )}
          </View>
        </View>
      </View>
    );
  };

  return (
    <View
      style={[
        styles.vwMain,
        { paddingBottom: PlatformVersion.isIOS ? insets.bottom + 10 : 10 },
      ]}
    >
      <StatusBar
        translucent={false}
        backgroundColor={colors.orange1c}
        barStyle={"dark-content"}
      />
      {/* View Chats Flatlist */}
      <KeyboardAvoidingView
        style={{ flex: 1, gap: 10 }}
        behavior={PlatformVersion.isIOS ? "padding" : undefined}
        keyboardVerticalOffset={
          PlatformVersion.isIOS ? (insets.bottom > 0 ? 110 : 75) : 80
        }
      >
        <View style={{ flex: 1 }}>
          <FlatList
            inverted
            showsVerticalScrollIndicator={false}
            data={props?.messagesList?.slice().reverse()}
            contentContainerStyle={styles.flatlistContainer}
            renderItem={renderItemMessages}
          />
        </View>

        {/* Message Input */}
        <View style={{ paddingHorizontal: 20 }}>
          <View style={styles.vwMessageInputSendBtn}>
            <View style={styles.vwMesssageInput}>
              {/* Emoji Button */}
              <TouchableOpacity
                activeOpacity={activityOpacity}
                style={{ marginBottom: 10 }}
                onPress={props.handleOnPressEmoji}
              >
                <Image source={images.emojiIcon} style={constnatStyles.img24} />
              </TouchableOpacity>

              {/* Message Input */}
              <TextInput
                value={props.messageValue}
                style={styles.messageInput}
                onChangeText={props.handleOnChangeText}
                onFocus={() => props.handleOnFocusBlur("focus")}
                onBlur={() => props.handleOnFocusBlur("blur")}
                cursorColor={colors.greya7}
                selectionColor={colors.greya7}
                placeholder={getTranslation("messageTitle") || ""}
                placeholderTextColor={colors.greya7}
                autoCorrect={false}
                autoComplete="off"
                spellCheck={false}
                multiline
                textAlignVertical="center"
              />

              {/* Send Button */}
              <TouchableOpacity
                activeOpacity={activityOpacity}
                onPress={props.handleOnPressSendMessage}
                disabled={props.messageValue.trim().length == 0}
                style={styles.btnSend}
              >
                <Image source={images.sendIcon} style={constnatStyles.img24} />
              </TouchableOpacity>
            </View>

            {/* Attachment Button */}
            <TouchableOpacity
              activeOpacity={activityOpacity}
              onPress={props.handleOnPressAttachment}
              hitSlop={hitSlop}
              style={{ marginBottom: 12 }}
            >
              <Image source={images.attachIcon} style={constnatStyles.img24} />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ChatComponent;
