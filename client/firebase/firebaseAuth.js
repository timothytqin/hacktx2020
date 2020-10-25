import { auth, db } from './firebase';

export const login = (email, password) => {
  return auth.signInWithEmailAndPassword(email, password);
};

export const signup = (email, password) => {
  return auth.createUserWithEmailAndPassword(email, password);
};

export const createUser = (uid, name) => {
  return db.doc(`users/${uid}`).set({ name, tokens: 10 });
};

export const getUser = (uid) => {
  return db
    .doc(`users/${uid}`)
    .get()
    .then((res) => res.data());
};
