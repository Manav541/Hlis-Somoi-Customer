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
import { zustandStore } from "../../store";
import { statusCodes } from "../../api/APIConstant";
import {
  editProfileResponse,
  SecretKeyItem,
  SignupResponse,
} from "../../constants/interfaces";
import ImageUpload, { FolderName } from "../../constants/utils/S3ImageUpload";
import { MmkvManager } from "../../constants/utils/MmkvManager";

const EditProfileContainer = ({ navigation }: any) => {
  const editProfileApi = zustandStore.AuthStore((state) => state.editProfile);
  const customerDetailApi = zustandStore.AuthStore(
    (state) => state.getCustomerDetail
  );
  const secretKeyApi = zustandStore.KeyStore((state) => state.secretKey);

  const [s3AccessKey, setS3AccessKey] = useState<string>("");
  const [s3SecretAccessKey, setS3SecretAccessKey] = useState<string>("");
  const [userProfileUrl, setUserProfileUrl] = useState<string>("");
  const [profileImage, setProfileImage] = useState<string>("");
  const [name, setName] = useState<string>("");
  const nameRef = useRef<TextInput>(null);
  const [nameFocused, setNameFocused] = useState(false);
  const baseImagePath =
    "https://hlik-deep-bhaumik.s3.amazonaws.com/somoiapp/customers_images/";

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

  const uploadImageUser = async (url: string): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
      ImageUpload.uploadImage(
        s3AccessKey,
        s3SecretAccessKey,
        url,
        FolderName.USER_IMAGE,
        "image/png",
        ".png",
        (response: string) => {
          console.log("Profile uploaded successfully ===>", response);
          resolve(response);
        }
      );
    });
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
                    if (
                      Array.isArray(pickerResponse) &&
                      pickerResponse[0]?.uri
                    ) {
                      const selectedImageUri = pickerResponse[0].uri;
                      setProfileImage(selectedImageUri);
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

  const handleOnPressUpadte = async () => {
    if (!name || name.trim() === "") {
      flashMessageWarning(getTranslation("emptyName"));
    } else {
      try {
        let uploadedUrl: string | null = null;

        if (profileImage !== "" && !profileImage.startsWith("http")) {
          uploadedUrl = await uploadImageUser(profileImage);
        }

        handleEditProfileApi(uploadedUrl);
      } catch (error) {
        __DEV__ && console.log("Upload error:", error);
      }
    }
  };

  const handleEditProfileApi = async (uploadedUrl: string | null = null) => {
    const dictData: editProfileResponse = {
      name: name,
    };

    if (uploadedUrl !== null) {
      dictData.profile_image = uploadedUrl;
    }

    try {
      const response = await editProfileApi(dictData, navigation);
      if (response !== undefined && response !== null) {
        if (response.code === statusCodes.success) {
          flashMessageSucess(response.message);
          navigation.goBack();
          const customer_details = JSON.stringify(
            (response.data as SignupResponse).customer_details
          );
          MmkvManager.setData(
            MmkvManager.Keys.customerDetails,
            JSON.stringify(customer_details)
          );
        } else if (response?.code === statusCodes.invaildOrFail) {
          flashMessageWarning(response.message);
        }
      }
    } catch (error) {
      __DEV__ && console.log(error);
    }
  };

  const handleCustomerDetailApi = async () => {
    try {
      const response = await customerDetailApi({}, navigation);
      if (response !== undefined && response !== null) {
        const customer_details = JSON.stringify(
          (response.data as SignupResponse).customer_details
        );
        if (response.code === statusCodes.success) {
          setName(JSON.parse(customer_details).name);
          setProfileImage(JSON.parse(customer_details).profile_image);
        } else if (response.code === statusCodes.invaildOrFail) {
          flashMessageWarning(response.message);
        }
      }
    } catch (error) {
      __DEV__ && console.log(error);
    }
  };

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

  const header = () => {
    navigation.setOptions({
      headerLeft: () => (
        <GlobalBackButton
          onPress={() => {
            console.log("call edit back");
            navigation.goBack();
          }}
        />
      ),
      headerTitle: () => (
        <Text style={constnatStyles.lblHeaderTitle}>
          {ScreenNames.editProfile}
        </Text>
      ),
    });
  };

  useEffect(() => {
    header();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      handleCustomerDetailApi();
      handleSecretKeyApi();
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
      userProfileUrl={userProfileUrl}
      baseImagePath={baseImagePath}
    />
  );
};

export default EditProfileContainer;
