import { RNS3 } from "react-native-s3-upload";
import { createThumbnail } from "react-native-create-thumbnail";
import { PermissionsAndroid } from "react-native";
import ImageResizer from "react-native-image-resizer";
import { Video } from "react-native-compressor";
import { GlobalVar, toggleLoader } from "../GConstant";

export const FolderName = {
  USER_IMAGE: "customers_images/",
  // REPORTS_MEDIA: "reports_media/",
  // CONTACT_US: "contact_us_media/",
  // CHAT: "chat_files/",
};

export const requestStoragePermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      {
        title: "Storage Permission",
        message: "This app needs access to your storage to upload images",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK",
      }
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (err) {
    console.warn(err);
    return false;
  }
};

export default class ImageUpload {
  static getRendomString = () => {
    var str = "0123456789";
    var length = 12;
    var result = "";
    for (var i = length; i > 0; --i)
      result += str[Math.floor(Math.random() * str.length)];
    return result + JSON.stringify(new Date().getTime());
  };

  static uploadZip = async (
    s3AccessKey: any,
    s3SecretAccessKey: any,
    imgURI: any,
    folderName: any,
    callback: any
  ) => {
    toggleLoader(true);
    var imageSize = 0;
    const file = {
      uri: imgURI,
      name: this.getRendomString() + ".zip",
      type: "application/zip",
    };

    //Local (Specify options seperatly for live credential)
    let options = {
      acl: GlobalVar.permissionAccess,
      keyPrefix: `${folderName}`, // for folder name refer FolderName object
      bucket: GlobalVar.bucketName,
      region: GlobalVar.region,
      accessKey: s3AccessKey,
      secretKey: s3SecretAccessKey,
      successActionStatus: 201,
    };

    console.log("rns3 bucket option --->", options);
    await RNS3.put(file, options)
      .progress((event: any) => {
        imageSize = event.total;
      })
      .then((response: any) => {
        toggleLoader(false);
        console.log("s3 bucket image response ----> ", response);
        if (response.status == 201) {
          let strImageName = response.body.postResponse.key;
          let fullUrl = response.body.postResponse.location;

          callback(
            strImageName.substring(strImageName.lastIndexOf("/") + 1),
            fullUrl
          );
        } else {
          callback(null, Error("Failed to upload image to S3"));
          // throw new Error('Failed to upload image to S3');
        }
      });
  };

  static uploadImage = async (
    s3AccessKey: any,
    s3SecretAccessKey: any,
    imgURI: any,
    folderName: any,
    type: any,
    ext: any,
    callback: any
  ) => {
    toggleLoader(true);
    var imageSize = 0;
    try {
      // Resize the image
      const originalImage = await ImageResizer.createResizedImage(
        imgURI,
        1000, // target width
        1000, // target height
        "JPEG",
        50,
        0
      );

      const file = {
        uri: originalImage.uri,
        name: this.getRendomString() + ext,
        type: type,
      };

      const options = {
        acl: GlobalVar.permissionAccess,
        keyPrefix: `${folderName}`,
        bucket: GlobalVar.bucketName,
        region: GlobalVar.region,
        accessKey: s3AccessKey,
        secretKey: s3SecretAccessKey,
        successActionStatus: 201,
        // s3Url: GlobalVar.url,
      };

      console.log("rns3 bucket option --->", options);

      // Upload file
      await RNS3.put(file, options)
        .progress((event: any) => {
          imageSize = event.total;
        })
        .then((response: any) => {
          toggleLoader(false);
          if (response.status === 201) {
            const strImageName = response.body.postResponse.key;
            const fullUrl = `${GlobalVar.url}${strImageName}`;
            __DEV__ && console.log("Full s3 URL: " + fullUrl);
            callback(
              strImageName.substring(strImageName.lastIndexOf("/") + 1),
              fullUrl,
              response
            );
          } else {
            callback(null, new Error("Failed to upload image to S3"));
          }
        })
        .catch((uploadError: any) => {
          toggleLoader(false);
          console.error("Image upload failed", uploadError);
          callback(null, uploadError);
        });
    } catch (resizeError) {
      console.error("Image resizing failed", resizeError);
      toggleLoader(false);
      callback(null, resizeError);
    }
  };

