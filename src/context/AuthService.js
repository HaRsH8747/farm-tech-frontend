// src/AuthService.js
import { firestore, auth } from './firebase.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const signUp = async (email, password, userName) => {
    // Create user with email and password
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
  
    // Add user details in Firestore
    await setDoc(doc(firestore, "users", user.uid), {
      userName: userName,
      email: email
    });
  
    return user; // Returning the user might be useful for further actions
  };

const signIn = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

const logOut = () => {
  return signOut(auth);
};

export { signUp, signIn, logOut };