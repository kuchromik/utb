<script>
    export let job;
    import Button from '../shared/Button.svelte';

    import app from '../FireStore.js';

    import {
    getFirestore, collection, getDocs,
    addDoc, deleteDoc, doc, updateDoc
    } from 'firebase/firestore';

    const db = getFirestore()

    const handleClick = () => {
        job.done = !job.done;
    }

    const handleArchiv = (id) => {
        const docRef = doc(db, 'Jobs', id);

        updateDoc(docRef, {
            archiv: true
        })
        
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
    <div class="job-column" class:done={job.invoice_ready} ><p><input type="checkbox" id="done" name="invoice" on:click={handleClick}/>MAT</p></div>
    <div class="job-column" class:done={job.invoice_ready} ><p><input type="checkbox" id="done" name="invoice" on:click={handleClick}/>PLAT</p></div>
    <div class="job-column" class:done={job.invoice_ready} ><p><input type="checkbox" id="done" name="invoice" on:click={handleClick}/>DRU</p></div>
    {/if}
    <div class="job-column" class:done={job.invoice_ready} ><p><input type="checkbox" id="done" name="invoice" on:click={handleClick}/>REC</p></div>
    <div>
        {#if !job.archiv}
         <Button flat={true} on:click={() => handleArchiv(job.id)}>archivieren</Button>
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
