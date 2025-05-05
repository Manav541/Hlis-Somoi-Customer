import React, { useEffect, useRef, useState } from "react";
import EditProfileComponent from "../../components/editProfile";
import GlobalBackButton from "../../global/GlobalBackButton";
import { flashMessageWarning } from "../../constants/GConstant";
import { regex } from "../../constants/Regex";
import { getTranslation } from "../../localization/i18n/i18n.config";
import { TextInput } from "react-native";

const EditProfileContainer = ({ navigation }: any) => {
  const [profileImage, setProfileImage] = useState();
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
  

  const handleOnPressUpadte = () => {
    if (name.trim() == "") {
      flashMessageWarning(getTranslation("emptyName"));
    } else {
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
    });
  };

  useEffect(() => {
    header();
  }, []);

 

  return (
    <EditProfileComponent
      name={name}
      nameRef={nameRef}
      handleOnChangeText={handleOnChangeText}
      handleOnFocus={handleOnFocus}
      handleOnBlur={handleOnBlur}
      nameFocused={nameFocused}
      handleOnPressUpadte={handleOnPressUpadte}
    />
  );
};

export default EditProfileContainer;
