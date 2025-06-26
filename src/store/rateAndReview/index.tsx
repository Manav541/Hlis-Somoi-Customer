import { create } from "zustand";
import { apiEndPoint } from "../../api/APIConstant";
import { APIManager } from "../../api/ApiManager";
import { APIResponseType } from "../../constants/interfaces";

interface Store {
  rateAndReviewList: (
    dictData: object,
    navigation: any
  ) => Promise<APIResponseType>;
  rateVendor: (dictData: object, navigation: any) => Promise<APIResponseType>;
  rateProduct: (dictData: object, navigation: any) => Promise<APIResponseType>;
  editRate: (dictData: object, navigation: any) => Promise<APIResponseType>;
  deleteRate: (dictData: object, navigation: any) => Promise<APIResponseType>;
}

const RateAndReviewStore = create<Store>((set) => ({
  rateAndReviewList(dictData, navigation) {
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
        apiEndPoint: apiEndPoint.rateAndReviewList,
        callback: callback,
        dictData: dictData,
        navigation: navigation,
      });
    });
  },

  rateVendor(dictData, navigation) {
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
        apiEndPoint: apiEndPoint.rateVendor,
        callback: callback,
        dictData: dictData,
        navigation: navigation,
      });
    });
  },

  rateProduct(dictData, navigation) {
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
        apiEndPoint: apiEndPoint.rateProduct,
        callback: callback,
        dictData: dictData,
        navigation: navigation,
      });
    });
  },

  editRate(dictData, navigation) {
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
        apiEndPoint: apiEndPoint.editRate,
        callback: callback,
        dictData: dictData,
        navigation: navigation,
      });
    });
  },

  deleteRate(dictData, navigation) {
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
        apiEndPoint: apiEndPoint.deleteRate,
        callback: callback,
        dictData: dictData,
        navigation: navigation,
      });
    });
  },
}));

export default RateAndReviewStore;
