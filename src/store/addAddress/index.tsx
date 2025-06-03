import { create } from "zustand";
import { apiEndPoint } from "../../api/APIConstant";
import { APIManager } from "../../api/ApiManager";
import { APIResponseType } from "../../constants/interfaces";

interface Store {
  addAddress: (dictData: object, navigation: any) => Promise<APIResponseType>;
}

const AddressStore = create<Store>((set) => ({
  
    addAddress(dictData, navigation) {
    return new Promise<APIResponseType>((resolve, reject) => {
      const callback = (
        data: APIResponseType | null,
        error: {message: string} | null,
      ) => {
        if (error) {
          console.warn('API error===>', error);
          reject(error.message || 'An error occurred');
          return;
        } else {
          if (data) {
            resolve(data);
          }
        }
      };
 
      APIManager.postServerRequestWithToken({
        apiEndPoint: apiEndPoint.otpVerification,
        callback: callback,
        dictData: dictData,
        navigation: navigation,
      });
    });
  },

 

}));

export default AddressStore;
