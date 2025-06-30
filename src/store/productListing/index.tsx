import { create } from "zustand";
import { apiEndPoint } from "../../api/APIConstant";
import { APIManager } from "../../api/ApiManager";
import { APIResponseType } from "../../constants/interfaces";

type StoreFunction = (
  dictData: object,
  navigation: any
) => Promise<APIResponseType>;

type StoreFunctionGuest = (
  dictData: object,
  isGuestUser: boolean,
  navigation: any
) => Promise<APIResponseType>;

interface Store {
  productListing: StoreFunctionGuest;
  filterSort: StoreFunctionGuest;
  productDetails: StoreFunctionGuest;
  foodDetails: StoreFunctionGuest;
  addToCart: StoreFunction;
  updateCartQuantity: StoreFunction;
  removeFromCart: StoreFunction;
}

const ProductListingStore = create<Store>((set) => ({
  productListing(dictData, isGuestUser, navigation) {
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
        apiEndPoint: apiEndPoint.productListing,
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

  filterSort(dictData, isGuestUser, navigation) {
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
        apiEndPoint: apiEndPoint.filterSort,
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

  productDetails(dictData, isGuestUser, navigation) {
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
        apiEndPoint: apiEndPoint.productDetails,
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

  foodDetails(dictData, isGuestUser, navigation) {
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
        apiEndPoint: apiEndPoint.foodDetails,
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

  addToCart(dictData, navigation) {
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
        apiEndPoint: apiEndPoint.addToCart,
        callback: callback,
        dictData: dictData,
        navigation: navigation,
      });
    });
  },

  updateCartQuantity(dictData, navigation) {
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
        apiEndPoint: apiEndPoint.updateCartQuantity,
        callback: callback,
        dictData: dictData,
        navigation: navigation,
      });
    });
  },

  removeFromCart(dictData, navigation) {
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
        apiEndPoint: apiEndPoint.removeFromCart,
        callback: callback,
        dictData: dictData,
        navigation: navigation,
      });
    });
  },
}));

export default ProductListingStore;
