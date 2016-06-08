xpay-js
=================
Soft integration with Cartasì virtual POS X-pay payment system

Installation
=================
	npm install xpay-js

or clone:

	https://github.com/auridevil/xpay-js.git

Init
=================
The module can be directly configured or globaly configured.

Direct configuration:

  	var xpay = require('xpay-js')({
  	    XPAY_KEY: '123456789012345678901',
    	XPAY_ALIAS: '7654321',
    	XPAY_RETURN_URL_OK: 'http:/myserver/okrul',
    	XPAY_RETURN_URL_KO: 'http:/myserver/korul',
  	});

For the global configuration you must set the variables:

	XPAY_KEY: the key given by cartasi
	XPAY_ALIAS: the app alias given by cartasi
	XPAY_RETURN_URL_OK: your url to be called on ok
	XPAY_RETURN_URL_KO: your url to be called on back
	XPAY_SERVLET_URL: the xpay servelt url, default is pre-production enviroment 

and require simpler:
	
	var xpay = require('xpay-js')();

Usage
=================
The init phase return a function, just invoke the function

	var macCode;
	var xpayLink = xpay(transactionCode, transactionQuantity, mac);

using the transactionCode you have generated and taking care of using the quantity without decimals dot (e.g. 10€ = 1000). The mac is the generated code to be used in the url.

Improvements
=================
- Add production URL and a switch by configuration

Feel free to add any improvements and open a pull request.

Info
=================
For more infos about xpay watch http://www.cartasi.it/gtwpages/common/?id=OiRGdkfJWU
Made with love by Aureliano Bergese

Cheers by digitalx.
