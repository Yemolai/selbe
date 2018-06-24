import firebase from 'firebase/app';
import 'firebase/database';
import { FIREBASE_CONFIG } from './config/keys.js';

firebase.initializeApp(FIREBASE_CONFIG);

const databaseRef = firebase.database().ref();
export const postsRef = databaseRef.child('posts');