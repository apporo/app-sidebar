'use strict';

var Devebot = require('devebot');
var lodash = Devebot.require('lodash');
var debugx = Devebot.require('debug')('appSidebar:mappings:navbar2');
var util = require('util');

module.exports = function(params) {
  params = params || {};
  var contextPath = params.contextPath;
  var interceptUrls = params.interceptUrls;
  var entrypoints = params.entrypoints || [];

  var navbarList = [];
  if (!lodash.isEmpty(entrypoints)) {
    navbarList = lodash.map(entrypoints, function(entrypoint) {
      return util.format('%s<li><a href="%s"><i class="%s" colorassign="%s"></i><span>%s</span></a></li>',
          '      ',
          lodash.get(entrypoint, 'path', '/'),
          lodash.get(entrypoint, 'icon.cssClass', 'fa-link'),
          lodash.get(entrypoint, 'color'),
          lodash.get(entrypoint, 'text'));
    });
    debugx.enabled && debugx(' - navbarList: %s', JSON.stringify(navbarList));
  }

  return {
    interceptUrls: interceptUrls,
    headSuffixTags: {
      sidebarStyle: {
        type: 'css',
        text: [
          util.format("<link href='%s/assets/navbar2/css/style.css' rel='stylesheet' type='text/css'/>", contextPath)
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
          util.format("<script src='%s/assets/navbar2/js/loader.js'></script>", contextPath)
        ]
      }
    }
  }
}
