import { NextFunction, Request, Response, Router } from "express";
import { BaseRoute } from "./route";
import DbClient = require("../DbClient");
/**
 * / route
 *
 * @class MapRoute
 */
export class MapRoute extends BaseRoute {

    /**
     * Create the routes.
     *
     * @class MapRoute
     * @method create
     * @static
     */
    public static create(router: Router) {
        //log
        console.log("[MapRoute::create] Creating map route.");

        //add home page route
        router.get("/map", (req: Request, res: Response, next: NextFunction) => {
            new MapRoute().create(req, res, next);
        });

    }

    /**
     * Constructor
     *
     * @class LoginRoute
     * @constructor
     */
    constructor() {
        super();
    }

    /**
     * The Map page route.
     *
     * @class LoginRoute
     * @method create
     * @param req {Request} The express Request object.
     * @param res {Response} The express Response object.
     * @param next {NextFunction} Execute the next method.
     */
    public create(req: Request, res: Response, next: NextFunction) {
        //set custom title
        this.title = "Map Page";
        //set message
        let options: Object = {
            page : 'map',
            message: "This is the map page"
        };
        //render template
        this.render(req, res, "map", options);
    }
}