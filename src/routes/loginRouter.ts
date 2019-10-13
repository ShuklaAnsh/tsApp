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
        //set custom title
        this.title = "Login Page";
        //set message
        let options: Object = {
            page : 'login',
            message: "Attempting to login"
        };
        DbClient.connect()
            .then((db) => {
                return db!.collection("users").find({
                    username: req.body.username_field,
                    password: req.body.pw_field,
                }).toArray();
            })
            .then((result : any) => {
                if(result.length === 0){
                    console.log("User not found");
                    res.send({
                        mode: 'error',
                        msg: 'Username or password incorrect'
                    });
                } else{
                    console.log(result);
                    res.send(result);
                };
            })
            .catch((error) => {
                console.log(error.message);
            });
        //render template
        this.render(req, res, "login", options);
    }
}