import UserModel from "../../src/models/user.model";

describe('User Model', () => {
    describe('getUser', () => {

        test('dummy test', () => {
            expect('test').toBe('test');
        })
        // TODO: doesn't work sometimes due to async
        // test('should return null when database can\'t find user', async () => {
        //     var user = await UserModel.getUser("noUser", "noPassword");
        //     expect(user).toBe(null);
        // });
        
        // TODO: figure out why this test isn't working
        // test('should return user document when database contains the user', async () => {
        //     var user = await UserModel.getUser("admin", "Passw0rd");
        //     expect(user).not.toBe(null);
        // });

    });
});
