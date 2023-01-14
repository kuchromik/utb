<script>
    import {fade, slide, scale} from 'svelte/transition';
    import {flip} from 'svelte/animate';
    import JobStore from '../stores/JobStore.js';
    import JobDetails from './JobDetails.svelte';

</script>

<div class="job-list">
    {#each $JobStore as job (job.id)}
        <div in:fade out:scale|local animate:flip={{duration: 500}}>
            <JobDetails {job}/>
        </div>
    {/each}
</div>

<style>
    .job-list{
        display: inline-block;
    }

</style>