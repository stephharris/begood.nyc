/*
    These environment variables are not hardcoded so as not to put production information in a repo. They should be set in heroku configuration to be set in the
    applications environment, along with NODE_ENV=production
 */

module.exports = {
    DATABASE_URL: process.env.DATABASE_URL,
    SESSION_SECRET: process.env.SESSION_SECRET
};
