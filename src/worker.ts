/// <reference path="./worker.d.ts" />
// console.log('Worker');

const ctx: Worker = self as any;
import { RegisterPromiseWorker } from './register-promise-worker';

let rpw = new RegisterPromiseWorker();

rpw.register(() => 'pong').start();
