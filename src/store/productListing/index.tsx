import { create } from "zustand";
import { apiEndPoint } from "../../api/APIConstant";
import { APIManager } from "../../api/ApiManager";
import { APIResponseType } from "../../constants/interfaces";

interface Store {
  productListing: (
    dictData: object,
    navigation: any
  ) => Promise<APIResponseType>;
  filterSort: (dictData: object, navigation: any) => Promise<APIResponseType>;
  productDetails: (
    dictData: object,
    navigation: any
  ) => Promise<APIResponseType>;
}

const ProductListingStore = create<Store>((set) => ({
  productListing(dictData, navigation) {
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
        apiEndPoint: apiEndPoint.productListing,
        callback: callback,
        dictData: dictData,
        navigation: navigation,
      });
    });
  },

  filterSort(dictData, navigation) {
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
        apiEndPoint: apiEndPoint.filterSort,
        callback: callback,
        dictData: dictData,
        navigation: navigation,
      });
    });
  },

  productDetails(dictData, navigation) {
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
        apiEndPoint: apiEndPoint.productDetails,
        callback: callback,
        dictData: dictData,
        navigation: navigation,
      });
    });
  },
}));

export default ProductListingStore;
