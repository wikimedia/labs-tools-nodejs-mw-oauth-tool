/* 

 This file is part of the Toolforge Node.js WSGI tutorial

 Copyright (C) 2018 Srishti Sethi and contributors

 This program is free software: you can redistribute it and/or modify it
 under the terms of the GNU General Public License as published by the Free
 Software Foundation, either version 3 of the License, or (at your option)
 any later version.

 This program is distributed in the hope that it will be useful, but WITHOUT
 ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for
 more details.

 You should have received a copy of the GNU General Public License along
 with this program.  If not, see <http://www.gnu.org/licenses/>.

*/

var express = require( "express" );
var session = require( "express-session" );
var passport = require( "passport" );
var MediaWikiStrategy = require( "passport-mediawiki-oauth" ).OAuthStrategy;
var config = require( "./config" );

var app = express();
var router = express.Router();

app.set( "views", __dirname + "/public/views" );
app.set( "view engine", "ejs" );
app.use( express.static(__dirname + "/public/views") );

app.use( passport.initialize() );
app.use( passport.session() );

app.use( session({ secret: "OAuth Session",  
	saveUninitialized: true,
	resave: true
}) );

app.use( "/nodejs-mw-oauth-tool", router );

passport.use(
	new MediaWikiStrategy({
		consumerKey: config.consumer_key,
		consumerSecret: config.consumer_secret
	},
	function ( token, tokenSecret, profile, done ) {
		profile.oauth = {
			consumer_key: config.consumer_key,
			consumer_secret: config.consumer_secret,
			token: token,
			token_secret: tokenSecret
		};
		return done( null, profile );
	}
	) );

passport.serializeUser(	function ( user, done ) {
	done( null, user );
});

passport.deserializeUser( function ( obj, done ) {
	done( null, obj );
});

router.get( "/", function ( req, res ) {
	res.render( "index", {
		user: req && req.session && req.session.user,
		url: req.baseUrl
	} );
} );

router.get( "/login", function ( req, res ) {
	res.redirect( req.baseUrl + "/auth/mediawiki/callback" );
} );
 
router.get( "/auth/mediawiki/callback", function( req, res, next ) {
	passport.authenticate( "mediawiki", function( err, user ) {
		if ( err ) { 
			return next( err ); 
		}

		if ( !user ) { 
			return res.redirect( req.baseUrl + "/login" ); 
		}

		req.logIn( user, function( err ) {
			if ( err ) { 
				return next( err ); 
			}
			req.session.user = user;
			res.redirect( req.baseUrl + "/" );
		} );
	} )( req, res, next );
} );

router.get( "/logout" , function ( req, res ) {
	delete req.session.user;
	res.redirect( req.baseUrl + "/" );
} );

app.listen( process.env.PORT || 5000, function () {
	console.log( "Node.js app listening on port 5000!" );
} );
