/**
 * Mock Collections to test models with
 */

import mongodb from 'mongodb';

const mockUsers: Array<any> =
[
    {
        '_id': '1',
        'username': 'fullUser',
        'password': 'password',
        'firstName': 'Full',
        'lastName': 'User'
    },
    {
        '_id': new mongodb.ObjectId('654321654321654321654321'),
        'username': 'anotherUser',
        'password': 'password'

    },
    {
        '_id': new mongodb.ObjectId('abcdef123456123456abcdef'),
        'username': 'lastUser',
        'password': 'password',
        'firstName': 'User'
    }
];

const mockCampaigns: Array<any> = [
    {
        '_id': new mongodb.ObjectId('5dafb8ce1c9d340000c3b63a'),
        'userId': new mongodb.ObjectId('abcdef123456123456abcdef'),
        'name': 'Campaign 1',
        'worldTime': new Date('Thu Oct 24 2019 04:00:04 GMT-0700 (Pacific Daylight Time)'),
        'description': 'A campaign that is good.'
    },
    {
        '_id': new mongodb.ObjectId('5dafb8ce1c9d440010c3b63a'),
        'userId': new mongodb.ObjectId('abcdef123456123456abffff'),
        'name': 'Campaign 2',
        'worldTime': new Date('Thu Oct 25 2019 04:00:04 GMT-0700 (Pacific Daylight Time)'),
        'description': 'A campaign that is okay.'
    },
    {
        '_id': new mongodb.ObjectId('5dbfb8ce1c9d440000c3b63a'),
        'userId': new mongodb.ObjectId('abcdef123456123456abcdef'),
        'name': 'Campaign 3',
        'worldTime': new Date('Thu Oct 26 2019 04:00:04 GMT-0700 (Pacific Daylight Time)')
    },
    {
        '_id': new mongodb.ObjectId('5dafb8ce1c9d340000c3b63b'),
        'userId': new mongodb.ObjectId('abcdef12345612e456abceef'),
        'name': 'Campaign 4',
        'worldTime': new Date('Thu Oct 27 2019 04:00:04 GMT-0700 (Pacific Daylight Time)')
    }
];
export = {
    mockUsers,
    mockCampaigns
};
