import { Text, StatusBar, TextInput } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import GlobalBackButton from "../../global/GlobalBackButton";
import { Asset } from "react-native-image-picker";
import {
  cameraPermission,
  checkPermission,
  flashMessageWarning,
  galleryPermission,
  messages,
  toggleLoader,
} from "../../constants/GConstant";
import { ImagePickerManager } from "../../constants/utils/NativeImagePicker";
import { ScreenNames } from "../../routers";
import ReportIssueComponent from "../../components/reportIssue";
import { constnatStyles } from "../../constants/Styles";
import { zustandStore } from "../../store";
import { statusCodes } from "../../api/APIConstant";
import {
  AWS_FOLDER_NAME,
  getMimeTypeFromPath,
  uploadMultipleFilesToS3,
} from "../../api/AWSUpload";

const ReportIssueContainer = ({ navigation, route }: any) => {
  // API zustand store
  const reportIssueApi = zustandStore.MyOrdersStore(
    (state) => state.reportIssue
  );
  const s3ImageUploadApi = zustandStore.S3ImageUploadStore(
    (state) => state.s3ImageUpload
  );
  const order_id = route?.params?.order_id;
  const [multiImagesArray, setMultiImagesArray] = useState<Asset[]>([]);
  const [reportIssue, setReportIssue] = useState<string>("");
  const reportIssueRef = useRef<TextInput>(null);
  const [reportIssueFocused, setReportIssueFocused] = useState<boolean>(false);

  // handleApiUploadImages
  const handleApiUploadImages = async () => {
    try {
      const localFormattedImages = multiImagesArray.map((item, index) => ({
        folder_name: AWS_FOLDER_NAME.REPORTS_MEDIA,
        file_type: item?.type ? item.type.split("/")[1] : "",
        is_video: false,
        local_path: item.uri ? item.uri : "",
      }));

      const dictData = { images: localFormattedImages };

      const response = await s3ImageUploadApi(dictData, navigation);
      console.log("UPLOAD IMAGES RESPONSE===>", JSON.stringify(response));

      if (response.code === statusCodes.success) {
        const imageData = response.data as any[];
        // 1️⃣ Prepare array of files for S3 upload
        const filesToUpload = imageData.map((fileItem) => ({
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
        handleReportIssueApi(reportIssue, uploadedFileNames);
        //  if (isEditRating == true) {
        //   handleEditRateApi(uploadedFileNames);
        // } else {
        //   handleRateProductApi(uploadedFileNames);
        // }
      } else if (response.code === statusCodes.invaildOrFail) {
        flashMessageWarning(response.message);
      }
    } catch (error) {
      console.log("Error===>", error);
    }
  };

  const handleOnPressUploadImages = () => {
    checkPermission(cameraPermission, messages.cameraPermission).then(
      (isAllow) => {
        if (isAllow) {
          checkPermission(galleryPermission, messages.galleryPermission).then(
            (isAllow) => {
              if (isAllow) {
                const isMultiSelection = true;
                ImagePickerManager.choosePickerOptions(
                  "photo",
                  isMultiSelection
                )
                  .then((result: unknown) => {
                    const pickerResponse = result as Asset[];
                    console.log("Response==>", result);
                    if (pickerResponse) {
                      if (multiImagesArray.length == 0) {
                        setMultiImagesArray(pickerResponse);
                      } else {
                        setMultiImagesArray([
                          ...multiImagesArray,
                          ...pickerResponse,
                        ]);
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

  const handleOnPressDeleteUploadedImage = (index: number) => {
    const updatedArray = [...multiImagesArray];
    updatedArray.splice(index, 1);
    setMultiImagesArray(updatedArray);
  };

  const handleOnChangeText = (text: string, type: string) => {
    if (type === "description") {
      setReportIssue(text);
    }
  };

  const handleOnFocus = (type: string) => {
    if (type === "description") {
      setReportIssueFocused(true);
    }
  };

  const handleOnBlur = (type: string) => {
    if (type === "description") {
      setReportIssueFocused(true);
    }
  };

  const handleOnSubmit = (type: string) => {
    reportIssueRef?.current?.focus();
  };

  const onPressSubmit = () => {
    if (reportIssue.trim() === "") {
      flashMessageWarning("Please specify your issue.");
      reportIssueRef?.current?.focus();
      return;
    } else {
      handleApiUploadImages();
      // uploadImageInS3();
      // handleReportIssueApi(reportIssue, multiImagesArray);
    }
  };

  const header = () => {
    navigation.setOptions({
      headerLeft: () => (
        <GlobalBackButton onPress={() => navigation.goBack()} />
      ),
      headerTitle: () => (
        <Text style={constnatStyles.lblHeaderTitle}>
          {ScreenNames.reportIssue}
        </Text>
      ),
    });
  };

  useEffect(() => {
    header();
  }, []);

  // -------------------------API Calling----------------------------
  // handleOrderDetailsApi
  const handleReportIssueApi = async (message: string, media?: string[]) => {
    const dictData: any = {
      order_id: order_id,
      message: message,
    };
    if (media && media.length > 0) {
      dictData.media = media;
    }
    try {
      const response = await reportIssueApi(dictData, navigation);
      if (response !== undefined && response !== null) {
        __DEV__ &&
          console.log("REPORT ISSUE RESPONSE===>", JSON.stringify(response));
        if (response.code === statusCodes.success) {
          navigation.goBack();
        } else if (response.code === statusCodes.invaildOrFail) {
          flashMessageWarning(response.message);
        }
      }
    } catch (error) {
      __DEV__ && console.log(error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle("dark-content");
      return () => {};
    }, [navigation])
  );

  return (
    <ReportIssueComponent
      reportIssue={reportIssue}
      reportIssueRef={reportIssueRef}
      reportIssueFocused={reportIssueFocused}
      handleOnChangeText={handleOnChangeText}
      handleOnFocus={handleOnFocus}
      handleOnBlur={handleOnBlur}
      handleOnSubmit={handleOnSubmit}
      onPressSubmit={onPressSubmit}
      multiImagesArray={multiImagesArray}
      handleOnPressUploadImages={handleOnPressUploadImages}
      handleOnPressDeleteUploadedImage={handleOnPressDeleteUploadedImage}
    />
  );
};

export default ReportIssueContainer;
