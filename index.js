'use strict';

const crypto = require('crypto');
const util = require('util');
const underscore = require('underscore');
const XPAY_CONF = {
  XPAY_KEY: process.env.XPAY_KEY || 'ABCDEFGHILMNOPQRSTUVZ',
  XPAY_ALIAS: process.env.XPAY_ALIAS || '1234567',
  XPAY_RETURN_URL_OK: process.env.XPAY_RETURN_URL_OK || 'http://localhost:3000/ok',
  XPAY_RETURN_URL_KO: process.env.XPAY_RETURN_URL_KO || 'http://localhost:3000/ko',
  XPAY_SERVLET_URL: process.env.XPAY_SERVLET_URL || 'https://coll-ecommerce.keyclient.it/ecomm/ecomm/DispatcherServlet'
};

module.exports = function(configuration) {

  // init configuration
  configuration = configuration || {}; // init default, need to work on 5.7
  const xpayConfiguration = underscore.extend(configuration, XPAY_CONF);

  // get the url
  return function getUrl(transactionCode, quantity) {

    // calculate the mac
    let shasum = crypto.createHash('sha1');
    let hashpayload = util.format('codTrans=%sdivisa=EURimporto=%s%s', transactionCode, quantity, xpayConfiguration.XPAY_KEY);
    shasum.update(hashpayload);
    let macCode = shasum.digest('hex');

    // create the link
    let xpayLink = util.format(
      '%s?mac=%s&url_back=%s&alias=%s&url=%s&importo=%s&divisa=EUR&codTrans=%s',
      xpayConfiguration.XPAY_SERVLET_URL,
      macCode,
      xpayConfiguration.XPAY_RETURN_URL_KO,
      xpayConfiguration.XPAY_ALIAS,
      xpayConfiguration.XPAY_RETURN_URL_OK,
      quantity,
      transactionCode
    );
    // done
    return xpayLink;
  };
}
