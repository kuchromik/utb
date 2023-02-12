<script>
    import JobDetails from './JobDetails.svelte';
    
    export let archiv;

    import {
    getFirestore, collection, onSnapshot,
    addDoc, deleteDoc, doc, getDocs,
    query, where, orderBy
    } from 'firebase/firestore';



    const db = getFirestore()

    let jobList = [];

    const colRef = query(collection(db, "Jobs"), where("archiv", "==", archiv), orderBy("jobstart", "asc"),);


    const unsubscribe = onSnapshot(colRef, querysnapshot => {
                let fbJobs = [];
                querysnapshot.forEach((doc) => {
                let job = { ...doc.data(), id: doc.id};
                fbJobs = [job, ...fbJobs];  
                })
                jobList = fbJobs;
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


 