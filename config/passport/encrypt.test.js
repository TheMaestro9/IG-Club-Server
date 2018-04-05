const encrypt = require("./encrypt")

describe("Test the hash function", () => {

    // it("Get hash", () => {
    //     expect(encrypt.getHash("foo", 10))
    //     .toEqual('$2a$10$DYHKf6kAOmgNKJvBomjbe.o8U0EqFaQouno56GKzVrWUPNK/v2P52');
    // });

    it("check a valid hash", () => {
        expect(encrypt.checkHash("foo", '$2a$10$DYHKf6kAOmgNKJvBomjbe.o8U0EqFaQouno56GKzVrWUPNK/v2P52'))
        .toEqual(true);
    });

    it("check a wrong hash", () => {
        expect(encrypt.checkHash("bar", '$2a$10$DYHKf6kAOmgNKJvBomjbe.o8U0EqFaQouno56GKzVrWUPNK/v2P52'))
        .toEqual(false);
    });

});