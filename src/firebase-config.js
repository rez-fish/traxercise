import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyBC18x20Lojo5dMmwrw7ZnXiNwWxyd-VhE',
  authDomain: 'fir-crud-d052e.firebaseapp.com',
  projectId: 'fir-crud-d052e',
  storageBucket: 'fir-crud-d052e.appspot.com',
  messagingSenderId: '285261656839',
  appId: '1:285261656839:web:d03605d6a758094f860ba2',
  measurementId: 'G-QFL796F159',
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
