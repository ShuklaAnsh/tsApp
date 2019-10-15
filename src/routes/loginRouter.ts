import { NextFunction, Request, Response, Router } from "express";
import { BaseRoute } from "./route";
import User = require("../models/user.model");
import { userInterface } from "../models/user.interface";
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

        //add login page route
        router.get("/login", (req: Request, res: Response, next: NextFunction) => {
            new LoginRoute().renderLoginPage(req, res, next);
        });
        //attempt login
        router.post("/login", (req: Request, res: Response, next: NextFunction) => {
            new LoginRoute().attemptLogin(req, res, next);
        });
        //logout
        router.get("/logout", (req: Request, res: Response, next: NextFunction) => {
            new LoginRoute().logout(req, res, next);
        });
        router.get("/create", (req: Request, res: Response, next: NextFunction) => {
            new LoginRoute().triggerCreateUserForm(req, res, next);
        });
        router.post("/create", (req: Request, res: Response, next: NextFunction) => {
            new LoginRoute().createUser(req, res, next);
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
     * @class LoginRoute
     * @method attemptLogin
     * @param req {Request} The express Request object.
     * @param res {Response} Contains the user name and password in the body
     * @param next {NextFunction} Execute the next method.
     */
    public attemptLogin(req: Request, res: Response, next: NextFunction) {
        console.log(req.body);
        User.getUser(req.body.username, req.body.password).then(user => {
            if(user){
                console.log("got user");
                if (req.session) {
                    req.session.user = user;
                    this.redirect(res, '/campaign');
                }
                // successfull
            } else {
                console.log("User Not Found");
                // unable to login
                this.title = "Login Page";
                //set message
                let options: Object = {
                    page : 'login',
                    error: true,
                    message: "Incorrect Username or Password"
                };
                //render template
                this.render(req, res, "login", options);
            }
        });
    }

    /**
     * triggers Create User Form
     * @class LoginRoute
     * @method triggerCreateUserForm
     * @param req {Request} The express Request object.
     * @param res {Response} The express Response object.
     * @param next {NextFunction} Execute the next method.
     */
    public triggerCreateUserForm(req: Request, res: Response, next: NextFunction) {
        this.title = "Create User Page";
        //set message
        let options: Object = {
            page : 'login',
            create : true,
            message: "Create User Form"
        };
        //render template
        this.render(req, res, "login", options);
    }
    /**
     * Create User
     * @class LoginRoute
     * @method createUser
     * @param req {Request} The express Request object.
     * @param res {Response} The express Response object.
     * @param next {NextFunction} Execute the next method.
     */
    public createUser(req: Request, res: Response, next: NextFunction) {
        // TODO: implement
        // If Username is taken
            // ^ getUser is already implemented in user.model.ts
            // return error
        // else
            // add user to database
        // redirect to login page
        this.redirect(res, '/login')
    }
 
    /**
     * Logout and destroy session
     * @class LoginRoute
     * @method logout
     * @param req {Request} The express Request object.
     * @param res {Response} The express Response object.
     * @param next {NextFunction} Execute the next method.
     */
    public logout(req: Request, res: Response, next: NextFunction) {
        req.session!.user = null;
        req.session!.destroy( () => {
            this.redirect(res, '/');
        });
    }
}