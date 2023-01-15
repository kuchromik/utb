import {writable} from 'svelte/store';

let JobStore = writable([
    {
        id: 1,
        customer: 'Giraffe',
        jobname: 'Visitenkarten',
        done: false,
    },
]);

export default JobStore;