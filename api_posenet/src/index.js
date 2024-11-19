import {} from 'dotenv/config';
//import bodyParser from 'body-parser';
import handler from './handler.js';
import express, { json, urlencoded } from 'express';
import cors from 'cors';

const PORT = process.env.PORT;

const app = express();

app.use(json({limit : '100mb'}));
app.use(urlencoded({limit: '100mb'}));

app.use(cors({
    origin: '*',
    methods: ['GET','POST','PATCH','DELETE','PUT','OPTIONS']
}));

app.get('/', async(request, response) => {
    await handler(request, response);
});

app.get('/posenet/health', async(request, response) => {
    await handler(request, response);
});

app.post('/posenet/keypoints', async(request, response) => {
    await handler(request, response);
});

app.post('/posenet', async(request, response) => {
    await handler(request, response);
});

app.listen(PORT, () => console.log(`Express adapted App listening at port ${PORT}`));