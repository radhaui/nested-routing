var app=angular.module('myApp', ['ui.bootstrap','ui.router','ngAnimate']);

app.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/index');
    
    $stateProvider
        
        // HOME STATES AND NESTED VIEWS ========================================
        // .state('home', {
        //     url: '/home',
        //     templateUrl: 'index.html'
        // })
         .state('contact', {
            url: '/contact',
            controller: 'Page1Ctrl',
            templateUrl: "app/views/contactUs.html"
            
        })
          .state('contact.view1', {
            url: '/view1',
            
                templateUrl: 'app/views/view1.html',
                controller: 'view1Ctrl'
            
          })
           .state('contact.view2', {
            url: '/view1',
            
                templateUrl: 'app/views/view2.html',
                controller: 'view2Ctrl'
            
          })
        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        // .state('forms', {
        //      url: '/forms',
        //     templateUrl: 'app/views/forms.html',

            
        // });
         .state('forms', {
            url: '/forms',
            views: {
                '': { templateUrl: 'app/views/forms.html', controller: 'displaydataCtrl' },
                'formData@forms': { 
                    templateUrl: 'app/views/formdata.html'
                   },
                'displayData@forms': { 
                    templateUrl: 'app/views/displayData.html'
                   
                }
            }
            
        });
 });

app.run(function($rootScope) {

    $rootScope.safeApply = function(fn) {
        var phase = $rootScope.$$phase;
        if (phase === '$apply' || phase === '$digest') {
            if (fn && (typeof(fn) === 'function')) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };

});

app.directive('example', function() {
  return {
    restrict: 'E',
   templateUrl: 'customeDirective.html'
  };
});
app.controller('displaydataCtrl', function ($scope,$http) {
     $scope.formDat=[];
$scope.add=function(x){
 
   
    $scope.formDat.push(x);
            $scope.x = {};
    };
$scope.removeData=function(index){
  
     $scope.formDat.splice(index,1);
 };

    
});
app.controller('Page1Ctrl', function ($scope,$http) {
$http.get('demojson.json').
    success(function(data, status, headers, config) {
      $scope.posts = data;
     
    }).
    error(function(data, status, headers, config) {
      // log error
    });
    });

app.controller('view2Ctrl', function ($scope) {

    });
// app.controller('view1Ctrl', function ($scope) {
// //$scope.name="radha";
//     });