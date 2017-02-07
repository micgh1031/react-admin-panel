import firebase from 'firebase'
//import {config} from '../config.js'

firebase.database.enableLogging(true, true)
var config = {
    apiKey: "",
    databaseURL: "https://example.firebaseio.com"
};

firebase.initializeApp(config);

export const ref = firebase.database().ref()
export const auth = firebase.auth()
