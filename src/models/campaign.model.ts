/**
 * Filename: campaign.model.ts
 * Campaign model class and methods.
 */
import mongodb from 'mongodb';

import DbClient = require('../DbClient');

import { CampaignInterface } from './campaign.interface';
import { ReturnObject } from './common.interface';

class Campaign {
    /**
     * Attempts to query the database for all campaigns for the current user
     * @param {string} userId - the userId used to query for campaigns
     * @returns {CampaignInterface[]} - returns a list of campaigns
     */
    async getCampaigns(userId: string)  {
        const campaigns: CampaignInterface[] = [];
        const db: mongodb.Db | undefined = await DbClient.connect();
        const userObjectId: mongodb.ObjectId = new mongodb.ObjectId(userId);
        try {

            const cursor: mongodb.Cursor = await db!.collection('campaigns').find({
                userId: userObjectId
            });
            if (cursor) {
                await cursor.forEach(doc => {
                    const campaign: CampaignInterface = {
                        id: doc._id,
                        userId: doc.userId,
                        name: doc.name,
                        description: doc.description,
                        worldTime: doc.worldTime
                    };
                    campaigns.push(campaign);
                });
            }
            return campaigns;
        } catch (error) {
            console.log(error.message);
            return [];
        }
    }

    /**
     * Attempts to query the database for ghe campaign with the given id
     * @param {string} campaignId - the campaignId used to query for campaigns
     * @returns {CampaignInterface | null} - returns the campaign if found, null otherwise
     */
    async getCampaign(campaignId: string) {
        let campaign: CampaignInterface | null = null;
        const db: mongodb.Db | undefined = await DbClient.connect();
        const campaignObjectId: mongodb.ObjectId = new mongodb.ObjectId(campaignId);
        try {

            const result = await db!.collection('campaigns').findOne({
                _id: campaignObjectId
            });
            if (result) {
                campaign = {
                    id: result._id,
                    userId: result.userId,
                    name: result.name,
                    description: result.description,
                    worldTime: result.worldTime
                };
            }
        } catch (error) {
            console.log(error.message);
        }
        return campaign;
    }

    /**
     * Attempts to create a campaign in the database,
     * @param {string} userId - the userId to be assigned to the created campaigns
     * @param {string} name - the name to be assigned to the created campaigns
     * @param {string} description - the description to be assigned to the created description
     * @returns {ReturnObject} - returns an object that contains a boolean for success and an associated message
     */
    async createCampaign(userId: string, name: string, description: string) {
        const ret: ReturnObject = { success: false, message: '' };
        const db: mongodb.Db | undefined = await DbClient.connect();
        const userObjectId: mongodb.ObjectId = new mongodb.ObjectId(userId);
        try {
            await db!.collection('campaigns').insertOne({
                userId: userObjectId,
                name: name,
                description: description,
                worldTime: Date()
            });
            ret.success = true;
            ret.message = 'Campaign created.';
        } catch (e) {
            console.log(e);
            ret.success = false;
            ret.message = 'Server error, try again later';
        }
        return ret;
    }

    /**
     * Attempts to edit a campaign in the database,
     * @param {CampaignInterface} campaign - the campaign containing its id along with the fields to update
     * @returns {ReturnObject} - returns an object that contains a boolean for success and an associated message
     */
    async editCampaign(campaign: CampaignInterface) {
        const ret: ReturnObject = { success: false, message: '' };
        const db: mongodb.Db | undefined = await DbClient.connect();
        const id: mongodb.ObjectId = new mongodb.ObjectId(campaign.id);
        try {
            const write = await db!.collection('campaigns').updateOne(
                { _id: id },
                {
                    $set: {
                        name: campaign.name,
                        description: campaign.description,
                        worldTime: Date() //firgure out how to convert string to Date
                    }
                }
            );
            if (write.matchedCount === 1 && write.modifiedCount === 1) {
                ret.success = true;
                ret.message = 'Campaign updated';
            } else {
                ret.success = false;
                ret.message = 'Campaign not updated';
            }
        } catch (error) {
            console.log(error.message);
            ret.success = false;
            ret.message = 'Server error, try again later.';
        }
        return ret;
    }

    /**
     * Attempts to delete a Campaign in the database,
     * @returns {ReturnObject} - returns an object that contains a boolean for success and an associated message
     * @param campaignID
     */
    async deleteCampaign(campaignID : string)  {
        const ret: ReturnObject = {success: false, message: ''};
        const db: mongodb.Db | undefined = await DbClient.connect();
        const id: mongodb.ObjectId = new mongodb.ObjectId(campaignID);
        try  {
            const write = await db!.collection('campaigns').deleteOne({_id: id});
            if (write.deletedCount === 1 && write.result.ok === 1) {
                ret.success = true;
                ret.message = 'Campaign deleted';
            } else {
                console.log('Unable to delete campaign with id: ' + campaignID);
                ret.success = false;
                ret.message = 'Campaign not deleted';
            }
        } catch (error)  {
            console.log(error.message);
            ret.success = false;
            ret.message = 'Server error, try again later.';
        }
        return ret;
    }
}

export = new Campaign();
