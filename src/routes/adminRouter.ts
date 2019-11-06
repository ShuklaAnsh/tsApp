/**
 * Routes for admin user
 * TODO: add more meaningful information
 *
 */

import { NextFunction, Request, Response, Router } from 'express';

import DbClient = require('../DbClient');

import { BaseRoute } from './baseRouter';
/**
 * / route
 *
 * @class AdminRoute
 */
export class AdminRoute extends BaseRoute {

    /**
     * Create the routes.
     *
     * @class AdminRoute
     * @method create
     * @static
     */
    static create(router: Router) {
        //log
        console.log('[AdminRoute::create] Creating Admin route.');

        //add home page route
        router.get('/admin', (req: Request, res: Response, next: NextFunction) => {
            new AdminRoute().create(req, res, next);
        });

    }

    /**
     * Constructor
     *
     * @class AdminRoute
     * @constructor
     */
    constructor() {
        super();
    }

    /**
     * The Admin page route.
     *
     * @class AdminRoute
     * @method create
     * @param req {Request} The express Request object.
     * @param res {Response} The express Response object.
     * @param next {NextFunction} Execute the next method.
     */
    create(req: Request, res: Response, next: NextFunction) {
        //set custom title
        this.title = 'Admin Page';
        //set message
        const options: Object = {
            page : 'admin',
            message: 'Welcome to Admin Toolkit'
        };
        //render template
        this.render(req, res, 'admin', options);
    }
}
