import { initializeApp } from "firebase/app";
import firebaseConfig from "./Firebase-confign";

const initiliazeAuthentication = () => {
    initializeApp(firebaseConfig);
}
export default initiliazeAuthentication;