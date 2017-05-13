"use strict";
var crypto = require('crypto');
var sharedSecret = crypto.randomBytes(256);
var initializationVector = crypto.randomBytes(256);
var algorithm = 'aes-256-ctr';

module.exports = {
  encrypt : function(text, password) {
    var cipher = crypto.createCipher(algorithm,password)
    var crypted = cipher.update(text,'utf8','hex')
    crypted += cipher.final('hex');
    return crypted;
  },

  decrypt: function(text, password) {
    var decipher = crypto.createDecipher(algorithm,password)
    var dec = decipher.update(text,'hex','utf8')
    dec += decipher.final('utf8');
    return dec;
  }
}
