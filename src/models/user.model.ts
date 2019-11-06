/**
 * user model
 */
import mongodb from 'mongodb';

import DbClient from '../DbClient';

import { ReturnObject } from './common.interface';
import { UserInterface } from './user.interface';

class User {

    /**
     * Gets all users
     * Note: USED FOR DEBUGGING AND TESTING, NOT FOR APP
     */
    async getUsers() {
        const db: mongodb.Db | undefined = await DbClient.connect();
        return await db!.collection('users').find().toArray();
    }

    /**
     * Attempts to query the database for a user
     * @param {string} username - the username used to query for the user
     * @param {string} password - the password used to query for the user
     * @returns {userInterface | null} - returns a user if found, or null if not
     */
    async getUser(username: string, password: string) {
        let user: UserInterface | null = null;
        try {
            const db: mongodb.Db | undefined = await DbClient.connect();
            try {
                const result: any = await db!.collection('users').findOne({
                    username: username,
                    password: password
                });
                if (result) {
                    user = {
                        firstName: result.firstName,
                        lastName: result.lastName,
                        id: result._id,
                        username: result.username
                    };
                }
            } catch ( error ) {
                console.log(error);
                return null;
            }
        } catch ( error ) {
            console.log(error);
            return null;
        }
        return user;
    }

    /**
     * Attempts to create a user in the database,
     * @param {string} username - the username to be assigned to the created user
     * @param {string} password - the password to be assigned to the created user
     * @returns {ReturnObject} - returns an object that contains a boolean for success and an associated message
     */
    async createUser(username: string, password: string) {
        const ret: ReturnObject = { success: false, message: '' };
        const db: mongodb.Db | undefined = await DbClient.connect();
        const result = await db!.collection('users').findOne({
            username: username
        });
        if (result) {
            ret.success = false;
            ret.message = 'Username already taken.';
        } else {
            try {
                await db!.collection('users').insertOne({
                    username: username,
                    password: password
                });
                ret.success = true;
                ret.message = 'User created.';
            } catch (e) {
                console.log(e);
                ret.success = false;
                ret.message = 'Server error, try again later';
            }
        }
        return ret;
    }

    /**
     * Attempts to delete a user in the database,
     * @param {string} userID - the user Id used to find the item to delete
     * @returns {ReturnObject} - returns an object that contains a boolean for success and an associated message
     */
    async deleteUser(userID: string) {
        const ret: ReturnObject = { success: false, message: '' };
        const id: mongodb.ObjectId = new mongodb.ObjectId(userID);
        const db: mongodb.Db | undefined = await DbClient.connect();
        try {
            const write = await db!.collection('users').deleteOne({ _id: id });
            if (write.deletedCount === 1 && write.result.ok === 1) {
                ret.success = true;
                ret.message = 'User deleted.';
            } else {
                ret.success = false;
                ret.message = 'Invalid User.';
            }
        } catch (error) {
            console.log(error.message);
            ret.success = false;
            ret.message = 'Server error, try again later.';
        }
        return ret;
    }

    /**
     * Attempts to edit a user in the database,
     * @param {userInterface} user - the User containing its id along with the fields to update
     * @returns {ReturnObject} - returns an object that contains a boolean for success and an associated message
     */
    async editUser(user: UserInterface) {
        const ret: ReturnObject = { success: false, message: '' };
        const id: mongodb.ObjectId = new mongodb.ObjectId(user.id);
        const db: mongodb.Db | undefined = await DbClient.connect();
        try {
            const write = await db!.collection('users').updateOne(
                { _id: id },
                {
                    $set: {
                        firstName: user.firstName,
                        lastName: user.lastName,
                        username: user.username
                    }
                }
            );
            if (write.matchedCount === 1 && write.modifiedCount === 1) {
                ret.success = true;
                ret.message = 'User updated.';
            } else if (write.matchedCount === 0) {
                console.log(write.result);
                ret.success = false;
                ret.message = 'Invalid User.';
            } else {
                ret.success = false;
                ret.message = 'User not updated.';
            }
        } catch (error) {
            console.log(error.message);
            ret.success = false;
            ret.message = 'Server error, try again later.';
        }
        return ret;
    }
}

export = new User();
