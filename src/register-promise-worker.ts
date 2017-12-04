import { IResultMessage, ISendMessage } from './promise-worker.model';

const ctx: Worker = self as any;

export interface IRes {
  res?: any;
  err?: any;
}

// Respond to message from parent thread
// ctx.addEventListener('message', event => {
//   let message: ISendMessage = event.data;
// });

// function tryCatchFunc(callback, message) {
//   try {
//     return { res: callback(message) };
//   } catch (e) {
//     return { err: e };
//   }
// }

// function handleIncomingMessage(e, callback, messageId, message) {
//   var result = tryCatchFunc(callback, message);

//   if (result.err) {
//     postOutgoingMessage(e, messageId, result.err);
//   } else if (!isPromise(result.res)) {
//     postOutgoingMessage(e, messageId, null, result.res);
//   } else {
//     result.res.then(
//       function(finalResult) {
//         postOutgoingMessage(e, messageId, null, finalResult);
//       },
//       function(finalError) {
//         postOutgoingMessage(e, messageId, finalError);
//       }
//     );
//   }
// }

export class RegisterPromiseWorker {
  public callback: Function;

  constructor() {
    console.log('Called');
    this.callback = null;
  }

  register(callback) {
    this.callback = callback;
    return this;
  }

  start() {
    console.log('Start Listening');
    ctx.addEventListener('message', this.onIncomingMessage.bind(this));
  }

  postOutgoingMessage(messageId, error, result?) {
    // function postMessage(msg) {
    //   /* istanbul ignore if */
    //   if (typeof ctx.postMessage !== 'function') {
    //     // service worker
    //     e.ports[0].postMessage(msg);
    //   } else {
    //     // web worker
    //     ctx.postMessage(msg);
    //   }
    // }
    if (error) {
      /* istanbul ignore else */
      if (typeof console !== 'undefined' && 'error' in console) {
        // This is to make errors easier to debug. I think it's important
        // enough to just leave here without giving the user an option
        // to silence it.
        console.error('Worker caught an error:', error);
      }
      ctx.postMessage(<IResultMessage>{
        messageId,
        error: error.message
      });
    } else {
      ctx.postMessage(<IResultMessage>{
        messageId,
        result
      });
    }
  }

  tryCatchFunc(fn: Function, message): IRes {
    try {
      return { res: Promise.resolve(fn(message)) };
    } catch (e) {
      return { err: e };
    }
  }

  handleIncomingMessage(fn: Function, message: ISendMessage) {
    let result = this.tryCatchFunc(fn, message.payload);

    if (result.err) {
      this.postOutgoingMessage(message.messageId, result.err);
    } else {
      result.res
        .then(finalResult => this.postOutgoingMessage(message.messageId, null, finalResult))
        .catch(e => this.postOutgoingMessage(message.messageId, e));
    }
  }

  onIncomingMessage(e) {
    let message: ISendMessage = e.data;
    if (!message) {
      // message isn't stringified json; ignore
      return;
    }

    if (typeof this.callback !== 'function') {
      this.postOutgoingMessage(message.messageId, new Error('Please pass a function into register().'));
    } else {
      this.handleIncomingMessage(this.callback, message);
    }
  }
}

// function registerPromiseWorker(callback: Function) {
//   // function postOutgoingMessage(messageId, error, result?) {
//   //   // function postMessage(msg) {
//   //   //   /* istanbul ignore if */
//   //   //   if (typeof ctx.postMessage !== 'function') {
//   //   //     // service worker
//   //   //     e.ports[0].postMessage(msg);
//   //   //   } else {
//   //   //     // web worker
//   //   //     ctx.postMessage(msg);
//   //   //   }
//   //   // }
//   //   if (error) {
//   //     /* istanbul ignore else */
//   //     if (typeof console !== 'undefined' && 'error' in console) {
//   //       // This is to make errors easier to debug. I think it's important
//   //       // enough to just leave here without giving the user an option
//   //       // to silence it.
//   //       console.error('Worker caught an error:', error);
//   //     }
//   //     postMessage(<IResultMessage>{
//   //       messageId,
//   //       error: error.message
//   //     });
//   //   } else {
//   //     postMessage(<IResultMessage>{
//   //       messageId,
//   //       result
//   //     });
//   //   }
//   // }

//   // function tryCatchFunc(fn: Function, message): IRes {
//   //   try {
//   //     return { res: Promise.resolve(fn(message)) };
//   //   } catch (e) {
//   //     return { err: e };
//   //   }
//   // }

//   // function handleIncomingMessage(fn: Function, message: ISendMessage) {
//   //   let result = tryCatchFunc(fn, message.payload);

//   //   if (result.err) {
//   //     postOutgoingMessage(message.messageId, result.err);
//   //   } else {
//   //     result.res
//   //       .then(finalResult => postOutgoingMessage(message.messageId, null, finalResult))
//   //       .catch(e => postOutgoingMessage(message.messageId, e));
//   //   }
//   // }

//   function onIncomingMessage(e) {
//     let message: ISendMessage = e.data;
//     if (!message) {
//       // message isn't stringified json; ignore
//       return;
//     }

//     if (typeof callback !== 'function') {
//       postOutgoingMessage(message.messageId, new Error('Please pass a function into register().'));
//     } else {
//       handleIncomingMessage(callback, message);
//     }
//   }

// }

// module.exports = registerPromiseWorker;
