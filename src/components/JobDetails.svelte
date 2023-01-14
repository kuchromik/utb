<script>
    export let job;
    import Button from '../shared/Button.svelte';
    import JobStore from '../stores/JobStore.js';

    const handleClick = () => {
        job.done = !job.done;
        console.log(job);
    }

    const handleDelete = (id) => {
        JobStore.update(currentJobs => {
            return currentJobs.filter(job => job.id != id)
        });
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
