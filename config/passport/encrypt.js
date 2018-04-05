const bcrypt = require("bcrypt");

module.exports = {
    getHash: (password) => {
        // var Hash;
        // bcrypt.hash(password, saltRounds, function(err, hash) {
        //     if (err) throw err;
        //     Hash = hash;
        //   });
        let saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const Hash = bcrypt.hashSync(password, salt);

        return Hash;
    },

    checkHash: (password, hash) => {
        // var check;
        // bcrypt.compare(password, hash, function(err, res) {
        //     if (err) throw err;
        //     check = res;
        // });

        var check = bcrypt.compareSync(password, hash);

        return check;
    }

}