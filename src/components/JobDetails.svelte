<script>
    export let job;
    import Button from '../shared/Button.svelte';

    import app from '../FireStore.js';

    import {
    getFirestore, collection, getDocs,
    addDoc, deleteDoc, doc, updateDoc
    } from 'firebase/firestore';

    const db = getFirestore();
   
    let paper_ready = job.paper_ready;
    let plates_ready = job.plates_ready;
    let print_ready = job.print_ready;
    let invoice_ready = job.invoice_ready;
  

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
    } else alert("Erst muss alles fertig sein!");

        //deleteDoc(docRef);
    }
    const handleDelete = (id) => {
        const docRef = doc(db, 'Jobs', id);
        
        deleteDoc(docRef);
    }
</script>

<div class="job">
    <div class="job-column"><p>{job.customer}</p></div>
    <div class="job-column"><p>{job.jobname}</p></div>
    <div class="job-column"><p>{job.details}</p></div>
    <div class="job-column"><p>{job.producer}</p></div>
    {#if job.producer === 'chromik'}
    <div class="job-column" class:done={job.paper_ready} ><p><input type="checkbox" id="paper" name="paper" on:click={handleClick('paper', job.id)}/>MAT</p></div>
    <div class="job-column" class:done={job.plates_ready} ><p><input type="checkbox" id="plates" name="plates" on:click={handleClick('plates', job.id)}/>PLAT</p></div>
    <div class="job-column" class:done={job.print_ready} ><p><input type="checkbox" id="print" name="print" on:click={handleClick('print', job.id)}/>DRU</p></div>
    {/if}
    <div class="job-column" class:done={job.invoice_ready} ><p><input type="checkbox" id="done" name="invoice" on:click={handleClick('invoice', job.id)}/>REC</p></div>
    <div>
        {#if !job.archiv}
         <Button flat={false} on:click={() => handleArchiv(job.id)}>archivieren</Button>
         {:else if job.archiv}
         <Button flat={true} on:click={() => handleDelete(job.id)}>löschen!</Button>
         {/if}
    </div>
</div> 

<style>
    .job{
        display: grid;
        grid-template-columns: 150px 200px 500px 100px 60px 60px 60px 60px 100px; 
        column-gap: 10px;
        row-gap: 1px;
        
    }
    .job-column{
        border: solid 3px crimson;
        border-radius: 6px;
        margin-bottom: 1rem;
    }
    p, input{
        padding-left: 1rem;
    }
    .done{
        border-color: green;
    }
    
</style>
