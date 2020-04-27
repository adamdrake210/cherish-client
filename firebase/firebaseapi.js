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

export function getRelationships(id) {
  return firestore.collection('relationship').where('peopleId', '==', id).get();
}

export function updatePerson(id, values) {
  return firestore
    .collection('people')
    .doc(id)
    .set({ ...values });
}

export function updateRelationship(id, values) {
  return firestore
    .collection('relationship')
    .doc(id)
    .set({ ...values });
}
