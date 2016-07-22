'use strict';

/**
 * Libraries.
 */
const chai = require('chai');
const should = chai.should();
const chalk = require('chalk');
const example = require('../../main/models/example');
const startup = require('../../config/startup');
//const Example = require('./example');

/**
 * Specs.
 */
var initFunction = function(done) {
  return example.User.sync({ force : true }).then( // drops table and re-creates it
      function() {
        done();
      }, function(error) {
        
      });
}

var insertFunction = function(index) {
      return example.User.create({
            username: 'user' + index,
            password: 'i-am-so-great'
            }).then(function(user) {
            });
      };

var findFunction = function(name) {
      console.time("find");
      return example.User.find({ 
        where: { username: 'user999' } })
            .then(function(user, err) {
            if (!user) {
                console.log('No user with the username ' + name + ' has been found.');
            } else {
                console.log('Hello ' + user.username + '!');
                console.log('All attributes of user:', user.get());
            }
            console.timeEnd("find");
        });
};

describe('Example', function() {
  
  before(function (done) {
    initFunction(done);
  });
  
  it('insert a registry in database', () => {
       
       var promises = [];
       for (var index = 0; index < 10000; index++) {
        promises.push(insertFunction(index));

       }
      return startup.database.Sequelize.Promise.all(promises);
  });

  it('find a registry in database', () => {
    var promises = [];
    promises.push(findFunction('john-doe999'));

    return startup.database.Sequelize.Promise.all(promises);
    });

  it('find a registry by key in database', (done) => {
     console.time("findById");
     example.User.find({ 
        where: { id: '4569' } })
            .then(function(user, err) {
            if (!user) {
                console.log('No user with the username ' + name + ' has been found.');
            } else {
                console.log('Hello ' + user.username + '!');
                console.log('All attributes of user:', user.get());
            }
            console.timeEnd("findById");
            done();
        });
    });

  afterEach(function(done) {
      console.log(chalk.white('After Test'));
      if (done) {
          done();
      }
  });

});