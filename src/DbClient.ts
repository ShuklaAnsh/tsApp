/**
 * DbClient
 */
import { Db, MongoClient } from 'mongodb';

class DbClient {
    private db!: Db;
    private client!: MongoClient;

    /**
     * Attempt to asynchronously connect to db
     */
    async connect() {
        try {
            if (this.client && this.client.isConnected()) {
                return this.db;
            } else {
                const MongoClient = require('mongodb').MongoClient;
                const url: string | undefined = process.env.MONGO_URL;
                console.log({ MONGO_URL: url });
                this.client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
                console.log('Attempting to connect...');
                await this.client.connect();
                this.db = this.client.db('Creatures&Caves');
                console.log('Connected to Database');
                return this.db;
            }
        } catch (e) {
            console.log('Unable to connect to db, error: ' + e);
        }
    }

    /**
     * Attempt to  close connection to db
     */
    async disconnect() {
        await this.client.close();
    }
}

export = new DbClient();
