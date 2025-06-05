import { create } from "zustand";
import { APIManager } from "../../api/ApiManager";
import { apiEndPoint } from "../../api/APIConstant";
import { APIResponseType } from "../../constants/interfaces";

type StoreFunction = (
  dictData: object,
  navigation: any
) => Promise<APIResponseType>;

interface Store {
  // Auth-related
  signup: StoreFunction;
  signin: StoreFunction;
  forgotPasswordEmailVerify: StoreFunction;
  changeForgotPassword: StoreFunction;
  changePassword: StoreFunction;
  editProfile: StoreFunction;
  updatePhoneEmailVerification: StoreFunction;
  updatePhoneEmail: StoreFunction;
  logout: StoreFunction;
  deleteAccount: StoreFunction;

  // CMS & Support
  cmsPages: StoreFunction;
  contactUs: StoreFunction;

  // Home
  getCustomerDetail: StoreFunction;
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

  editProfile(dictData, navigation) {
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
        apiEndPoint: apiEndPoint.editProfile,
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

  updatePhoneEmail(dictData, navigation) {
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
        apiEndPoint: apiEndPoint.updatePhoneEmail,
        callback: callback,
        dictData: dictData,
        navigation: navigation,
      });
    });
  },

  logout(dictData, navigation) {
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
        apiEndPoint: apiEndPoint.logout,
        callback: callback,
        dictData: dictData,
        navigation: navigation,
      });
    });
  },

  deleteAccount(dictData, navigation) {
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
        apiEndPoint: apiEndPoint.deleteAccount,
        callback: callback,
        dictData: dictData,
        navigation: navigation,
      });
    });
  },

  // Home
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

  cmsPages(dictData, navigation) {
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
        apiEndPoint: apiEndPoint.cmsPages,
        callback: callback,
        dictData: dictData,
        navigation: navigation,
      });
    });
  },

  contactUs(dictData, navigation) {
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
        apiEndPoint: apiEndPoint.contactUs,
        callback: callback,
        dictData: dictData,
        navigation: navigation,
      });
    });
  },
}));

export default AuthStore;
