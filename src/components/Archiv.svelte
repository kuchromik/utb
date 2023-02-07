<script>
    import {fade, slide, scale} from 'svelte/transition';
    import {flip} from 'svelte/animate';
    import JobDetails from './JobDetails.svelte';

    import app from '../FireStore.js';

    import {
    getFirestore, collection, onSnapshot,
    addDoc, deleteDoc, doc, getDocs,
    query, where
    } from 'firebase/firestore';



    const db = getFirestore()

    let jobList = [];

    //const colRef = collection(db, 'Jobs');

    const colRef = query(collection(db, "Jobs"), where("archiv", "==", true));


    const unsubscribe = onSnapshot(colRef, querysnapshot => {
                let fbJobs = [];
                querysnapshot.forEach((doc) => {
                let job = { ...doc.data(), id: doc.id};
                fbJobs = [job, ...fbJobs];  
                })
                jobList = fbJobs
                }
                )
                
    
</script>

<div class="job-list">
    {#each jobList as job, id(job)}
    <div>
            <JobDetails {job}/>
    </div>
    {/each}
</div>

<style>
    .job-list{
        display: inline-block;
    }

</style>