import { userInterface } from "../../src/models/user.interface";

describe('uesrInterface', () => {
    
    it('defines user properties', () => {
        var user : userInterface = {
            username: "test",
            firstName: "test",
            lastName: "test",
            id: "test"
        };
        expect(typeof user.username).toEqual("string");
        expect(typeof user.firstName).toEqual("string");
        expect(typeof user.lastName).toEqual("string");
        expect(typeof user.id).toEqual("string");
    });

    it('doesn\'t have to have the "id" property defined', () => {
        var user : userInterface = {
            username: "test",
            firstName: "test",
            lastName: "test",
        };
        expect(typeof user.id).toBe("undefined");
    });
  });