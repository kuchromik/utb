<script>
    export let job;
    import Button from '../shared/Button.svelte';
    import ChangeJobForm from './ChangeJobForm.svelte'
    

    import app from '../FireStore.js';

    import {
    getFirestore, collection, getDocs,
    addDoc, deleteDoc, doc, updateDoc
    } from 'firebase/firestore';

    const handleAdd = (e) => {
		
		activeItem = 'Aktuell';

	}

    const db = getFirestore();
   
    let paper_ready = job.paper_ready;
    let plates_ready = job.plates_ready;
    let print_ready = job.print_ready;
    let invoice_ready = job.invoice_ready;
    let producer = job.producer;
  
    let changemod = false;

    const handleClick = (check, id) => {
        
        const docRef = doc(db, 'Jobs', id);

        if (check === 'paper') {
            updateDoc(docRef, {
            paper_ready: (!paper_ready)
        })
        }
        if (check === 'plates') {
            updateDoc(docRef, {
            plates_ready: (!plates_ready)
        })
        }
        if (check === 'print') {
            updateDoc(docRef, {
            print_ready: (!print_ready)
        })
        }
        if (check === 'invoice') {
            updateDoc(docRef, {
            invoice_ready: (!invoice_ready)
        })
        }
    }

    const handleArchiv = (id) => {
        const docRef = doc(db, 'Jobs', id);
        
        if (paper_ready && plates_ready && print_ready && invoice_ready) {

        updateDoc(docRef, {
            archiv: true
        })
        } else if ((producer != 'chromik') && invoice_ready) {

        updateDoc(docRef, {
            archiv: true
        })
        } else window.alert("Erst muss der Job beendet sein!");
    }

    const handleChange = (id) => {
        const docRef = doc(db, 'Jobs', id);
        changemod = true;
      
    }

    const handleDelete = (id) => {
        const docRef = doc(db, 'Jobs', id);
        
        deleteDoc(docRef);
    }
</script>

{#if (changemod == true)}
<ChangeJobForm on:add={handleAdd} onClose={() => changemod = false } id={job.id}/>
{/if}
<br>
<div class="job">
    <div class="job-column"><p>{job.jobstart}</p></div>
    <div class="job-column"><p>{job.customer}</p></div>
    <div class="job-column"><p>{job.jobname}</p></div>
    <div class="job-column"><p>{job.details}</p></div>
    <div class="job-column"><p>{job.producer}</p></div>
    {#if job.producer === 'chromik'}
    <div class="job-column" class:done={job.paper_ready} ><p><input type="checkbox" id="paper" name="paper" on:click={handleClick('paper', job.id)} checked="{job.paper_ready}"/>MAT</p></div>
    <div class="job-column" class:done={job.plates_ready} ><p><input type="checkbox" id="plates" name="plates" on:click={handleClick('plates', job.id)} checked="{job.plates_ready}"/>PLAT</p></div>
    <div class="job-column" class:done={job.print_ready} ><p><input type="checkbox" id="print" name="print" on:click={handleClick('print', job.id)} checked="{job.print_ready}"/>DRU</p></div>
    {/if}
    <div class="job-column" class:done={job.invoice_ready} ><p><input type="checkbox" id="done" name="invoice" on:click={handleClick('invoice', job.id)} checked="{job.invoice_ready}"/>REC</p></div>
    <div>
        {#if !job.archiv}
         <Button flat={false} on:click={() => handleArchiv(job.id)}>archivieren</Button>
         <Button type="secondary" flat={false} on:click={() => handleChange(job.id)}>bearbeiten</Button>
         {:else if job.archiv}
         <Button type="secondary" flat={false} on:click={() => handleChange(job.id)}>wiederholen</Button>
         <Button flat={false} on:click={() => handleDelete(job.id)}>löschen!</Button>
         {/if}
    </div>
</div> 

<style>
    .job{
        display: grid;
        grid-template-columns: 100px 150px 200px 500px 100px 60px 60px 60px 60px 100px; 
        column-gap: 10px;
        row-gap: 1px;
        
    }
    .job-column{
        border: solid 2px crimson;
        background-color: lightgray;
        border-radius: 6px;
        margin-bottom: 1rem;
    }
    p, input{
        padding-left: 1rem;
    }
    .done{
        border-color: grey;
        background-color: #45c496;
    }
    
</style>
