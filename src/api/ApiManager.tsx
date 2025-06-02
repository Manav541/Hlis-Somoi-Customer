import {
  apiBaseURL,
  apiHeaderKeyValue,
  apiKeys,
  statusCode,
} from "./APIConstant";
import { NativeModules } from "react-native";
import { CommonActions } from "@react-navigation/native";
import { MmkvManager } from "../constants/utils/MmkvManager";
import { getConnection, toggleLoader } from "../constants/GConstant";

interface ServerResponse {
  apiEndPoint: string;
  dictData?: object | null;
  navigation: any;
  callback: (response: object | null, error: null) => void;
  showLoader: boolean;
}

const axios = require("axios").default;

export const APIManager = {
  getURL: (apiEndPoint: string) => {
    return apiBaseURL.development + apiEndPoint;
  },

  getHeader: async () => {
    let header = {
      "Accept-Language": "en",
      "Content-Type": "text/plain",
      "api-key": apiHeaderKeyValue.apiKeyValue,
    };
    return header;
  },

  encryptData: (strData: string, callback: (encryptedData: string) => void) => {
    NativeModules.NativeEncryption.encryptData(
      apiKeys.secretKey,
      apiKeys.iv,
      strData,
      (error: Error | null, data: string) => {
        callback(data);
      }
    );
  },

  decryptData: (strData: any, callback: (encryptedData: string) => void) => {
    NativeModules.NativeEncryption.decryptData(
      apiKeys.secretKey,
      apiKeys.iv,
      JSON.stringify(strData),
      (error: any, data: any) => {
        callback(data);
      }
    );
  },

  geServerRequestWithToken: async ({
    apiEndPoint,
    navigation,
    callback,
    showLoader = true,
  }: ServerResponse): Promise<void> => {
    getConnection(async (internet: boolean | null) => {
      if (!internet) {
        toggleLoader(false);
        return console.log("No internet connection");
      }

      var header = await APIManager.getHeader();

      if (showLoader) {
        toggleLoader(true);
      }

      await MmkvManager.getData(
        MmkvManager.Keys.userToken,
        (userToken: any) => {
          if (userToken) {
            let data = userToken;
            APIManager.encryptData(data, async (encryptedToken: any) => {
              let headerToken = {
                token: encryptedToken,
              };
              header = { ...header, ...headerToken };
              console.log("\n==========Header==============\n", header);
              console.log(
                "\n==============END-POINT URL=================\n",
                APIManager.getURL(apiEndPoint)
              );

              await axios
                .get(APIManager.getURL(apiEndPoint), {
                  headers: header,
                  timeout: 60000,
                })
                .then(async (response: any) => {
                  toggleLoader(false);

                  if (response.status == 200) {
                    APIManager.decryptData(response.data, async (data: any) => {
                      try {
                        const decryptedData = JSON.parse(data);
                        console.log(
                          "\n===============Decrypted Data============\n",
                          decryptedData
                        );

                        if (
                          decryptedData?.code === statusCode.userSessionExpire
                        ) {
                          console.log("==========Session expired!========");
                          MmkvManager.clearAllExcept([
                            MmkvManager.Keys.isOnBoardingVisisted,
                          ]);

                          navigation.dispatch(
                            CommonActions.reset({
                              index: 1,
                              routes: [{ name: "LoginContainer" }],
                            })
                          );
                        } else {
                          callback(decryptedData, null);
                        }
                      } catch (e) {
                        console.warn(
                          "\n===============Error Parsing Data============\n",
                          e
                        );
                        callback(data, null);
                      }
                    });
                  } else {
                    callback(response.data, null);
                  }
                })
                .catch(async (error: any) => {
                  console.log("error=====>", error);
                  toggleLoader(false);
                  callback(error, null);

                  if (error.code === "ECONNABORTED") {
                    // Handle timeout error
                  } else if (error.response?.status == 401) {
                    console.log(
                      "============Unauthorized access!=============="
                    );
                    MmkvManager.clearAllExcept([
                      MmkvManager.Keys.isOnBoardingVisisted,
                    ]);

                    navigation.dispatch(
                      CommonActions.reset({
                        index: 1,
                        routes: [{ name: "LoginContainer" }],
                      })
                    );
                  }
                });
            });
          }
        }
      );
    });
  },

  getServerRequestWithoutToken: async ({
    apiEndPoint,
    navigation,
    callback,
    showLoader = true,
  }: ServerResponse): Promise<void> => {
    getConnection(async (internet: boolean | null) => {
      if (!internet) {
        toggleLoader(false);
        return console.log("No internet connection");
      }

      var header = await APIManager.getHeader();

      if (showLoader) {
        toggleLoader(true);
      }

      console.log("\n==========Header==============\n", header);
      console.log(
        "\n==============END-POINT URL=================\n",
        APIManager.getURL(apiEndPoint)
      );

      await axios
        .get(APIManager.getURL(apiEndPoint), {
          headers: header,
          timeout: 60000,
        })
        .then((response: any) => {
          toggleLoader(false);

          if (response.status == 200) {
            APIManager.decryptData(response.data, async (data: any) => {
              try {
                console.log("\n===============decryptData============\n", data);
                if (data?.code == statusCode.userSessionExpire) {
                  console.log("=========Session Expired!==========");

                  MmkvManager.clearAllExcept([
                    MmkvManager.Keys.isOnBoardingVisisted,
                  ]);

                  navigation.dispatch(
                    CommonActions.reset({
                      index: 1,
                      routes: [{ name: "LoginContainer" }],
                    })
                  );
                } else {
                  callback(JSON.parse(data), null);
                }
              } catch (e) {
                console.warn("\n===============Error============\n", e);
                callback(JSON.parse(data), null);
              }
            });
          } else {
            callback(response.data, null);
          }
        })
        .catch(async (error: any) => {
          console.log("error =====> ", error);
          toggleLoader(false);

          callback(error, null);

          if (error.code === "ECONNABORTED") {
            // Handle timeout error
          } else if (error.response?.status == 401) {
            console.log("=============Unauthorized access!=============");

            MmkvManager.clearAllExcept([MmkvManager.Keys.isOnBoardingVisisted]);

            navigation.dispatch(
              CommonActions.reset({
                index: 1,
                routes: [{ name: "LoginContainer" }],
              })
            );
          }
        });
    });
  },

  postServerRequestWithoutToken: async ({
    apiEndPoint,
    callback,
    navigation,
    dictData,
    showLoader = true,
  }: ServerResponse): Promise<void> => {
    getConnection(async (internet: boolean | null) => {
      if (!internet) {
        toggleLoader(false);
        return console.log("No internet connection");
      }

      var header = await APIManager.getHeader();

      if (showLoader) {
        toggleLoader(true);
      }

      APIManager.encryptData(JSON.stringify(dictData), async (data: any) => {
        console.log("\n==========Header==============\n", header);
        console.log("\n===============Parameters============\n", dictData);
        console.log(
          "\n===============Encrypted Parameters============\n",
          data
        );
        console.log(
          "\n==============END-POINT URL=================\n",
          APIManager.getURL(apiEndPoint)
        );

        await axios
          .post(APIManager.getURL(apiEndPoint), data, {
            headers: header,
            timeout: 60000,
          })
          .then(async (response: any) => {
            toggleLoader(false);

            if (response.status == 200) {
              APIManager.decryptData(response.data, async (data: any) => {
                try {
                  const decryptedData = JSON.parse(data);
                  console.log(
                    "\n===============Decrypted Data============\n",
                    decryptedData
                  );

                  if (decryptedData?.code === statusCode.userSessionExpire) {
                    console.log("============Session expired!=============");

                    MmkvManager.clearAllExcept([
                      MmkvManager.Keys.isOnBoardingVisisted,
                    ]);

                    navigation.dispatch(
                      CommonActions.reset({
                        index: 1,
                        routes: [{ name: "Login" }],
                      })
                    );
                  } else {
                    callback(decryptedData, null);
                  }
                } catch (e) {
                  console.warn(
                    "\n===============Error Parsing Data============\n",
                    e
                  );
                  callback(data, null);
                }
              });
            } else {
              callback(response.data, null);
            }
          })
          .catch(async (error: any) => {
            console.log("error =====> ", error);
            toggleLoader(false);

            callback(error, null);

            if (error.code === "ECONNABORTED") {
              // Handle timeout error
            } else if (error.response?.status == 401) {
              console.log("===============Unauthorized access!==============");

              MmkvManager.clearAllExcept([
                MmkvManager.Keys.isOnBoardingVisisted,
              ]);

              navigation.dispatch(
                CommonActions.reset({
                  index: 1,
                  routes: [{ name: "LoginContainer" }],
                })
              );
            } else if (error.response?.status === 400) {
              APIManager.decryptData(error.response?.data, (data: any) => {
                try {
                  const decryptedData = JSON.parse(data);
                  callback(decryptedData, null);
                } catch (e) {
                  console.warn(
                    "\n===============Error Parsing Data============\n",
                    e
                  );
                  callback(data, null);
                }
              });
            }
          });
      });
    });
  },

  postServerRequestWithToken: async ({
    apiEndPoint,
    callback,
    navigation,
    dictData,
    showLoader = true,
  }: ServerResponse): Promise<void> => {
    getConnection(async (internet: boolean | null) => {
      if (!internet) {
        toggleLoader(false);
        return console.log("No internet connection");
      }

      var header = await APIManager.getHeader();

      if (showLoader) {
        toggleLoader(true);
      }

      await MmkvManager.getData(
        MmkvManager.Keys.userToken,
        (userToken: any) => {
          console.log("======>", userToken);

          if (userToken) {
            let data = userToken;
            APIManager.encryptData(data, async (encryptedToken: any) => {
              let headerToken = {
                token: encryptedToken,
              };
              header = { ...header, ...headerToken };
              console.log("Header Token==>", headerToken);
            });
          } else {
            console.log("============Token Not Found=============");
          }
        }
      );

      APIManager.encryptData(JSON.stringify(dictData), async (data: any) => {
        console.log("\n==========Header==============\n", header);
        console.log("\n===============Parameters============\n", dictData);
        console.log(
          "\n===============Encrypted Parameters============\n",
          data
        );
        console.log(
          "\n==============END-POINT URL=================\n",
          APIManager.getURL(apiEndPoint)
        );

        await axios
          .post(APIManager.getURL(apiEndPoint), data, {
            headers: header,
            timeout: 60000,
          })
          .then(async (response: any) => {
            toggleLoader(false);

            if (response.status == 200) {
              APIManager.decryptData(response.data, async (data: any) => {
                try {
                  var decryptedData = JSON.parse(data);
                  console.log(
                    "\n===============Decrypted Data============\n",
                    decryptedData
                  );

                  if (decryptedData?.code == statusCode.userSessionExpire) {
                    console.log("Session expired!");

                    MmkvManager.clearAllExcept([
                      MmkvManager.Keys.isOnBoardingVisisted,
                    ]);

                    navigation.dispatch(
                      CommonActions.reset({
                        index: 1,
                        routes: [{ name: "LoginContainer" }],
                      })
                    );
                  } else {
                    callback(decryptedData, null);
                  }
                } catch (e) {
                  console.warn(
                    "\n===============Error Parsing Data============\n",
                    e
                  );
                  callback(decryptedData, null);
                }
              });
            } else {
              callback(response.data, null);
            }
          })
          .catch(async (error: any) => {
            console.log("error =====> ", error);
            toggleLoader(false);
            callback(error, null);

            if (error.code === "ECONNABORTED") {
              // Handle timeout error
            } else if (error.response?.status == 401) {
              console.log("============Unauthorized access!=============");

              MmkvManager.clearAllExcept([
                MmkvManager.Keys.isOnBoardingVisisted,
              ]);

              navigation.dispatch(
                CommonActions.reset({
                  index: 1,
                  routes: [{ name: "LoginContainer" }],
                })
              );
            }
          });
      });
    });
  },
};
