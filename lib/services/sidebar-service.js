'use strict';

var Devebot = require('devebot');
var Promise = Devebot.require('bluebird');
var loader = Devebot.require('loader');
var lodash = Devebot.require('lodash');
var debugx = Devebot.require('debug')('appSidebar:service');
var path = require('path');

var Service = function(params) {
  debugx.enabled && debugx(', constructor begin ...');

  params = params || {};

  var self = this;
  var logger = params.loggingFactory.getLogger();
  var pluginCfg = params.sandboxConfig;
  var express = params.webweaverService.express;

  var contextPath = pluginCfg.contextPath || '/sidebar';

  var sidebarType = pluginCfg.sidebarType;
  if (['navbar1', 'navbar2'].indexOf(sidebarType) < 0) {
    sidebarType = 'navbar1';
  }

  var entrypoints = lodash.filter(pluginCfg.entrypoints || [], function(item) {
    return (item.enabled != false);
  });

  var interceptUrls = lodash.map(entrypoints, function(entrypoint) {
    return entrypoint.path;
  });
  debugx.enabled && debugx(' - interceptUrls: %s', JSON.stringify(interceptUrls));

  var sidebarTmpl = loader(path.join(__dirname, '../mappings', 'sidebar-' + sidebarType))({
    contextPath: contextPath,
    interceptUrls: interceptUrls,
    entrypoints: entrypoints
  });

  params.webinjectService.enqueue(sidebarTmpl);

  self.getStaticFilesLayer = function() {
    return {
      name: 'app-sidebar-public',
      path: contextPath,
      middleware: express.static(path.join(__dirname, '../../public'))
    };
  }

  if (pluginCfg.autowired !== false) {
    params.webinjectService.inject([
      self.getStaticFilesLayer()
    ], pluginCfg.priority);
  }

  debugx.enabled && debugx(' - constructor end!');
};

Service.argumentSchema = {
  "id": "sidebarService",
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
