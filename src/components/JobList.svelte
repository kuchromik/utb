<script>
    import JobDetails from './JobDetails.svelte';
    export let jobs = [];
</script>

<div class="job-list">
    {#each jobs as job (job.id)}
        <div>
            <JobDetails {job}/>
        </div>
    {/each}
</div>

<style>
    .job-list{
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 20px;
    }

</style>