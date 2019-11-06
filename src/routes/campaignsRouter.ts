/**
 * campaigns router
 *
 */

import { NextFunction, Request, Response, Router } from 'express';

import { CampaignInterface } from '../models/campaign.interface';
import Campaign = require('../models/campaign.model');

import { BaseRoute } from './baseRouter';

/**
 * / route
 *
 * @class CampaignsRoute
 */
export class CampaignsRoute extends BaseRoute {

    /**
     * Create the routes.
     *
     * @class CampaignsRoute
     * @method create
     * @static
     */
    static create(router: Router) {
        //log
        console.log('[CampaignsRoute::create] Creating campaigns route.');

        //add home page route
        router.get('/campaigns', (req: Request, res: Response, next: NextFunction) => {
            new CampaignsRoute().renderCampaignsPage(req, res, next)
            .catch(error => {
              console.log(error.message);
            });
        });
        // attampt to load a certain campaign
        router.get('/campaign/:id&:name', (req: Request, res: Response, next: NextFunction) => {
            new CampaignsRoute().redirectCampaignPage(req, res, next)
            .catch(error => {
              console.log(error.message);
            });
        });
        //redirect without campaign id
        router.get('/campaign/:name', (req: Request, res: Response, next: NextFunction) => {
            new CampaignsRoute().renderCampaignPage(req, res, next);
        });
        //redirect campaign/sessions to campaign page
        router.get('/campaign/:name/sessions', (req: Request, res: Response, next: NextFunction) => {
            res.redirect('/campaign/' + req.session!.campaign.name);
        });
        //Campaign details page
        router.get('/campaign/:name/details', (req: Request, res: Response, next: NextFunction) => {
            new CampaignsRoute().renderCampaignDetailsPage(req, res, next);
        });
        //Edit Campaign details
        router.post('/campaign/:name/details', (req: Request, res: Response, next: NextFunction) => {
            new CampaignsRoute().updateCampaign(req, res, next).catch(error => {
              console.log(error.message);
            });
        });
        //Delete Campaign
        router.post('/campaign/:name/delete', (req: Request, res: Response, next: NextFunction) => {
            new CampaignsRoute().deleteCampaign(req, res, next)
            .catch(error => {
              console.log(error.message);
            });
        });
        // attempt to create campaign
        router.post('/campaign', (req: Request, res: Response, next: NextFunction) => {
            new CampaignsRoute().createCampaign(req, res, next).catch(error => {
              console.log(error.message);
            });
        });
    }

    /**
     * Constructor
     *
     * @class CampaignsRoute
     * @constructor
     */
    constructor() {
        super();
    }

    /**
     * The Campaigns page route.
     * This is the page for all of a users campaigns
     *
     * @class CampaignsRoute
     * @method renderCampaignsPage
     * @param req {Request} The express Request object.
     * @param res {Response} The express Response object.
     * @param next {NextFunction} Execute the next method.
     */
    async renderCampaignsPage(req: Request, res: Response, next: NextFunction) {
        //set custom title
        Campaign.getCampaigns(req.session!.user.id)
          .then((campaigns: CampaignInterface[]) => {
            console.log('campaigns recieved:\n' + JSON.stringify(campaigns, null, '\t'));
            this.title = 'Campaign Page';
            //set message
            const options: Object = {
                page: 'campaigns',
                message: 'This is the Campaign Page',
                user: req.session!.user,
                campaigns: campaigns
            };
            //render template
            this.render(req, res, 'campaigns', options);
        })
          .catch(error => {
            console.log(error.message);
        });
    }

    /**
     * Redirect without id
     * This is the page for a specific campaign
     *
     * @class CampaignsRoute
     * @method redirectCampaignPage
     * @param req {Request} The express Request object.
     * @param res {Response} The express Response object.
     * @param next {NextFunction} Execute the next method.
     */
    async redirectCampaignPage(req: Request, res: Response, next: NextFunction) {
        console.log(req.params);
        Campaign.getCampaign(req.params.id).then(campaign => {
            if (campaign) {
                console.log('Got Campaign:\n' + JSON.stringify(campaign, null, 4));
                req.session!.campaign = campaign;
                this.redirect(res, ('/campaign/' + campaign.name));
            } else {
                res.locals.message = 'Campaign ' + req.params.name + ' (id: ' + req.params.id + ' ) Not Found';
                res.status(404);
            }
        }).catch(error => {
          console.log(error.message);
      });
    }

