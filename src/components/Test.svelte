<script>
   import app from '../FireStore.js';

    import {
	getFirestore, collection, getDocs,
	addDoc, deleteDoc, doc
} from 'firebase/firestore'



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

<div>
    <h1>Test</h1>
    
    {#each jobList as job}
        <p>{job.customer}</p>
    {/each}
    
</div>
