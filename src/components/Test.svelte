<script>
   import app from '../FireStore.js';

    import {
	getFirestore, collection, getDocs,
	addDoc, deleteDoc, doc
} from 'firebase/firestore'



const db = getFirestore()

let List = [];

const colRef = collection(db, 'Jobs')

async function getJobs(db) {
  const jobsCol = collection(db, 'Jobs');
  const jobSnapshot = await getDocs(jobsCol);
  const jobList = jobSnapshot.docs.map(doc => doc.data());
  console.log(jobList)
  return jobList;
}

getJobs(db).then(jobList => {
    List = jobList;
    console.log(List);
})

</script>

<div>
    <h1>Test</h1>
    
    {#each List as job}
        <p>{job.customer}</p>
    {/each}
    
</div>
