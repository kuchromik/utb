<script>
    import {fade, slide, scale} from 'svelte/transition';
    import {flip} from 'svelte/animate';
    import JobDetails from './JobDetails.svelte';

    import app from '../FireStore.js';

    import {
    getFirestore, collection, onSnapshot,
    addDoc, deleteDoc, doc, getDocs
    } from 'firebase/firestore';



    const db = getFirestore()

    let data = [];
    let jobList = [];

    /*
    async function getJobs(db) {
    const jobsCol = collection(db, 'Jobs');
    const jobSnapshot = await getDocs(jobsCol);
    const docs = jobSnapshot.docs.map((doc) => {
        data = doc.data();
        data.id = doc.id;
        return data;
        })
        return(docs);
    }

    getJobs(db).then(data => {
    jobList = data;
    })*/
    const colRef = collection(db, 'Jobs');

    onSnapshot(colRef, (snapshot) => {
                let liste = [];
                snapshot.docs.forEach((doc) => {
                liste.push({ ...doc.data(), id: doc.id})  
                })
                console.log(liste);
                }
                ).then(liste => {
                    jobList = liste;})
    
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