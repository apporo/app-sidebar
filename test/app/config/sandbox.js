var contextPath = '/sidebar-bdd';

module.exports = {
  application: {
    contextPath: contextPath
  },
  plugins: {
    appSidebar: {
      sidebarType: 'navbar1', // navbar1, navbar2
      contextPath: contextPath,
      entrypoints: [{
        path: contextPath + '/index',
        icon: {
          cssClass: 'fa fa-home'
        },
        text: 'Home',
        color: '#dd5837'
      },{
        path: contextPath + '/index1.html',
        icon: {
          cssClass: 'fa fa-credit-card-alt'
        },
        text: 'ALMANAC',
        color: 'Green'
      },{
        path: contextPath + '/index2.html',
        icon: {
          cssClass: 'fa fa-usb'
        },
        text: 'Videos',
        color: '#03a9f4'
      },{
         path: contextPath + '/index2.html',
        icon: {
          cssClass: 'fa fa-address-book-o'
        },
        text: 'GALLERY',
        color: 'red'
      },{
         path: contextPath + '/index2.html',
        icon: {
          cssClass: 'fa fa-address-card-o'
        },
        text: 'SNIPPETS',
        color: 'pink'
      },{
         path: contextPath + '/index2.html',
        icon: {
          cssClass: 'fa fa-handshake-o'
        },
        text: 'FORUMS',
        color: '#03a9f4'
      },{
         path: contextPath + '/index2.html',
        icon: {
          cssClass: 'fa fa-balance-scale'
        },
        text: 'NEWSLETTER',
        color: 'blue'
      },{
         path: contextPath + '/index2.html',
        icon: {
          cssClass: 'fa fa-calendar-check-o'
        },
        text: 'Videos',
        color: '#03a9f4'
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
