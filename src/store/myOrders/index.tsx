import { create } from "zustand";
import { apiEndPoint } from "../../api/APIConstant";
import { APIManager } from "../../api/ApiManager";
import { APIResponseType } from "../../constants/interfaces";

type StoreFunction = (
  dictData: object,
  navigation: any
) => Promise<APIResponseType>;

interface Store {
  orderList: StoreFunction;
  orderDetails: StoreFunction;
  cancelReturnOrderReasonList: StoreFunction;
  cancelOrder: StoreFunction;
  reportIssue: StoreFunction;
  returnOrder: StoreFunction;
  deliveryBoyLocation: (
    dictData: object,
    navigation: any
  ) => Promise<APIResponseType>;
  getDriverDirections: StoreFunction;
  searchPlaces: StoreFunction;
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

  orderDetails(dictData, navigation) {
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

  deliveryBoyLocation(dictData, navigation) {
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
        apiEndPoint: apiEndPoint.deliveryBoyLocation,
        callback: callback,
        dictData: dictData,
        showLoader: false,
        navigation: navigation,
      });
    });
  },


  getDriverDirections: async (
    dictData: object,
    navigation: any
  ): Promise<APIResponseType> => {
    try {
      return await new Promise<APIResponseType>((resolve, reject) => {
        const callback = (
          data: APIResponseType | null,
          error: { message: string } | null
        ) => {
          if (error) {
            console.warn("API error===>", error);
            reject(new Error(error.message || "An error occurred"));
            return;
          }
          if (data) {
            resolve(data);
          } else {
            reject(new Error("No data returned from API"));
          }
        };

        APIManager.postServerRequestWithToken({
          apiEndPoint: apiEndPoint.getDriverDirections,
          callback,
          dictData,
          showLoader: false,
          navigation,
        });
      });
    } catch (error) {
      console.error("getDriverDirections error:", error);
      throw error;
    }
  },

  searchPlaces: async (
    dictData: object,
    navigation: any
  ): Promise<APIResponseType> => {
    try {
      return await new Promise<APIResponseType>((resolve, reject) => {
        const callback = (
          data: APIResponseType | null,
          error: { message: string } | null
        ) => {
          if (error) {
            console.warn("API error===>", error);
            reject(new Error(error.message || "An error occurred"));
            return;
          }
          if (data) {
            resolve(data);
          } else {
            reject(new Error("No data returned from API"));
          }
        };

        APIManager.postServerRequestWithToken({
          apiEndPoint: apiEndPoint.searchPlaces,
          callback,
          dictData,
          showLoader: false,
          navigation,
        });
      });
    } catch (error) {
      console.error("searchPlaces error:", error);
      throw error;
    }
  },
}));

export default MyOrdersStore;
