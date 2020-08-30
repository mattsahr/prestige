import { makeField, makeKey } from '../../secretKeys';
import network from './network';

const networkInit = (function () {
    var firebase = null; // = window.firebase; -- replaced when firebase app is loaded
    var Fingerprint2 = null; // = window.Fingerprint2; -- replaced when Fingerprint2 is async loaded
    var DataStore = {};

    var firebaseInit = function () {

        var config = {
            authDomain: "prestige-2d2e3.firebaseapp.com",
            databaseURL: "https://prestige-2d2e3.firebaseio.com",
            projectId: "prestige-2d2e3",
            storageBucket: "prestige-2d2e3.appspot.com",
            messagingSenderId: "151282983031",
            appId: "1:151282983031:web:a05d767f7a5880b6216672"
        };

        config[makeField()] = makeKey();
        firebase.initializeApp(config);
        network.init(firebase.firestore(), DataStore);
    };

    var loadFile = function (fileName, callback) {

        var fileRequest = document.createElement('script');
        fileRequest.setAttribute('type', 'text/javascript');
        fileRequest.setAttribute('src', fileName);
        fileRequest.setAttribute('async', true);
        if (callback) {
            fileRequest.onload = callback;
        }

        document.getElementsByTagName('head')[0].appendChild(fileRequest);
    };

    const loadScripts = (() => {
 
        const loadFirebase = () => {
            
            const FIREBASE_MAIN_APP = 'https://www.gstatic.com/firebasejs/7.14.2/firebase-app.js';
            const FIREBASE_FIRESTORE = 'https://www.gstatic.com/firebasejs/7.18.0/firebase-firestore.js';
            const firebaseLoaded = () => {
                firebase = window.firebase;
                firebaseInit();
            };
            
            const phase02 = () => {
                loadFile(FIREBASE_FIRESTORE, firebaseLoaded);
            };
            
            loadFile(FIREBASE_MAIN_APP, phase02);
            
        };
        
        const getFingerprint = () => {
            Fingerprint2 = window.Fingerprint2;

            const options = {
                 excludes: {
                    userAgent: true, 
                    language: true,
                    webdriver: true,
                    colorDepth: true,
                    deviceMemory: true,
                    pixelRatio: true,
                    hardwareConcurrency: true,
                    screenResolution: true,
                    availableScreenResolution: true,
                    timezoneOffset: true,
                    timezone: true,
                    sessionStorage: true,
                    localStorage: true,
                    indexedDb: true,
                    addBehavior: true,
                    openDatabase: true,
                    cpuClass: true,
                    platform: true,
                    doNotTrack: true,
                    webgl: true,
                    webglVendorAndRenderer: true,
                    adBlock: true,
                    hasLiedLanguages: true,
                    hasLiedResolution: true,
                    hasLiedOs: true,
                    hasLiedBrowser: true,
                    touchSupport: true,
                    fonts: true,
                    fontsFlash: true,
                    audio: true,
                    enumerateDevices: true
                 }
            };
        
            const fingerprintResults = components => {
                var canvas = null;
                var plugins = null;
        
                components.forEach(component => { 
                    if (component.key === 'canvas') { canvas = JSON.stringify(component.value); }
                    if (component.key === 'plugins') { plugins = JSON.stringify(component.value); }
                });
                var fingerprint = canvas + plugins;
                DataStore.localPlayerHashId = Fingerprint2.x64hash128(fingerprint, 31);
        
                /*
                console.groupCollapsed('FINGERPRINT');
                console.log(DataStore.localPlayerHashId, components);
                console.groupEnd();
                */
            };
            
            
            setTimeout(() => {
                Fingerprint2.get(options, fingerprintResults);
            }, 100);
        
        };
        
        const success = () => {
            getFingerprint();
            loadFirebase();
        };
        
        return () => { loadFile('js/fingerprint2-min.js', success); };
    })();

    return loadScripts;

})();

export default networkInit;
