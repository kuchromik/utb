<script>

    import { fade } from 'svelte/transition';

    import {
    getFirestore, collection, onSnapshot, doc, getDocs,
    query
    } from 'firebase/firestore';

    const db = getFirestore()

    let loopdelay = 0;

    let producerSumlist = [{
        id: 0,
        name: "chr",
        sum: 0
    }];


    const colRef = query(collection(db, "Jobs"));


    const unsubscribe = onSnapshot(colRef, querysnapshot => {

                    querysnapshot.forEach((doc) => {
                        let job = { ...doc.data(), id: doc.id};
                        // fbJobs = [job, ...fbJobs];

                        const producerExist = producerSumlist.some(
                            (item) => item.name === job.producer
                            );


                        if (!producerExist) {
                            let newIndex = producerSumlist.length;
                            producerSumlist.push({id: newIndex, name: job.producer, sum: 0})
                            }

                        let index = producerSumlist.findIndex(producer => producer.name === job.producer);

                        producerSumlist[index].sum = producerSumlist[index].sum + Number(job.amount);
                        });

                    producerSumlist.sort((a, b) => {
                        if (b.sum > a.sum) {
                            return 1;
                        }
                        else if (b.sum < a.sum) {
                            return -1;
                        }
                        return 0;
                    });
            }
        )


</script>


<div class="job-list">
    <h1>Auswertung nach Produzenten</h1>
    <br />
    <ul>
	    {#each producerSumlist as item, index (item.id) }
            <div transition:fade={{ delay: index * 50, duration: 100 }} class="producer" style="width:{(item.sum/producerSumlist[0].sum)*100}%;">
		    <li>{item.name} {item.sum}</li>
        </div>
	    {/each}
    </ul>
</div>

<style>
    .job-list{
        display: inline-block;
        width: 100%;
    }

    .producer {
        display:block;
        background-color: darkgray;
        margin: 1rem;
        height: 3rem;
        position: relative;
    }

    ul {
        list-style: none;
        padding: 0;
    }

    li {
        position: absolute; 
        top: 50%; 
        transform: translateY(-50%);
        margin-left: 1rem;
    }
</style>
