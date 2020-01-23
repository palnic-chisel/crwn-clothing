import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBTk0UPjHFbwrcw6pHlHZ0cHoDhk2b-CSU",
    authDomain: "crwn-db-b4f95.firebaseapp.com",
    databaseURL: "https://crwn-db-b4f95.firebaseio.com",
    projectId: "crwn-db-b4f95",
    storageBucket: "crwn-db-b4f95.appspot.com",
    messagingSenderId: "523112683319",
    appId: "1:523112683319:web:6a7e5060c759880794acb2",
    measurementId: "G-D6TNM66MM8"
};

export const createUserProfileDocument = async(userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShop = await userRef.get();

    if(!snapShop.exists){
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await  userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        }catch (e) {
            console.log('error creating user ', e.message);
        }

    }
    return userRef;
};


firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;