package com.somoi.NativeModule;


import androidx.annotation.NonNull;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.somoi.NativeModule.NativeEncryption;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class EncryptionPackage implements ReactPackage {
    @NonNull
    @Override
    public List<NativeModule> createNativeModules(@NonNull ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();
        //We import the module file here
        modules.add(new NativeEncryption(reactContext));

        return modules;
    }

    @NonNull
    @Override
    public List<ViewManager> createViewManagers(@NonNull ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }

    // Backward compatibility
    public List<Class<? extends JavaScriptModule>> createJSModules() {
        return new ArrayList<>();
    }
}
