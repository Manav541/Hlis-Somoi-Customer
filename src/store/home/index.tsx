import { create } from "zustand";
import { apiEndPoint } from "../../api/APIConstant";
import { APIManager } from "../../api/ApiManager";
import { APIResponseType } from "../../constants/interfaces";

type StoreFunction = (
  dictData: object,
  navigation: any
) => Promise<APIResponseType>;

interface Store {
  mainCategoryList: StoreFunction;
  bannerList: StoreFunction;
  subCategoryList: StoreFunction;
  bestProductsSellerList: StoreFunction;
  searchProduct: StoreFunction;
}

const HomeStore = create<Store>((set) => ({
  mainCategoryList(dictData, navigation) {
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
        apiEndPoint: apiEndPoint.mainCategoryList,
        callback: callback,
        dictData: dictData,
        navigation: navigation,
      });
    });
  },

  bannerList(dictData, navigation) {
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
        apiEndPoint: apiEndPoint.bannerList,
        callback: callback,
        dictData: dictData,
        navigation: navigation,
      });
    });
  },

  subCategoryList(dictData, navigation) {
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
        apiEndPoint: apiEndPoint.subCategoryList,
        callback: callback,
        dictData: dictData,
        navigation: navigation,
      });
    });
  },

  bestProductsSellerList(dictData, navigation) {
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
        apiEndPoint: apiEndPoint.bestProductsSellerList,
        callback: callback,
        dictData: dictData,
        navigation: navigation,
      });
    });
  },

  searchProduct(dictData, navigation) {
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
        apiEndPoint: apiEndPoint.searchProduct,
        callback: callback,
        dictData: dictData,
        navigation: navigation,
      });
    });
  },
  
}));

export default HomeStore;
