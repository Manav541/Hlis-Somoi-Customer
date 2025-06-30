import { create } from "zustand";
import { apiEndPoint } from "../../api/APIConstant";
import { APIManager } from "../../api/ApiManager";
import { APIResponseType } from "../../constants/interfaces";

type StoreFunction = (
  dictData: object,
  isGuestUser: boolean,
  navigation: any
) => Promise<APIResponseType>;

interface Store {
  // API functions
  mainCategoryList: StoreFunction;
  bannerList: StoreFunction;
  subCategoryList: StoreFunction;
  bestProductsSellerList: StoreFunction;
  searchProduct: StoreFunction;
}

const HomeStore = create<Store>((set) => ({
  mainCategoryList(dictData, isGuestUser, navigation) {
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

      const requestParams = {
        apiEndPoint: apiEndPoint.mainCategoryList,
        callback,
        dictData,
        navigation,
      };

      // ✅ Call appropriate method based on guest status
      if (isGuestUser === true) {
        APIManager.postServerRequestWithoutToken(requestParams);
      } else {
        APIManager.postServerRequestWithToken(requestParams);
      }
    });
  },

  bannerList(dictData, isGuestUser, navigation) {
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

      const requestParams = {
        apiEndPoint: apiEndPoint.bannerList,
        callback,
        dictData,
        navigation,
      };

      // ✅ Call appropriate method based on guest status
      if (isGuestUser === true) {
        APIManager.getServerRequestWithoutToken(requestParams);
      } else {
        APIManager.getServerRequestWithToken(requestParams);
      }
    });
  },

  subCategoryList(dictData, isGuestUser, navigation) {
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

      const requestParams = {
        apiEndPoint: apiEndPoint.subCategoryList,
        callback,
        dictData,
        navigation,
      };

      // ✅ Call appropriate method based on guest status
      if (isGuestUser === true) {
        APIManager.postServerRequestWithoutToken(requestParams);
      } else {
        APIManager.postServerRequestWithToken(requestParams);
      }
    });
  },

  bestProductsSellerList(dictData, isGuestUser, navigation) {
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

      const requestParams = {
        apiEndPoint: apiEndPoint.bestProductsSellerList,
        callback,
        dictData,
        navigation,
      };

      // ✅ Call appropriate method based on guest status
      if (isGuestUser === true) {
        APIManager.postServerRequestWithoutToken(requestParams);
      } else {
        APIManager.postServerRequestWithToken(requestParams);
      }
    });
  },

  searchProduct(dictData, isGuestUser, navigation) {
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

      const requestParams = {
        apiEndPoint: apiEndPoint.searchProduct,
        callback,
        dictData,
        navigation,
      };

      // ✅ Call appropriate method based on guest status
      if (isGuestUser === true) {
        APIManager.postServerRequestWithoutToken(requestParams);
      } else {
        APIManager.postServerRequestWithToken(requestParams);
      }
    });
  },
}));

export default HomeStore;
