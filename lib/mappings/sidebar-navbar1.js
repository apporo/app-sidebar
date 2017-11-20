'use strict';

var Devebot = require('devebot');
var lodash = Devebot.require('lodash');
var debugx = Devebot.require('debug')('appSidebar:mappings:navbar1');
var util = require('util');

module.exports = function(params) {
  params = params || {};
  var contextPath = params.contextPath;
  var interceptUrls = params.interceptUrls;
  var entrypoints = params.entrypoints || [];

  var navbarList = [];
  if (!lodash.isEmpty(entrypoints)) {
    navbarList = lodash.map(entrypoints, function(entrypoint) {
      return util.format('%s<li class="list-item"><a href="%s"><i class="%s"></i></a></li>',
          '      ',
          lodash.get(entrypoint, 'path', '/'),
          lodash.get(entrypoint, 'icon.cssClass', 'fa-link'))
    });
    debugx.enabled && debugx(' - navbarList: %s', JSON.stringify(navbarList));
  }

  return {
    interceptUrls: interceptUrls,
    headSuffixTags: {
      sidebarStyle: {
        type: 'css',
        text: [
          util.format("<link href='%s/assets/navbar1/css/style.css' rel='stylesheet' type='text/css'/>", contextPath)
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
          util.format("<script src='%s/assets/navbar1/js/loader.js'></script>", contextPath)
        ]
      }
    }
  }
}
