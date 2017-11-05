'use strict';

var events = require('events');
var util = require('util');
var path = require('path');
var Devebot = require('devebot');
var Promise = Devebot.require('bluebird');
var lodash = Devebot.require('lodash');
var debug = Devebot.require('debug');
var debuglog = debug('appSidebar:example');

var Service = function(params) {
  debuglog.isEnabled && debuglog(' + constructor begin ...');

  params = params || {};

  var self = this;

  var logger = params.loggingFactory.getLogger();
  var pluginCfg = params.sandboxConfig;
  var contextPath = pluginCfg.contextPath || '/sidebar';
  var express = params.webweaverService.express;

  var router = new express();
  router.set('views', __dirname + '/../../views');
  router.set('view engine', 'ejs');
  router.route('/index').get(function(req, res, next) {
    res.render('index', {});
  });

  params.webinjectService.inject([
    {
      name: 'app-sidebar-example-public',
      path: contextPath,
      middleware: express.static(path.join(__dirname, '../../public'))
    },
    {
      name: 'app-sidebar-example-router',
      path: contextPath,
      middleware: router
    }
  ]);

  debuglog.isEnabled && debuglog(' - constructor end!');
};

Service.argumentSchema = {
  "id": "sidebarExample",
  "type": "object",
  "properties": {
    "webinjectService": {
      "type": "object"
    },
    "webweaverService": {
      "type": "object"
    }
  }
};

module.exports = Service;
