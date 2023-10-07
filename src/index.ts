import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import fs from 'fs';

import log from './configs/logger.config';

// Importing routes
import blogRoute from './routes/blog.route';

// Initailizing env variables
dotenv.config();

// Initializing an express app
const app: Application = express();

// Server Port
const PORT: string | undefined = process.env.PORT;

// Formatting incoming data and allowing cross origin requests
app.use(cors());
app.use(express.json());

// Logging
app.use(morgan('dev'));

// APIs
app.use('/api', blogRoute);

// Test API
app.get('/api', (req: Request, res: Response) => {
    res.status(200).json({
        name: JSON.parse(fs.readFileSync('./package.json').toString()).name,
        apiVersion: JSON.parse(fs.readFileSync('./package.json').toString())
            .version
    });
});

// Listening on the port
app.listen(PORT, () => {
    log.info(`Server running on ${process.env.API_URL}`);
    // database();
});
