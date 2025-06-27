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
  cancelReturnOrderReasonList :  StoreFunction;
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

}));

export default MyOrdersStore;
