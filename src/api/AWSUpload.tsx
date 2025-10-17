import axios from 'axios';
import {flashMessageWarning, toggleLoader} from '../constants/GConstant';
import RNFS from 'react-native-fs';
import {PlatformVersion} from '../constants/utils/Platform';
import {getTranslation} from '../localization/i18n/i18n.config';

interface UploadFile {
  localPath: string;
  signedUrl: string;
  mimeType: string;
}

interface UploadResult {
  localPath: string;
  uploadedUrl?: string;
  error?: any;
}

export const AWS_FOLDER_NAME = {
  USER_IMAGE: "customers_images",
  REPORTS_MEDIA: "reports_media",
  RATING_MEDIA: "rating_media",
  CHAT_MEDIA: "chat_media",
  ORDER_RETURN_MEDIA: "order_return_media",
};

export function getMimeTypeFromPath(filePath: string): string {
  if (!filePath) return 'application/octet-stream';

  const extension = filePath.split('.').pop()?.toLowerCase();

  switch (extension) {
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg';
    case 'png':
      return 'image/png';
    case 'gif':
      return 'image/gif';
    case 'webp':
      return 'image/webp';
    case 'heic':
      return 'image/heic';
    case 'mp4':
      return 'video/mp4';
    case 'mov':
      return 'video/quicktime';
    case 'avi':
      return 'video/x-msvideo';
    case 'mkv':
      return 'video/x-matroska';
    case 'mp3':
      return 'audio/mpeg';
    case 'wav':
      return 'audio/wav';
    case 'aac':
      return 'audio/aac';
    case 'ogg':
      return 'audio/ogg';
    case 'pdf':
      return 'application/pdf';
    case 'txt':
      return 'text/plain';
    case 'json':
      return 'application/json';
    case 'csv':
      return 'text/csv';
    default:
      return 'application/octet-stream';
  }
}

export async function uploadMultipleFilesToS3(
  files: UploadFile[],
): Promise<UploadResult[]> {
  const results: UploadResult[] = [];
  toggleLoader(true);

  for (const file of files) {
    try {
      console.log('🚀 Starting upload for:', file.localPath);

      let fileData: any;

      if (PlatformVersion.isAndroid) {
        // Android — read file as base64 using RNFS
        const base64Data = await RNFS.readFile(file.localPath, 'base64');

        // Convert base64 → byte array
        const binaryString = atob(base64Data);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }

        fileData = bytes;
      } else {
        // iOS — can fetch directly
        const fileResp = await fetch(file.localPath);
        fileData = await fileResp.blob();
      }

      // Upload to signed URL using Axios
      const response = await axios.put(file.signedUrl, fileData, {
        headers: {'Content-Type': file.mimeType},
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
        onUploadProgress: progressEvent => {
          const progress = Math.round(
            (progressEvent.loaded * 100) / (progressEvent.total ?? 1),
          );
          console.log(`⬆️ Uploading ${file.localPath}: ${progress}%`);
        },
        transformRequest: data => data,
      });

      if (response.status >= 200 && response.status < 300) {
        const cleanUrl = file.signedUrl.split('?')[0];
        console.log('✅ Uploaded successfully:', cleanUrl);
        results.push({localPath: file.localPath, uploadedUrl: cleanUrl});
      } else {
        flashMessageWarning(getTranslation('imageUploadError'));
        throw new Error(`Upload failed with status ${response.status}`);
      }
    } catch (error) {
      console.error(`❌ Upload failed for ${file.localPath}:`, error);
      results.push({localPath: file.localPath, error});
    }
  }

  toggleLoader(false);
  return results;
}
