import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'

const firebaseConfig={
  apiKey: "AIzaSyCKCpxaXBsgGh4tX-R4C7Fl3LwasXmONx8",
  authDomain: "wordbook-48dcf.firebaseapp.com",
  projectId: "wordbook-48dcf",
  storageBucket: "wordbook-48dcf.appspot.com",
  messagingSenderId: "715638619722",
  appId: "1:715638619722:web:9110e563188c82e9c7b0b3"
}

const app=initializeApp(firebaseConfig)
const db=getFirestore(app)

export default db