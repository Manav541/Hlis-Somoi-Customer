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
  SignupResponse,
} from "../../constants/interfaces";
import { MmkvManager } from "../../constants/utils/MmkvManager";
import { AWS_FOLDER_NAME, getMimeTypeFromPath, uploadMultipleFilesToS3 } from "../../api/AWSUpload";

const EditProfileContainer = ({ navigation }: any) => {
  const editProfileApi = zustandStore.AuthStore((state) => state.editProfile);
  const customerDetailApi = zustandStore.AuthStore(
    (state) => state.getCustomerDetail
  );
  const s3ImageUploadApi = zustandStore.S3ImageUploadStore((state) => state.s3ImageUpload);
  const [userProfileUrl, setUserProfileUrl] = useState<string>("");
  const [profileImage, setProfileImage] = useState<string>("");
  const [profileImageType, setProfileImageType] = useState<string>("");
  const [name, setName] = useState<string>("");
  const nameRef = useRef<TextInput>(null);
  const [nameFocused, setNameFocused] = useState(false);
  const baseImagePath =
    "https://hlik-deep-bhaumik.s3.amazonaws.com/somoiapp/customers_images/";

    // handleApiUploadImages
  const handleApiUploadImages = async () => {
  try {
    const localFormattedImages = [
      {
        folder_name: AWS_FOLDER_NAME.USER_IMAGE,
        file_type: profileImageType,
        is_video: false,
        local_path: profileImage,
      },
    ];

    const dictData = { images: localFormattedImages };

    // Pass dictData and navigation as separate arguments
    const response = await s3ImageUploadApi(
      dictData,
      navigation
    );
    console.log('UPLOAD IMAGES RESPONSE===>', JSON.stringify(response));

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
      uploadResults.forEach(result => {
        if (result.error) {
          console.log(`❌ Upload failed: ${result.localPath}`, result.error);
        } else {
          console.log(
            `✅ Uploaded: ${result.localPath} -> ${result.uploadedUrl}`,
          );
        }
      });

      // 4️⃣ Call your final form API with uploaded URLs
      const uploadedUrls = uploadResults
        .map(r => r.uploadedUrl)
        .filter(Boolean) as string[];

      console.log('UPLOADED S3 URLS===>', uploadedUrls);

      // 5️⃣ Extract only file names from uploaded URLs
      const uploadedFileNames = uploadedUrls.map(url => {
        // Split by '/' and take the last part of the URL
        return url.substring(url.lastIndexOf('/') + 1);
      });

      console.log('UPLOADED S3 FILE NAMES===>', uploadedFileNames);
      handleEditProfileApi(uploadedFileNames[0]);
      // if (!isEditable) {
      //   await handleApiAddVehicle(uploadedFileNames);
      // } else {
      //   // For edit vehicle, you might have a different API call
      // }
    } else if (response.code === statusCodes.invaildOrFail) {
      flashMessageWarning(response.message);
    }
  } catch (error) {
    console.log('Error===>', error);
  }
};

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
                     console.log('pickerResponse===>', pickerResponse);
                    if (
                      Array.isArray(pickerResponse) &&
                      pickerResponse[0]?.uri
                    ) {
                      const selectedImageUri = pickerResponse[0].uri;
                      const file_type = pickerResponse[0].type ? pickerResponse[0].type.split('/')[1] : '';
                      
                      setProfileImage(selectedImageUri);
                      setProfileImageType(file_type);
                      console.log('profileImage===>', selectedImageUri);
                      console.log('file_type===>', file_type);
                      
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
      await handleApiUploadImages();
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
