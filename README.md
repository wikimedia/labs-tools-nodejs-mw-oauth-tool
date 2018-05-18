# nodejs-mediawiki-oauth-tool

This git repository contains the source code for a basic Node.js webservice. It shows how to use the passport-mediawiki-oauth package to manage OAuth authentication with a MediaWiki server. 

Development
-----------
```
$ git clone https://github.com/srish/nodejs-mediawiki-oauth-tool 
$ cd nodejs-mediawiki-oauth-tool
$ npm install 
Copy config.example.js as config.js and enter your details
$ node server.js
```

For production
--------------
The bot is hosted here on Wikimedia's Toolforge: https://tools.wmflabs.org/nodejs-mw-oauth-tool. To make changes:
``` 
$ ssh username@login.tools.wmflabs.org
$ become nodejs-mw-oauth-tool
$ cd /www/js
```

Credits 
-------
* [Passport MediaWiki OAuth npm module by Dan Andreescu](https://www.npmjs.com/package/passport-mediawiki-oauth)
