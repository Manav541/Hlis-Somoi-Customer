import { create } from "zustand";
import { apiEndPoint } from "../../api/APIConstant";
import { APIManager } from "../../api/ApiManager";
import { APIResponseType } from "../../constants/interfaces";

interface Store {
  currentLocation: {
    latitude: number;
    longitude: number;
  } | null;
  setCurrentLocation: (location: {
    latitude: number;
    longitude: number;
  }) => void;
  formattedAddress: string | null;
  setFormattedAddress: (address: string) => void;
  addressList: (dictData: object, navigation: any) => Promise<APIResponseType>;
  addAddress: (dictData: object, navigation: any) => Promise<APIResponseType>;
  updateAddress: (
    dictData: object,
    navigation: any
  ) => Promise<APIResponseType>;
  deleteAddress: (
    dictData: object,
    navigation: any
  ) => Promise<APIResponseType>;
  getFormattedAddress: (
    dictData: object,
    navigation: any
  ) => Promise<APIResponseType>;
}

const AddressStore = create<Store>((set) => ({
  currentLocation: null,
  setCurrentLocation: (location) => set({ currentLocation: location }),
  formattedAddress: "",
  setFormattedAddress: (address) => set({ formattedAddress: address }),
  addressList(dictData, navigation) {
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
        apiEndPoint: apiEndPoint.locationList,
        callback: callback,
        dictData: dictData,
        navigation: navigation,
      });
    });
  },

  addAddress(dictData, navigation) {
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
        apiEndPoint: apiEndPoint.addLocation,
        callback: callback,
        dictData: dictData,
        navigation: navigation,
      });
    });
  },

  updateAddress(dictData, navigation) {
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
        apiEndPoint: apiEndPoint.updateLocation,
        callback: callback,
        dictData: dictData,
        navigation: navigation,
      });
    });
  },

  deleteAddress(dictData, navigation) {
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
        apiEndPoint: apiEndPoint.deleteLocation,
        callback: callback,
        dictData: dictData,
        navigation: navigation,
      });
    });
  },

  getFormattedAddress: async (
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
          apiEndPoint: apiEndPoint.getFormattedAddress,
          callback,
          dictData,
          navigation,
        });
      });
    } catch (error) {
      console.error("searchPlaces error:", error);
      throw error;
    }
  },
}));

export default AddressStore;
