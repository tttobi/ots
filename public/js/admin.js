angular.module('ETITCMD-Admin', ['googlechart']);


angular.module('ETITCMD-Admin').controller('LiveCtrl', function ($scope, $http) {
  $scope.genderChart = {
    "type": "PieChart",
    "displayed": true,
    "cssStyle": "height:300px; width:100%;",
    "data": {
      "cols": [
        {
          "id": "gender",
          "label": "Gender",
          "type": "string"
        },
        {
          "id": "amount",
          "label": "Anzahl",
          "type": "number"
        }
      ],
      "rows": [
        {
          "c": [
            {
              "v": "Männlich"
            },
            {
              "v": 0,
            }
          ]
        },
        {
          "c": [
            {
              "v": "Weiblich"
            },
            {
              "v": 0
            },
          ]
        }
      ]
    },
    "options": {
      "title": "Männlein/Weiblein",
      "isStacked": "true",
      "fill": 100,
      "animation": {
        "duration": 200
      },
      "colors": ["#00a8ff","#ff428e"],
      "backgroundColor": "#fae9b1", 
      "displayExactValues": true,
      "is3D": true,
      "vAxis": {
        "title": "Anzahl",
        "gridlines": {
          "count": 10
        }
      },
      "hAxis": {
        "title": "Date"
      }
    },
    "view": {}
  }
  
  $scope.courseChart = {
    "type": "PieChart",
    "displayed": true,
    "cssStyle": "height:300px; width:100%;",
    "data": {
      "cols": [
        {
          "id": "course",
          "label": "Studiengang",
          "type": "string"
        },
        {
          "id": "amount",
          "label": "Anzahl",
          "type": "number"
        }
      ],
      "rows": [
        {
          "c": [
            {
              "v": "ET"
            },
            {
              "v": 0,
            }
          ]
        },
        {
          "c": [
            {
              "v": "IT"
            },
            {
              "v": 0
            },
          ]
        },
        {
          "c": [
            {
              "v": "CMD"
            },
            {
              "v": 0
            },
          ]
        }
      ]
    },
    "options": {
      "title": "Studiengang",
      "isStacked": "true",
      "fill": 100,
      "animation": {
        "duration": 200
      },
      "colors": ["#00a8ff","#ffae00","#ff428e"],
      "backgroundColor": "#fae9b1", 
      "displayExactValues": true,
      "is3D": true,
      "vAxis": {
        "title": "Anzahl",
        "gridlines": {
          "count": 10
        }
      },
      "hAxis": {
        "title": "Date"
      }
    },
    "view": {}
  }
  
  $scope.updateStates = function(data) {
    $scope.genderChart.data.rows[0].c[1].v = data.gender.male;
    $scope.genderChart.data.rows[1].c[1].v = data.gender.female;
    $scope.courseChart.data.rows[0].c[1].v = data.course.et;
    $scope.courseChart.data.rows[1].c[1].v = data.course.inf;
    $scope.courseChart.data.rows[2].c[1].v = data.course.cmd;
  };
  
  $http({method: 'GET', url: '/api/v1/admin/stats'}).
    success(function(data, status, headers, config) {
      $scope.updateStates(data);  
    }).
    error(function(data, status, headers, config) {

    });
  function updateStatForGroup(group) {
          // male female
        group.genderChart.data.rows[0].c[1].v = group.members.reduce(function(previousValue, currentValue, index, array){
          if (currentValue.gender == 'male') return previousValue + 1;
          return previousValue;
        },0);
        group.genderChart.data.rows[1].c[1].v = group.members.reduce(function(previousValue, currentValue, index, array){
          if (currentValue.gender == 'female') return previousValue + 1;
          return previousValue;
        },0);
        // et inf cmd
        group.courseChart.data.rows[0].c[1].v = group.members.reduce(function(previousValue, currentValue, index, array){
          if (currentValue.course == 'et') return previousValue + 1;
          return previousValue;
        },0);
        group.courseChart.data.rows[1].c[1].v = group.members.reduce(function(previousValue, currentValue, index, array){
          if (currentValue.course == 'inf') return previousValue + 1;
          return previousValue;
        },0);
        group.courseChart.data.rows[2].c[1].v = group.members.reduce(function(previousValue, currentValue, index, array){
          if (currentValue.course == 'cmd') return previousValue + 1;
          return previousValue;
        },0);
  }

  function generatorGroupWorker(group) {
    return function() {
      $http({method: 'GET', url: '/api/v1/admin/group/' + group._id + '/members' }).success(function(data, status, headers, config) {
        group.members = data;
        updateStatForGroup(group);
      });
    }
  }
  $http({method: 'GET', url: '/api/v1/admin/groups'}).
    success(function(data, status, headers, config) {
      $scope.groups = data;
      $scope.groups.forEach(function(group, idx){
        group.genderChart = {"type":"PieChart","displayed":true,"cssStyle":"height:300px; width:100%;","data":{"cols":[{"id":"gender","label":"Gender","type":"string"},{"id":"amount","label":"Anzahl","type":"number"}],"rows":[{"c":[{"v":"Männlich"},{"v":0}]},{"c":[{"v":"Weiblich"},{"v":0}]}]},"options":{"title":"Männlein/Weiblein","isStacked":"true","fill":100,"animation":{"duration":200},"colors":["#00a8ff","#ff428e"],"backgroundColor":"#fae9b1","displayExactValues":true,"is3D":true,"vAxis":{"title":"Anzahl","gridlines":{"count":10}},"hAxis":{"title":"Date"}},"view":{}};
        group.courseChart = {"type":"PieChart","displayed":true,"cssStyle":"height:300px; width:100%;","data":{"cols":[{"id":"course","label":"Studiengang","type":"string"},{"id":"amount","label":"Anzahl","type":"number"}],"rows":[{"c":[{"v":"ET"},{"v":0}]},{"c":[{"v":"IT"},{"v":0}]},{"c":[{"v":"CMD"},{"v":0}]}]},"options":{"title":"Studiengang","isStacked":"true","fill":100,"animation":{"duration":200},"colors":["#00a8ff","#ffae00","#ff428e"],"backgroundColor":"#fae9b1","displayExactValues":true,"is3D":true,"vAxis":{"title":"Anzahl","gridlines":{"count":10}},"hAxis":{"title":"Date"}},"view":{}};
        generatorGroupWorker(group)();
      })
    }).
    error(function(data, status, headers, config) {

    });
  
  var socket = io.connect('http://et-it-cmd-26724.euw1.actionbox.io:3000');
  socket.on('stats', function (data) {
      $scope.updateStates(data);
      $scope.$apply();
  });
  
  socket.on('group', function (data) {
     
    $scope.groups.forEach(function(group) {
      if(group._id == data._id) {
        group.members = data.members;
        updateStatForGroup(group);
      }
    });
    
      $scope.$apply();
  });
});