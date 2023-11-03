// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from "@firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCQnGi4hpqQYTBn6_f5IGKSQPvIgJUMxH8",
    authDomain: "brain-c8269.firebaseapp.com",
    projectId: "brain-c8269",
    storageBucket: "brain-c8269.appspot.com",
    messagingSenderId: "649048839077",
    appId: "1:649048839077:web:02ae30540583739249ce4c",
    measurementId: "G-0H082T60K2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getStorage(app);