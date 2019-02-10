/**
 * Configuration for server's information that Should NOT be exposed.
 * All configuration should be written in this file.
 *
 * This file is added to '.gitignore' file.
 * Don't git add config.js
*/

/**
 * Configuration for Development step.
 */
const dev_config = {
    connectionString: 'postgresql://<db_user>:<secret_password>@<database.server.com>:<port>/<my_db>'
};

/**
 * Configuration for Deployment step.
 */
// const config = {
//     connectionString: 'postgresql://<db_user>:<secret_password>@<database.server.com>:<port>/<my_db>'
// };

module.exports = {
    config: dev_config
};