import { NextFunction, Request, Response, Router } from "express";
import { BaseRoute } from "./route";
import DbClient = require("../DbClient");
/**
 * / route
 *
 * @class LoginRoute
 */
export class LoginRoute extends BaseRoute {

    /**
     * Create the routes.
     *
     * @class LoginRoute
     * @method create
     * @static
     */
    public static create(router: Router) {
        //log
        console.log("[LoginRoute::create] Creating login route.");

        //add home page route
        router.get("/login", (req: Request, res: Response, next: NextFunction) => {
            new LoginRoute().renderLoginPage(req, res, next);
        });

        router.post("/login/attempt", (req: Request, res: Response, next: NextFunction) => {
            new LoginRoute().attemptLogin(req, res, next);
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
     * The Login page route.
     *
     * @class LoginRoute
     * @method renderLoginPage
     * @param req {Request} The express Request object.
     * @param res {Response} The express Response object.
     * @param next {NextFunction} Execute the next method.
     */
    public renderLoginPage(req: Request, res: Response, next: NextFunction) {
        //set custom title
        this.title = "Login Page";
        //set message
        let options: Object = {
            page : 'login',
            message: "This is the login page"
        };
        //render template
        this.render(req, res, "login", options);
    }

    /**
     * Attempts to log in
     * TODO: Connect to db for users & passwords
     * @class LoginRoute
     * @method attemptLogin
     * @param req {Request} The express Request object.
     * @param res {Response} Contains the user name and password in the body
     * @param next {NextFunction} Execute the next method.
     */
    public attemptLogin(req: Request, res: Response, next: NextFunction) {
        console.log(req.body);
        DbClient.connect()
            .then((db) => {
                return db!.collection("users").find().toArray();
            })
            .then((users : any) => {
                console.log(users);
                res.send(users);
            })
            .catch((error) => {
                console.log(error.message);
            });
        //set custom title
        this.title = "Login Page";
        //set message
        let options: Object = {
            page : 'login',
            message: "Attempting to login"
        };

        //render template
        this.render(req, res, "login", options);
    }
}