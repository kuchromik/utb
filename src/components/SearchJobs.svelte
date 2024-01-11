<script>
    import JobDetails from './JobDetails.svelte';
    import Button from '../shared/Button.svelte';


    import {
    getFirestore, collection, onSnapshot,
    addDoc, deleteDoc, doc, getDocs,
    query, where, orderBy
    } from 'firebase/firestore';

    let fields = { customer: '', jobname: '', details: '', producer: ''};
    let errors = { customer: '', jobname: '', details: '', producer: ''};

    const db = getFirestore()

    let jobList = [];

    let string = '';
    let searchstring = '';
    let stringToLowerCase = '';
    let searchstringToLowerCase = '';
    let isSubstring = false;
                
    const customerSearch = () => {
            
        const colRef = query(collection(db, "Jobs"), /*where("customer", "==", fields.customer), */orderBy("jobstart", "asc"));

        const unsubscribe = onSnapshot(colRef, querysnapshot => {
            let fbJobs = [];
            querysnapshot.forEach((doc) => {
                
                string = doc.data().customer;
                searchstring = fields.customer;
                stringToLowerCase =  string.toLowerCase();
                searchstringToLowerCase =  searchstring.toLowerCase();

                isSubstring = stringToLowerCase.includes(searchstringToLowerCase);
                
                if (isSubstring) {
                    let job = { ...doc.data(), id: doc.id};
                    fbJobs = [job, ...fbJobs];  
                }
            })
            jobList = fbJobs;
            /*
            string = '';
            searchstring = '';
            stringToLowerCase = '';
            searchstringToLowerCase = '';
            isSubstring = false;
            fields = { customer: '', jobname: '', details: '', producer: ''};
            errors = { customer: '', jobname: '', details: '', producer: ''};
            */
            }
        
        )
    }

    const jobnameSearch = () => {
            
            const colRef = query(collection(db, "Jobs"), /*where("jobname", ">=", fields.jobname), where("jobname", "<=", fields.jobname + "\uf8ff"), */orderBy("jobstart", "asc"));
    
            const unsubscribe = onSnapshot(colRef, querysnapshot => {
                let fbJobs = [];
                querysnapshot.forEach((doc) => {
                
                    string = doc.data().jobname;
                    searchstring = fields.jobname;
                    stringToLowerCase =  string.toLowerCase();
                    searchstringToLowerCase =  searchstring.toLowerCase();

                    isSubstring = stringToLowerCase.includes(searchstringToLowerCase);
                
                    if (isSubstring) {
                        let job = { ...doc.data(), id: doc.id};
                        fbJobs = [job, ...fbJobs];  
                    }  
                })
                jobList = fbJobs;
                string = '';
                searchstring = '';
                stringToLowerCase = '';
                searchstringToLowerCase = '';
                isSubstring = false;
                fields = { customer: '', jobname: '', details: '', producer: ''};
                errors = { customer: '', jobname: '', details: '', producer: ''};
                }
                )
        }

        const detailsSearch = () => {
            
            const colRef = query(collection(db, "Jobs"), /*where("details", ">=", fields.details), where("details", "<=", fields.details + "\uf8ff" ), */orderBy("jobstart", "asc"));
    
            const unsubscribe = onSnapshot(colRef, querysnapshot => {
                let fbJobs = [];
                querysnapshot.forEach((doc) => {
                
                    string = doc.data().details;
                    searchstring = fields.details;
                    stringToLowerCase =  string.toLowerCase();
                    searchstringToLowerCase =  searchstring.toLowerCase();

                    isSubstring = stringToLowerCase.includes(searchstringToLowerCase);
                
                    if (isSubstring) {
                        let job = { ...doc.data(), id: doc.id};
                        fbJobs = [job, ...fbJobs];  
                    }  
                })
                jobList = fbJobs;
                string = '';
                searchstring = '';
                stringToLowerCase = '';
                searchstringToLowerCase = '';
                isSubstring = false;
                fields = { customer: '', jobname: '', details: '', producer: ''};
                errors = { customer: '', jobname: '', details: '', producer: ''};
                }
                )
        }
    
</script>

<form on:submit|preventDefault={customerSearch}>
    <div class="form-field">
        <label for="customer">Kunde</label>
        <input type="text" id="customer" bind:value={fields.customer}>
        <div class="error">{errors.customer}</div>
    </div>
    <Button type="secondary" flat={false}>nach Kunde suchen</Button>
</form>
<form on:submit|preventDefault={jobnameSearch}>
    <div class="form-field">
        <label for="jobname">Auftrag</label>
        <input type="text" id="jobname" bind:value={fields.jobname}>
        <div class="error">{errors.jobname}</div>
    </div>
    <Button type="secondary" flat={false}>nach Auftrag suchen</Button>
</form>
<form on:submit|preventDefault={detailsSearch}>
    <div class="form-field">
        <label for="details">Details</label>
       
        <textarea name="textarea" rows="5" cols="80" id="details" bind:value={fields.details}></textarea>
        <div class="error">{errors.details}</div>
    </div>
    <Button type="secondary" flat={false}>nach Details suchen</Button>  
</form>

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

    form{
        width: 600px;
        margin: 0 auto;
        padding: 3px;
        text-align: center
    }
    .form-field{
        margin: 18px auto;
        border: solid 2px crimson;
        background-color: lightgray;
        border-radius: 6px;
    }
    input, textarea {
        width: 95%;
        border-radius: 6px;
        margin: 10px;
    }

    label{
        margin: 10px;
        text-align: left;
    }
    .error{
        font-weight: bold;
        font-size: 12px;
        color: #d91b42;
    }
</style>
