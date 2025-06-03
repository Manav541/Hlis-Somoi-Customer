import { create } from "zustand";
import { apiEndPoint } from "../../api/APIConstant";
import { APIManager } from "../../api/ApiManager";

interface Store {
  otpVerification: any;
  requestResendOtp: any;
}

const OtpVerificationStore = create<Store>((set) => ({
  otpVerification: async (
    mobile_number: number,
    country_code: string,
    otp: number,
    email: string,
    navigation: any
  ) => {
    const dictData = {
      mobile_number: mobile_number,
      country_code: country_code,
      otp: otp,
      email: email,
    };

    return new Promise((resolve, reject) => {
      const callback = async (data: any, error: any) => {
        if (error) {
          console.error("API error:", error);
          reject(new Error(error.message || "An error occurred"));
          return;
        }

        if (data.code == 1) {
          resolve(data);
        } else if (data.code == 0) {
          resolve(data);
        }
      };

      APIManager.postServerRequestWithoutToken({
        apiEndPoint: apiEndPoint.otpVerification,
        dictData,
        navigation,
        callback,
        showLoader: true,
      });
    });
  },

  requestResendOtp: async (
    mobile_number: number,
    country_code: string,
    navigation: any
  ) => {
    const dictData = {
      mobile_number: Number(mobile_number),
      country_code: country_code,
    };

    return new Promise((resolve, reject) => {
      const callback = async (data: any, error: any) => {
        if (error) {
          console.error("API error:", error);
          reject(new Error(error.message || "An error occurred"));
          return;
        }

        if (data.code == 1) {
          resolve(data);
        } else if (data.code === 0) {
          reject(new Error(data.message));
        }
      };

      APIManager.postServerRequestWithoutToken({
        apiEndPoint: apiEndPoint.requestOtp,
        dictData,
        navigation,
        callback,
        showLoader: true,
      });
    });
  },
}));

export default OtpVerificationStore;
