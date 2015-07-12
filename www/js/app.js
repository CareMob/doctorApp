// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
//, 'ui.bootstrap'
angular.module('starter', ['ionic', 'starter.controllers','doctorsCtrl', 'AppointmentCtrl', 'Schedules', 'backand', 'ui.bootstrap'])


//angular.module('hisotryCtrl', [])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, BackandProvider) {

  BackandProvider.manageDefaultHeaders();
 // BackandProvider.setAnonymousToken('5d753ca9-6560-4376-a196-dfa93298c1b4');
  //BackandProvider.setSignUpToken('Your SignUp Token');

  $stateProvider
  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })

  .state('app.schedules', {
      url: "/schedules",
      views: {
        'menuContent': {
          templateUrl: "templates/schedules.html",
          controller: 'SchedulesCtrl'
        }
      }
    })

    .state('app.login', {
      url: "/login",
      views: {
        'menuContent': {
          templateUrl: "templates/login.html",
          controller: 'LoginCtrl'
        }
      }
    })

  .state('app.appointment', {
    url: "/appointment",
    views: {
      'menuContent': {
        templateUrl: "templates/appointment.html",
        controller: 'newAppointmentCtrl'
      }
    }
  })

  .state('app.history', {
    url: "/history",
    views: {
      'menuContent': {
        templateUrl: "templates/history.html",
        controller: 'hisotryCtrl'
      }
    }
  })

  .state('app.newUser', {
    url: "/newUser",
    views: {
      'menuContent': {
        templateUrl: "templates/newUser.html",
        controller: 'AppCtrl'
      }
    }
  })

  .state('app.signin', {
    url: "/signin",
    views: {
      'menuContent': {
        templateUrl: "templates/signin.html",
        controller: 'SigninCtrl'
      }
    }
  })

  .state('app.setAppointment', {
    url: "/setAppointment",
    views: {
      'menuContent': {
        templateUrl: "templates/setAppointment.html"
        //controller: 'SigninCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/schedules');
});
