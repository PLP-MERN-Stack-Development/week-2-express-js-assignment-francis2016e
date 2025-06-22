import express from 'express';

import bodyParser from 'body-parser';
import router from './routes/route.js';
import logger from './middleware/logger.js';
import errorHandler from './middleware/errorHandler.js';


const PORT = 3000
const app = express();
app.use(bodyParser.json())
app.use('/api', router)
app.use(logger)


app.get('/', (req,res)=>{
  res.send('hello world')
})


app.use(errorHandler);

app.listen(PORT, () =>{
  console.log(`server is listening on port http://localhost:${PORT}`)
})