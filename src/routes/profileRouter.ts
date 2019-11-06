/**
 * profile router
 */

import { NextFunction, Request, Response, Router } from 'express';

import { UserInterface } from '../models/user.interface';
import User = require('../models/user.model');

import { BaseRoute } from './baseRouter';
/**
 * / route
 *
 * @class ProfileRoute
 */
export class ProfileRoute extends BaseRoute {

    /**
     * Create the routes.
     *
     * @class ProfileRoute
     * @method create
     * @static
     */
    static create(router: Router) {
        //log
        console.log('[ProfileRoute::create] Creating Profile route.');

        //add home page route
        router.get('/profile', (req: Request, res: Response, next: NextFunction) => {
            new ProfileRoute().renderProfilePage(req, res, next);
        });
        //Update Profile
        router.post('/profile', (req: Request, res: Response, next: NextFunction) => {
            new ProfileRoute().updateProfile(req, res, next)
              .catch(error => {
                console.log(error.message);
              });
        });
        //Delete account
        router.post('/profile/delete', (req: Request, res: Response, next: NextFunction) => {
            new ProfileRoute().deleteUser(req, res, next)
              .catch(error => {
                console.log(error.message);
              });
        });
    }

    /**
     * Constructor
     *
     * @class ProfileRoute
     * @constructor
     */
    constructor() {
        super();
    }

    /**
     * The Profile Page route.
     *
     * @class ProfileRoute
     * @method renderProfilePage
     * @param req {Request} The express Request object.
     * @param res {Response} The express Response object.
     * @param next {NextFunction} Execute the next method.
     */
    renderProfilePage(req: Request, res: Response, next: NextFunction) {
        //set custom title
        this.title = 'Profile Page';
        //set message
        const options: Object = {
            page: 'profile',
            message: 'This is the Profile Page',
            user: req.session!.user
        };
        //render template
        this.render(req, res, 'profile', options);
        delete req.session!.message;
    }

    /**
     * Updates the user through the user model
     *
     * @class ProfileRoute
     * @method updateProfile
     * @param req {Request} The express Request object.
     * @param res {Response} The express Response object.
     * @param next {NextFunction} Execute the next method.
     */
    async updateProfile(req: Request, res: Response, next: NextFunction) {
        const user: UserInterface = {
            id: req.session!.user.id,
            username: req.body.username,
            firstName: req.body.firstName,
            lastName: req.body.lastName
        };
        User.editUser(user)
          .then(result => {
            if (result.success) {
                req.session!.user = user;
                req.session!.message = 'User updated';
                this.redirect(res, '/profile');
            } else {
                req.session!.message = result.message;
                this.redirect(res, '/profile');
            }
            // TODO: clear session message somehow
            // or figure out another way to display message
          })
            .catch(error => {
              console.log(error.message);
            });
    }

    /**
     * Deletes the user through the user model
     *
     * @class ProfileRoute
     * @method deleteUser
     * @param req {Request} The express Request object.
     * @param res {Response} The express Response object.
     * @param next {NextFunction} Execute the next method.
     */
    async deleteUser(req: Request, res: Response, next: NextFunction) {
        User.deleteUser(req.session!.user.id)
          .then(result => {
            if (result.success) {
                req.session!.user = null;
                req.session!.destroy(() => {
                    this.redirect(res, '/');
                });
            } else {
                req.session!.message = result.message;
                this.redirect(res, '/profile');
            }
          })
            .catch(error => {
              console.log(error.message);
            });
    }
}
