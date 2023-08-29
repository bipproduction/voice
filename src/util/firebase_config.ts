// firebaseConfig.js
import { FirebaseApp, getApp, getApps, initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
    apiKey: "AIzaSyB3KkKwIhSQtCwnYz1f0tv4W2Mz-hfuxME",
    authDomain: "bip-server.firebaseapp.com",
    databaseURL: "https://bip-server-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "bip-server",
    storageBucket: "bip-server.appspot.com",
    messagingSenderId: "333414414928",
    appId: "1:333414414928:web:d960fc1b539f0556b7af55",
    measurementId: "G-EGT4P6E9T5"
};

var app: FirebaseApp;
if (!getApps().length) {
    app = initializeApp(firebaseConfig);
} else {
    app = getApp()
}

const fdb = getDatabase(app)
export default fdb;