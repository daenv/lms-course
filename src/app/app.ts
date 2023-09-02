require('dotenv').config();

import express, { Request, Response } from 'express';
import logger from 'morgan';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';

/**
 * Import routes
 */
/* import IndexRoutes from './routes/index'; */
/**
 * Create and configure ExpressJS web server
 */

class App {
   public express: express.Application;
   constructor() {
      this.express = express();
      this.setMiddleware();
      this.setRoutes();
   }

   private setMiddleware(): void {
      this.express.use(logger('dev'));
      this.express.use(bodyParser.json());
      this.express.use(bodyParser.urlencoded({ extended: false }));
      this.express.use(cors({ origin: 'http://localhost:4200' }));
      this.express.use(morgan('dev'));
      this.express.use(cookieParser());
      this.express.use(helmet());
      /* this.express.connect(require('./configs/connections/connection')); */
   }

   private setRoutes(): void {
    /*   this.express.use(IndexRoutes); */

     this.express.get('/', (req: Request, res: Response) => {
            res.send('Hello World!');
     });
   }
}

export default new App().express;
