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

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef= firestore.collection(collectionKey);
    console.log(collectionRef);

    const batch = firestore.batch();
    objectsToAdd.forEach(obj => {
        const newDocRef= collectionRef.doc();
        batch.set(newDocRef, obj);
    });

    return await batch.commit()
};

export const convertCollectionsSnapshotToMap = (collections) => {
    const transformedCollection = collections.docs.map(doc => {
        const {title, items} = doc.data();
        return{
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items
        }
    });

    return transformedCollection.reduce((accumulator, collection)=>{
        accumulator[collection.title.toLowerCase()]=collection;
        return accumulator;
    }, {})
};

firebase.initializeApp(config);

export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged(userAuth=>{
            unsubscribe();
            resolve(userAuth)
        }, reject)
    })
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;