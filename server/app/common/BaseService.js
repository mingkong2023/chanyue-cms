const knex = require("../config/config.knex.js");
const config = require("../config/config.js");
const helper = require("../extend/helper.js");
class BaseService {
    static knex = knex;
    static config = config;
    static helper = helper;
}
module.exports = BaseService;