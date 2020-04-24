import { firestore } from './firebase';

export function addPerson(values) {
  return firestore.collection('people').add(values);
}

export function addRelationship(values) {
  return firestore.collection('relationship').add(values);
}
