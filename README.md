xpay-nexi-js
=================
Soft integration with Cartasì virtual POS X-pay (NEXI) payment system

Installation
=================
	npm install xpay-nexi-js

or clone:

	https://github.com/lBroth/xpay-nexi-js.git

Init
=================
The module can be directly configured or globaly configured.

Direct configuration:

    var XPay = require('xpay-nexi-js');
    var xpay = new XPay();
    xpay.configure({
        XPAY_KEY: '123456789012345678901',
        XPAY_ALIAS: '7654321',
        XPAY_RETURN_URL_OK: 'http://www.google.com',
        XPAY_RETURN_URL_KO: 'http://www.bing.com',
        XPAY_SERVLET_URL: 'https://int-ecommerce.nexi.it/ecomm/ecomm/DispatcherServlet',
    });

For the global configuration you must set the variables:

	XPAY_KEY: the key given by cartasi
	XPAY_ALIAS: the app alias given by cartasi
	XPAY_RETURN_URL_OK: your url to be called on ok
	XPAY_RETURN_URL_KO: your url to be called on back
	XPAY_SERVLET_URL: the xpay servelt url, default is pre-production enviroment 

and require simpler:
	
	var XPay = require('xpay-nexi-js');
	

Usage
=================
The init phase return a function, just invoke the function

	var macCode;
	var xpay = new XPay();
	var args = {
        codTrans: 'ABC123000001',
        amount: 1000 // 10 euro
    };
	var xpayLink = xpay.getUrl(args, macCode);
	
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
    
    var paid = xpay.verify(xpayResponse);
            
using the transactionCode you have generated and taking care of using the amount without decimals dot (e.g. 10€ = 1000). The mac is the generated code to be used in the url.

Improvements
=================
- Add production URL and a switch by configuration

Feel free to add any improvements and open a pull request.

Info
=================
For more infos about xpay watch https://www.nexi.it

Made with love by Auridevil & lBroth
