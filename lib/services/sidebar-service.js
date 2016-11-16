'use strict';

var events = require('events');
var util = require('util');
var fs = require('fs');
var path = require('path');

var Devebot = require('devebot');
var Promise = Devebot.require('bluebird');
var lodash = Devebot.require('lodash');
var debug = Devebot.require('debug');
var debuglog = debug('appSidebar:service');

var cheerio = require('cheerio');
var interceptor = require('express-interceptor');

var Service = function(params) {
  debuglog.isEnabled && debuglog(', constructor begin ...');

  params = params || {};

  var self = this;

  self.logger = params.loggingFactory.getLogger();

  self.getSandboxName = function() {
    return params.sandboxName;
  };

  var pluginCfg = lodash.get(params, ['sandboxConfig', 'plugins', 'appSidebar'], {});
  debuglog.isEnabled && debuglog(' - appSidebar config: %s', JSON.stringify(pluginCfg));

  self.buildInjectorRouter = function(express) {
    var router = new express();

    var cssLinkTag = [
      "",
      "<link href='assets/sidebar/css/style.css' rel='stylesheet' type='text/css'/>",
      "<link href='http://fonts.googleapis.com/css?family=Roboto' rel='stylesheet' type='text/css'/>",
      "<link href='http://netdna.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css' rel='stylesheet'/>",
      ""
    ].join('\n');

    var scriptTag = [
      '',
      '<div class="micejs-sidebar">',
      '  <button class="btn-nav">',
      '    <div class="bar arrow-top-r"></div>',
      '    <div class="bar arrow-middle-r"></div>',
      '    <div class="bar arrow-bottom-r"></div>',
      '  </button>',
      '  <nav class="nav-container hidden hide-nav">',
      '    <ul class="nav-list">',
      '      <li class="list-item"><a href="#"><i class="fa fa-home"></i></a></li>',
      '      <li class="list-item"><a href="#"><i class="fa fa-credit-card-alt"></i></a></li>',
      '      <li class="list-item"><a href="#"><i class="fa fa-usb"></i></a></li>',
      '      <li class="list-item"><a href="#"><i class="fa fa-edge"></i></a></li>',
      '      <li class="list-item"><a href="#"><i class="fa fa-shopping-basket"></i></a></li>',
      '    </ul>',
      '  </nav>',
      '</div>',
      "<script src='http://code.jquery.com/jquery-2.1.4.min.js'></script>",
      "<script src='assets/sidebar/js/loader.js'></script>",
      ""
    ].join('\n');

    if (debuglog.isEnabled) {
      router.all('*', function(req, res, next) {
        debuglog.isEnabled && debuglog(' - before intercepting');
        next();
      });
    }

    router.use(interceptor(function(req, res) {
      return {
        isInterceptable: function(){
          return /text\/html/.test(res.get('Content-Type'));
        },
        intercept: function(body, send) {
          var $document = cheerio.load(body);
          $document('head').append(cssLinkTag);
          $document('body').append(scriptTag);
          send($document.html());
        }
      };
    }));

    if (debuglog.isEnabled) {
      router.all('*', function(req, res, next) {
        debuglog.isEnabled && debuglog(' - after intercepting');
        next();
      });
    }

    return router;
  }

  self.getServiceInfo = function() {
    return {};
  };

  self.getServiceHelp = function() {
    return {};
  };

  debuglog.isEnabled && debuglog(' - constructor end!');
};

Service.argumentSchema = {
  "id": "sidebarService",
  "type": "object",
  "properties": {
    "sandboxName": {
      "type": "string"
    },
    "sandboxConfig": {
      "type": "object"
    },
    "profileConfig": {
      "type": "object"
    },
    "generalConfig": {
      "type": "object"
    },
    "loggingFactory": {
      "type": "object"
    }
  }
};

module.exports = Service;