import { create } from "zustand";
import { apiEndPoint } from "../../api/APIConstant";
import { APIManager } from "../../api/ApiManager";
import { APIResponseType } from "../../constants/interfaces";

interface Store {
  compareProductList: (
    dictData: object,
    navigation: any
  ) => Promise<APIResponseType>;
  addCompareProduct: (
    dictData: object,
    navigation: any
  ) => Promise<APIResponseType>;
  removeCompareProduct: (
    dictData: object,
    navigation: any
  ) => Promise<APIResponseType>;
}

const CompareProductStore = create<Store>((set) => ({
  compareProductList(dictData, navigation) {
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
        apiEndPoint: apiEndPoint.compareProductList,
        callback: callback,
        dictData: dictData,
        navigation: navigation,
      });
    });
  },

  addCompareProduct(dictData, navigation) {
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
        apiEndPoint: apiEndPoint.addCompareProduct,
        callback: callback,
        dictData: dictData,
        navigation: navigation,
      });
    });
  },

  removeCompareProduct(dictData, navigation) {
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
        apiEndPoint: apiEndPoint.removeCompareProduct,
        callback: callback,
        dictData: dictData,
        navigation: navigation,
      });
    });
  },
}));

export default CompareProductStore;
