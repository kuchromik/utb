<script>
   import app from '../FireStore.js';

    import {
	getFirestore, collection, getDocs,
	addDoc, deleteDoc, doc
} from 'firebase/firestore'

let jobs = [ {
        id: 1,
        customer: 'Giraffe',
        jobname: 'Visitenkarten',
        done: false,
    }];

const db = getFirestore()

let jobList = [];

const colRef = collection(db, 'Jobs')

async function getJobs(db) {
  const jobsCol = collection(db, 'Jobs');
  const jobSnapshot = await getDocs(jobsCol);
  const jobList = jobSnapshot.docs.map(doc => doc.data());
  console.log(jobList)
  return jobList;
}

getJobs(db).then(jobList => {
    console.log(jobList);
})

</script>

<div>
    <h1>Test</h1>
    
    {#each jobList as job}
        <p>{job.jobname}</p>
    {/each}
    
</div>
