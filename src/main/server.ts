import 'dotenv/config';
import app from './config/app';
import { Logger } from '@/main/helpers';

const PORT = parseInt(process.env.SERVER_PORT!) || 5555;

process.on('SIGTERM', () => {
    process.exit();
});

app.listen(PORT, () => {
    Logger.initial(`Server is running on port ${PORT}`);
});
