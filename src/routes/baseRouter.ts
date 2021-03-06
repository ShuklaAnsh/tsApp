/*

Filename: route.ts

//TODO: Add relevant file header

 */
import { NextFunction, Request, Response } from 'express';
/**
 * Constructor
 *
 * @class BaseRoute
 */
export class BaseRoute {

    protected title: string;

    private scripts: string[];

    /**
     * Constructor
     *
     * @class BaseRoute
     * @constructor
     */
    constructor() {
        //initialize variables
        this.title = 'Creatures & Caves';
        this.scripts = [];
    }

    /**
     * Add a JS external file to the request.
     *
     * @class BaseRoute
     * @method addScript
     * @param src {string} The src to the external JS file.
     * @return {BaseRoute} Self for chaining
     */
    addScript(src: string): BaseRoute  {
        this.scripts.push(src);
        return this;
    }

    /**
     * Render a page.
     *
     * @class BaseRoute
     * @method render
     * @param req {Request} The request object.
     * @param res {Response} The response object.
     * @param view {string} The view to render.
     * @param options {Object} Additional options to append to the view's local scope.
     * @return void
     */
    render(req: Request, res: Response, view: string, options?: Object)  {
        //add constants
        res.locals.BASE_URL = '/';

        //add scripts
        res.locals.scripts = this.scripts;

        //add title
        res.locals.title = this.title;
        res.locals.session = req.session;
        res.locals.user = req.session!.user;
        //render view
        res.render(view, options);
    }

    /**
     * Redirect to another endpoint
     *
     * @class BaseRoute
     * @method redirect
     * @param res {Response} The response object.
     * @param url {string} The url to redirect to.
     * @return void
     */
    redirect(res: Response, url: string) {
        res.redirect(url);
    }
}
