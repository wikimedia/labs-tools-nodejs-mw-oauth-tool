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

app.set( 'views', __dirname + '/public/views' )
app.set( 'view engine', 'ejs' )
app.use( express.static(__dirname + '/public/views') )

app.use( passport.initialize() );
app.use( passport.session() );

app.use( session({ secret: "OAuth Session",  
	saveUninitialized: true,
	resave: true
}) );

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

app.get( "/nodejs-mw-oauth-tool", function ( req, res ) {
	res.render( "index", {
		user: req.session.user
	} );
} );

app.get( "/nodejs-mw-oauth-tool/login", function ( req, res ) {
	res.redirect( "/nodejs-mw-oauth-tool/auth/mediawiki/callback" );
} );

app.get( "/nodejs-mw-oauth-tool/auth/mediawiki/callback", function( req, res, next ) {
	passport.authenticate( "mediawiki", function( err, user ) {
		if ( err ) { 
			return next( err ); 
		}

		if ( !user ) { 
			return res.redirect( "/nodejs-mw-oauth-tool/login" ); 
		}

		req.logIn( user, function( err ) {
			if ( err ) { 
				return next( err ); 
			}
			req.session.user = user;
			res.redirect( "/nodejs-mw-oauth-tool" );
		} );
	} )( req, res, next );
} );

app.get( "/nodejs-mw-oauth-tool/logout" , function ( req, res ) {
	delete req.session.user;
	res.redirect( "/nodejs-mw-oauth-tool" );
} );

app.listen( process.env.PORT || 5000, function () {
	console.log( "Node.js app listening on port 5000!" );
} );
