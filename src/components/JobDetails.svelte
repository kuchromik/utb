<script>
    export let job;
    import Button from '../shared/Button.svelte';

    import app from '../FireStore.js';

    import {
    getFirestore, collection, getDocs,
    addDoc, deleteDoc, doc
    } from 'firebase/firestore';

    const db = getFirestore()
    const colRef = collection(db, 'Jobs')

    const handleClick = () => {
        job.done = !job.done;
    }

    const handleDelete = (id) => {
        //const docRef = doc(db, 'Jobs', id);
        //deleteDoc(docRef);
        console.log(id);
    };

</script>

<div class="job">
    <div class="job-column"><p>{job.customer}</p></div>
    <div class="job-column"><p>{job.jobname}</p></div>
    <div class="job-column" class:done={job.done} ><p><input type="checkbox" id="done" name="done" on:click={handleClick}/> done</p></div>
    <div>
         <Button flat={true} on:click={() => handleDelete(job.id)}>Delete</Button>
    </div>
</div> 

<style>
    .job{
        display: grid;
        grid-template-columns: 200px 200px 120px 60px; 
        column-gap: 10px;
        row-gap: 15px;
        
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
