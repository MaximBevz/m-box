const bcrypt = require('bcrypt');
const { errorMessages, ErrorHandler } = require("../errors");

module.exports = {
    compare: async (hashedPassword, password) => {
            const isPasswordMatched = await bcrypt.compare(password, hashedPassword);

        if(!isPasswordMatched) {
            throw new ErrorHandler(401, errorMessages.WRONG_EMAIL_OR_PASSWORD.message, errorMessages.WRONG_EMAIL_OR_PASSWORD.code);
        }
    },
    hash: (password) => bcrypt.hash(password, 10)
}
