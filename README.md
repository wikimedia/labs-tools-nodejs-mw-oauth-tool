# nodejs-mediawiki-oauth-tool

A basic Node.js webservice. It shows how to manage OAuth authentication with a MediaWiki server via the passport-mediawiki-oauth package

Developed for [My first NodeJS OAuth tool](https://wikitech.wikimedia.org/wiki/Help:Toolforge/My_first_NodeJS_OAuth_tool) tutorial on Wikitech. 

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
The tool is hosted here on Wikimedia's Toolforge: https://tools.wmflabs.org/nodejs-mw-oauth-tool. To make changes:
``` 
$ ssh username@login.tools.wmflabs.org
$ become nodejs-mw-oauth-tool
$ cd /www/js
```

Credits 
-------
* [Passport MediaWiki OAuth npm module by Dan Andreescu](https://www.npmjs.com/package/passport-mediawiki-oauth)