  static uploadDocument = async (
    s3AccessKey: any,
    s3SecretAccessKey: any,
    imgURI: any,
    folderName: any,
    callback: any
  ) => {
    toggleLoader(true);
    var imageSize = 0;
    const file = {
      uri: imgURI,
      name: this.getRendomString() + ".pdf",
      type: "document/pdf",
    };

    //Local (Specify options seperatly for live credential)
    let options = {
      acl: GlobalVar.permissionAccess,
      keyPrefix: `${folderName}`, // for folder name refer FolderName object
      bucket: GlobalVar.bucketName,
      region: GlobalVar.region,
      accessKey: s3AccessKey,
      secretKey: s3SecretAccessKey,
      successActionStatus: 201,
    };

    console.log("rns3 bucket option --->", options);
    await RNS3.put(file, options)
      .progress((event: any) => {
        imageSize = event.total;
      })
      .then((response: any) => {
        toggleLoader(false);
        console.log("s3 bucket image response ----> ", response);
        if (response.status == 201) {
          let strImageName = response.body.postResponse.key;
          let fullUrl = response.body.postResponse.location;

          callback(
            strImageName.substring(strImageName.lastIndexOf("/") + 1),
            fullUrl
          );
        } else {
          callback(null, Error("Failed to upload image to S3"));
          // throw new Error('Failed to upload image to S3');
        }
      });
  };

  static uploadVideo = async (
    s3AccessKey: any,
    s3SecretAccessKey: any,
    imgURI: any,
    folderName: any,
    type: any,
    ext: any,
    callback: any
  ) => {
    toggleLoader(true);
    let videoSize = 0;

    try {
      if (!imgURI) {
        throw new Error("Video URI is missing.");
      }

      // Compress the video before uploading
      const compressedVideoUri = await Video.compress(imgURI, {
        compressionMethod: "auto", // Automatically chooses the best compression
        // quality: "medium", // Choose quality (low, medium, high)
      });

      // Check if the compressed URI is available
      if (!compressedVideoUri) {
        throw new Error("Video compression failed. No URI returned.");
      }

      const videoFile = {
        uri: compressedVideoUri,
        name: this.getRendomString() + ext,
        type: type,
      };

      // const videoFile = {
      //   uri: imgURI,
      //   name: this.getRendomString() + ext,
      //   type: type,
      // };

      const s3Options = {
        acl: GlobalVar.permissionAccess,
        keyPrefix: `${folderName}`, // for folder name refer FolderName object
        bucket: GlobalVar.bucketName,
        region: GlobalVar.region,
        accessKey: s3AccessKey,
        secretKey: s3SecretAccessKey,
        successActionStatus: 201,
      };

      console.log("Uploading video to S3 --->", s3Options, videoFile);

      try {
        // Step 1: Generate thumbnail before uploading the video
        const thumbnailResponse = await createThumbnail({
          url: imgURI, // The video file URI
          timeStamp: 1000, // Capture thumbnail at 1 second (adjust if needed)
        });

        const thumbnailPath = thumbnailResponse.path; // Get thumbnail path
        console.log("Generated thumbnail path: ", thumbnailPath);

        // Step 2: Upload video to S3
        const videoUploadResponse = await RNS3.put(
          videoFile,
          s3Options
        ).progress((event: any) => {
          videoSize = event.total;
        });

        if (videoUploadResponse.status === 201) {
          toggleLoader(false);
          const videoName = videoUploadResponse.body.postResponse.key;
          console.log("Video uploaded successfully --->", videoName);

          // Step 3: Now upload the thumbnail to S3
          const thumbnailFile = {
            uri: thumbnailPath,
            name: this.getRendomString() + ".png", // Thumbnail as JPG
            type: "image/png", // Mime type for thumbnail
          };

          console.log(
            "Uploading thumbnail to S3 --->",
            s3Options,
            thumbnailFile
          );

          const thumbnailUploadResponse = await RNS3.put(
            thumbnailFile,
            s3Options
          );

          if (thumbnailUploadResponse.status === 201) {
            const thumbnailName = thumbnailUploadResponse.body.postResponse.key;
            console.log("Thumbnail uploaded successfully --->", thumbnailName);

            // Step 4: Return both video and thumbnail names in the callback
            callback(
              {
                videoName: videoName.substring(videoName.lastIndexOf("/") + 1),
                videoSize: videoSize,
                thumbnailName: thumbnailName.substring(
                  thumbnailName.lastIndexOf("/") + 1
                ), // Return thumbnail name
              },
              null
            );
          } else {
            toggleLoader(false);
            console.error("Failed to upload thumbnail to S3");
            callback(null, Error("Failed to upload thumbnail to S3"));
          }
        } else {
          toggleLoader(false);
          console.error("Failed to upload video to S3");
          callback(null, Error("Failed to upload video to S3"));
        }
      } catch (error) {
        toggleLoader(false);
        console.error("Error in video/thumbnail upload process: ", error);
        callback(null, error);
      }
    } catch (error) {
      console.error("Image resizing failed", error);
      toggleLoader(false);
      callback(null, error);
    }
  };

