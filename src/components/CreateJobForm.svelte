<script>
    import {createEventDispatcher} from 'svelte';
    import Button from '../shared/Button.svelte';

    import app from '../FireStore.js';

import {
getFirestore, collection, getDocs,
addDoc, deleteDoc, doc
} from 'firebase/firestore';

const db = getFirestore()
const colRef = collection(db, 'Jobs')

    let dispatch = createEventDispatcher();

    let fields = { customer: '', jobname: '', details: '', producer: ''};
    let errors = { customer: '', jobname: '', details: '', producer: ''};
    let valid = false;

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

        if (fields.producer.trim().length < 2) {
            valid = false;
            errors.producer = 'Produzent mindestens 2 Buchstaben';
        } else {
            errors.producer = '';
        }

        if (valid && fields.producer === 'chromik') {
            let job = {...fields, paper_ready: false, plates_ready: false, print_ready: false, invoice_ready: false, archiv: false };
            addDoc(colRef, job);
            dispatch('add');
            }       
         else if (valid) {
            let job = {...fields, invoice_ready: false, archiv: false };
            addDoc(colRef, job);
            dispatch('add');
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
        <input type="text" id="details" bind:value={fields.details}>
        <div class="error">{errors.details}</div>
    </div>
    <div class="form-field">
        <label for="producer">Produzent</label>
        <input type="text" id="producer" bind:value={fields.producer}>
        <div class="error">{errors.producer}</div>
    </div>
    <Button type="secondary" flat=true>Job registrieren</Button>
</form>

<style>
    form{
        width: 400px;
        margin: 0 auto;
        text-align: center;
    }
    .form-field{
        margin: 18px auto;
    }
    input{
        width: 100%;
        border-radius: 6px;
    }
    label{
        margin: 10px auto;
        text-align: left;
    }
    .error{
        font-weight: bold;
        font-size: 12px;
        color: #d91b42;
    }
</style>