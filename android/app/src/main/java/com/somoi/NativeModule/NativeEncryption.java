package com.somoi.NativeModule;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class NativeEncryption extends ReactContextBaseJavaModule {


    public NativeEncryption(@NonNull ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @NonNull
    @Override
    public String getName() {
        return "NativeEncryption";
    }

    @ReactMethod
    public void encryptData(String key,String iv, String data , Callback cb){

        try {
            cb.invoke(null,new CryptLib().encryptPlainText(data,key,iv));
        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    @ReactMethod
    public void decryptData(String key,String iv, String data , Callback cb){

        try {
            cb.invoke(null,new CryptLib().decryptCipherText(data,key,iv));
        } catch (Exception e) {
            e.printStackTrace();
        }

    }
}
