'use strict';

var events = require('events');
var util = require('util');
var path = require('path');

var Devebot = require('devebot');
var Promise = Devebot.require('bluebird');
var lodash = Devebot.require('lodash');
var debugx = Devebot.require('debug')('appSidebar:trailer');

var Service = function(params) {
  debugx.enabled && debugx(', constructor begin ...');

  params = params || {};

  var self = this;
  var logger = params.loggingFactory.getLogger();
  var pluginCfg = params.sandboxConfig;
  var contextPath = pluginCfg.contextPath || '/sidebar';
  var express = params.webweaverService.express;

  var navbarList = [];
  var navbarEntrypoints = lodash.filter(pluginCfg.entrypoints || [], function(item) {
    return (item.enabled != false);
  });
  var interceptUrls = lodash.map(navbarEntrypoints, function(entrypoint) {
    return entrypoint.path;
  });

  debugx.enabled && debugx(' - interceptUrls: %s', JSON.stringify(interceptUrls));

  if (!lodash.isEmpty(navbarEntrypoints)) {
    navbarList = lodash.map(navbarEntrypoints, function(entrypoint) {
      return util.format('%s<li class="list-item"><a href="%s"><i class="%s"></i></a></li>',
          '      ',
          lodash.get(entrypoint, 'path', '/'),
          lodash.get(entrypoint, 'icon.cssClass', 'fa-link'))
    });
    debugx.enabled && debugx(' - navbarList: %s', JSON.stringify(navbarList));
  }

  params.webinjectService.enqueue({
    interceptUrls: interceptUrls,
    headSuffixTags: {
      sidebarStyle: {
        type: 'css',
        text: [
          util.format("<link href='%s/assets/sidebar/css/style.css' rel='stylesheet' type='text/css'/>", contextPath)
        ]
      },
      fontAwesome: {
        type: 'css',
        text: [
          util.format("<link href='%s/assets/font-awesome/4.5.0/css/font-awesome.min.css' rel='stylesheet'/>", contextPath)
        ]
      }
    },
    bodySuffixTags: {
      navbarTop: {
        type: 'html',
        text: [
          '<div class="micejs-sidebar">',
          '  <button class="btn-nav">',
          '    <div class="bar arrow-top-r"></div>',
          '    <div class="bar arrow-middle-r"></div>',
          '    <div class="bar arrow-bottom-r"></div>',
          '  </button>',
          '  <nav class="nav-container hidden hide-nav">',
          '    <ul class="nav-list">'
        ]
      },
      navbarMenu: {
        type: 'html',
        text: navbarList
      },
      navbarBottom: {
        type: 'html',
        text: [
          '    </ul>',
          '  </nav>',
          '</div>'
        ]
      },
      zepto: {
        type: 'script',
        text: [
          util.format("<script src='%s/assets/zeptojs/zepto.min.js'></script>", contextPath)
        ]
      },
      sidebarLoader: {
        type: 'script',
        text: [
          util.format("<script src='%s/assets/sidebar/js/loader.js'></script>", contextPath)
        ]
      }
    }
  });

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
