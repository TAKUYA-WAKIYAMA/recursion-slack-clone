import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { firebaseApp } from "../../firebase/firebaseConfig";
import { User } from "../../type/User";

const db = getFirestore(firebaseApp);

export const getUser = async (user_uid: string) => {
  const usersRef = doc(db, "users", user_uid);
  const docSnap = await getDoc(usersRef);
  if (docSnap.exists()) {
    return docSnap.data() as User;
  }
};

export const createUser = async (user_uid: string, user: User) => {
  const usersRef = doc(db, "users", user_uid);
  await setDoc(usersRef, user);
  return user;
};

export const getOrCreateUser = async (user_uid: string, user: User) => {
  const existing = await getUser(user_uid);
  if (existing) {
    return existing;
  }
  return await createUser(user_uid, user);
};
