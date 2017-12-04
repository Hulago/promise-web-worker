// import W = require('worker-loader!./worker');

// import { PromiseWorker } from './promise-worker';
// let worker: Worker = new W();
// worker.terminate();

// worker.postMessage({ a: 1 });

// console.log(worker);
// let pw = new PromiseWorker(worker);

import Worker = require('worker-loader!./worker');
import { PromiseWorker } from './promise-worker';

const worker = new Worker();

let pw = new PromiseWorker(worker);

document.addEventListener('click', () => {
  pw
    .postMessage('ping')
    .then(res => console.log(res))
    .catch(e => console.error(e));
});
