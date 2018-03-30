/**
 * Created by Michael M. Simon on 3/24/2018.
 */
/**
 * Asynchronous db head encryption using crypto andom bytes.
 * check nodejs/API's/randombytes for reference
 */
let secret;
const crypto = require('crypto');

try {
    secret = crypto.randomBytes(256).toString('hex');
} catch (err) {
    console.log('ERROR' + err.message);
}
//hash encrypted secret head
const hashedSecret = crypto.createHmac('sha256', secret)
    .update('DB')
    .digest('hex');

/**
 * export db head
 * this will be used inside server.js when connection to db
 */
module.exports = {
    uri: 'mongodb://localhost:27017/' + this.db,
    secret: hashedSecret,
    db: 'mean-stack-test'
};
