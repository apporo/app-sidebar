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
      return util.format('%s<li><a href="%s"><i class="%s" colorassign="%s"></i><span>%s</span></a></li>',
          '      ',
          lodash.get(entrypoint, 'path', '/'),
          lodash.get(entrypoint, 'icon.cssClass', 'fa-link'),
          lodash.get(entrypoint, 'color'),
          lodash.get(entrypoint, 'text'),
          )
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
          util.format("<link href='%s/assets/font-awesome/4.7.0/css/font-awesome.min.css' rel='stylesheet'/>", contextPath)
        ]
      }
    },
    bodySuffixTags: {
      navbarTop: {
        type: 'html',
        text: [
          '<div class="sidebar-bot">',
            '<div class="btn_navBot">',
              '<span class="fa fa-bars"></span>',
            '</div>',
          '  <nav class="navBot-container navBot_hide">',
          '    <ul class="navBot-list">'
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
