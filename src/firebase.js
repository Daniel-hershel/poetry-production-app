import { initializeApp } from 'firebase';
const firebaseApp = initializeApp({
    apiKey: "AIzaSyDvZ4Aabtx6WE7k3w39oIu0VjjVhTTjn-o",
    authDomain: "poetry-production.firebaseapp.com",
    databaseURL: "https://poetry-production.firebaseio.com",
    projectId: "poetry-production",
    storageBucket: "",
    messagingSenderId: "348163551644",
    appId: "1:348163551644:web:8686addd5a43fe48"
  });
  export const db = firebaseApp.firestore();

  export const poems = db.collection('poems');