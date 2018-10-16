/* eslint-env jasmine */

'use strict';


describe('xpay get payment url', function() {

    var XPay = require('../index.js');
    var xpay = new XPay();

    xpay.configure({
        XPAY_KEY: 'XPAY_KEY',
        XPAY_ALIAS: 'ALIAS_WEB_TEST',
        XPAY_RETURN_URL_OK: 'http://www.google.com',
        XPAY_RETURN_URL_KO: 'http://www.bing.com',
        XPAY_SERVLET_URL: 'https://int-ecommerce.nexi.it/ecomm/ecomm/DispatcherServlet',
    });


    it('should get a url', function(done) {
        var args = {
            codTrans: 'ABC123000001',
            amount: 1000 // 10 euro
        };

        var mac;

        var res = xpay.getUrl(args, mac);
        expect(res).toBeDefined();
        // TODO: think about more testing
        console.log(res);
        done();
    });
});


describe('xpay verify payment', function() {

    var XPay = require('../index.js');
    var xpay = new XPay();

    xpay.configure({
        XPAY_KEY: 'XPAY_KEY',
        XPAY_ALIAS: 'ALIAS_WEB_TEST',

    });

    it('matches a Boolean', function(done) {
        var xpayResponse = {
            codTrans:'ABC123000001',
            esito:'OK',
            importo:1000,
            divisa:'EUR',
            data:'20181015',
            orario:'235711',
            codAut:'CODAUTH',
            mac:'MAC',
        };

        var res = xpay.verify(xpayResponse);
        expect(res).toMatch(/true|false/)
        // TODO: think about more testing
        done();
    });
});

