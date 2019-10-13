import {Server} from "../src/app";
//TODO: Actual test, below are basic tests to test jest
test("bootstraps application by creating a new Server", () => {
    expect(Server.bootstrap()).not.toBe(null);
});

test("2 + 1 should be 3", () => {
    expect(2 + 1).toBe(3);
});