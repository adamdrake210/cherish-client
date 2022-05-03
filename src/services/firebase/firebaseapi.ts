import { db } from './firebase';
import {
  collection,
  doc,
  addDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  getDocs,
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

export async function getPeople(id) {
  const q = await query(
    collection(db, DbNames.PEOPLE),
    where('userId', '==', id),
  );
  return await getDocs(q);
}

export async function getRelationships(id, idType) {
  const q = await query(
    collection(db, DbNames.RELATIONSHIP),
    where(idType, '==', id),
  );

  return await getDocs(q);
}

export async function updatePerson(id, values) {
  const peopleRef = doc(db, DbNames.PEOPLE, id);
  return await updateDoc(peopleRef, { ...values }, { merge: true });
}

export async function updateRelationship(id, values) {
  const relationshipRef = doc(db, DbNames.RELATIONSHIP, id);
  return await updateDoc(relationshipRef, { ...values }, { merge: true });
}

export async function deleteDocument(id, collection) {
  return await deleteDoc(doc(db, collection, id));
}
