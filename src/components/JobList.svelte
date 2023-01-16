<script>
    import {fade, slide, scale} from 'svelte/transition';
    import {flip} from 'svelte/animate';
    import JobDetails from './JobDetails.svelte';

    import app from '../FireStore.js';

    import {
    getFirestore, collection, getDocs,
    addDoc, deleteDoc, doc
    } from 'firebase/firestore';



    const db = getFirestore()

    let jobList = [];

    const colRef = collection(db, 'Jobs')

    async function getJobs(db) {
    const jobsCol = collection(db, 'Jobs');
    const jobSnapshot = await getDocs(jobsCol);
    const jobList = jobSnapshot.docs.map(doc => doc.data());
    return jobList;
    }

    getJobs(db).then(data => {
    jobList = data;
    })


</script>

<div class="job-list">
    {#each jobList as job, id(job)}
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