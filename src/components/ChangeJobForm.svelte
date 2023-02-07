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
let errors = { customer: '', jobname: '', details: '', producer: ''};
let valid = false;

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


/*
    fields.customer = job.customer;
    fields.jobname = job.jobname;
    fields.details = job.details;
    fields.producer = job.producer;
*/
    const submitHandler = () => {
        valid = true;

        if (fields.customer.trim().length < 2) {
            valid = false;
            errors.customer = 'Kunde mindestens zwei Buchstaben';
        } else {
            errors.customer = '';
        }

        if (fields.jobname.trim().length < 5) {
            valid = false;
            errors.jobname = 'Auftrag mindestens 5 Buchstaben';
        } else {
            errors.jobname = '';
        }

        if (fields.details.trim().length < 5) {
            valid = false;
            errors.details = 'Details mindestens 5 Buchstaben';
        } else {
            errors.details = '';
        }
        /* ausgesetzt, da Feld zunächst leer bleiben darf
        if (fields.producer.trim().length < 0) {
            valid = false;
            errors.producer = 'Produzent mindestens 0 Buchstaben';
        } else {
            errors.producer = '';
        } */

        if (valid) {
           
            updateDoc(docRef, {...fields});
            dispatch('add');

            }
        }       
    
        const breakHandler = () => {
        
            dispatch('add');

            }
            
    
</script>

<form on:submit|preventDefault={submitHandler}>
    <div class="form-field">
        <label for="customer">Kunde</label>
        <input type="text" id="customer" bind:value={fields.customer}>
        <div class="error">{errors.customer}</div>
    </div>
    <div class="form-field">
        <label for="jobname">Auftrag</label>
        <input type="text" id="jobname" bind:value={fields.jobname}>
        <div class="error">{errors.jobname}</div>
    </div>
    <div class="form-field">
        <label for="details">Details</label>
       
        <textarea name="textarea" rows="5" cols="80" id="details" bind:value={fields.details}></textarea>
        <div class="error">{errors.details}</div>
    </div>
    <div class="form-field">
        <label for="producer">Produzent</label>
        <input type="text" id="producer" bind:value={fields.producer}>
        <div class="error">{errors.producer}</div>
    </div>
    <Button on:click={onClose} type="primary" flat={false}>Abbrechen</Button>
    <Button type="secondary" flat={false}>Job ändern</Button>
</form>


<style>
    form{
        width: 600px;
        margin: 0 auto;
        text-align: center;
    }
    .form-field{
        margin: 18px auto;
        border: solid 2px crimson;
        background-color: lightgray;
        border-radius: 6px;
    }
    input, textarea {
        width: 95%;
        border-radius: 6px;
        margin: 10px;
    }

    label{
        margin: 10px;
        text-align: left;
    }
    .error{
        font-weight: bold;
        font-size: 12px;
        color: #d91b42;
    }
</style>