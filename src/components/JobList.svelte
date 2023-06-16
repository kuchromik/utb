<script>
    import JobDetails from './JobDetails.svelte';
    
    export let archiv;

    import {
    getFirestore, collection, onSnapshot,
    addDoc, deleteDoc, doc, getDocs,
    query, where, orderBy
    } from 'firebase/firestore';

    let counter = 0;

    let increment = () =>{
	counter++
	return counter;
    }

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
<br>
<p>Jobs in Liste: {counter}</p>
<br>
<div class="job-list">
    {#each jobList as job, id(job)}
    {increment()}
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


 