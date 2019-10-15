import { NextFunction, Request, Response, Router } from "express";
import { BaseRoute } from "./route";
import { userInterface } from "../models/user.interface";
/**
 * / route
 *
 * @class CampaignRoute
 */
export class CampaignRoute extends BaseRoute {

    /**
     * Create the routes.
     *
     * @class CampaignRoute
     * @method create
     * @static
     */
    public static create(router: Router) {
        //log
        console.log("[CampaignRoute::create] Creating campaign route.");

        //add home page route
        router.get("/campaign", (req: Request, res: Response, next: NextFunction) => {
            new CampaignRoute().renderCampaignPage(req, res, next);
        });
    }

    /**
     * Constructor
     *
     * @class CampaignRoute
     * @constructor
     */
    constructor() {
        super();
    }

    /**
     * The Login page route.
     *
     * @class CampaignRoute
     * @method renderCampaignPage
     * @param req {Request} The express Request object.
     * @param res {Response} The express Response object.
     * @param next {NextFunction} Execute the next method.
     */
    public renderCampaignPage(req: Request, res: Response, next: NextFunction) {
        //set custom title
        this.title = "Campaign Page";
        //set message
        let options: Object = {
            page : 'campaign',
            message: "This is the Campaign Page",
            user: req.session!.user
        };
        //render template
        this.render(req, res, "campaign", options);
    }
}