    /**
     * Create campaign route
     * This is the page for a specific campaign
     *
     * @class CampaignsRoute
     * @method renderCampaignPage
     * @param req {Request} The express Request object.
     * @param res {Response} The express Response object.
     * @param next {NextFunction} Execute the next method.
     */
    renderCampaignPage(req: Request, res: Response, next: NextFunction) {
        // unable to create campaign
        this.title = req.params.name;
        //set message
        const options: Object = {
            page: 'campaigns',
            message: 'Campaign Page'
        };
        //render template
        this.render(req, res, 'campaign', options);
    }

    /**
     * Create campaign details page
     * This is the page for a specific campaign
     *
     * @class CampaignsRoute
     * @method renderCampaignDetailsPage
     * @param req {Request} The express Request object.
     * @param res {Response} The express Response object.
     * @param next {NextFunction} Execute the next method.
     */
    renderCampaignDetailsPage(req: Request, res: Response, next: NextFunction) {
        // unable to create campaign
        this.title = req.params.name + ' | Details';
        //set message
        const options: Object = {
            page: 'campaigns',
            message: 'Details Page'
        };
        //render template
        this.render(req, res, 'campaign_details', options);
    }

    /**
     * Attempts to get certain campaign and then renders its page
     *
     * @class CampaignsRoute
     * @method createCampaign
     * @param req {Request} The express Request object.
     * @param res {Response} The express Response object.
     * @param next {NextFunction} Execute the next method.
     */
    async createCampaign(req: Request, res: Response, next: NextFunction) {
        console.log(req.body);
        Campaign.createCampaign(req.session!.user.id, req.body.name, req.body.description)
          .then(result => {
            if (result.success) {
                console.log('Created Campaign');
                this.redirect(res, '/campaigns');
                // successfull
            } else {
                console.log('Campaign not created, error: ' + result.message);
                // unable to create campaign
                this.title = 'Campaigns Page';
                //set message
                const options: Object = {
                    page: 'campaigns',
                    create: true,
                    error: true,
                    message: result.message
                };
                //render template
                this.render(req, res, 'campaigns', options);
            }
        })
          .catch(error => {
          console.log(error.message);
          });
    }

    /**
     * Updates the campaign through the campaign model
     *
     * @class CampaignsRoute
     * @method updateCampaign
     * @param req {Request} The express Request object.
     * @param res {Response} The express Response object.
     * @param next {NextFunction} Execute the next method.
     */
    async updateCampaign(req: Request, res: Response, next: NextFunction) {
        const campaign: CampaignInterface = {
            id: req.session!.campaign.id,
            name: req.body.name,
            worldTime: req.body.worldTime,
            description: req.body.description
        };
        Campaign.editCampaign(campaign)
          .then(result => {
            if (result.success) {
                req.session!.campaign = campaign;
                req.session!.message = 'campaign updated';
            } else {
                req.session!.message = result.message;
            }
            this.redirect(res, '/campaign/' + req.session!.campaign.name + '/details');
        })
          .catch(error => {
            console.log(error.message);
          });
    }

    /**
     * Deletes the campaign through the campaign model
     *
     * @class CampaignsRoute
     * @method deleteCampaign
     * @param req {Request} The express Request object.
     * @param res {Response} The express Response object.
     * @param next {NextFunction} Execute the next method.
     */
    async deleteCampaign(req: Request, res: Response, next: NextFunction) {
        Campaign.deleteCampaign(req.session!.campaign.id)
          .then(result => {
            if (result.success) {
                delete req.session!.campaign;
                this.redirect(res, '/campaigns');
            } else {
                req.session!.message = result.message;
                this.redirect(res, '/campaign/' + req.session!.campaign.name + '/details');
            }
        })
          .catch(error => {
            console.log(error.message);
          });
    }
}
