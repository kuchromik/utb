<script>
    export let id;
    import {createEventDispatcher} from 'svelte';
    import Button from '../shared/Button.svelte';
    import {onDestroy } from 'svelte';
    export let onClose;

    import app from '../FireStore.js';

import {
getFirestore, collection, getDocs, onSnapshot,
addDoc, deleteDoc, doc, updateDoc, getDoc
} from 'firebase/firestore';


let fields = { customer: '', jobname: '', details: '', producer: ''};

const db = getFirestore();
const colRef = collection(db, 'Jobs');
const docRef = doc(db, 'Jobs', id);

onSnapshot(docRef, (doc) => {
        let job = doc.data();
        
        fields.customer = job.customer;
        fields.jobname = job.jobname;
        fields.details = job.details;
        fields.producer = job.producer;
       })

let dispatch = createEventDispatcher();

const copyHandler = () => {

        let today = new Date();
        let d = today.getDate();
        let m = today.getMonth() + 1;
        let y = today.getFullYear();
        let jobstart = d + "." + m + "." + y;
    
        if (fields.producer === 'chromik') {
            let job = {...fields, jobstart: jobstart, paper_ready: false, plates_ready: false, print_ready: false, shipped_ready: false, invoice_ready: false, archiv: false };
            addDoc(colRef, job);
            dispatch('add');
            }       
         else {
            let job = {...fields, jobstart: jobstart, shipped_ready: false, invoice_ready: false, archiv: false };
            addDoc(colRef, job);
            dispatch('add');
            }
           
    
        const breakHandler = () => {
        
            dispatch('add');

            }
        }        
    
</script>

<form on:submit|preventDefault={copyHandler}>
    <Button type="secondary" flat={false}>Anlegen</Button>
</form>

