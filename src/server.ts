import dotenv from 'dotenv';
import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';
// import swaggerJsDoc from 'swagger-jsdoc';
// import swaggerOptions from './documentation/swagger-conf';
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from './documentation/swagger.json';
import routes from './routes';
import uploadConfig from './config/upload';
import './database';
import AppError from './errors/AppError';

dotenv.config();

const app = express();
// const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use(cors());
app.use(express.json());
app.use('/sandbox', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            status: 'error',
            message: err.message,
        });
    }

    console.error(err);
    return response.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
    });
});

app.listen(process.env.PORT || 3333, () => {
    console.log('🚀 Server started on port 3333');
});
