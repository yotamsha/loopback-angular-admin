
# ePart App

## Try it now!

Deploy an instance on your Heroku account to play around with it!

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

An alternative way to get it running at Heroku is to install the [Heroku Toolbelt](https://toolbelt.heroku.com) and follow these steps:

```
git clone https://github.com/beeman/loopback-angular-admin.git my-project
cd my-project
heroku apps:create my-project
git push heroku master
```

## Users

After an installation the following users are created:

- **Admin user**: Email: ```admin@admin.com```, password: ```admin```
- **Regular user**: Email: ```user@user.com```:, password ```user```

Please note, at this moment there is no difference in permissions for admin users or regular users. This needs to change in the future!

## Features and implemented projects

- A LoopBack REST API with authentication enabled built on the [LoopBack Generator](https://www.npmjs.org/package/generator-loopback)
- A GUI built with AngularJS based on the [Angular Generator](https://github.com/yeoman/generator-angular)
- Angular UI-Router
- JSON-based forms by [angular-formly](https://formly-js.github.io/angular-formly/)
- Notifications by [angular-toasty](https://github.com/Salakar/angular-toasty)
- File upload with [LoopBack storage services](https://github.com/strongloop/loopback-component-storage/)
- Admin template powered by [almasaeed2010/AdminLTE](https://github.com/almasaeed2010/AdminLTE)
- Markdown Editor with live preview with [angular-markdown-editor](https://github.com/JimLiu/angular-markdown-editor)
- Bunch of useful filters for AngularJS: [a8m/angular-filter](https://github.com/a8m/angular-filter)
- [t4t5/sweetalert](https://github.com/t4t5/sweetalert) provided by [oitozero/ngSweetAlert](https://github.com/oitozero/ngSweetAlert)
- Automatically growing textarea's by [monospaced/angular-elastic](https://github.com/monospaced/angular-elastic)
- Social authentication with [LoopBack passport](https://github.com/strongloop/loopback-component-passport/)
- Multi-language support by [rubenv/angular-gettext](https://github.com/rubenv/angular-gettext)
- User management
- Loading indicators [chieffancypants/angular-loading-bar](https://github.com/chieffancypants/angular-loading-bar)?

## TODO (from original docs):

- Permissions on user actions (non-admins cannot access advanced functions)
- permissions on content items (non-admins can only edit own content, etc)
- Detect if API is online [HubSpot/offline](https://github.com/HubSpot/offline)?
- Map API roles to [Narzerus/angular-permission](https://github.com/Narzerus/angular-permission)
- Add tests
- Add Dockerfile
- Add Vagrantfile




## Installation

### Dependencies

Installation depends on `node`/`npm` with `grunt` and `bower` installed globally.

    $ npm install -g bower grunt-cli

### The one-liner install (please create an [issue](https://github.com/beeman/loopback-angular-admin/issues/new) if this one does not work!)

    git clone https://github.com/beeman/loopback-angular-admin.git && cd loopback-angular-admin && npm install && grunt build && grunt serve

### The steps above: 

### Checkout the project:

    git clone https://github.com/beeman/loopback-angular-admin.git

### Install the Node packages:

    npm install

### Run grunt build:

    grunt build
    
### Run grunt serve to start the API and frontend:

    grunt serve
    

## Running

The project is separated in a server and a client.

### Server

To run the server you issue the command:

    npm start

Or to run it with nodemon (needs `nodemon` installed globally). This will
automatically restart the server when you change its code:

    npm run dev

The command `grunt serve` explained below wil automatically start the API.

### Client

Rebuild the lb-services.js file with the correct `API_URL` for development.

    API_URL=http://0.0.0.0:3000/api grunt

To run the client you issue the command. This will also start the API.

    grunt serve

It will open the project in your default browser with livereload enabled.
This will take care of reloading the page when you change your code.

## Translations

We are using a translations lib called [angular-gettext](https://angular-gettext.rocketeer.be/dev-guide/)
- Download Poedit, that's the software we'll be using to translate the texts.
- First, detect all the locations of changes by running:

      grunt gettext
      
- Then, Open the lang.po file in Poedit, OR if file is already opened in Poedit, choose > Catalog > Update from POT file..
- Translate your texts.
- Run `grunt gettext` again.
    
## Connect to a database

You can specify the URL to the MongoDB database you want to use with the `MONGODB_URL` environment variable.

    MONGODB_URL="mongodb://localhost:27017/loopback-angular-admin" npm start

If you use mysql or postgres, you'll need to setup the tables first. in order to do so, you can run `node auto-migrate` (Make sure
all the relevant tables are there).

Set `INITDB` to true if you want to load the initial dataset, which creates the admin user. The memory database (default) does this automatically.
    In windows:
    Set INITDB=true
    grunt serve

    Linux
    INITDB=true MONGODB_URL="mongodb://localhost:27017/loopback-angular-admin" npm start

This also works with the free hosted MongoDB instances at [compose.io](https://www.compose.io) and [mongolab.com](https://mongolab.com)!

## API Security

**WARNING: Most models don't have an ACL configured. This means that anyone with access to the API can edit most of it's content.**

To access models with access control enable you need an AccessToken. You can get an access token by logging in to the API.

To ease development you can create an AccessToken while starting the server by setting the DEV_ACCESS_TOKEN environment variable. 

    DEV_ACCESS_TOKEN=MySecretToken npm run dev

## Development

If you want to share your work through a Pull Request, be sure to make it a clean branch (one functionality per PR) and base it off master.

If you plan on making a big change or replace a core function with something else it is probably best to first open an issue to discuss it with me. This will enhance the chance of the eventual changes getting merged a lot :)

The API is built with [generator-loopback](https://www.npmjs.org/package/generator-loopback).

The GUI is built with [generator-angular](https://www.npmjs.org/package/generator-angular) but is no longer compatible due to refactoring the project into modules.

These should help you quickly add code to your project. Further details tailored to this project might follow in the future.


## Client Unit Testing using Karma/Jasmine

    $ node_modules/.bin/karma start client/test/karma.conf.js

    INFO [karma]: Karma v0.12.31 server started at http://localhost:8080/
    INFO [launcher]: Starting browser PhantomJS
    INFO [PhantomJS 1.9.8 (Linux)]: Connected on socket aLJmRuSNUH2rPfpWgS3l with id 89641972
    PhantomJS 1.9.8 (Linux): Executed 1 of 1 SUCCESS (0.007 secs / 0.029 secs)

## Server Unit Testing using Karma/Jasmine
- Windows:

      SET NODE_ENV=test
      npm test
    
- Linux / Mac:
    
        NODE_ENV=test
        npm test

### Useful commits

These commits might be useful when extending the functionality.

- [Add support for MongoDB databases](https://github.com/beeman/loopback-angular-admin/commit/6b884e601d535ed64b4ef4f6f07e0f55d357a5b6)
- [Add custom method to the API](https://github.com/beeman/loopback-angular-admin/commit/eedbd03f755ddf2234872886ee390ac4f6753c64)
- [Rename a model](https://github.com/beeman/loopback-angular-admin/commit/88254ce59af29818aec900514693e3fe6c94acea)

### WebSockets / socket.io

At this moment there is no integration for socket.io or websockets, nor will there be in the near future. Once LoopBack has integrated support for it we will leverage from that.

Having that said, it's certainly possible to integrate socket.io, check [this](https://github.com/beeman/loopback-angular-admin/pull/44) pull request by [@movibe](https://github.com/movibe).

# Related Projects

Here are some projects that are related to what this project does. Please send a PR or create an issue if you have any additions to this list.

- [BoLaMN/loopback-component-admin](https://github.com/BoLaMN/loopback-component-admin) 
- [johannesjo/generator-angular-auto-admin-loopback](https://github.com/johannesjo/generator-angular-auto-admin-loopback)

# Issues

If you have any problems please [contact me](https://github.com/beeman/loopback-angular-admin/issues/new).
