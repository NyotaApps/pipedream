
package com.facebook.react;

import android.app.Application;
import android.content.Context;
import android.content.res.Resources;

import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import java.util.Arrays;
import java.util.ArrayList;

import com.nyota.BuildConfig;
import com.nyota.R;

// @react-native-community/geolocation
import com.reactnativecommunity.geolocation.GeolocationPackage;
// @react-native-community/netinfo
import com.reactnativecommunity.netinfo.NetInfoPackage;
// react-native-android-location-enabler
import com.heanoria.library.reactnative.locationenabler.RNAndroidLocationEnablerPackage;
// react-native-camera-kit
import com.wix.RNCameraKit.RNCameraKitPackage;
// react-native-default-preference
import com.kevinresol.react_native_default_preference.RNDefaultPreferencePackage;
// react-native-fast-image
import com.dylanvann.fastimage.FastImageViewPackage;
// react-native-fbsdk
import com.facebook.reactnative.androidsdk.FBSDKPackage;
// react-native-firebase
import io.invertase.firebase.RNFirebasePackage;
// react-native-flurry-sdk
import com.flurry.android.reactnative.FlurryPackage;
// react-native-geocoder
import com.devfd.RNGeocoder.RNGeocoderPackage;
// react-native-gesture-handler
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
// react-native-image-picker
import com.imagepicker.ImagePickerPackage;
// react-native-image-resizer
import fr.bamlab.rnimageresizer.ImageResizerPackage;
// react-native-localization
import com.babisoft.ReactNativeLocalization.ReactNativeLocalizationPackage;
// react-native-share
import cl.json.RNSharePackage;
// react-native-vector-icons
import com.oblador.vectoricons.VectorIconsPackage;
// react-native-webview
import com.reactnativecommunity.webview.RNCWebViewPackage;
// rn-fetch-blob
import com.RNFetchBlob.RNFetchBlobPackage;
// rn-range-slider
import com.ashideas.rnrangeslider.RangeSliderPackage;

public class PackageList {
  private Application application;
  private ReactNativeHost reactNativeHost;
  public PackageList(ReactNativeHost reactNativeHost) {
    this.reactNativeHost = reactNativeHost;
  }

  public PackageList(Application application) {
    this.reactNativeHost = null;
    this.application = application;
  }

  private ReactNativeHost getReactNativeHost() {
    return this.reactNativeHost;
  }

  private Resources getResources() {
    return this.getApplication().getResources();
  }

  private Application getApplication() {
    if (this.reactNativeHost == null) return this.application;
    return this.reactNativeHost.getApplication();
  }

  private Context getApplicationContext() {
    return this.getApplication().getApplicationContext();
  }

  public ArrayList<ReactPackage> getPackages() {
    return new ArrayList<>(Arrays.<ReactPackage>asList(
      new MainReactPackage(),
      new GeolocationPackage(),
      new NetInfoPackage(),
      new RNAndroidLocationEnablerPackage(),
      new RNCameraKitPackage(),
      new RNDefaultPreferencePackage(),
      new FastImageViewPackage(),
      new FBSDKPackage(),
      new RNFirebasePackage(),
      new FlurryPackage(),
      new RNGeocoderPackage(),
      new RNGestureHandlerPackage(),
      new ImagePickerPackage(),
      new ImageResizerPackage(),
      new ReactNativeLocalizationPackage(),
      new RNSharePackage(),
      new VectorIconsPackage(),
      new RNCWebViewPackage(),
      new RNFetchBlobPackage(),
      new RangeSliderPackage()
    ));
  }
}
