import {
  launchCamera,
  launchImageLibrary,
  ImageLibraryOptions,
  MediaType,
  Asset,
} from 'react-native-image-picker';
import {Alert, Platform} from 'react-native';
import {showAlert} from '../GConstant';

const ImagePickerSelectionOptions = {
  CAMERA: 1,
  GALLERY: 2,
};

export const ImagePickerManager = {
  selectPicker: async (pickerType: number, mediaType: MediaType) => {
    return new Promise((resolve, reject) => {
      const launchOption =
        pickerType == ImagePickerSelectionOptions.CAMERA
          ? launchCamera
          : launchImageLibrary;

      try {
        const mediaOptions: ImageLibraryOptions = {
          mediaType: mediaType,
          videoQuality: 'high',
          quality: 1,
          selectionLimit: mediaType == 'mixed' ? 10 : 1,
          maxHeight: 500,
          maxWidth: 500,
        };

        launchOption(mediaOptions, mediaRes => {
          // console.log('Response=>', mediaRes);
          if (mediaRes?.didCancel != true) {
            const maxFileSize = 1000000; // 1MB in bytes
            const maxVideoSize = 20; // 20 seconds
            const mediaResponse: Asset[] | undefined = mediaRes?.assets;
            const isSingle = mediaResponse?.length === 1;
            const item: Asset | undefined = mediaResponse && mediaResponse[0];
            if (isSingle) {
              // ✅ Check single image filesize
              if (item?.fileSize && item?.fileSize > maxFileSize) {
                showAlert('The selected file is larger than 1MB');
                // ✅ Check single video duration
              } else if (item?.duration && item?.duration > maxVideoSize) {
                showAlert('The selected video is longer than 20 seconds');
              } else {
                resolve(mediaResponse);
              }
            } else {
              // ✅ Check multiple image filesize
              const largeFiles = mediaResponse?.filter(
                item => item.fileSize && item.fileSize > maxFileSize,
              );

              // ✅ Check multiple video duration
              const longVideos = mediaResponse?.filter(
                item => item.duration && item.duration > maxVideoSize,
              );

              // ❌ Reject with proper messages
              if (largeFiles?.length && longVideos?.length) {
                showAlert(
                  'Some files are larger than 1MB and some videos are longer than 20 seconds',
                );
              } else if (largeFiles?.length) {
                showAlert('Some files are larger than 1MB');
              } else if (longVideos?.length) {
                showAlert('Some videos are longer than 20 seconds');
              } else {
                resolve(mediaResponse);
              }
            }
          } else {
            reject('Error in picking media');
          }
        });
      } catch (error) {
        console.log('Error==>', error);
      }
    });
  },

  choosePickerOptions: async (mediaType: MediaType) => {
    return new Promise((resolve, reject) => {
      Alert.alert(
        'Select Media',
        '',
        Platform.select({
          android: [
            {
              text: 'CANCEL',
              style: 'destructive',
              onPress: () => reject('User cancelled picker'),
            },
            {
              text: 'CAMERA',
              onPress: () => {
                try {
                  const result = ImagePickerManager.selectPicker(
                    ImagePickerSelectionOptions.CAMERA,
                    mediaType,
                  );
                  resolve(result);
                } catch (error) {
                  reject(error);
                }
              },
            },
            {
              text: 'GALLERY',
              onPress: () => {
                try {
                  const result = ImagePickerManager.selectPicker(
                    ImagePickerSelectionOptions.GALLERY,
                    mediaType,
                  );
                  resolve(result);
                } catch (error) {
                  reject(error);
                }
              },
            },
          ],
          ios: [
            {
              text: 'CAMERA',
              onPress: () => {
                try {
                  const result = ImagePickerManager.selectPicker(
                    ImagePickerSelectionOptions.CAMERA,
                    mediaType,
                  );
                  resolve(result);
                } catch (error) {
                  reject(error);
                }
              },
            },
            {
              text: 'GALLERY',
              onPress: () => {
                try {
                  const result = ImagePickerManager.selectPicker(
                    ImagePickerSelectionOptions.GALLERY,
                    mediaType,
                  );
                  resolve(result);
                } catch (error) {
                  reject(error);
                }
              },
            },
            {
              text: 'CANCEL',
              style: 'destructive',
              onPress: () => reject('User cancelled picker'),
            },
          ],
        }),
      );
    });
  },
};
