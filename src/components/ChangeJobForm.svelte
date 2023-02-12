<script>
    export let id;
    import {createEventDispatcher} from 'svelte';
    import Button from '../shared/Button.svelte';
    export let onClose;

import {
getFirestore, collection, onSnapshot,
addDoc, doc, updateDoc
} from 'firebase/firestore';

const db = getFirestore();
const colRef = collection(db, 'Jobs');
const docRef = doc(db, 'Jobs', id);

let dispatch = createEventDispatcher();


let fields = { customer: '', jobname: '', details: '', producer: ''};
let errors = { customer: '', jobname: '', details: '', producer: ''};
let valid = false;



onSnapshot(docRef, (doc) => {
        let job = doc.data();
        
        fields.customer = job.customer;
        fields.jobname = job.jobname;
        fields.details = job.details;
        fields.producer = job.producer;
       })



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

        if (valid) {
           
            updateDoc(docRef, {...fields});
            dispatch('Kai');

            }
        }       
    
    const copyHandler = () => {

        let jobstart = new Date().getTime()/1000;
            
        if (fields.producer === 'chromik') {
            let job = {...fields, jobstart: jobstart, paper_ready: false, plates_ready: false, print_ready: false, shipped_ready: false, invoice_ready: false, archiv: false };
            addDoc(colRef, job);
            dispatch('Kai');
            }       
        else {
            let job = {...fields, jobstart: jobstart, shipped_ready: false, invoice_ready: false, archiv: false };
            addDoc(colRef, job);
            dispatch('Kai');
            }
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

<form on:submit|preventDefault={copyHandler}>
    <Button type="secondary" flat={false}>Job kopieren</Button>
</form>




<style>
    form{
        width: 600px;
        margin: 0 auto;
        padding: 3px;
        text-align: center
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