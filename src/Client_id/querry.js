const compare ="SELECT * FROM oauth";
const loginSQ="INSERT INTO oauth(email) Values($1)";

module.exports = {
    compare,
    loginSQ
};