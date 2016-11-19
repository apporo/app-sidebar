module.exports = {
  plugins: {
    appSidebar: {
      contextPath: '/sidebar-bdd',
      entrypoints: [{
        path: '/sidebar-bdd/index',
        icon: {
          cssClass: 'fa fa-home'
        }
      },{
        path: '/sidebar-bdd/index1.html',
        icon: {
          cssClass: 'fa fa-credit-card-alt'
        }
      },{
        path: '/sidebar-bdd/index2.html',
        icon: {
          cssClass: 'fa fa-usb'
        }
      },{
        enabled: false,
        path: '/sidebar-bdd/index3.html',
        icon: {
          cssClass: 'fa fa-usb'
        }
      },{
        enabled: false,
        path: '/sidebar-bdd/index4.html',
        icon: {
          cssClass: 'fa fa-usb'
        }
      }],
      interceptor: 'tamper'
    },
    appWebserver: {
      defaultRedirectUrl: '/sidebar-bdd/index'
    }
  }
};
