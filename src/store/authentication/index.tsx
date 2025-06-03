import { create } from "zustand";
import { APIManager } from "../../api/ApiManager";
import { apiEndPoint } from "../../api/APIConstant";
import { APIResponseType } from "../../constants/interfaces";

interface Store {
  signup: (dictData: object, navigation: any) => Promise<APIResponseType>;
  signin: (dictData: object, navigation: any) => Promise<APIResponseType>;
  forgotPasswordEmailVerify: (
    dictData: object,
    navigation: any
  ) => Promise<APIResponseType>;
  changeForgotPassword: (
    dictData: object,
    navigation: any
  ) => Promise<APIResponseType>;
  changePassword: (
    dictData: object,
    navigation: any
  ) => Promise<APIResponseType>;
  getCustomerDetail: (
    dictData: object,
    navigation: any
  ) => Promise<APIResponseType>;
  updatePhoneEmailVerification: (
    dictData: object,
    navigation: any
  ) => Promise<APIResponseType>;
}

const AuthStore = create<Store>((set) => ({
  signup(dictData, navigation) {
    return new Promise<APIResponseType>((resolve, reject) => {
      const callback = (
        data: APIResponseType | null,
        error: { message: string } | null
      ) => {
        if (error) {
          console.warn("API error===>", error);
          reject(error.message || "An error occurred");
          return;
        } else {
          if (data) {
            resolve(data);
          }
        }
      };

      APIManager.postServerRequestWithoutToken({
        apiEndPoint: apiEndPoint.signup,
        callback: callback,
        dictData: dictData,
        navigation: navigation,
      });
    });
  },

  signin(dictData, navigation) {
    return new Promise<APIResponseType>((resolve, reject) => {
      const callback = (
        data: APIResponseType | null,
        error: { message: string } | null
      ) => {
        if (error) {
          console.warn("API error===>", error);
          reject(error.message || "An error occurred");
          return;
        } else {
          if (data) {
            resolve(data);
          }
        }
      };

      APIManager.postServerRequestWithoutToken({
        apiEndPoint: apiEndPoint.login,
        callback: callback,
        dictData: dictData,
        navigation: navigation,
      });
    });
  },

  forgotPasswordEmailVerify(dictData, navigation) {
    return new Promise<APIResponseType>((resolve, reject) => {
      const callback = (
        data: APIResponseType | null,
        error: { message: string } | null
      ) => {
        if (error) {
          console.warn("API error===>", error);
          reject(error.message || "An error occurred");
          return;
        } else {
          if (data) {
            resolve(data);
          }
        }
      };

      APIManager.postServerRequestWithoutToken({
        apiEndPoint: apiEndPoint.forgotPasswordEmailVerification,
        callback: callback,
        dictData: dictData,
        navigation: navigation,
      });
    });
  },

  changeForgotPassword(dictData, navigation) {
    return new Promise<APIResponseType>((resolve, reject) => {
      const callback = (
        data: APIResponseType | null,
        error: { message: string } | null
      ) => {
        if (error) {
          console.warn("API error===>", error);
          reject(error.message || "An error occurred");
          return;
        } else {
          if (data) {
            resolve(data);
          }
        }
      };

      APIManager.postServerRequestWithoutToken({
        apiEndPoint: apiEndPoint.changeForgotPassword,
        callback: callback,
        dictData: dictData,
        navigation: navigation,
      });
    });
  },

  changePassword(dictData, navigation) {
    return new Promise<APIResponseType>((resolve, reject) => {
      const callback = (
        data: APIResponseType | null,
        error: { message: string } | null
      ) => {
        if (error) {
          console.warn("API error===>", error);
          reject(error.message || "An error occurred");
          return;
        } else {
          if (data) {
            resolve(data);
          }
        }
      };

      APIManager.postServerRequestWithToken({
        apiEndPoint: apiEndPoint.changePassword,
        callback: callback,
        dictData: dictData,
        navigation: navigation,
      });
    });
  },

  getCustomerDetail(dictData, navigation) {
    return new Promise<APIResponseType>((resolve, reject) => {
      const callback = (
        data: APIResponseType | null,
        error: { message: string } | null
      ) => {
        if (error) {
          console.warn("API error===>", error);
          reject(error.message || "An error occurred");
          return;
        } else {
          if (data) {
            resolve(data);
          }
        }
      };

      APIManager.getServerRequestWithToken({
        apiEndPoint: apiEndPoint.getCustomerDetail,
        callback: callback,
        dictData: dictData,
        navigation: navigation,
      });
    });
  },

  updatePhoneEmailVerification(dictData, navigation) {
    return new Promise<APIResponseType>((resolve, reject) => {
      const callback = (
        data: APIResponseType | null,
        error: { message: string } | null
      ) => {
        if (error) {
          console.warn("API error===>", error);
          reject(error.message || "An error occurred");
          return;
        } else {
          if (data) {
            resolve(data);
          }
        }
      };

      APIManager.postServerRequestWithToken({
        apiEndPoint: apiEndPoint.updatePhoneEmailVerification,
        callback: callback,
        dictData: dictData,
        navigation: navigation,
      });
    });
  },
}));

export default AuthStore;
