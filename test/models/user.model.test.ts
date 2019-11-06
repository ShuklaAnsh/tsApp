/**
 * Test suite for User Model
 */
import mongoUnit from 'mongo-unit';

import { ReturnObject } from '../../src/models/common.interface';
import mockCollections from '../mockCollections';
import { UserInterface } from '../../src/models/user.interface';
import UserModel from '../../src/models/user.model';

const mockUsers: any = mockCollections.mockUsers;

beforeAll(async() => {
    const mongoTestUrl: string = await mongoUnit.start({ 
        dbName: 'Creatures&Caves',
        verbose: true
    });
    process.env.MONGO_URL = mongoTestUrl;
    console.log('Mock MongoClient started at -> ' + mongoTestUrl);
    console.log('mock users collection\n' + JSON.stringify(mockUsers, null, 4));
});

describe('User Model', () => {

    beforeEach(async() => {
        //reset mock collection
        await mongoUnit.load(mockUsers);
    });

    afterEach(async () => {
        //drop mock collection to disgard changes
        await mongoUnit.drop();
    });

    describe('getUser', () => {

        test('getUsers debug funtion should work', async() => {
            const users: any[] = await UserModel.getUsers();
            expect(users.length).toEqual(mockUsers.users.length);
            expect(users[0].username).toEqual('fullUser');
        });

        test('should get a valid user', async () => {
            const user: UserInterface | null = await UserModel.getUser('fullUser', 'password');
            const expectedData: UserInterface = {
                id: '1',
                username: 'fullUser',
                firstName: 'Full',
                lastName: 'User'
            };
            expect(user).toEqual(expectedData);
        });

        test('should return null when database can\'t find user', async () => {
            const user: UserInterface | null = await UserModel.getUser('noUser', 'noPassword');
            expect(user).toBe(null);
        });
    });

    describe('createUser', () => {

        test('should create a valid user', async() => {
            const result: ReturnObject = await UserModel.createUser('newUser', 'password');
            const expectedData: ReturnObject = {
                success: true,
                message: 'User created.'
            };
            expect(result).toEqual(expectedData);
            const users: UserInterface[] = await UserModel.getUsers();
            const createdUser: UserInterface = users[users.length - 1];
            expect(createdUser.username).toEqual('newUser');
            expect(createdUser.password).toEqual('password');
        });

        test('should reject when database has existing user', async () => {
            const result: ReturnObject = await UserModel.createUser('fullUser', 'password');
            const expectedData: ReturnObject = {
                success: false,
                message: 'Username already taken.'
            };
            expect(result).toEqual(expectedData);
        });
    });

    describe('editUser', () => {

        test('should edit a valid user', async() => {
            const user: UserInterface = {
                id: 'abcdef123456123456abcdef',
                username: 'newUser',
                firstName: 'Edited',
                lastName: 'User'
            };
            const result: ReturnObject = await UserModel.editUser(user);
            const expectedData: ReturnObject = {
                success: true,
                message: 'User updated.'
            };
            expect(result).toEqual(expectedData);
            const users: UserInterface[] = await UserModel.getUsers();
            const createdUser: UserInterface = users[users.length - 1];
            expect(createdUser.username).toEqual('newUser');
        });

        test('should not edit an non-existant user', async() => {
            const user: UserInterface = {
                id: '000000000000',
                username: 'doesn\'t exist'
            };
            const result: ReturnObject = await UserModel.editUser(user);
            const expectedData: ReturnObject = {
                success: false,
                message: 'Invalid User.'
            };
            expect(result).toEqual(expectedData);
        });
    });

    describe('deleteUser', () => {

        test('should delete a valid user', async() => {
            const result: ReturnObject = await UserModel.deleteUser('abcdef123456123456abcdef');
            const expectedData: ReturnObject = {
                success: true,
                message: 'User deleted.'
            };
            expect(result).toEqual(expectedData);
        });

        test('should not delete a non-existant user', async() => {
            const result: ReturnObject = await UserModel.deleteUser('000000000000');
            const expectedData: ReturnObject = {
                success: false,
                message: 'Invalid User.'
            };
            expect(result).toEqual(expectedData);
        });
    });

    afterAll(async() => {
        try {
            await mongoUnit.stop();
        } catch (error) {
            console.log(error);
        }
    });
});
