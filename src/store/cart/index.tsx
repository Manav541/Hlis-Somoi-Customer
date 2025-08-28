import { create } from "zustand";
import { apiEndPoint } from "../../api/APIConstant";
import { APIManager } from "../../api/ApiManager";
import { APIResponseType } from "../../constants/interfaces";

interface Store {
  applyCouponCode: (
    dictData: object,
    navigation: any
  ) => Promise<APIResponseType>;
  removeCouponCode: (
    dictData: object,
    navigation: any
  ) => Promise<APIResponseType>;
  cartListing: (dictData: object, navigation: any) => Promise<APIResponseType>;
  placeOrder: (dictData: object, navigation: any) => Promise<APIResponseType>;
  createOrderId: (
    dictData: object,
    navigation: any
  ) => Promise<APIResponseType>;
}

const CartStore = create<Store>((set) => ({
  applyCouponCode(dictData, navigation) {
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
        apiEndPoint: apiEndPoint.applyCouponCode,
        callback: callback,
        dictData: dictData,
        navigation: navigation,
      });
    });
  },

  removeCouponCode(dictData, navigation) {
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
        apiEndPoint: apiEndPoint.removeCouponCode,
        callback: callback,
        dictData: dictData,
        navigation: navigation,
      });
    });
  },

  cartListing(dictData, navigation) {
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
        apiEndPoint: apiEndPoint.cartListing,
        callback: callback,
        dictData: dictData,
        navigation: navigation,
      });
    });
  },

  placeOrder(dictData, navigation) {
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
        apiEndPoint: apiEndPoint.placeOrder,
        callback: callback,
        dictData: dictData,
        navigation: navigation,
      });
    });
  },

  createOrderId(dictData, navigation) {
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
        apiEndPoint: apiEndPoint.createOrderId,
        callback: callback,
        dictData: dictData,
        navigation: navigation,
      });
    });
  },
}));

export default CartStore;
