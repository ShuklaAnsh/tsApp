import DbClient = require("../DbClient");
import { userInterface } from "./user.interface";
import { resolve } from "url";

class User {
    user ?: userInterface;
    
    async getUser(username: String, password: String){
        await DbClient.connect()
        .then((db) => {
            return db!.collection("users").find({
                username: username,
                password: password,
            }).toArray();
        })
        .then((result : any) => {
            if(result.length === 0){
            } else{
                let user : userInterface = {    
                    firstName : result[0].firstName,
                    lastName : result[0].lastName,
                    id : result[0].id,
                    username : result[0].firstName
                };
                this.user = user;
            };
        })
        .catch((error) => {
            console.log(error.message);
        });
        return this.user;
    }    
}

export = new User();