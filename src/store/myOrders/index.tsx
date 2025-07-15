import { create } from "zustand";
import { apiEndPoint } from "../../api/APIConstant";
import { APIManager } from "../../api/ApiManager";
import { APIResponseType } from "../../constants/interfaces";

type StoreFunction = (
  dictData: object,
  navigation: any,
  showLoader?: boolean
) => Promise<APIResponseType>;

interface Store {
  orderList: StoreFunction;
  orderDetails: StoreFunction;
  cancelReturnOrderReasonList: StoreFunction;
  cancelOrder: StoreFunction;
  reportIssue: StoreFunction;
  returnOrder: StoreFunction;
}

const MyOrdersStore = create<Store>((set) => ({
  orderList(dictData, navigation) {
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
        apiEndPoint: apiEndPoint.orderList,
        callback: callback,
        dictData: dictData,
        navigation: navigation,
      });
    });
  },

  orderDetails(dictData, navigation, showLoader) {
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
        apiEndPoint: apiEndPoint.orderDetails,
        callback: callback,
        dictData: dictData,
        navigation: navigation,
        showLoader: showLoader
      });
    });
  },

  cancelReturnOrderReasonList(dictData, navigation) {
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
        apiEndPoint: apiEndPoint.cancelReturnOrderReasonList,
        callback: callback,
        dictData: dictData,
        navigation: navigation,
      });
    });
  },

  cancelOrder(dictData, navigation) {
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
        apiEndPoint: apiEndPoint.cancelOrder,
        callback: callback,
        dictData: dictData,
        navigation: navigation,
      });
    });
  },

  reportIssue(dictData, navigation) {
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
        apiEndPoint: apiEndPoint.reportIssue,
        callback: callback,
        dictData: dictData,
        navigation: navigation,
      });
    });
  },

  returnOrder(dictData, navigation) {
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
        apiEndPoint: apiEndPoint.returnOrder,
        callback: callback,
        dictData: dictData,
        navigation: navigation,
      });
    });
  },
}));

export default MyOrdersStore;
