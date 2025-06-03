import { create } from "zustand";
import { apiEndPoint } from "../../api/APIConstant";
import { APIManager } from "../../api/ApiManager";
import { APIResponseType } from "../../constants/interfaces";

interface Store {
  otpVerification: (dictData: object, navigation: any) => Promise<APIResponseType>;
  requestResendOtp: (dictData: object, navigation: any) => Promise<APIResponseType>;
}

const OtpVerificationStore = create<Store>((set) => ({
  
  otpVerification(dictData, navigation) {
    return new Promise<APIResponseType>((resolve, reject) => {
      const callback = (
        data: APIResponseType | null,
        error: {message: string} | null,
      ) => {
        if (error) {
          console.warn('API error===>', error);
          reject(error.message || 'An error occurred');
          return;
        } else {
          if (data) {
            resolve(data);
          }
        }
      };
 
      APIManager.postServerRequestWithoutToken({
        apiEndPoint: apiEndPoint.otpVerification,
        callback: callback,
        dictData: dictData,
        navigation: navigation,
      });
    });
  },

  requestResendOtp(dictData, navigation) {
    return new Promise<APIResponseType>((resolve, reject) => {
      const callback = (
        data: APIResponseType | null,
        error: {message: string} | null,
      ) => {
        if (error) {
          console.warn('API error===>', error);
          reject(error.message || 'An error occurred');
          return;
        } else {
          if (data) {
            resolve(data);
          }
        }
      };
 
      APIManager.postServerRequestWithoutToken({
        apiEndPoint: apiEndPoint.requestOtp,
        callback: callback,
        dictData: dictData,
        navigation: navigation,
      });
    });
  },

}));

export default OtpVerificationStore;
