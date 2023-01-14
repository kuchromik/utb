<script>
    import JobStore from '../stores/JobStore.js';
    import {createEventDispatcher} from 'svelte';
    import Button from '../shared/Button.svelte';

    let dispatch = createEventDispatcher();

    let fields = { customer: '', jobname: ''};
    let errors = { customer: '', jobname: ''};
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

        if (valid) {
            let job = {...fields, done: false, id: Math.random()};
            JobStore.update(currentJobs => {
                return [job, ...currentJobs];
            })
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