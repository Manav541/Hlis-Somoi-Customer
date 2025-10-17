import { create } from 'zustand';
import { apiEndPoint } from '../../api/APIConstant';
import { APIManager } from '../../api/ApiManager';
import { APIResponseType } from '../../constants/interfaces';

interface Store {
  s3ImageUpload: (dictData: object, navigation: any) => Promise<APIResponseType>;
}

const S3ImageUploadStore = create<Store>((set) => ({
  s3ImageUpload: async (dictData: object, navigation: any): Promise<APIResponseType> => {
    try {
      return await new Promise<APIResponseType>((resolve, reject) => {
        const callback = (
          data: APIResponseType | null,
          error: { message: string } | null
        ) => {
          if (error) {
            console.warn('API error===>', error);
            reject(new Error(error.message || 'An error occurred'));
            return;
          }
          if (data) {
            resolve(data);
          } else {
            reject(new Error('No data returned from API'));
          }
        };

        APIManager.postServerRequestWithToken({
          apiEndPoint: apiEndPoint.s3ImageUpload,
          callback,
          dictData,
          navigation,
        });
      });
    } catch (error) {
      console.error('s3ImageUpload error:', error);
      throw error;
    }
  },
}));

export default S3ImageUploadStore;