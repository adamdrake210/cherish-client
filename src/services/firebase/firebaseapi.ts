import { db } from './firebase';
import {
  collection,
  doc,
  addDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';

const enum DbNames {
  PEOPLE = 'people',
  RELATIONSHIP = 'relationship',
}

export async function addPerson(values) {
  return await addDoc(collection(db, DbNames.PEOPLE), values);
}

export async function addRelationship(values) {
  return await addDoc(collection(db, DbNames.RELATIONSHIP), values);
}

export async function getPerson(id) {
  return await getDoc(doc(db, DbNames.PEOPLE, id));
}

export async function getPeople(id, callback) {
  const q = await query(
    collection(db, DbNames.PEOPLE),
    where('userId', '==', id),
  );
  return await onSnapshot(q, callback);

  // return firestore
  //   .collection('people')
  //   .where('userId', '==', id)
  //   .onSnapshot(callback);
}

export async function getRelationships(id, idType, callback) {
  const q = await query(
    collection(db, DbNames.RELATIONSHIP),
    where(idType, '==', id),
  );

  return await onSnapshot(q, callback);

  // return firestore
  //   .collection('relationship')
  //   .where(idType, '==', id)
  //   .onSnapshot(callback);
}

export async function updatePerson(id, values) {
  const peopleRef = doc(db, DbNames.PEOPLE, id);
  return await updateDoc(peopleRef, { ...values }, { merge: true });

  // return firestore
  //   .collection('people')
  //   .doc(id)
  //   .set({ ...values }, { merge: true });
}

export async function updateRelationship(id, values) {
  const relationshipRef = doc(db, DbNames.RELATIONSHIP, id);
  return await updateDoc(relationshipRef, { ...values }, { merge: true });

  // return firestore
  //   .collection('relationship')
  //   .doc(id)
  //   .set({ ...values }, { merge: true });
}

export async function deleteDocument(id, collection) {
  return await deleteDoc(doc(db, collection, id));
}
