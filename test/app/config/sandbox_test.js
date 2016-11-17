module.exports = {
  plugins: {
    appSidebar: {
      entrypoints: [{
        path: '/sidebar/index',
        icon: {
          cssClass: 'fa fa-home'
        }
      },{
        path: '/sidebar/index1.html',
        icon: {
          cssClass: 'fa fa-credit-card-alt'
        }
      },{
        path: '/sidebar/index2.html',
        icon: {
          cssClass: 'fa fa-usb'
        }
      },{
        enabled: false,
        path: '/sidebar/index3.html',
        icon: {
          cssClass: 'fa fa-usb'
        }
      },{
        enabled: false,
        path: '/sidebar/index4.html',
        icon: {
          cssClass: 'fa fa-usb'
        }
      }]
    },
    appWebserver: {}
  }
};
