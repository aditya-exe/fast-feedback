import {db} from "./firebase";
import {doc, setDoc} from "@firebase/firestore";

export const createUser = (uid: string, data: any) => {
  return setDoc(doc(db, "users", uid), {uid, ...data}, );
}