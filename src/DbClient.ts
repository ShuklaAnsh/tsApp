import { MongoClient, Db } from 'mongodb';

class DbClient {
    public db!: Db;
    private client!: MongoClient;

    /**
     * Attempt to asynchronously connect to db
     */
    async connect(){
        try{
            const MongoClient = require('mongodb').MongoClient;
            const uri = "mongodb+srv://admin:Passw0rd@cluster0-ljzjx.mongodb.net/admin?retryWrites=true&w=majority";
            this.client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
            console.log("Attempting to connect...");
            await this.client.connect();
            this.db = this.client.db("Creatures&Caves");
            console.log("Connected to Database");
            return this.db;
        } catch (e) {
            console.log("Unable to connect to db, error: " + e);
        }
    }

    /**
     * Attempt to  close connection to db
     */
    async disconnect(){
        await this.client.close();
    }
}

export = new DbClient();