import React, { useEffect, useRef, useState } from "react";
import EditProfileComponent from "../../components/editProfile";
import GlobalBackButton from "../../global/GlobalBackButton";
import {
  cameraPermission,
  checkPermission,
  flashMessageSucess,
  flashMessageWarning,
  galleryPermission,
  messages,
} from "../../constants/GConstant";
import { regex } from "../../constants/Regex";
import { getTranslation } from "../../localization/i18n/i18n.config";
import { StatusBar, Text, TextInput } from "react-native";
import { ImagePickerManager } from "../../constants/utils/NativeImagePicker";
import { Asset } from "react-native-image-picker";
import { useFocusEffect } from "@react-navigation/native";
import { constnatStyles } from "../../constants/Styles";
import { ScreenNames } from "../../routers";

const EditProfileContainer = ({ navigation }: any) => {
  const [profileImage, setProfileImage] = useState<string>("");
  const [name, setName] = useState("");
  const nameRef = useRef<TextInput>(null);
  const [nameFocused, setNameFocused] = useState(false);

  const handleOnChangeText = (text: string, type: string) => {
    if (type === "name") {
      if (regex.fullName.test(text)) {
        setName(text);
      }
    }
  };

  const handleOnFocus = (type: string) => {
    if (type === "name") {
      setNameFocused(true);
    }
  };

  const handleOnBlur = (type: string) => {
    if (type === "name") {
      setNameFocused(false);
    }
  };

  const handleOnPressProfileImage = () => {
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
                    if (
                      Array.isArray(pickerResponse) &&
                      pickerResponse[0]?.uri
                    ) {
                      setProfileImage(pickerResponse[0].uri);
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

  const handleOnPressUpadte = () => {
    if (name.trim() == "") {
      flashMessageWarning(getTranslation("emptyName"));
    } else {
      navigation.setParams({ profileImage, name });
      navigation.goBack();
      flashMessageSucess(getTranslation("profileUpdatedSucess"));
    }
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
        <Text style={constnatStyles.lblHeaderTitle}>{ScreenNames.editProfile}</Text>
      ),
    });
  };

  useEffect(() => {
    header();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle("dark-content");
      return () => {};
    }, [navigation])
  );

  return (
    <EditProfileComponent
      name={name}
      nameRef={nameRef}
      handleOnChangeText={handleOnChangeText}
      handleOnFocus={handleOnFocus}
      handleOnBlur={handleOnBlur}
      nameFocused={nameFocused}
      handleOnPressUpadte={handleOnPressUpadte}
      profileImage={profileImage}
      handleOnPressProfileImage={handleOnPressProfileImage}
    />
  );
};

export default EditProfileContainer;
