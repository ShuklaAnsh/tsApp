/**
 * Test suite for Campaign Model
 */

import mongodb from 'mongodb';

import { CampaignInterface } from '../../src/models/campaign.interface';
import CampaignModel from '../../src/models/campaign.model';
import DbClient from '../../src/DbClient';
import { ReturnObject } from '../../src/models/common.interface';
import mockCollections from '../mockCollections';

let db: mongodb.Db | undefined;
const mockCampaigns: any = mockCollections.mockCampaigns;

beforeAll(async () => {
    db = await DbClient.connect();
    await db!.createCollection('campaigns');
});

beforeEach(async () => {
    await db!.collection('campaigns').insertMany(mockCampaigns);
});

afterEach(async () => {
    await db!.collection('campaigns').deleteMany({});
});

describe('Campaign Model', () => {

    describe('getCampaign', () => {

        test('get all campaings linked to a certain user', async () => {
            const campaings: CampaignInterface[] = await CampaignModel.getCampaigns('abcdef123456123456abcdef');
            console.log(campaings);
            expect(campaings.length).toBe(2);
        });

        test('should retrieve a valid campaign', async () => {
            const campaign: CampaignInterface | null = await CampaignModel.getCampaign('5dafb8ce1c9d340000c3b63b');
            expect(campaign!.name).toEqual('Campaign 4');
        });

        test('should return null when db can\'t find campaign', async () => {
            const campaign: CampaignInterface | null = await CampaignModel.getCampaign('500150015001');
            expect(campaign).toBe(null);
        });

    });

    describe('createCampaign', () => {

        test('should create a valid campaign', async () => {
            const result: ReturnObject = await CampaignModel.createCampaign('500150015001', 'NewCampaign', 'This is new');
            const expectedData: ReturnObject = {
                success: true,
                message: 'Campaign created.'
            };
            expect(result).toEqual(expectedData);
            const campaigns: CampaignInterface[] = await CampaignModel.getCampaigns('500150015001');
            const createdCampaign: CampaignInterface = campaigns[campaigns.length - 1];
            expect(createdCampaign.name).toEqual('NewCampaign');
            expect(createdCampaign.description).toEqual('This is new');
            expect(typeof createdCampaign.worldTime).toBe(typeof Date());
        });

    });

    describe('editCampaign', () => {

        test('should edit a valid user', async () => {
            const campaign: CampaignInterface = {
                id: '5dafb8ce1c9d340000c3b63b',
                name: 'New Name',
                description: 'New Description',
                worldTime: new Date()
            };
            const result: ReturnObject = await CampaignModel.editCampaign(campaign);
            const expectedData: ReturnObject = {
                success: true,
                message: 'Campaign updated'
            };
            expect(result).toEqual(expectedData);
        });

        test('should not edit an non-existant campaign', async () => {
            const campaign: CampaignInterface = {
                id: '000000000000',
                name: 'name',
                description: 'description',
                worldTime: new Date()
            };
            const result: ReturnObject = await CampaignModel.editCampaign(campaign);
            const expectedData: ReturnObject = {
                success: false,
                message: 'Campaign not updated'
            };
            expect(result).toEqual(expectedData);
        });
    });

    describe('deleteCampaign', () => {

        test('should delete a valid campaign', async () => {
            const result: ReturnObject = await CampaignModel.deleteCampaign('5dafb8ce1c9d340000c3b63b');
            const expectedData: ReturnObject = {
                success: true,
                message: 'Campaign deleted'
            };
            expect(result).toEqual(expectedData);
        });

        test('should not delete a non-existant campaign', async () => {
            const result: ReturnObject = await CampaignModel.deleteCampaign('000000000000');
            const expectedData: ReturnObject = {
                success: false,
                message: 'Campaign not deleted'
            };
            expect(result).toEqual(expectedData);
        });
    });

    afterAll(async() => {
        try {
            await db!.dropCollection('campaigns');
            await DbClient.disconnect();
        } catch (error) {
            console.log(error);
        }
    });
});