  static uploadAudio = async (
    s3AccessKey: any,
    s3SecretAccessKey: any,
    imgURI: any,
    folderName: any,
    callback: any
  ) => {
    var imageSize = 0;
    const file = {
      uri: imgURI,
      name: this.getRendomString() + ".mp3",
      type: "audio/mpeg",
    };

    //Local (Specify options seperatly for live credential)
    let options = {
      acl: GlobalVar.permissionAccess,
      keyPrefix: `${folderName}`, // for folder name refer FolderName object
      bucket: GlobalVar.bucketName,
      region: GlobalVar.region,
      accessKey: s3AccessKey,
      secretKey: s3SecretAccessKey,
      successActionStatus: 201,
    };

    // console.log('rns3 bucket option --->', options);
    await RNS3.put(file, options)
      .progress((event: any) => {
        imageSize = event.total;
      })
      .then((response: any) => {
        toggleLoader(false);
        console.log("s3 bucket audioos response ----> ", response);
        if (response.status == 201) {
          let strImageName = response.body.postResponse.key;
          let fullUrl = response.body.postResponse.location;

          callback(
            strImageName.substring(strImageName.lastIndexOf("/") + 1),
            fullUrl
          );
        } else {
          callback(null, Error("Failed to upload image to S3"));
          // throw new Error('Failed to upload image to S3');
        }
      });
  };

  static uploadAudiowav = async (
    s3AccessKey: any,
    s3SecretAccessKey: any,
    imgURI: any,
    folderName: any,
    callback: any
  ) => {
    var imageSize = 0;
    const file = {
      uri: imgURI,
      name: this.getRendomString() + ".wav",
      type: "audio/x-wav",
    };

    //Local (Specify options seperatly for live credential)
    let options = {
      acl: GlobalVar.permissionAccess,
      keyPrefix: `${folderName}`, // for folder name refer FolderName object
      bucket: GlobalVar.bucketName,
      region: GlobalVar.region,
      accessKey: s3AccessKey,
      secretKey: s3SecretAccessKey,
      successActionStatus: 201,
    };

    // console.log('rns3 bucket option --->', options);
    await RNS3.put(file, options)
      .progress((event: any) => {
        imageSize = event.total;
      })
      .then((response: any) => {
        toggleLoader(false);
        console.log("s3 bucket audioos response ----> ", response);
        if (response.status == 201) {
          let strImageName = response.body.postResponse.key;
          let fullUrl = response.body.postResponse.location;

          callback(
            strImageName.substring(strImageName.lastIndexOf("/") + 1),
            fullUrl
          );
        } else {
          callback(null, Error("Failed to upload image to S3"));
          // throw new Error('Failed to upload image to S3');
        }
      });
  };
}
