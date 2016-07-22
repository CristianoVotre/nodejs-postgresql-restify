'use strict';

module.exports = {
  secure: {
    ssl: true,
    privateKey: './config/sslcerts/key.pem',
    certificate: './config/cert.pem'
  },
  port: 8081 || process.env.PORT || 3000
  // TODO Add common features to environments here...
};