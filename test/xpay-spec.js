/* eslint-env jasmine */

'use strict';

describe('xpay integration', function() {

  var xpay = require('../index')({
    XPAY_KEY: '123456789012345678901',
    XPAY_ALIAS: '7654321',
    XPAY_RETURN_URL_OK: 'http://www.google.com',
    XPAY_RETURN_URL_KO: 'http://www.bing.com',
  });


  it('should get a url', function(done) {
    var args = {
      transactionCode: 'ABC123000001',
      quantity: 1000 // 10 euro
    };

    var mac;

var res = xpay(args.transactionCode, args.quantity, mac);
    expect(res).toBeDefined();
    // TODO: think about more testing
    console.log(res);
    done();
  });

});
