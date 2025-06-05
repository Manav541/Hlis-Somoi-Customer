import { create } from "zustand";
import { apiEndPoint } from "../../api/APIConstant";
import { APIManager } from "../../api/ApiManager";
import { APIResponseType } from "../../constants/interfaces";

interface Store {
  availableOffers: (dictData: object, navigation: any) => Promise<APIResponseType>;
}

const AvailableOffersStore = create<Store>((set) => ({
    availableOffers(dictData, navigation) {
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
 
      APIManager.getServerRequestWithToken({
        apiEndPoint: apiEndPoint.availableOffers,
        callback: callback,
        dictData: dictData,
        navigation: navigation,
      });
    });
  },

 

}));

export default AvailableOffersStore;
