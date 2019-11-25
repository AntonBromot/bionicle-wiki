package com.bromotec;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;

public class Bulb extends ReactContextBaseJavaModule  {
    private static Boolean isOn = false;

    public Bulb(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @ReactMethod
    public void getStatus( Callback successCallback ) {
        successCallback.invoke(isOn);
    }

    @ReactMethod
    public void toggleOn( Callback successCallback ) {
        isOn = !isOn;
        System.out.println("Bulb is toggle");
        successCallback.invoke(isOn);
    }

    @Override
    public String getName() {
        return "Bulb";
    }

}