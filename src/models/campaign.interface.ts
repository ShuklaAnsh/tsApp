/*
Filename: campaign.interface.ts

Interface for campaigns

 */

export interface CampaignInterface {
    id: string;
    userId?: string;
    name: string;
    worldTime: Date;
    description?: string;
}
