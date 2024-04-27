// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
//   apiKey: import.meta.env.VITE_FIREBSAE_API_KEY,
  apiKey: "AIzaSyBdmz3t8ib-WYWJ380-_gfD0-OWiHhWJOU",
  authDomain: "mern-stack-project-1-estate.firebaseapp.com",
  projectId: "mern-stack-project-1-estate",
  storageBucket: "mern-stack-project-1-estate.appspot.com",
  messagingSenderId: "160362485501",
  appId: "1:160362485501:web:26c7bde2004437f7ba9094"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);