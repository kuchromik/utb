import {writable} from 'svelte/store';

import {initializeApp} from 'firebase/app';
import {
	getFirestore, collection, getDocs,
	addDoc, deleteDoc, doc
} from 'firebase/firestore'

let JobStore = writable([
    {
        id: 1,
        customer: 'Giraffe',
        jobname: 'Visitenkarten',
        done: false,
    },
]);

const firebaseConfig = {
	apiKey: "AIzaSyAqyjlZ5YpOfDLeVeO1x4PhrKoW3Dt4weg",
	authDomain: "codutb-38c1e.firebaseapp.com",
	projectId: "codutb-38c1e",
	storageBucket: "codutb-38c1e.appspot.com",
	messagingSenderId: "228280904290",
	appId: "1:228280904290:web:cd6f13b2d4ca4c2843bf3b"
  };

  initializeApp(firebaseConfig);

  const db = getFirestore()

  const colRef = collection(db, 'Jobs')

getDocs(colRef)
  .then((snapshot) => {
	 let jobs = []
	 snapshot.docs.forEach((doc) => {
		jobs.push({ ...doc.data(), id: doc.id })
	 })
     console.log(jobs)
  })
  .catch(err => {
	console.log(err.message)
  })

export default JobStore;