
/**
 * app
 */
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import errorHandler from 'errorhandler';
import express from 'express';
import session from 'express-session';
import logger from 'morgan';
import path from 'path';

import { AdminRoute } from './routes/adminRouter';
import { CampaignsRoute } from './routes/campaignsRouter';
import { IndexRoute } from './routes/indexRouter';
import { LoginRoute } from './routes/loginRouter';
import { MapRoute } from './routes/mapRouter';
import { ProfileRoute } from './routes/profileRouter';

/**
 * The server.
 *
 * @class Server
 */
export class Server {

    app: express.Application;

    /**
     * Bootstrap the application.
     *
     * @class Server
     * @method bootstrap
     * @static
     * @return {Server} Returns the newly created Server instance for this app.
     */
    static bootstrap(): Server {
        return new Server();
    }

    /**
     * Constructor.
     *
     * @class Server
     * @constructor
     */
    constructor() {
        //create expressjs application
        this.app = express();

        //configure application
        this.config();

        //add routes
        this.routes();
    }

    /**
     * Configure application
     *
     * @class Server
     * @method config
     */
    config() {
        process.env.MONGO_URL = 'mongodb+srv://admin:Passw0rd@cluster0-ljzjx.mongodb.net/admin?retryWrites=true&w=majority';

        this.app.use(session({
            resave: true,
            saveUninitialized: false,
            secret: 'seng350'
        }));
        //add static paths
        console.log(__dirname);
        this.app.use(express.static(path.join(__dirname, '../public')));

        //configure pug
        this.app.set('views', path.join(__dirname, '../views'));
        this.app.set('view engine', 'pug');

        //mount logger
        this.app.use(logger('dev'));

        //mount json form parser
        this.app.use(bodyParser.json());

        //mount query string parser
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));

        //mount cookie parser middleware
        this.app.use(cookieParser('SECRET_GOES_HERE'));

        // catch 404 and forward to error handler
        this.app.use(function(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
            err.status = 404;
            next(err);
        });

        //error handling
        this.app.use(errorHandler());
    }

    /**
     * Create and return Router.
     *
     * @class Server
     * @method routes
     * @return void
     */
    private routes() {
        const router: express.Router = express.Router();

        IndexRoute.create(router);
        LoginRoute.create(router);
        CampaignsRoute.create(router);
        AdminRoute.create(router);
        ProfileRoute.create(router);
        MapRoute.create(router);

        //use router middleware
        this.app.use(router);

    }

}
