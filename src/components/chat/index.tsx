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
  chatHistory: ChatMessage[];
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
    console.log("Media url", index, item?.media_url);

    // Logic for comparsion of current and previous dates
    const reversedMessages = props?.chatHistory?.slice().reverse();
    const currentDate = DateFormatsManager.formatDate(
      item.created_at,
      DateFormatsManager.DateFormats.YYYYMMDD
    );
    const nextMessage =
      index < reversedMessages.length - 1 ? reversedMessages[index + 1] : null;
    const nextDate = nextMessage
      ? DateFormatsManager.formatDate(
          nextMessage.created_at,
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
                item?.created_at,
                DateFormatsManager.DateFormats.dddDDMM
              )}
            </Text>
            <View style={styles.vwTimeLineInner} />
          </View>
        )}

        {/* View Message */}
        <View
          style={{
            alignItems:
              item.sender_role === "customer" ? "flex-end" : "flex-start",
          }}
          key={index}
        >
          <View
            style={[
              styles.vwFlatlistMessage,
              {
                backgroundColor:
                  item?.sender_role === "customer"
                    ? colors.orange1c
                    : colors.white,
                borderBottomLeftRadius:
                  item.sender_role === "customer" ? 16 : 0,
                borderBottomRightRadius:
                  item.sender_role === "customer" ? 0 : 16,
                alignItems:
                  item.sender_role === "customer" ? "flex-end" : "flex-start",
              },
            ]}
          >
            {/* Text Message */}
            {item?.message_type === "text" && item?.message != "" && (
              <Text style={styles.lblMessage}>{item.message}</Text>
            )}

            {/* Image Message */}
            {item?.message_type === "image" && item?.media_url != "" && (
              <TouchableOpacity
                disabled
                style={{ borderRadius: 10 }}
                activeOpacity={activityOpacity}
              >
                <FastImage
                  source={{ uri: item?.media_url || undefined }}
                  style={{ height: 150, width: 230, borderRadius: 10 }}
                  resizeMode={FastImage.resizeMode.contain}
                />
              </TouchableOpacity>
            )}

            {/* Text Messsage Time - Status */}
            {item?.created_at && (
              <View style={{ alignItems: "center", flexDirection: "row" }}>
                <Text
                  style={[
                    styles.lblTime,
                    {
                      color:
                        item?.sender_role === "customer"
                          ? colors.black35
                          : colors.greya7,
                    },
                  ]}
                >
                  {DateFormatsManager.formatDate(
                    item.created_at,
                    DateFormatsManager.TimeFormats.HH_mm
                  )}
                </Text>
                {item?.sender_role === "customer" && (
                  <Text
                    style={[
                      styles.lblTime,
                      {
                        color:
                          item?.sender_role === "customer"
                            ? colors.black35
                            : colors.greya7,
                      },
                    ]}
                  >
                    {" "}
                    {/* · {item?.status} */}
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
            data={props?.chatHistory?.slice().reverse()}
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
