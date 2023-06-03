import express from 'express';
import { bodyParser, contentType, notFoundHandler } from '../middleware';
import cors from 'cors';
import routes from '../routes';

const app = express();

app.use(bodyParser);
app.use(contentType);
app.use(express.json());
app.use(cors());
routes(app);
app.use(notFoundHandler);

export default app;
