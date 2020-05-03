import { firestore } from './firebase';

export function addPerson(values) {
  return firestore.collection('people').add(values);
}

export function addRelationship(values) {
  return firestore.collection('relationship').add(values);
}

export function getPerson(id) {
  return firestore.collection('people').doc(id).get();
}

export function getPeople(id, callback) {
  return firestore
    .collection('people')
    .where('userId', '==', id)
    .onSnapshot(callback);
}

export function getRelationships(id, callback) {
  return firestore
    .collection('relationship')
    .where('peopleId', '==', id)
    .onSnapshot(callback);
}

export function updatePerson(id, values) {
  return firestore
    .collection('people')
    .doc(id)
    .set({ ...values }, { merge: true });
}

export function updateRelationship(id, values) {
  return firestore
    .collection('relationship')
    .doc(id)
    .set({ ...values }, { merge: true });
}
