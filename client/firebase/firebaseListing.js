import { auth, db } from './firebase';

export const  add_listing= (data) => {
  return db.collection(`listings`).add(data);
};