var contextPath = '/sidebar-bdd';

module.exports = {
  application: {
    contextPath: contextPath
  },
  plugins: {
    appSidebar: {
      contextPath: contextPath,
      entrypoints: [{
        path: contextPath + '/index',
        icon: {
          cssClass: 'fa fa-home'
        }
      },{
        path: contextPath + '/index1.html',
        icon: {
          cssClass: 'fa fa-credit-card-alt'
        }
      },{
        path: contextPath + '/index2.html',
        icon: {
          cssClass: 'fa fa-usb'
        }
      }]
    },
    appWebinject: {
      interceptor: 'tamper'
    },
    appWebweaver: {
      defaultRedirectUrl: contextPath + '/index'
    }
  }
};
