import express from 'express';
import { bodyParser, contentType, notFoundHandler } from '../middleware';
import cors from 'cors';
import routes from '../routes';

const app = express();

app.use(bodyParser);
app.use(contentType);
app.use(notFoundHandler);
app.use(express.json());
app.use(cors());

routes(app);

export default app;
