const chalk = require('chalk');
const startup = require('../../config/startup');

var User = startup.database.sequelize.define('user', {
        username: startup.database.Sequelize.STRING,
        password: startup.database.Sequelize.STRING
    });
console.log(chalk.white('Sequelize User StartUp'));
// Sync all models
/*startup.database.sequelize
  .sync({ force: true })
  .then(function(err) {
    console.log('It worked!');
  }, function (err) { 
    console.log('An error occurred while creating the table:', err);
  });
*/
module.exports.User = User;