import { firebaseApp } from "../../firebase/firebaseConfig";
import { getAuth, getRedirectResult, GoogleAuthProvider, signInWithRedirect } from "firebase/auth";

export const auth = getAuth(firebaseApp);

export const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  return signInWithRedirect(auth, provider);
};

export const getGoogleRedirectResult = () => {
  return getRedirectResult(auth);
};

export const signOut = () => {
  return auth.signOut();
};
