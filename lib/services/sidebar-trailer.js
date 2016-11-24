'use strict';

var events = require('events');
var util = require('util');
var path = require('path');

var Devebot = require('devebot');
var Promise = Devebot.require('bluebird');
var lodash = Devebot.require('lodash');
var debug = Devebot.require('debug');
var debuglog = debug('appSidebar:trailer');

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
  var contextPath = pluginCfg.contextPath || '/sidebar';

  var navbarList = [];
  var navbarEntrypoints = lodash.filter(pluginCfg.entrypoints || [], function(item) {
    return (item.enabled != false);
  });
  var interceptUrls = lodash.map(navbarEntrypoints, function(entrypoint) {
    return entrypoint.path;
  });
  if (!lodash.isEmpty(navbarEntrypoints)) {
    navbarList = lodash.map(navbarEntrypoints, function(entrypoint) {
      return util.format('%s<li class="list-item"><a href="%s"><i class="%s"></i></a></li>',
          '      ',
          lodash.get(entrypoint, 'path', '/'),
          lodash.get(entrypoint, 'icon.cssClass', 'fa-link'))
    });
    debuglog.isEnabled && debuglog(' - navbarList: %s', JSON.stringify(navbarList));
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

  var webserverTrigger = params.webserverTrigger;
  var express = webserverTrigger.getExpress();
  var position = webserverTrigger.getPosition();

  webserverTrigger.inject(express.static(path.join(__dirname, '../../public')),
      contextPath, position.inRangeOfStaticFiles(), 'app-sidebar-public');

  self.getServiceInfo = function() {
    return {};
  };

  self.getServiceHelp = function() {
    return {};
  };

  debuglog.isEnabled && debuglog(' - constructor end!');
};

Service.argumentSchema = {
  "id": "sidebarTrailer",
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
    },
    "webinjectService": {
      "type": "object"
    },
    "webserverTrigger": {
      "type": "object"
    }
  }
};

module.exports = Service;
