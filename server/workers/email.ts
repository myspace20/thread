import { mailQueue } from '../../config/queue';
import transport from '../../config/mail';

// mailQueue.process('email',async(job,done)=>{
//     if(job.data){
//         transport.sendMail(job.data,(err)=>{
//             console.log(err)
//         });
//         done()
//     }
// })

// process.once('SIGTERM', () => {
//     mailQueue
//         .close()
//         .then(process.exit(0))
//         .catch((e) => e);
// });
