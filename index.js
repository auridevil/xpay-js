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

const MODULE_NAME = 'xpay-nodejs';

/**
 * XPay Nexi Service
 */
class XPay {
    /**
     * class constructor
     */
    constructor(){

    }

    /**
     * init
     * @param configuration
     */
    configure(configuration){
        // init configuration
        configuration = configuration || {}; // init default, need to work on 5.7
        this._xpayConfiguration = underscore.extend(XPAY_CONF, configuration);
    }
    /**
     * get payment nexi xpay url
     * @param transactionCode, quantity, macCode
     */
    getUrl(options, macCode) {

        // calculate the mac
        let shasum = crypto.createHash('sha1');
        let hashpayload = util.format('codTrans=%sdivisa=%simporto=%s%s', options.codTrans, options.divisa, options.amount, this._xpayConfiguration.XPAY_KEY);
        shasum.update(hashpayload);
        macCode = shasum.digest('hex');

        // create the link
        let xpayLink = util.format(
            '%s?mac=%s&url_back=%s&alias=%s&url=%s&importo=%s&divisa=EUR&codTrans=%s',
            this._xpayConfiguration.XPAY_SERVLET_URL,
            macCode,
            this._xpayConfiguration.XPAY_RETURN_URL_KO,
            this._xpayConfiguration.XPAY_ALIAS,
            this._xpayConfiguration.XPAY_RETURN_URL_OK,
            options.amount,
            options.codTrans
        );

        // done
        return xpayLink;
    };

    /**
     * verify payment transaction
     * @param nexi response, macCode
     */
    verify(xpayResponse) {

        //check nexi response required params
        var requiredParams = ['codTrans', 'esito', 'importo', 'divisa', 'data', 'orario', 'codAut', 'mac'];
        var emptyParams = [];
        requiredParams.forEach(function(param, index){
            if (param in xpayResponse) {
                //continue
            }else{
                emptyParams.push(param);
            }
        });

        if(emptyParams.length>0) return false; //if not found params

        // calculate the mac
        let shasum = crypto.createHash('sha1');
        let hashpayload = util.format('codTrans=%sesito=%simporto=%sdivisa=%sdata=%sorario=%scodAut=%s%s',
            xpayResponse.codTrans, xpayResponse.esito, xpayResponse.importo, xpayResponse.divisa, xpayResponse.data, xpayResponse.orario, xpayResponse.codAut,
            this._xpayConfiguration.XPAY_KEY);
        shasum.update(hashpayload);
        var macCalculated = shasum.digest('hex');

        // Verifico corrispondenza tra MAC calcolato e MAC di ritorno
        if (macCalculated != xpayResponse.mac) {
            return false;
        }

        if (xpayResponse.esito == 'OK') {
            return true;
        } else {
            return false;
        }


    };



}

module.exports = XPay;