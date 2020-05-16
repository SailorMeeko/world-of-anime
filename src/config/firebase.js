import * as firebase from 'firebase';

// const firebaseConfig = {
//     apiKey: process.env.FIREBASE_API_KEY || functions.config().woa.firebaseapikey,
//     authDomain: process.env.FIREBASE_AUTH_DOMAIN || functions.config().woa.firebaseauthdomain,
//     databaseURL: process.env.FIREBASE_DATABASE_URL || functions.config().woa.firebasedatabaseurl,
//     projectId: process.env.FIREBASE_PROJECT_ID || functions.config().woa.firebaseprojectid,
//     storageBucket: process.env.FIREBASE_STORAGE_BUCKET || functions.config().woa.firebasestoragebucket,
//     messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || functions.config().woa.firebasemessagingsenderid,
//     appId: process.env.FIREBASE_APP_ID || functions.config().woa.firebaseappid
// };

// const firebaseConfig = {
//     apiKey: process.env.FIREBASE_API_KEY,
//     authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//     databaseURL: process.env.FIREBASE_DATABASE_URL,
//     projectId: process.env.FIREBASE_PROJECT_ID,
//     storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
//     messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
//     appId: process.env.FIREBASE_APP_ID
// };

const firebaseConfig = {
    apiKey: "AIzaSyDq1TJpo6-KuLt79EPzUW1MUNVfjmGQE5Q",
    authDomain: "world-of-anime-dev.firebaseapp.com",
    databaseURL: "https://world-of-anime-dev.firebaseio.com",
    projectId: "world-of-anime-dev",
    storageBucket: "world-of-anime-dev.appspot.com",
    messagingSenderId: "317780754877",
    appId: "1:317780754877:web:3164a1c1e1b81d30d652d4"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const database = firebase.database();

export { firebase, database as default };