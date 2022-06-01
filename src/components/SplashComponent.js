import React,{Component} from 'react';
import {
  View,
  Image,
  Platform,
  NativeModules,
  PermissionsAndroid  
} from 'react-native';
//
import Flurry from 'react-native-flurry-sdk';
//
import * as global from '../styles/Global';
import * as Utils from '../utils/Utils';
import FastImage from 'react-native-fast-image';
import {connect} from 'react-redux';
import {setToken} from '../redux/actions/SetTokenActions';
import {setLatitude,setLongitude,setCityData} from '../redux/actions/SetLatLongAction';
import {setCartCounter} from '../redux/actions/cartCounterAction';
import {setLanguageCode} from '../redux/actions/SetLanguageCodeAction';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
//
import DefaultPreference from 'react-native-default-preference';
import { StackActions,NavigationActions } from 'react-navigation';
//
import Geolocation from '@react-native-community/geolocation';
//
import Geocoder from 'react-native-geocoder';
//
var currentToken='1'
var cartCounterValue=0
var languageCode='en'

class SplashComponent extends Component{

  constructor(props){
    super(props)
    //alert('test')    
    //this.getNetworkBandwidth();
    //
    const deviceLanguage =
          Platform.OS === 'ios'
            ? NativeModules.SettingsManager.settings.AppleLocale ||
              NativeModules.SettingsManager.settings.AppleLanguages[0] //iOS 13
            : NativeModules.I18nManager.localeIdentifier;
    //
    this.settingFlurryData()
    //
    // this.props.setLatitude('18.4872° N')
    // this.props.setLongitude('73.7907° E')
    // this.props.setCityData('Ahmedabad')
    //
    // alert(JSON.stringify(this.props.setLatitude('18.4872° N')))
    // alert(JSON.stringify(this.props.setLongitude('73.7907° E')))
    // this.permissonFunction();
    RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
      interval: 10000,
      fastInterval: 5000,
    })
      .then((data) => {
        // that.callLocation(data);
        this.permissonFunction();
        console.log('DataLoc==>',JSON.stringify(data))
      })
      .catch((err) => {
        console.log('Error==>',JSON.stringify(err))
        alert('Turn ON your GPS while using the App')
      });
  }

  

    settingFlurryData=()=>{
        //
        // Flurry.getVersions().then((versions) => {
        //   //alert('Versions: ' + versions.agentVersion + ' : ' + versions.releaseVersion + ' : ' + versions.sessionId);
        // });
        //
        //Flurry.setAge(36);
      //  Flurry.setGender(Flurry.Gender.FEMALE);
        Flurry.setReportLocation(true);
        Flurry.setUserId('1');
        Flurry.setDataSaleOptOut(true);
        Flurry.UserProperties.set('userToken','123')
        Flurry.UserProperties.set('userName','test')
        Flurry.UserProperties.set('userEmailId','test70506@gmail.com')
        // Set user properties.
        Flurry.UserProperties.set(Flurry.UserProperties.PROPERTY_REGISTERED_USER, 'True');

        // Log Flurry events.
        // Flurry.logEvent('React Native Event');
        // Flurry.logEvent('React Native Timed Event', {param: 'true'}, true);
        // Flurry.endTimedEvent('React Native Timed Event');
    }

    performTimeConsumingTask = async() => {
      return new Promise((resolve) =>
        setTimeout(
          () => { resolve('result') },
          4000
        )
      );
    }

    getCityNameFromLatLong=(that,latitude,longitude)=>{
      //
      // alert(latitude)
      // alert(longitude)
      // fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng='+latitude+','+longitude+'&key='+googleMapKey, {
      //       method: 'GET'
      // })
      // .then((response) => JSON.stringify(response))
      // .then((responseJson) => {
      //     //Success
      //     // alert('City '+JSON.stringify(responseJson))
      //     that.props.setCityData(responseJson.plus_code.compound_code.split(',')[0].split(' ')[1])
      //     //
      // })
      // .catch((error) => {
      //   // alert(error)
      //   console.log('City error '+JSON.stringify(error));
      // });
      //
      if(longitude!='' && latitude!=''){
         //alert(latitude+' '+longitude)
      Geocoder.geocodePosition({lat:parseFloat(latitude),lng:parseFloat(longitude)}).then(res => {             
                that.props.setCityData(res[0].locality)
                // that.props.setCityData('Pointe-Noire')
            })
            .catch(err => console.log(err))
       }
    }
    permissonFunction(){
                  var that=this;
                  if(Platform.OS === 'android'){
                    requestLocationPermission=async()=>{
                        try {

                          // await PermissionsAndroid.requestMultiple(
                          //   [PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                          //     PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION]).then((result)=>{

                          //         if(result['android.permission.ACCESS_COARSE_LOCATION']
                          //         && result['android.permission.CAMERA'] == 'granted'){
                          //           alert('if called')
                          //         }else{
                          //           alert('else called')
                          //         }

                          //     });
                                const granted = await PermissionsAndroid.request(
                                  PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,{
                                    'title': 'Location Access Required',
                                    'message': 'This App needs to Access your location'
                                  })
                                // alert(JSON.stringify(granted))
                                if (granted === PermissionsAndroid.RESULTS.GRANTED) {                                    
                                    that.callLocation(that);
                                }else{
                                  requestLocationPermission();
                                }
                            } catch (err) {
                              // alert(JSON.stringify(err))
                                console.warn(err)
                           }
                        }
                    requestLocationPermission();
                  }else{
                    this.callLocation(that);
                 }
            }
          //
        callLocation(that){
            //
            try {
                Geolocation.getCurrentPosition(info =>{
                    //
                    // alert(info.coords.latitude);
                    that.props.setLatitude(info.coords.latitude)
                    that.props.setLongitude(info.coords.longitude)
                    // that.props.setLatitude('4.7692')
                    // that.props.setLongitude('11.8664')
                    // that.props.setCityData('Ahmedabad')
                    that.getCityNameFromLatLong(that,info.coords.latitude,info.coords.longitude)
                    // that.getCityNameFromLatLong(that,'23.0208241','72.50863950000002')
                    //
                  },(error) => {
                      //requestLocationPermission();
                     //alert((JSON.stringify(error)))
                     console.log((JSON.stringify(error)))
                  },
                  {
                    enableHighAccuracy: false,
                    timeout : 5000,
                    // maximumAge: 1000,
                    showLocationDialog: true
                  }
                );
            }catch (err) {
              
              console.log(err)
          }
       }

    async componentDidMount() {
      //
      var that = this
      //
      DefaultPreference.get('userToken').then(function(value) {
        currentToken = value
        return value;
      });
      DefaultPreference.get('cartCounterValue').then(function(value) {
        cartCounterValue = value
        return value;
      });
      DefaultPreference.get('changeLanguage').then(function(value) {
        //
        if(value==null){
          languageCode = (deviceLanguage.split('_')[0]==='fr')?'fr':'en'
        }else{
          languageCode = value
        }
        return value;
      });
      //

      //
      const data = await this.performTimeConsumingTask();
      //
      if (data !== null) {
        const {navigate} = this.props.navigation;
        //
        this.props.setCartCounter((cartCounterValue==undefined)?0:cartCounterValue)
        this.props.setToken(currentToken)
        this.props.setLanguageCode(languageCode)
        //
        DefaultPreference.get('isLogin')
        .then(function(value) { 
          //alert(value)
          if(value == undefined){
            //
            const deviceLanguage =
                  Platform.OS === 'ios'
                    ? NativeModules.SettingsManager.settings.AppleLocale ||
                      NativeModules.SettingsManager.settings.AppleLanguages[0] //iOS 13
                    : NativeModules.I18nManager.localeIdentifier;
            navigate('Login',{languageCode:(deviceLanguage.split('_')[0]=='fr')?"1":"0"});
          }else{
            navigate('Dashboard');
          }
        })
      }
    }

    

  render(){
    return(
      <View style={{flexGrow:1}}>
          <Image  source={require('../../images/backgrounds/splash.png')}
                 style={{flex:1 , width: undefined, height: undefined}}/>
      </View>
    );
  }
}

mapStateToProps=state=>{
  return{
     splashData:state
  }
}

export default connect(mapStateToProps,{setToken,setCartCounter,setLanguageCode,setLatitude,setLongitude,setCityData})(SplashComponent);
