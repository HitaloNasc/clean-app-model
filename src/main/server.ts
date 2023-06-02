import 'dotenv/config';
import app from './config/app';
// import { Logger } from './common/lib/logger';

const PORT = parseInt(process.env.SERVER_PORT!) || 5555;

process.on('SIGTERM', () => {
    process.exit();
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
