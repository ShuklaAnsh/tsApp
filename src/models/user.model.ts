import DbClient = require("../DbClient");
import { userInterface } from "./user.interface";

class User {
    async getUser(username: string, password: string){
        let user : userInterface | null = null;
        await DbClient.connect()
        .then((db) => {
            return db!.collection("users").findOne({
                username: username,
                password: password,
            });
        })
        .then((result : any) => {
            if(result){
                user = {    
                    firstName : result.firstName,
                    lastName : result.lastName,
                    id : result.id,
                    username : result.firstName
                };
            };
        })
        .catch((error) => {
            console.log(error.message);
        });
        return user;
    }    

    async createUser(newUser : userInterface) {

    }

    async deleteUser(userID : string){

    }
    
    async editUser(user : userInterface){

    }
}

export = new User();