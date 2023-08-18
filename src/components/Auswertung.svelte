<script>

    import {
    getFirestore, collection, onSnapshot, doc, getDocs,
    query, where, orderBy
    } from 'firebase/firestore';

    const db = getFirestore()

    let jobList = [];

    let producerSumlist = [{
     name: "chr",
     sum: 0
    }];

    let index;

    let summe_chr = 0;
    let summe_doe = 0;
    let summe_pwd = 0;
    let summe_wmd = 0;
    let summe_sax = 0;
    let summe_sil = 0;
    let summe_pap = 0;
    let summe_prm = 0;
    let summe_hee = 0;

    const colRef = query(collection(db, "Jobs"));


    const unsubscribe = onSnapshot(colRef, querysnapshot => {
                let fbJobs = [];
                let sum_chr = 0;
                let sum_doe = 0;
                let sum_pwd = 0;
                let sum_wmd = 0;
                let sum_sax = 0;
                let sum_sil = 0;
                let sum_pap = 0;
                let sum_prm = 0;
                let sum_hee = 0;

                    querysnapshot.forEach((doc) => {
                        let job = { ...doc.data(), id: doc.id};
                        fbJobs = [job, ...fbJobs];

                        const producerExist = producerSumlist.some(
                            (item) => item.name === job.producer
                            );


                        if (!producerExist) {
                            producerSumlist.push({name: job.producer, sum: 0})
                        }

                        index = producerSumlist.findIndex(producer => producer.name === job.producer);

                        console.log(index);

                        producerSumlist[index].sum = producerSumlist[index].sum + Number(job.amount);

                        /* console.log(producerSumlist[index].name + producerSumlist[index].sum); */

                
                        switch (job.producer) {
                            case "chr":
                            sum_chr = sum_chr + Number(job.amount);
                            break;
                            case "doe":
                            sum_doe = sum_doe + Number(job.amount);
                            break;
                            case "pwd":
                            sum_pwd = sum_pwd + Number(job.amount);
                            break;
                            case "wmd":
                            sum_wmd = sum_wmd + Number(job.amount);
                            break;
                            case "sax":
                            sum_sax = sum_sax + Number(job.amount);
                            break;
                            case "sil":
                            sum_sil = sum_sil + Number(job.amount);
                            break;
                            case "pap":
                            sum_pap = sum_pap + Number(job.amount);
                            break;
                            case "prm":
                            sum_prm = sum_prm + Number(job.amount);
                            break;
                            case "hee":
                            sum_hee = sum_hee + Number(job.amount);
                            break;
                            }
                        }
                    )

                    jobList = fbJobs;
                    summe_chr = sum_chr;
                    summe_doe = sum_doe;
                    summe_pwd = sum_pwd;
                    summe_wmd = sum_wmd;
                    summe_sax = sum_sax;
                    summe_sil = sum_sil;
                    summe_pap = sum_pap;
                    summe_prm = sum_prm;
                    summe_hee = sum_hee;
                    }
                )
                console.log(index);
                
</script>

<div class="job-list">
    <h1>Auswertung nach Produzenten</h1>
    <br />
    <h3>Chromik: <span>{summe_chr} Euro</span></h3>
    <h3>Doerte: <span>{summe_doe} Euro</span></h3>
    <h3>Printworld: <span>{summe_pwd} Euro</span></h3>
    <h3>wirMachenDruck: <span>{summe_wmd} Euro</span></h3>
    <h3>Saxoprint: <span>{summe_sax} Euro</span></h3>
    <h3>Silberdruck: <span>{summe_sil} Euro</span></h3>
    <h3>Pape: <span>{summe_pap} Euro</span></h3>
    <h3>Primus: <span>{summe_prm} Euro</span></h3>
    <h3>Heenemann: <span>{summe_hee} Euro</span></h3>
    <br>
    <p>{producerSumlist[0].name} {producerSumlist[0].sum}</p>
    <br>
    
    

   
</div>

<style>
    .job-list{
        display: inline-block;
    }

</style>
