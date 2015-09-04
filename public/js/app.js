angular.module('ETITCMD', []).config(function ($routeProvider, $locationProvider) {
  $routeProvider.when('/', {
    templateUrl: 'start.html',
    controller: 'DefaultCtrl'
  });
  $routeProvider.when('/register', {
    templateUrl: 'register.html',
    controller: 'RegistrationCtrl'
  });
  $routeProvider.when('/lookup', {
    templateUrl: 'lookup.html',
    controller: 'LookupCtrl'
  });
  $routeProvider.when('/group', {
    templateUrl: 'group.html',
    controller: 'GroupCtrl'
  });
  $routeProvider.otherwise({ redirectTo: '/' });
});

angular.module('ETITCMD').controller('DefaultCtrl', function ($scope,$location) {
  var messages = ["Wir haben so lange auf dich gewartet!", "Da bist du Ja!", "Hier bist du richtig!"];
  $scope.message = messages[Math.floor(Math.random() * messages.length)];
  $scope.toRegister = function() {
    $location.url('/register');
  };
  $scope.toLookup = function() {
    $location.url('/lookup');
  };
});
angular.module('ETITCMD').controller('LookupCtrl', function ($scope, $location, $http, $timeout, $rootScope) {
  $scope.backToStart = function() {
    $location.url('/');
  };
  
  $scope.submit = function() {
    if (!$scope.lookupForm.$valid) {
      return;
    }
    $http({method: 'GET', url: '/api/v1/erstie/lookup/' + $scope.data.email.toLowerCase()}).
    success(function(data, status, headers, config) {
      $rootScope.group = data.name;
      $location.url('/group');
    }).
    error(function(data, status, headers, config) {
      alert("Leider haben wir dich nicht gefunden.");
    });
  }
  

});

angular.module('ETITCMD').controller('GroupCtrl', function ($scope, $rootScope, $location) {
  if (typeof $rootScope.group === 'undefined') {
    $location.url('/');
  }
  $scope.backToStart = function() {
    $location.url('/');
  };
  $scope.group = $rootScope.group;
  delete $rootScope.group;
});


angular.module('ETITCMD').controller('RegistrationCtrl', function ($scope, $rootScope, $http, $location) {
  $scope.backToStart = function() {
    $location.url('/');
  };
  $(document).foundation();
  var messages = ["Wir haben so lange auf dich gewartet!", "Da bist du Ja!", "Hier bist du richtig!", "Na, wen haben wir denn da?", "Howdy Partner!", "Domo Arigato Mr. Roboto!", "Nich' lang schnacken, Formular ausfüllen!", "Käptn auf Brücke!", "Wer? Wie? Was?"];
  $scope.message = messages[Math.floor(Math.random() * messages.length)];
  $scope.data = {
    name: '',
    firstname: '',
    birthday: '',
    
    gender: 'male',
    course: 'et'
  }
  
  $scope.submit = function () {
    if (!$scope.registrationForm.$valid) {
      $scope.registrationForm.submitted = true;
      return;
    }
    $scope.data.email = $scope.data.email.toLowerCase(); // Es gibt immer wieder Deppen...
    $http({method: 'POST', url: '/api/v1/erstie/signup', data: $scope.data}).
    success(function(data, status, headers, config) {
      // this callback will be called asynchronously
      // when the response is available
      $rootScope.group = data.group.name;
      $location.url('/group');
    }).
    error(function(data, status, headers, config) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.

    });
  }
  $scope.updateGender = function (male) {
    console.log('updateGender');
    $scope.data.gender = (male) ? 'male' : 'female';
  }
});








 var mocks = [
        {
            "birthday": "6.11.2084",
            "firstname": "Aurora",
            "name": "Santana",
            "gender": "female",
            "email": "aurorasantana@slofast.com",
            "phone": 5944895,
            "mtrnr": 848628,
            "course": "cmd"
        },
        {
            "birthday": "8.11.1937",
            "firstname": "Rich",
            "name": "Levine",
            "gender": "male",
            "email": "richlevine@slofast.com",
            "phone": 1530909,
            "mtrnr": 640623,
            "course": "et"
        },
        {
            "birthday": "13.9.1947",
            "firstname": "Beatriz",
            "name": "Maxwell",
            "gender": "female",
            "email": "beatrizmaxwell@slofast.com",
            "phone": 4196868,
            "mtrnr": 599953,
            "course": "et"
        },
        {
            "birthday": "24.6.2060",
            "firstname": "Arlene",
            "name": "Phillips",
            "gender": "female",
            "email": "arlenephillips@slofast.com",
            "phone": 8208945,
            "mtrnr": 522223,
            "course": "cmd"
        },
        {
            "birthday": "20.7.2017",
            "firstname": "Jamie",
            "name": "Coleman",
            "gender": "female",
            "email": "jamiecoleman@slofast.com",
            "phone": 5003399,
            "mtrnr": 598531,
            "course": "cmd"
        },
        {
            "birthday": "22.4.1931",
            "firstname": "Oconnor",
            "name": "Davis",
            "gender": "male",
            "email": "oconnordavis@slofast.com",
            "phone": 2417945,
            "mtrnr": 149389,
            "course": "inf"
        },
        {
            "birthday": "6.9.1982",
            "firstname": "Diana",
            "name": "Mcknight",
            "gender": "female",
            "email": "dianamcknight@slofast.com",
            "phone": 9147221,
            "mtrnr": 844681,
            "course": "cmd"
        },
        {
            "birthday": "17.3.1953",
            "firstname": "Genevieve",
            "name": "Schneider",
            "gender": "female",
            "email": "genevieveschneider@slofast.com",
            "phone": 2806124,
            "mtrnr": 706188,
            "course": "cmd"
        },
        {
            "birthday": "28.6.1999",
            "firstname": "Lenora",
            "name": "Solis",
            "gender": "female",
            "email": "lenorasolis@slofast.com",
            "phone": 3460643,
            "mtrnr": 412825,
            "course": "et"
        },
        {
            "birthday": "20.11.2023",
            "firstname": "Gabrielle",
            "name": "Stanley",
            "gender": "female",
            "email": "gabriellestanley@slofast.com",
            "phone": 7062338,
            "mtrnr": 276869,
            "course": "cmd"
        },
        {
            "birthday": "18.10.1924",
            "firstname": "Kitty",
            "name": "Ellison",
            "gender": "female",
            "email": "kittyellison@slofast.com",
            "phone": 3282651,
            "mtrnr": 149928,
            "course": "cmd"
        },
        {
            "birthday": "20.6.1988",
            "firstname": "Bell",
            "name": "Sanders",
            "gender": "male",
            "email": "bellsanders@slofast.com",
            "phone": 5720694,
            "mtrnr": 905503,
            "course": "inf"
        },
        {
            "birthday": "27.10.2022",
            "firstname": "Gray",
            "name": "Cochran",
            "gender": "male",
            "email": "graycochran@slofast.com",
            "phone": 8832118,
            "mtrnr": 322887,
            "course": "cmd"
        },
        {
            "birthday": "12.9.1918",
            "firstname": "Elizabeth",
            "name": "Jackson",
            "gender": "female",
            "email": "elizabethjackson@slofast.com",
            "phone": 6855700,
            "mtrnr": 508963,
            "course": "cmd"
        },
        {
            "birthday": "3.5.2073",
            "firstname": "Jordan",
            "name": "Maynard",
            "gender": "male",
            "email": "jordanmaynard@slofast.com",
            "phone": 9892649,
            "mtrnr": 163210,
            "course": "et"
        },
        {
            "birthday": "22.3.1978",
            "firstname": "Karla",
            "name": "Winters",
            "gender": "female",
            "email": "karlawinters@slofast.com",
            "phone": 1611651,
            "mtrnr": 629319,
            "course": "inf"
        },
        {
            "birthday": "10.6.2069",
            "firstname": "Walton",
            "name": "Valencia",
            "gender": "male",
            "email": "waltonvalencia@slofast.com",
            "phone": 5583362,
            "mtrnr": 703279,
            "course": "et"
        },
        {
            "birthday": "12.3.2053",
            "firstname": "Marla",
            "name": "Huber",
            "gender": "female",
            "email": "marlahuber@slofast.com",
            "phone": 6956541,
            "mtrnr": 113420,
            "course": "inf"
        },
        {
            "birthday": "27.3.1979",
            "firstname": "Lela",
            "name": "Griffith",
            "gender": "female",
            "email": "lelagriffith@slofast.com",
            "phone": 3957001,
            "mtrnr": 853545,
            "course": "cmd"
        },
        {
            "birthday": "11.5.1990",
            "firstname": "Good",
            "name": "Pearson",
            "gender": "male",
            "email": "goodpearson@slofast.com",
            "phone": 8215643,
            "mtrnr": 402908,
            "course": "cmd"
        },
        {
            "birthday": "9.7.1999",
            "firstname": "Grant",
            "name": "Kirkland",
            "gender": "male",
            "email": "grantkirkland@slofast.com",
            "phone": 8787058,
            "mtrnr": 640163,
            "course": "et"
        },
        {
            "birthday": "7.4.2011",
            "firstname": "Townsend",
            "name": "Robles",
            "gender": "male",
            "email": "townsendrobles@slofast.com",
            "phone": 1346015,
            "mtrnr": 860794,
            "course": "inf"
        },
        {
            "birthday": "1.12.1981",
            "firstname": "Karina",
            "name": "Whitney",
            "gender": "female",
            "email": "karinawhitney@slofast.com",
            "phone": 6031956,
            "mtrnr": 864509,
            "course": "et"
        },
        {
            "birthday": "18.8.2027",
            "firstname": "Jeannie",
            "name": "Espinoza",
            "gender": "female",
            "email": "jeannieespinoza@slofast.com",
            "phone": 3053638,
            "mtrnr": 272089,
            "course": "inf"
        },
        {
            "birthday": "26.12.2076",
            "firstname": "Kari",
            "name": "Rush",
            "gender": "female",
            "email": "karirush@slofast.com",
            "phone": 5560285,
            "mtrnr": 177577,
            "course": "et"
        },
        {
            "birthday": "20.11.2096",
            "firstname": "Delia",
            "name": "Patrick",
            "gender": "female",
            "email": "deliapatrick@slofast.com",
            "phone": 8095280,
            "mtrnr": 818351,
            "course": "cmd"
        },
        {
            "birthday": "19.1.2093",
            "firstname": "Stevenson",
            "name": "Oneal",
            "gender": "male",
            "email": "stevensononeal@slofast.com",
            "phone": 1484254,
            "mtrnr": 404393,
            "course": "inf"
        },
        {
            "birthday": "10.8.2095",
            "firstname": "Dena",
            "name": "Vinson",
            "gender": "female",
            "email": "denavinson@slofast.com",
            "phone": 9516083,
            "mtrnr": 275262,
            "course": "et"
        },
        {
            "birthday": "10.12.2036",
            "firstname": "Maxwell",
            "name": "Waller",
            "gender": "male",
            "email": "maxwellwaller@slofast.com",
            "phone": 8144833,
            "mtrnr": 583539,
            "course": "cmd"
        },
        {
            "birthday": "12.3.1965",
            "firstname": "Gibbs",
            "name": "Cross",
            "gender": "male",
            "email": "gibbscross@slofast.com",
            "phone": 2379494,
            "mtrnr": 733307,
            "course": "cmd"
        },
        {
            "birthday": "5.1.1988",
            "firstname": "Sonia",
            "name": "Sosa",
            "gender": "female",
            "email": "soniasosa@slofast.com",
            "phone": 1569359,
            "mtrnr": 923748,
            "course": "inf"
        },
        {
            "birthday": "13.6.2097",
            "firstname": "Hillary",
            "name": "Cantrell",
            "gender": "female",
            "email": "hillarycantrell@slofast.com",
            "phone": 6552852,
            "mtrnr": 557176,
            "course": "et"
        },
        {
            "birthday": "16.12.1958",
            "firstname": "Maryann",
            "name": "Acevedo",
            "gender": "female",
            "email": "maryannacevedo@slofast.com",
            "phone": 1708118,
            "mtrnr": 635307,
            "course": "cmd"
        },
        {
            "birthday": "7.3.2097",
            "firstname": "Ericka",
            "name": "Rutledge",
            "gender": "female",
            "email": "erickarutledge@slofast.com",
            "phone": 4887023,
            "mtrnr": 235376,
            "course": "cmd"
        },
        {
            "birthday": "19.11.1989",
            "firstname": "White",
            "name": "Curry",
            "gender": "male",
            "email": "whitecurry@slofast.com",
            "phone": 2929417,
            "mtrnr": 213314,
            "course": "inf"
        },
        {
            "birthday": "13.8.1999",
            "firstname": "Selena",
            "name": "Durham",
            "gender": "female",
            "email": "selenadurham@slofast.com",
            "phone": 3970114,
            "mtrnr": 884873,
            "course": "et"
        },
        {
            "birthday": "22.3.1985",
            "firstname": "Melody",
            "name": "Farley",
            "gender": "female",
            "email": "melodyfarley@slofast.com",
            "phone": 2425122,
            "mtrnr": 372965,
            "course": "cmd"
        },
        {
            "birthday": "20.3.2020",
            "firstname": "Sybil",
            "name": "Sparks",
            "gender": "female",
            "email": "sybilsparks@slofast.com",
            "phone": 3570998,
            "mtrnr": 184232,
            "course": "et"
        },
        {
            "birthday": "27.4.2030",
            "firstname": "Brigitte",
            "name": "Bell",
            "gender": "female",
            "email": "brigittebell@slofast.com",
            "phone": 5399717,
            "mtrnr": 728512,
            "course": "inf"
        },
        {
            "birthday": "10.1.2039",
            "firstname": "Alfreda",
            "name": "Herrera",
            "gender": "female",
            "email": "alfredaherrera@slofast.com",
            "phone": 4564415,
            "mtrnr": 441314,
            "course": "inf"
        },
        {
            "birthday": "9.12.2056",
            "firstname": "Ellison",
            "name": "Parks",
            "gender": "male",
            "email": "ellisonparks@slofast.com",
            "phone": 3339302,
            "mtrnr": 862379,
            "course": "inf"
        },
        {
            "birthday": "2.12.1973",
            "firstname": "Irwin",
            "name": "Hess",
            "gender": "male",
            "email": "irwinhess@slofast.com",
            "phone": 5510799,
            "mtrnr": 826647,
            "course": "cmd"
        },
        {
            "birthday": "10.4.1919",
            "firstname": "Webb",
            "name": "Montoya",
            "gender": "male",
            "email": "webbmontoya@slofast.com",
            "phone": 2906493,
            "mtrnr": 172020,
            "course": "inf"
        },
        {
            "birthday": "10.2.1937",
            "firstname": "Griffin",
            "name": "Callahan",
            "gender": "male",
            "email": "griffincallahan@slofast.com",
            "phone": 9415638,
            "mtrnr": 102197,
            "course": "cmd"
        },
        {
            "birthday": "9.11.2043",
            "firstname": "Tamra",
            "name": "Alston",
            "gender": "female",
            "email": "tamraalston@slofast.com",
            "phone": 7384569,
            "mtrnr": 449411,
            "course": "inf"
        },
        {
            "birthday": "12.8.2019",
            "firstname": "Rose",
            "name": "Potts",
            "gender": "female",
            "email": "rosepotts@slofast.com",
            "phone": 6507878,
            "mtrnr": 410463,
            "course": "et"
        },
        {
            "birthday": "9.9.1952",
            "firstname": "Knight",
            "name": "Bradford",
            "gender": "male",
            "email": "knightbradford@slofast.com",
            "phone": 1334694,
            "mtrnr": 719830,
            "course": "cmd"
        },
        {
            "birthday": "27.10.1947",
            "firstname": "Burris",
            "name": "Mitchell",
            "gender": "male",
            "email": "burrismitchell@slofast.com",
            "phone": 9311666,
            "mtrnr": 449270,
            "course": "inf"
        },
        {
            "birthday": "12.2.2071",
            "firstname": "Janis",
            "name": "Galloway",
            "gender": "female",
            "email": "janisgalloway@slofast.com",
            "phone": 9277663,
            "mtrnr": 206763,
            "course": "cmd"
        },
        {
            "birthday": "10.9.1936",
            "firstname": "Tommie",
            "name": "Patel",
            "gender": "female",
            "email": "tommiepatel@slofast.com",
            "phone": 9471041,
            "mtrnr": 866276,
            "course": "inf"
        },
        {
            "birthday": "27.1.2035",
            "firstname": "Frank",
            "name": "Douglas",
            "gender": "male",
            "email": "frankdouglas@slofast.com",
            "phone": 8998318,
            "mtrnr": 849880,
            "course": "cmd"
        },
        {
            "birthday": "13.2.1992",
            "firstname": "Pennington",
            "name": "Jacobs",
            "gender": "male",
            "email": "penningtonjacobs@slofast.com",
            "phone": 5428613,
            "mtrnr": 351202,
            "course": "cmd"
        },
        {
            "birthday": "3.8.1950",
            "firstname": "Boyd",
            "name": "Holden",
            "gender": "male",
            "email": "boydholden@slofast.com",
            "phone": 7001095,
            "mtrnr": 584616,
            "course": "inf"
        },
        {
            "birthday": "25.7.2049",
            "firstname": "Gutierrez",
            "name": "Yates",
            "gender": "male",
            "email": "gutierrezyates@slofast.com",
            "phone": 8616098,
            "mtrnr": 374528,
            "course": "inf"
        },
        {
            "birthday": "20.12.2094",
            "firstname": "Nelda",
            "name": "Valdez",
            "gender": "female",
            "email": "neldavaldez@slofast.com",
            "phone": 8004773,
            "mtrnr": 658956,
            "course": "et"
        },
        {
            "birthday": "6.1.1932",
            "firstname": "Nash",
            "name": "Castaneda",
            "gender": "male",
            "email": "nashcastaneda@slofast.com",
            "phone": 3759051,
            "mtrnr": 829520,
            "course": "inf"
        },
        {
            "birthday": "5.6.2060",
            "firstname": "Glenna",
            "name": "Rosario",
            "gender": "female",
            "email": "glennarosario@slofast.com",
            "phone": 1382501,
            "mtrnr": 108123,
            "course": "cmd"
        },
        {
            "birthday": "6.9.1926",
            "firstname": "Virginia",
            "name": "Cook",
            "gender": "female",
            "email": "virginiacook@slofast.com",
            "phone": 5724543,
            "mtrnr": 878254,
            "course": "inf"
        },
        {
            "birthday": "20.2.1983",
            "firstname": "Gina",
            "name": "Spears",
            "gender": "female",
            "email": "ginaspears@slofast.com",
            "phone": 1426313,
            "mtrnr": 498234,
            "course": "et"
        },
        {
            "birthday": "25.5.1938",
            "firstname": "Michael",
            "name": "Lane",
            "gender": "male",
            "email": "michaellane@slofast.com",
            "phone": 5328357,
            "mtrnr": 796415,
            "course": "cmd"
        },
        {
            "birthday": "2.6.1954",
            "firstname": "Phelps",
            "name": "Pitts",
            "gender": "male",
            "email": "phelpspitts@slofast.com",
            "phone": 3423502,
            "mtrnr": 714183,
            "course": "inf"
        },
        {
            "birthday": "20.9.1956",
            "firstname": "Hebert",
            "name": "Knowles",
            "gender": "male",
            "email": "hebertknowles@slofast.com",
            "phone": 4150338,
            "mtrnr": 856248,
            "course": "inf"
        },
        {
            "birthday": "16.8.1931",
            "firstname": "Beverly",
            "name": "Medina",
            "gender": "female",
            "email": "beverlymedina@slofast.com",
            "phone": 3830687,
            "mtrnr": 927011,
            "course": "cmd"
        },
        {
            "birthday": "2.10.1993",
            "firstname": "Mona",
            "name": "Stafford",
            "gender": "female",
            "email": "monastafford@slofast.com",
            "phone": 9559096,
            "mtrnr": 802591,
            "course": "cmd"
        },
        {
            "birthday": "12.1.2075",
            "firstname": "Ramsey",
            "name": "Burch",
            "gender": "male",
            "email": "ramseyburch@slofast.com",
            "phone": 8112316,
            "mtrnr": 639275,
            "course": "inf"
        },
        {
            "birthday": "28.4.2014",
            "firstname": "Schwartz",
            "name": "Clemons",
            "gender": "male",
            "email": "schwartzclemons@slofast.com",
            "phone": 3331736,
            "mtrnr": 811326,
            "course": "inf"
        },
        {
            "birthday": "8.11.2044",
            "firstname": "Garcia",
            "name": "Boyd",
            "gender": "male",
            "email": "garciaboyd@slofast.com",
            "phone": 7274368,
            "mtrnr": 303644,
            "course": "inf"
        },
        {
            "birthday": "25.8.1920",
            "firstname": "Alicia",
            "name": "Tran",
            "gender": "female",
            "email": "aliciatran@slofast.com",
            "phone": 3445807,
            "mtrnr": 837431,
            "course": "et"
        },
        {
            "birthday": "8.12.2042",
            "firstname": "Casandra",
            "name": "Henry",
            "gender": "female",
            "email": "casandrahenry@slofast.com",
            "phone": 6357967,
            "mtrnr": 823201,
            "course": "inf"
        },
        {
            "birthday": "17.4.2079",
            "firstname": "Holt",
            "name": "Serrano",
            "gender": "male",
            "email": "holtserrano@slofast.com",
            "phone": 4653978,
            "mtrnr": 535411,
            "course": "et"
        },
        {
            "birthday": "26.3.2055",
            "firstname": "Hudson",
            "name": "Puckett",
            "gender": "male",
            "email": "hudsonpuckett@slofast.com",
            "phone": 8232325,
            "mtrnr": 253327,
            "course": "inf"
        },
        {
            "birthday": "20.12.2032",
            "firstname": "Avila",
            "name": "Mcconnell",
            "gender": "male",
            "email": "avilamcconnell@slofast.com",
            "phone": 2513825,
            "mtrnr": 849259,
            "course": "inf"
        },
        {
            "birthday": "1.10.1928",
            "firstname": "Therese",
            "name": "Fischer",
            "gender": "female",
            "email": "theresefischer@slofast.com",
            "phone": 1159211,
            "mtrnr": 158000,
            "course": "inf"
        },
        {
            "birthday": "22.5.2093",
            "firstname": "Knox",
            "name": "Obrien",
            "gender": "male",
            "email": "knoxobrien@slofast.com",
            "phone": 2224188,
            "mtrnr": 888911,
            "course": "inf"
        },
        {
            "birthday": "13.4.2033",
            "firstname": "Chrystal",
            "name": "Knight",
            "gender": "female",
            "email": "chrystalknight@slofast.com",
            "phone": 3646094,
            "mtrnr": 540945,
            "course": "inf"
        },
        {
            "birthday": "9.1.2014",
            "firstname": "Penny",
            "name": "Dejesus",
            "gender": "female",
            "email": "pennydejesus@slofast.com",
            "phone": 5750664,
            "mtrnr": 905125,
            "course": "et"
        },
        {
            "birthday": "15.8.2070",
            "firstname": "Shawna",
            "name": "Sandoval",
            "gender": "female",
            "email": "shawnasandoval@slofast.com",
            "phone": 5895919,
            "mtrnr": 485510,
            "course": "et"
        },
        {
            "birthday": "11.12.1972",
            "firstname": "May",
            "name": "Monroe",
            "gender": "female",
            "email": "maymonroe@slofast.com",
            "phone": 7647619,
            "mtrnr": 413125,
            "course": "et"
        },
        {
            "birthday": "7.10.1994",
            "firstname": "Jody",
            "name": "Brooks",
            "gender": "female",
            "email": "jodybrooks@slofast.com",
            "phone": 6871515,
            "mtrnr": 681509,
            "course": "inf"
        },
        {
            "birthday": "9.1.2051",
            "firstname": "Schneider",
            "name": "Holloway",
            "gender": "male",
            "email": "schneiderholloway@slofast.com",
            "phone": 8011579,
            "mtrnr": 163295,
            "course": "inf"
        },
        {
            "birthday": "13.8.1960",
            "firstname": "Mayer",
            "name": "Torres",
            "gender": "male",
            "email": "mayertorres@slofast.com",
            "phone": 9561695,
            "mtrnr": 445513,
            "course": "et"
        },
        {
            "birthday": "27.6.1975",
            "firstname": "Rene",
            "name": "Kim",
            "gender": "female",
            "email": "renekim@slofast.com",
            "phone": 6657420,
            "mtrnr": 364461,
            "course": "et"
        },
        {
            "birthday": "9.9.2070",
            "firstname": "Valentine",
            "name": "Whitaker",
            "gender": "male",
            "email": "valentinewhitaker@slofast.com",
            "phone": 6213602,
            "mtrnr": 826710,
            "course": "inf"
        },
        {
            "birthday": "5.7.2043",
            "firstname": "Rodgers",
            "name": "Rivas",
            "gender": "male",
            "email": "rodgersrivas@slofast.com",
            "phone": 8647897,
            "mtrnr": 416043,
            "course": "inf"
        },
        {
            "birthday": "7.12.1915",
            "firstname": "Dodson",
            "name": "Gentry",
            "gender": "male",
            "email": "dodsongentry@slofast.com",
            "phone": 8901999,
            "mtrnr": 794412,
            "course": "inf"
        },
        {
            "birthday": "2.6.1967",
            "firstname": "Angelica",
            "name": "Berry",
            "gender": "female",
            "email": "angelicaberry@slofast.com",
            "phone": 6525366,
            "mtrnr": 687386,
            "course": "et"
        },
        {
            "birthday": "16.1.2061",
            "firstname": "Carrie",
            "name": "Wilkins",
            "gender": "female",
            "email": "carriewilkins@slofast.com",
            "phone": 8051396,
            "mtrnr": 621609,
            "course": "cmd"
        },
        {
            "birthday": "28.1.1920",
            "firstname": "Downs",
            "name": "Cummings",
            "gender": "male",
            "email": "downscummings@slofast.com",
            "phone": 3175541,
            "mtrnr": 766964,
            "course": "inf"
        },
        {
            "birthday": "4.9.2023",
            "firstname": "Clay",
            "name": "Santos",
            "gender": "male",
            "email": "claysantos@slofast.com",
            "phone": 2693636,
            "mtrnr": 344339,
            "course": "et"
        },
        {
            "birthday": "19.10.2083",
            "firstname": "Reed",
            "name": "Mejia",
            "gender": "male",
            "email": "reedmejia@slofast.com",
            "phone": 9391584,
            "mtrnr": 582786,
            "course": "cmd"
        },
        {
            "birthday": "9.6.1922",
            "firstname": "Vanessa",
            "name": "Burris",
            "gender": "female",
            "email": "vanessaburris@slofast.com",
            "phone": 6346820,
            "mtrnr": 333037,
            "course": "et"
        },
        {
            "birthday": "21.3.2021",
            "firstname": "Lloyd",
            "name": "Alvarado",
            "gender": "male",
            "email": "lloydalvarado@slofast.com",
            "phone": 9306407,
            "mtrnr": 791533,
            "course": "inf"
        },
        {
            "birthday": "12.4.1980",
            "firstname": "Elliott",
            "name": "Chaney",
            "gender": "male",
            "email": "elliottchaney@slofast.com",
            "phone": 9342477,
            "mtrnr": 801141,
            "course": "cmd"
        },
        {
            "birthday": "9.7.2096",
            "firstname": "Holmes",
            "name": "Davenport",
            "gender": "male",
            "email": "holmesdavenport@slofast.com",
            "phone": 6088798,
            "mtrnr": 876737,
            "course": "inf"
        },
        {
            "birthday": "22.7.1915",
            "firstname": "Mckenzie",
            "name": "Kerr",
            "gender": "male",
            "email": "mckenziekerr@slofast.com",
            "phone": 4656128,
            "mtrnr": 150416,
            "course": "cmd"
        },
        {
            "birthday": "28.11.2080",
            "firstname": "Rutledge",
            "name": "Mccall",
            "gender": "male",
            "email": "rutledgemccall@slofast.com",
            "phone": 4077208,
            "mtrnr": 515701,
            "course": "et"
        },
        {
            "birthday": "17.4.1964",
            "firstname": "Scott",
            "name": "Guthrie",
            "gender": "male",
            "email": "scottguthrie@slofast.com",
            "phone": 6218843,
            "mtrnr": 948750,
            "course": "et"
        },
        {
            "birthday": "15.7.1972",
            "firstname": "Dickson",
            "name": "Finley",
            "gender": "male",
            "email": "dicksonfinley@slofast.com",
            "phone": 7833402,
            "mtrnr": 849293,
            "course": "cmd"
        },
        {
            "birthday": "7.7.2011",
            "firstname": "Helena",
            "name": "Brennan",
            "gender": "female",
            "email": "helenabrennan@slofast.com",
            "phone": 9118038,
            "mtrnr": 597390,
            "course": "cmd"
        },
        {
            "birthday": "5.8.2021",
            "firstname": "Hughes",
            "name": "Garner",
            "gender": "male",
            "email": "hughesgarner@slofast.com",
            "phone": 6292936,
            "mtrnr": 342826,
            "course": "cmd"
        },
        {
            "birthday": "23.9.2092",
            "firstname": "Ollie",
            "name": "Mccarthy",
            "gender": "female",
            "email": "olliemccarthy@slofast.com",
            "phone": 1841545,
            "mtrnr": 110829,
            "course": "cmd"
        },
        {
            "birthday": "7.7.2063",
            "firstname": "Celina",
            "name": "Key",
            "gender": "female",
            "email": "celinakey@slofast.com",
            "phone": 3668342,
            "mtrnr": 173750,
            "course": "et"
        },
        {
            "birthday": "19.7.2037",
            "firstname": "Hess",
            "name": "Luna",
            "gender": "male",
            "email": "hessluna@slofast.com",
            "phone": 2375781,
            "mtrnr": 681887,
            "course": "cmd"
        },
        {
            "birthday": "7.5.2071",
            "firstname": "Carmen",
            "name": "Lott",
            "gender": "female",
            "email": "carmenlott@slofast.com",
            "phone": 2903100,
            "mtrnr": 925087,
            "course": "cmd"
        },
        {
            "birthday": "12.5.2017",
            "firstname": "Latoya",
            "name": "Ingram",
            "gender": "female",
            "email": "latoyaingram@slofast.com",
            "phone": 5129249,
            "mtrnr": 536023,
            "course": "inf"
        },
        {
            "birthday": "12.11.1955",
            "firstname": "Winnie",
            "name": "Joyce",
            "gender": "female",
            "email": "winniejoyce@slofast.com",
            "phone": 8579871,
            "mtrnr": 509521,
            "course": "et"
        },
        {
            "birthday": "6.8.2026",
            "firstname": "Leann",
            "name": "Schultz",
            "gender": "female",
            "email": "leannschultz@slofast.com",
            "phone": 6801212,
            "mtrnr": 353416,
            "course": "cmd"
        },
        {
            "birthday": "20.6.1917",
            "firstname": "Nina",
            "name": "Snow",
            "gender": "female",
            "email": "ninasnow@slofast.com",
            "phone": 4198292,
            "mtrnr": 731407,
            "course": "et"
        },
        {
            "birthday": "6.3.2055",
            "firstname": "Hall",
            "name": "Riggs",
            "gender": "male",
            "email": "hallriggs@slofast.com",
            "phone": 8039045,
            "mtrnr": 225885,
            "course": "et"
        },
        {
            "birthday": "15.6.2035",
            "firstname": "Lee",
            "name": "Case",
            "gender": "female",
            "email": "leecase@slofast.com",
            "phone": 2125232,
            "mtrnr": 374551,
            "course": "cmd"
        },
        {
            "birthday": "1.7.2029",
            "firstname": "Loretta",
            "name": "Rosa",
            "gender": "female",
            "email": "lorettarosa@slofast.com",
            "phone": 4664006,
            "mtrnr": 706711,
            "course": "cmd"
        },
        {
            "birthday": "19.2.1976",
            "firstname": "Elma",
            "name": "Thomas",
            "gender": "female",
            "email": "elmathomas@slofast.com",
            "phone": 6959910,
            "mtrnr": 540239,
            "course": "cmd"
        },
        {
            "birthday": "18.11.1996",
            "firstname": "Minnie",
            "name": "Casey",
            "gender": "female",
            "email": "minniecasey@slofast.com",
            "phone": 8529027,
            "mtrnr": 836392,
            "course": "inf"
        },
        {
            "birthday": "28.7.1911",
            "firstname": "Jimenez",
            "name": "Dominguez",
            "gender": "male",
            "email": "jimenezdominguez@slofast.com",
            "phone": 1935077,
            "mtrnr": 722777,
            "course": "et"
        },
        {
            "birthday": "9.7.1992",
            "firstname": "Carmela",
            "name": "Rollins",
            "gender": "female",
            "email": "carmelarollins@slofast.com",
            "phone": 3201050,
            "mtrnr": 564668,
            "course": "et"
        },
        {
            "birthday": "16.5.2059",
            "firstname": "Walls",
            "name": "Crane",
            "gender": "male",
            "email": "wallscrane@slofast.com",
            "phone": 2938396,
            "mtrnr": 798437,
            "course": "inf"
        },
        {
            "birthday": "18.2.2011",
            "firstname": "Rachel",
            "name": "Hernandez",
            "gender": "female",
            "email": "rachelhernandez@slofast.com",
            "phone": 8249826,
            "mtrnr": 965150,
            "course": "cmd"
        },
        {
            "birthday": "15.10.1924",
            "firstname": "Hopkins",
            "name": "Hale",
            "gender": "male",
            "email": "hopkinshale@slofast.com",
            "phone": 4706353,
            "mtrnr": 263462,
            "course": "cmd"
        },
        {
            "birthday": "11.5.2042",
            "firstname": "Head",
            "name": "Mccullough",
            "gender": "male",
            "email": "headmccullough@slofast.com",
            "phone": 5045057,
            "mtrnr": 922083,
            "course": "cmd"
        },
        {
            "birthday": "5.1.1998",
            "firstname": "Catalina",
            "name": "Benton",
            "gender": "female",
            "email": "catalinabenton@slofast.com",
            "phone": 4896424,
            "mtrnr": 510939,
            "course": "et"
        },
        {
            "birthday": "24.7.2042",
            "firstname": "Elba",
            "name": "Austin",
            "gender": "female",
            "email": "elbaaustin@slofast.com",
            "phone": 6357811,
            "mtrnr": 376093,
            "course": "cmd"
        },
        {
            "birthday": "25.12.1998",
            "firstname": "Juanita",
            "name": "Buckley",
            "gender": "female",
            "email": "juanitabuckley@slofast.com",
            "phone": 7257116,
            "mtrnr": 720338,
            "course": "inf"
        },
        {
            "birthday": "4.1.2080",
            "firstname": "Nanette",
            "name": "Rich",
            "gender": "female",
            "email": "nanetterich@slofast.com",
            "phone": 9995146,
            "mtrnr": 890278,
            "course": "et"
        },
        {
            "birthday": "3.6.2099",
            "firstname": "Johns",
            "name": "Sweeney",
            "gender": "male",
            "email": "johnssweeney@slofast.com",
            "phone": 9020129,
            "mtrnr": 833511,
            "course": "cmd"
        },
        {
            "birthday": "18.8.1993",
            "firstname": "Castaneda",
            "name": "Chan",
            "gender": "male",
            "email": "castanedachan@slofast.com",
            "phone": 1598603,
            "mtrnr": 683442,
            "course": "inf"
        },
        {
            "birthday": "8.4.2098",
            "firstname": "Olivia",
            "name": "Wilkinson",
            "gender": "female",
            "email": "oliviawilkinson@slofast.com",
            "phone": 4519910,
            "mtrnr": 402808,
            "course": "inf"
        },
        {
            "birthday": "8.4.1951",
            "firstname": "Stacy",
            "name": "Moran",
            "gender": "female",
            "email": "stacymoran@slofast.com",
            "phone": 4930650,
            "mtrnr": 937969,
            "course": "inf"
        },
        {
            "birthday": "24.8.2043",
            "firstname": "Robin",
            "name": "Shaw",
            "gender": "female",
            "email": "robinshaw@slofast.com",
            "phone": 4817099,
            "mtrnr": 327623,
            "course": "cmd"
        },
        {
            "birthday": "20.11.1969",
            "firstname": "Lucia",
            "name": "Cox",
            "gender": "female",
            "email": "luciacox@slofast.com",
            "phone": 6444718,
            "mtrnr": 209628,
            "course": "et"
        },
        {
            "birthday": "18.1.2062",
            "firstname": "Schultz",
            "name": "Reed",
            "gender": "male",
            "email": "schultzreed@slofast.com",
            "phone": 9224195,
            "mtrnr": 483503,
            "course": "cmd"
        },
        {
            "birthday": "13.8.2068",
            "firstname": "Roxanne",
            "name": "Campos",
            "gender": "female",
            "email": "roxannecampos@slofast.com",
            "phone": 9845339,
            "mtrnr": 317113,
            "course": "cmd"
        },
        {
            "birthday": "12.7.1929",
            "firstname": "Haney",
            "name": "Little",
            "gender": "male",
            "email": "haneylittle@slofast.com",
            "phone": 8332640,
            "mtrnr": 484603,
            "course": "cmd"
        },
        {
            "birthday": "7.1.2026",
            "firstname": "Leblanc",
            "name": "Ryan",
            "gender": "male",
            "email": "leblancryan@slofast.com",
            "phone": 2863371,
            "mtrnr": 783488,
            "course": "inf"
        },
        {
            "birthday": "26.7.2092",
            "firstname": "Linda",
            "name": "Frazier",
            "gender": "female",
            "email": "lindafrazier@slofast.com",
            "phone": 5635896,
            "mtrnr": 143133,
            "course": "inf"
        },
        {
            "birthday": "7.5.2028",
            "firstname": "Heather",
            "name": "Garcia",
            "gender": "female",
            "email": "heathergarcia@slofast.com",
            "phone": 3487724,
            "mtrnr": 681744,
            "course": "cmd"
        },
        {
            "birthday": "10.3.1991",
            "firstname": "Bertie",
            "name": "Morrison",
            "gender": "female",
            "email": "bertiemorrison@slofast.com",
            "phone": 2201536,
            "mtrnr": 590274,
            "course": "inf"
        },
        {
            "birthday": "4.1.1939",
            "firstname": "Sullivan",
            "name": "Hebert",
            "gender": "male",
            "email": "sullivanhebert@slofast.com",
            "phone": 4593967,
            "mtrnr": 488717,
            "course": "cmd"
        },
        {
            "birthday": "13.8.1953",
            "firstname": "Strickland",
            "name": "Lancaster",
            "gender": "male",
            "email": "stricklandlancaster@slofast.com",
            "phone": 8860368,
            "mtrnr": 740009,
            "course": "cmd"
        },
        {
            "birthday": "12.1.2084",
            "firstname": "Chavez",
            "name": "Daugherty",
            "gender": "male",
            "email": "chavezdaugherty@slofast.com",
            "phone": 8931876,
            "mtrnr": 461899,
            "course": "inf"
        },
        {
            "birthday": "26.6.1912",
            "firstname": "Kim",
            "name": "Stevenson",
            "gender": "male",
            "email": "kimstevenson@slofast.com",
            "phone": 4894203,
            "mtrnr": 494106,
            "course": "inf"
        },
        {
            "birthday": "12.12.2073",
            "firstname": "Jacobson",
            "name": "Leon",
            "gender": "male",
            "email": "jacobsonleon@slofast.com",
            "phone": 5983434,
            "mtrnr": 353557,
            "course": "cmd"
        },
        {
            "birthday": "20.12.2064",
            "firstname": "Clemons",
            "name": "Dyer",
            "gender": "male",
            "email": "clemonsdyer@slofast.com",
            "phone": 1963237,
            "mtrnr": 492635,
            "course": "cmd"
        },
        {
            "birthday": "1.2.1998",
            "firstname": "Roxie",
            "name": "Owen",
            "gender": "female",
            "email": "roxieowen@slofast.com",
            "phone": 5719449,
            "mtrnr": 749839,
            "course": "cmd"
        },
        {
            "birthday": "4.4.2023",
            "firstname": "Crawford",
            "name": "Clark",
            "gender": "male",
            "email": "crawfordclark@slofast.com",
            "phone": 5046105,
            "mtrnr": 927154,
            "course": "inf"
        },
        {
            "birthday": "27.3.2084",
            "firstname": "Marianne",
            "name": "Holcomb",
            "gender": "female",
            "email": "marianneholcomb@slofast.com",
            "phone": 7713611,
            "mtrnr": 141864,
            "course": "inf"
        },
        {
            "birthday": "26.1.2024",
            "firstname": "Clayton",
            "name": "Wagner",
            "gender": "male",
            "email": "claytonwagner@slofast.com",
            "phone": 3525065,
            "mtrnr": 521904,
            "course": "et"
        },
        {
            "birthday": "27.11.2077",
            "firstname": "Aida",
            "name": "Fulton",
            "gender": "female",
            "email": "aidafulton@slofast.com",
            "phone": 8348024,
            "mtrnr": 347785,
            "course": "inf"
        },
        {
            "birthday": "27.1.1918",
            "firstname": "Collier",
            "name": "Moore",
            "gender": "male",
            "email": "colliermoore@slofast.com",
            "phone": 3989039,
            "mtrnr": 554512,
            "course": "cmd"
        },
        {
            "birthday": "1.10.2063",
            "firstname": "Mills",
            "name": "Battle",
            "gender": "male",
            "email": "millsbattle@slofast.com",
            "phone": 1707604,
            "mtrnr": 196401,
            "course": "cmd"
        },
        {
            "birthday": "1.9.1919",
            "firstname": "Reese",
            "name": "Sellers",
            "gender": "male",
            "email": "reesesellers@slofast.com",
            "phone": 4250886,
            "mtrnr": 226502,
            "course": "cmd"
        },
        {
            "birthday": "9.2.2050",
            "firstname": "Bond",
            "name": "Hood",
            "gender": "male",
            "email": "bondhood@slofast.com",
            "phone": 5984318,
            "mtrnr": 443879,
            "course": "et"
        },
        {
            "birthday": "10.8.2081",
            "firstname": "Combs",
            "name": "Park",
            "gender": "male",
            "email": "combspark@slofast.com",
            "phone": 3723655,
            "mtrnr": 120686,
            "course": "et"
        },
        {
            "birthday": "5.1.2089",
            "firstname": "Mueller",
            "name": "Harrington",
            "gender": "male",
            "email": "muellerharrington@slofast.com",
            "phone": 9030407,
            "mtrnr": 951246,
            "course": "cmd"
        },
        {
            "birthday": "6.12.1974",
            "firstname": "Lena",
            "name": "Ayers",
            "gender": "female",
            "email": "lenaayers@slofast.com",
            "phone": 7725920,
            "mtrnr": 228626,
            "course": "et"
        },
        {
            "birthday": "27.1.2046",
            "firstname": "Roslyn",
            "name": "Brewer",
            "gender": "female",
            "email": "roslynbrewer@slofast.com",
            "phone": 9892087,
            "mtrnr": 256522,
            "course": "et"
        },
        {
            "birthday": "16.6.2014",
            "firstname": "Jackie",
            "name": "Newton",
            "gender": "female",
            "email": "jackienewton@slofast.com",
            "phone": 3560311,
            "mtrnr": 286532,
            "course": "inf"
        },
        {
            "birthday": "14.7.1982",
            "firstname": "Kennedy",
            "name": "Compton",
            "gender": "male",
            "email": "kennedycompton@slofast.com",
            "phone": 5817252,
            "mtrnr": 543012,
            "course": "cmd"
        },
        {
            "birthday": "3.8.2079",
            "firstname": "Frederick",
            "name": "Farrell",
            "gender": "male",
            "email": "frederickfarrell@slofast.com",
            "phone": 1969437,
            "mtrnr": 348209,
            "course": "cmd"
        },
        {
            "birthday": "26.7.1989",
            "firstname": "Russo",
            "name": "Rhodes",
            "gender": "male",
            "email": "russorhodes@slofast.com",
            "phone": 2028086,
            "mtrnr": 849143,
            "course": "cmd"
        },
        {
            "birthday": "17.5.2073",
            "firstname": "Graham",
            "name": "Blackburn",
            "gender": "male",
            "email": "grahamblackburn@slofast.com",
            "phone": 9146140,
            "mtrnr": 419882,
            "course": "et"
        },
        {
            "birthday": "24.11.2027",
            "firstname": "Carla",
            "name": "Fitzgerald",
            "gender": "female",
            "email": "carlafitzgerald@slofast.com",
            "phone": 8097828,
            "mtrnr": 859549,
            "course": "inf"
        },
        {
            "birthday": "15.11.2022",
            "firstname": "Saundra",
            "name": "Rogers",
            "gender": "female",
            "email": "saundrarogers@slofast.com",
            "phone": 2111029,
            "mtrnr": 765851,
            "course": "et"
        },
        {
            "birthday": "27.5.2038",
            "firstname": "Verna",
            "name": "Duffy",
            "gender": "female",
            "email": "vernaduffy@slofast.com",
            "phone": 2205718,
            "mtrnr": 822757,
            "course": "et"
        },
        {
            "birthday": "19.3.2036",
            "firstname": "Lynch",
            "name": "Bowen",
            "gender": "male",
            "email": "lynchbowen@slofast.com",
            "phone": 2144681,
            "mtrnr": 779518,
            "course": "inf"
        },
        {
            "birthday": "20.7.1945",
            "firstname": "Aline",
            "name": "Juarez",
            "gender": "female",
            "email": "alinejuarez@slofast.com",
            "phone": 5995810,
            "mtrnr": 223693,
            "course": "cmd"
        },
        {
            "birthday": "24.11.2042",
            "firstname": "David",
            "name": "Fletcher",
            "gender": "male",
            "email": "davidfletcher@slofast.com",
            "phone": 1972517,
            "mtrnr": 334086,
            "course": "inf"
        },
        {
            "birthday": "12.4.2070",
            "firstname": "Jacqueline",
            "name": "Reyes",
            "gender": "female",
            "email": "jacquelinereyes@slofast.com",
            "phone": 9875350,
            "mtrnr": 844093,
            "course": "cmd"
        },
        {
            "birthday": "12.4.2023",
            "firstname": "Welch",
            "name": "Kline",
            "gender": "male",
            "email": "welchkline@slofast.com",
            "phone": 6133440,
            "mtrnr": 140010,
            "course": "inf"
        },
        {
            "birthday": "7.2.2051",
            "firstname": "Miles",
            "name": "Cooke",
            "gender": "male",
            "email": "milescooke@slofast.com",
            "phone": 6485542,
            "mtrnr": 392643,
            "course": "inf"
        },
        {
            "birthday": "1.2.1990",
            "firstname": "Doyle",
            "name": "Coffey",
            "gender": "male",
            "email": "doylecoffey@slofast.com",
            "phone": 8761870,
            "mtrnr": 385128,
            "course": "et"
        },
        {
            "birthday": "26.7.2031",
            "firstname": "Meghan",
            "name": "Bush",
            "gender": "female",
            "email": "meghanbush@slofast.com",
            "phone": 2506076,
            "mtrnr": 320864,
            "course": "cmd"
        },
        {
            "birthday": "4.5.1924",
            "firstname": "Thomas",
            "name": "Nguyen",
            "gender": "male",
            "email": "thomasnguyen@slofast.com",
            "phone": 4987779,
            "mtrnr": 283853,
            "course": "et"
        },
        {
            "birthday": "4.6.2033",
            "firstname": "Colon",
            "name": "Zamora",
            "gender": "male",
            "email": "colonzamora@slofast.com",
            "phone": 4322081,
            "mtrnr": 278293,
            "course": "cmd"
        },
        {
            "birthday": "13.11.2096",
            "firstname": "Bass",
            "name": "Mcneil",
            "gender": "male",
            "email": "bassmcneil@slofast.com",
            "phone": 7438586,
            "mtrnr": 658670,
            "course": "cmd"
        },
        {
            "birthday": "21.9.1941",
            "firstname": "Graciela",
            "name": "Bauer",
            "gender": "female",
            "email": "gracielabauer@slofast.com",
            "phone": 8333087,
            "mtrnr": 865184,
            "course": "cmd"
        },
        {
            "birthday": "9.2.1988",
            "firstname": "Nichols",
            "name": "Barry",
            "gender": "male",
            "email": "nicholsbarry@slofast.com",
            "phone": 2301417,
            "mtrnr": 475931,
            "course": "inf"
        },
        {
            "birthday": "7.1.2026",
            "firstname": "Armstrong",
            "name": "Hayes",
            "gender": "male",
            "email": "armstronghayes@slofast.com",
            "phone": 3817726,
            "mtrnr": 241881,
            "course": "cmd"
        },
        {
            "birthday": "24.2.1955",
            "firstname": "Mercedes",
            "name": "Hicks",
            "gender": "female",
            "email": "mercedeshicks@slofast.com",
            "phone": 9090594,
            "mtrnr": 880875,
            "course": "inf"
        },
        {
            "birthday": "1.8.2042",
            "firstname": "Owen",
            "name": "Burt",
            "gender": "male",
            "email": "owenburt@slofast.com",
            "phone": 4583852,
            "mtrnr": 906963,
            "course": "cmd"
        },
        {
            "birthday": "4.4.1915",
            "firstname": "Vargas",
            "name": "Mcintosh",
            "gender": "male",
            "email": "vargasmcintosh@slofast.com",
            "phone": 1165808,
            "mtrnr": 493463,
            "course": "inf"
        },
        {
            "birthday": "6.1.2031",
            "firstname": "Shelia",
            "name": "Vance",
            "gender": "female",
            "email": "sheliavance@slofast.com",
            "phone": 1889861,
            "mtrnr": 793999,
            "course": "cmd"
        },
        {
            "birthday": "3.3.2077",
            "firstname": "Patty",
            "name": "Hartman",
            "gender": "female",
            "email": "pattyhartman@slofast.com",
            "phone": 2324946,
            "mtrnr": 980460,
            "course": "inf"
        },
        {
            "birthday": "4.8.1957",
            "firstname": "Glass",
            "name": "Norris",
            "gender": "male",
            "email": "glassnorris@slofast.com",
            "phone": 2027832,
            "mtrnr": 536839,
            "course": "inf"
        },
        {
            "birthday": "6.9.2022",
            "firstname": "Christa",
            "name": "Carr",
            "gender": "female",
            "email": "christacarr@slofast.com",
            "phone": 8666047,
            "mtrnr": 922381,
            "course": "cmd"
        },
        {
            "birthday": "24.10.2050",
            "firstname": "Nguyen",
            "name": "Owens",
            "gender": "male",
            "email": "nguyenowens@slofast.com",
            "phone": 7958446,
            "mtrnr": 347220,
            "course": "et"
        },
        {
            "birthday": "26.5.2067",
            "firstname": "Lorene",
            "name": "Porter",
            "gender": "female",
            "email": "loreneporter@slofast.com",
            "phone": 1882041,
            "mtrnr": 638203,
            "course": "inf"
        },
        {
            "birthday": "21.2.2097",
            "firstname": "Houston",
            "name": "Hampton",
            "gender": "male",
            "email": "houstonhampton@slofast.com",
            "phone": 6040625,
            "mtrnr": 677292,
            "course": "inf"
        },
        {
            "birthday": "6.8.2040",
            "firstname": "Mayo",
            "name": "Higgins",
            "gender": "male",
            "email": "mayohiggins@slofast.com",
            "phone": 6023173,
            "mtrnr": 278130,
            "course": "et"
        },
        {
            "birthday": "17.8.1928",
            "firstname": "Albert",
            "name": "Travis",
            "gender": "male",
            "email": "alberttravis@slofast.com",
            "phone": 8309474,
            "mtrnr": 154257,
            "course": "cmd"
        },
        {
            "birthday": "7.9.2097",
            "firstname": "Jean",
            "name": "Mcdowell",
            "gender": "female",
            "email": "jeanmcdowell@slofast.com",
            "phone": 2032721,
            "mtrnr": 761204,
            "course": "et"
        },
        {
            "birthday": "7.6.2088",
            "firstname": "Hamilton",
            "name": "Blake",
            "gender": "male",
            "email": "hamiltonblake@slofast.com",
            "phone": 9880558,
            "mtrnr": 457554,
            "course": "et"
        },
        {
            "birthday": "25.6.1982",
            "firstname": "Tricia",
            "name": "Miller",
            "gender": "female",
            "email": "triciamiller@slofast.com",
            "phone": 3913468,
            "mtrnr": 841465,
            "course": "et"
        },
        {
            "birthday": "19.3.2089",
            "firstname": "Camille",
            "name": "Jacobson",
            "gender": "female",
            "email": "camillejacobson@slofast.com",
            "phone": 7262731,
            "mtrnr": 599031,
            "course": "inf"
        },
        {
            "birthday": "28.3.2066",
            "firstname": "Shirley",
            "name": "Potter",
            "gender": "female",
            "email": "shirleypotter@slofast.com",
            "phone": 3043671,
            "mtrnr": 945214,
            "course": "cmd"
        },
        {
            "birthday": "27.12.2099",
            "firstname": "Day",
            "name": "Mcleod",
            "gender": "male",
            "email": "daymcleod@slofast.com",
            "phone": 1576390,
            "mtrnr": 297334,
            "course": "et"
        },
        {
            "birthday": "4.7.1935",
            "firstname": "Willie",
            "name": "Blair",
            "gender": "female",
            "email": "willieblair@slofast.com",
            "phone": 3223513,
            "mtrnr": 239345,
            "course": "inf"
        },
        {
            "birthday": "23.1.1965",
            "firstname": "Spencer",
            "name": "Flynn",
            "gender": "male",
            "email": "spencerflynn@slofast.com",
            "phone": 5765198,
            "mtrnr": 662857,
            "course": "cmd"
        },
        {
            "birthday": "23.9.2053",
            "firstname": "Dennis",
            "name": "Nichols",
            "gender": "male",
            "email": "dennisnichols@slofast.com",
            "phone": 8464427,
            "mtrnr": 314807,
            "course": "et"
        },
        {
            "birthday": "2.7.1933",
            "firstname": "Shelley",
            "name": "Gillespie",
            "gender": "female",
            "email": "shelleygillespie@slofast.com",
            "phone": 2780922,
            "mtrnr": 781549,
            "course": "cmd"
        },
        {
            "birthday": "28.10.2084",
            "firstname": "Cummings",
            "name": "Noble",
            "gender": "male",
            "email": "cummingsnoble@slofast.com",
            "phone": 3760705,
            "mtrnr": 716235,
            "course": "cmd"
        },
        {
            "birthday": "2.11.2010",
            "firstname": "Peck",
            "name": "Frost",
            "gender": "male",
            "email": "peckfrost@slofast.com",
            "phone": 8023129,
            "mtrnr": 498418,
            "course": "et"
        },
        {
            "birthday": "3.6.1968",
            "firstname": "Melba",
            "name": "Colon",
            "gender": "female",
            "email": "melbacolon@slofast.com",
            "phone": 5638764,
            "mtrnr": 241307,
            "course": "inf"
        },
        {
            "birthday": "3.3.2020",
            "firstname": "Phyllis",
            "name": "Snyder",
            "gender": "female",
            "email": "phyllissnyder@slofast.com",
            "phone": 3657560,
            "mtrnr": 330833,
            "course": "et"
        },
        {
            "birthday": "21.12.2050",
            "firstname": "Ford",
            "name": "Mcgee",
            "gender": "male",
            "email": "fordmcgee@slofast.com",
            "phone": 9170602,
            "mtrnr": 393823,
            "course": "et"
        },
        {
            "birthday": "26.3.2068",
            "firstname": "Vasquez",
            "name": "Gallegos",
            "gender": "male",
            "email": "vasquezgallegos@slofast.com",
            "phone": 7709323,
            "mtrnr": 237795,
            "course": "et"
        },
        {
            "birthday": "8.11.2028",
            "firstname": "Atkins",
            "name": "Pratt",
            "gender": "male",
            "email": "atkinspratt@slofast.com",
            "phone": 5080611,
            "mtrnr": 143040,
            "course": "inf"
        },
        {
            "birthday": "22.3.1978",
            "firstname": "Rebecca",
            "name": "Howell",
            "gender": "female",
            "email": "rebeccahowell@slofast.com",
            "phone": 3585965,
            "mtrnr": 526621,
            "course": "cmd"
        },
        {
            "birthday": "14.8.1956",
            "firstname": "Amparo",
            "name": "Shepard",
            "gender": "female",
            "email": "amparoshepard@slofast.com",
            "phone": 3144682,
            "mtrnr": 561230,
            "course": "cmd"
        },
        {
            "birthday": "3.12.1923",
            "firstname": "Miriam",
            "name": "Booth",
            "gender": "female",
            "email": "miriambooth@slofast.com",
            "phone": 2407824,
            "mtrnr": 482983,
            "course": "cmd"
        },
        {
            "birthday": "25.9.2023",
            "firstname": "Lindsey",
            "name": "Mooney",
            "gender": "female",
            "email": "lindseymooney@slofast.com",
            "phone": 1017382,
            "mtrnr": 725731,
            "course": "inf"
        },
        {
            "birthday": "5.11.2015",
            "firstname": "Priscilla",
            "name": "Michael",
            "gender": "female",
            "email": "priscillamichael@slofast.com",
            "phone": 7060784,
            "mtrnr": 794252,
            "course": "et"
        },
        {
            "birthday": "25.11.2037",
            "firstname": "Billie",
            "name": "Contreras",
            "gender": "female",
            "email": "billiecontreras@slofast.com",
            "phone": 3966721,
            "mtrnr": 725276,
            "course": "inf"
        },
        {
            "birthday": "7.10.2045",
            "firstname": "Hodges",
            "name": "Stein",
            "gender": "male",
            "email": "hodgesstein@slofast.com",
            "phone": 8873008,
            "mtrnr": 618376,
            "course": "inf"
        },
        {
            "birthday": "11.6.1986",
            "firstname": "Debbie",
            "name": "Cleveland",
            "gender": "female",
            "email": "debbiecleveland@slofast.com",
            "phone": 8673893,
            "mtrnr": 990175,
            "course": "cmd"
        },
        {
            "birthday": "7.7.2058",
            "firstname": "Cheryl",
            "name": "Hull",
            "gender": "female",
            "email": "cherylhull@slofast.com",
            "phone": 6294068,
            "mtrnr": 136992,
            "course": "cmd"
        },
        {
            "birthday": "11.11.1929",
            "firstname": "Hatfield",
            "name": "Browning",
            "gender": "male",
            "email": "hatfieldbrowning@slofast.com",
            "phone": 6575514,
            "mtrnr": 890990,
            "course": "inf"
        },
        {
            "birthday": "6.2.1911",
            "firstname": "Orr",
            "name": "Petersen",
            "gender": "male",
            "email": "orrpetersen@slofast.com",
            "phone": 7232044,
            "mtrnr": 927135,
            "course": "cmd"
        },
        {
            "birthday": "9.10.2025",
            "firstname": "Guthrie",
            "name": "Haley",
            "gender": "male",
            "email": "guthriehaley@slofast.com",
            "phone": 1506922,
            "mtrnr": 985525,
            "course": "inf"
        },
        {
            "birthday": "3.6.2096",
            "firstname": "Rojas",
            "name": "Riley",
            "gender": "male",
            "email": "rojasriley@slofast.com",
            "phone": 1587367,
            "mtrnr": 316841,
            "course": "inf"
        },
        {
            "birthday": "5.4.1926",
            "firstname": "Chris",
            "name": "Flores",
            "gender": "female",
            "email": "chrisflores@slofast.com",
            "phone": 8348162,
            "mtrnr": 995847,
            "course": "cmd"
        },
        {
            "birthday": "5.11.1925",
            "firstname": "Hickman",
            "name": "Wade",
            "gender": "male",
            "email": "hickmanwade@slofast.com",
            "phone": 8170423,
            "mtrnr": 641204,
            "course": "et"
        },
        {
            "birthday": "13.7.1925",
            "firstname": "Travis",
            "name": "Lindsey",
            "gender": "male",
            "email": "travislindsey@slofast.com",
            "phone": 9345148,
            "mtrnr": 466975,
            "course": "et"
        },
        {
            "birthday": "16.12.2015",
            "firstname": "Luna",
            "name": "Bullock",
            "gender": "male",
            "email": "lunabullock@slofast.com",
            "phone": 7693530,
            "mtrnr": 253934,
            "course": "cmd"
        },
        {
            "birthday": "8.3.1911",
            "firstname": "Roberts",
            "name": "Howard",
            "gender": "male",
            "email": "robertshoward@slofast.com",
            "phone": 4487853,
            "mtrnr": 634161,
            "course": "inf"
        },
        {
            "birthday": "15.1.1983",
            "firstname": "Paige",
            "name": "Haney",
            "gender": "female",
            "email": "paigehaney@slofast.com",
            "phone": 7598630,
            "mtrnr": 222417,
            "course": "et"
        },
        {
            "birthday": "13.9.2063",
            "firstname": "Robertson",
            "name": "Benson",
            "gender": "male",
            "email": "robertsonbenson@slofast.com",
            "phone": 9854083,
            "mtrnr": 288851,
            "course": "inf"
        },
        {
            "birthday": "2.4.1973",
            "firstname": "Manning",
            "name": "Underwood",
            "gender": "male",
            "email": "manningunderwood@slofast.com",
            "phone": 4143851,
            "mtrnr": 444130,
            "course": "et"
        },
        {
            "birthday": "19.6.2086",
            "firstname": "Lessie",
            "name": "Dodson",
            "gender": "female",
            "email": "lessiedodson@slofast.com",
            "phone": 1228754,
            "mtrnr": 307740,
            "course": "inf"
        },
        {
            "birthday": "23.4.1939",
            "firstname": "Lynnette",
            "name": "Barnes",
            "gender": "female",
            "email": "lynnettebarnes@slofast.com",
            "phone": 8056661,
            "mtrnr": 360471,
            "course": "et"
        },
        {
            "birthday": "16.4.2026",
            "firstname": "Tiffany",
            "name": "York",
            "gender": "female",
            "email": "tiffanyyork@slofast.com",
            "phone": 6437788,
            "mtrnr": 417896,
            "course": "inf"
        },
        {
            "birthday": "24.10.2098",
            "firstname": "Erma",
            "name": "Barber",
            "gender": "female",
            "email": "ermabarber@slofast.com",
            "phone": 6454727,
            "mtrnr": 651200,
            "course": "et"
        },
        {
            "birthday": "9.1.1953",
            "firstname": "Ellis",
            "name": "Byrd",
            "gender": "male",
            "email": "ellisbyrd@slofast.com",
            "phone": 8480140,
            "mtrnr": 837179,
            "course": "inf"
        },
        {
            "birthday": "16.7.1980",
            "firstname": "Frye",
            "name": "Walsh",
            "gender": "male",
            "email": "fryewalsh@slofast.com",
            "phone": 5984882,
            "mtrnr": 320647,
            "course": "cmd"
        },
        {
            "birthday": "8.5.2073",
            "firstname": "Jodi",
            "name": "Camacho",
            "gender": "female",
            "email": "jodicamacho@slofast.com",
            "phone": 4676374,
            "mtrnr": 419660,
            "course": "et"
        },
        {
            "birthday": "15.10.1924",
            "firstname": "Judy",
            "name": "Aguirre",
            "gender": "female",
            "email": "judyaguirre@slofast.com",
            "phone": 4262825,
            "mtrnr": 793022,
            "course": "inf"
        },
        {
            "birthday": "17.8.2016",
            "firstname": "Cote",
            "name": "Suarez",
            "gender": "male",
            "email": "cotesuarez@slofast.com",
            "phone": 9204939,
            "mtrnr": 622423,
            "course": "et"
        },
        {
            "birthday": "7.3.1966",
            "firstname": "Ginger",
            "name": "Watson",
            "gender": "female",
            "email": "gingerwatson@slofast.com",
            "phone": 6561425,
            "mtrnr": 257032,
            "course": "inf"
        },
        {
            "birthday": "10.1.2016",
            "firstname": "Chan",
            "name": "Mcclain",
            "gender": "male",
            "email": "chanmcclain@slofast.com",
            "phone": 2591846,
            "mtrnr": 208080,
            "course": "cmd"
        },
        {
            "birthday": "23.11.2027",
            "firstname": "Webster",
            "name": "Faulkner",
            "gender": "male",
            "email": "websterfaulkner@slofast.com",
            "phone": 5297318,
            "mtrnr": 435459,
            "course": "cmd"
        },
        {
            "birthday": "4.11.1940",
            "firstname": "Harper",
            "name": "Carver",
            "gender": "male",
            "email": "harpercarver@slofast.com",
            "phone": 8582458,
            "mtrnr": 662787,
            "course": "cmd"
        },
        {
            "birthday": "26.2.1937",
            "firstname": "Jordan",
            "name": "Woods",
            "gender": "female",
            "email": "jordanwoods@slofast.com",
            "phone": 3615918,
            "mtrnr": 900934,
            "course": "cmd"
        },
        {
            "birthday": "22.10.2088",
            "firstname": "Molly",
            "name": "Palmer",
            "gender": "female",
            "email": "mollypalmer@slofast.com",
            "phone": 5125529,
            "mtrnr": 891494,
            "course": "et"
        },
        {
            "birthday": "24.6.1910",
            "firstname": "Velma",
            "name": "Herman",
            "gender": "female",
            "email": "velmaherman@slofast.com",
            "phone": 5392011,
            "mtrnr": 291251,
            "course": "et"
        },
        {
            "birthday": "28.12.1942",
            "firstname": "Thornton",
            "name": "Hurley",
            "gender": "male",
            "email": "thorntonhurley@slofast.com",
            "phone": 2050261,
            "mtrnr": 572852,
            "course": "cmd"
        },
        {
            "birthday": "28.2.2099",
            "firstname": "Penelope",
            "name": "Snider",
            "gender": "female",
            "email": "penelopesnider@slofast.com",
            "phone": 1270673,
            "mtrnr": 523130,
            "course": "cmd"
        },
        {
            "birthday": "24.3.2052",
            "firstname": "Sargent",
            "name": "Mcclure",
            "gender": "male",
            "email": "sargentmcclure@slofast.com",
            "phone": 9711705,
            "mtrnr": 309182,
            "course": "et"
        },
        {
            "birthday": "3.10.1968",
            "firstname": "Elisabeth",
            "name": "Goff",
            "gender": "female",
            "email": "elisabethgoff@slofast.com",
            "phone": 4436952,
            "mtrnr": 297918,
            "course": "et"
        },
        {
            "birthday": "10.5.2056",
            "firstname": "Christian",
            "name": "Massey",
            "gender": "male",
            "email": "christianmassey@slofast.com",
            "phone": 5053741,
            "mtrnr": 105699,
            "course": "cmd"
        },
        {
            "birthday": "24.3.1935",
            "firstname": "Valenzuela",
            "name": "Stone",
            "gender": "male",
            "email": "valenzuelastone@slofast.com",
            "phone": 6181176,
            "mtrnr": 354173,
            "course": "cmd"
        },
        {
            "birthday": "23.12.2029",
            "firstname": "Pace",
            "name": "Gross",
            "gender": "male",
            "email": "pacegross@slofast.com",
            "phone": 4241360,
            "mtrnr": 758727,
            "course": "cmd"
        },
        {
            "birthday": "13.9.2034",
            "firstname": "Gillespie",
            "name": "Macias",
            "gender": "male",
            "email": "gillespiemacias@slofast.com",
            "phone": 5304590,
            "mtrnr": 934034,
            "course": "inf"
        },
        {
            "birthday": "2.5.1946",
            "firstname": "Myers",
            "name": "Wells",
            "gender": "male",
            "email": "myerswells@slofast.com",
            "phone": 2121334,
            "mtrnr": 512539,
            "course": "et"
        },
        {
            "birthday": "20.4.2068",
            "firstname": "Raymond",
            "name": "Ferrell",
            "gender": "male",
            "email": "raymondferrell@slofast.com",
            "phone": 2328004,
            "mtrnr": 602512,
            "course": "cmd"
        },
        {
            "birthday": "16.6.2034",
            "firstname": "Florine",
            "name": "Delacruz",
            "gender": "female",
            "email": "florinedelacruz@slofast.com",
            "phone": 9007691,
            "mtrnr": 460351,
            "course": "inf"
        },
        {
            "birthday": "10.5.1928",
            "firstname": "Florence",
            "name": "Schwartz",
            "gender": "female",
            "email": "florenceschwartz@slofast.com",
            "phone": 4883892,
            "mtrnr": 208898,
            "course": "cmd"
        },
        {
            "birthday": "25.9.1937",
            "firstname": "Flynn",
            "name": "Brown",
            "gender": "male",
            "email": "flynnbrown@slofast.com",
            "phone": 8499013,
            "mtrnr": 826447,
            "course": "cmd"
        },
        {
            "birthday": "23.7.1922",
            "firstname": "Amalia",
            "name": "Duke",
            "gender": "female",
            "email": "amaliaduke@slofast.com",
            "phone": 2547850,
            "mtrnr": 307444,
            "course": "et"
        },
        {
            "birthday": "25.6.1918",
            "firstname": "Kristi",
            "name": "Beach",
            "gender": "female",
            "email": "kristibeach@slofast.com",
            "phone": 4925577,
            "mtrnr": 207371,
            "course": "et"
        },
        {
            "birthday": "20.12.2072",
            "firstname": "Lorna",
            "name": "Peterson",
            "gender": "female",
            "email": "lornapeterson@slofast.com",
            "phone": 6515450,
            "mtrnr": 807598,
            "course": "inf"
        },
        {
            "birthday": "10.8.2034",
            "firstname": "Aurelia",
            "name": "Deleon",
            "gender": "female",
            "email": "aureliadeleon@slofast.com",
            "phone": 4932292,
            "mtrnr": 662866,
            "course": "inf"
        },
        {
            "birthday": "18.8.2088",
            "firstname": "Martha",
            "name": "Duran",
            "gender": "female",
            "email": "marthaduran@slofast.com",
            "phone": 3064912,
            "mtrnr": 951395,
            "course": "et"
        },
        {
            "birthday": "1.7.2032",
            "firstname": "Noemi",
            "name": "Decker",
            "gender": "female",
            "email": "noemidecker@slofast.com",
            "phone": 6447537,
            "mtrnr": 796039,
            "course": "inf"
        },
        {
            "birthday": "1.7.1911",
            "firstname": "Lila",
            "name": "Bradshaw",
            "gender": "female",
            "email": "lilabradshaw@slofast.com",
            "phone": 4042330,
            "mtrnr": 250773,
            "course": "et"
        },
        {
            "birthday": "17.3.1956",
            "firstname": "Schmidt",
            "name": "Randolph",
            "gender": "male",
            "email": "schmidtrandolph@slofast.com",
            "phone": 3685364,
            "mtrnr": 555290,
            "course": "et"
        },
        {
            "birthday": "21.12.2090",
            "firstname": "Mercer",
            "name": "Holland",
            "gender": "male",
            "email": "mercerholland@slofast.com",
            "phone": 2989746,
            "mtrnr": 246892,
            "course": "inf"
        },
        {
            "birthday": "8.5.1996",
            "firstname": "Violet",
            "name": "Vang",
            "gender": "female",
            "email": "violetvang@slofast.com",
            "phone": 2477542,
            "mtrnr": 664356,
            "course": "et"
        },
        {
            "birthday": "11.10.2074",
            "firstname": "Sweet",
            "name": "Trujillo",
            "gender": "male",
            "email": "sweettrujillo@slofast.com",
            "phone": 7450124,
            "mtrnr": 255988,
            "course": "et"
        },
        {
            "birthday": "11.8.1920",
            "firstname": "Alston",
            "name": "Green",
            "gender": "male",
            "email": "alstongreen@slofast.com",
            "phone": 2585955,
            "mtrnr": 444082,
            "course": "inf"
        },
        {
            "birthday": "8.12.2068",
            "firstname": "Elisa",
            "name": "Carson",
            "gender": "female",
            "email": "elisacarson@slofast.com",
            "phone": 9395578,
            "mtrnr": 229238,
            "course": "inf"
        },
        {
            "birthday": "28.3.1973",
            "firstname": "Charles",
            "name": "Franklin",
            "gender": "male",
            "email": "charlesfranklin@slofast.com",
            "phone": 8363005,
            "mtrnr": 369173,
            "course": "et"
        },
        {
            "birthday": "11.2.1934",
            "firstname": "Pearl",
            "name": "Richardson",
            "gender": "female",
            "email": "pearlrichardson@slofast.com",
            "phone": 7884374,
            "mtrnr": 549395,
            "course": "et"
        },
        {
            "birthday": "19.8.1932",
            "firstname": "Bolton",
            "name": "Mckenzie",
            "gender": "male",
            "email": "boltonmckenzie@slofast.com",
            "phone": 1490976,
            "mtrnr": 165037,
            "course": "cmd"
        },
        {
            "birthday": "23.3.1972",
            "firstname": "Lott",
            "name": "Berg",
            "gender": "male",
            "email": "lottberg@slofast.com",
            "phone": 2296887,
            "mtrnr": 768781,
            "course": "cmd"
        },
        {
            "birthday": "23.2.1981",
            "firstname": "Eloise",
            "name": "Carroll",
            "gender": "female",
            "email": "eloisecarroll@slofast.com",
            "phone": 1425248,
            "mtrnr": 525994,
            "course": "cmd"
        },
        {
            "birthday": "13.10.1928",
            "firstname": "Morgan",
            "name": "Lara",
            "gender": "female",
            "email": "morganlara@slofast.com",
            "phone": 7458405,
            "mtrnr": 224856,
            "course": "cmd"
        },
        {
            "birthday": "22.4.2094",
            "firstname": "Elnora",
            "name": "Young",
            "gender": "female",
            "email": "elnorayoung@slofast.com",
            "phone": 1470140,
            "mtrnr": 252915,
            "course": "inf"
        },
        {
            "birthday": "17.1.1915",
            "firstname": "Russell",
            "name": "Anthony",
            "gender": "male",
            "email": "russellanthony@slofast.com",
            "phone": 4422434,
            "mtrnr": 498334,
            "course": "inf"
        },
        {
            "birthday": "1.8.1915",
            "firstname": "Ingram",
            "name": "Elliott",
            "gender": "male",
            "email": "ingramelliott@slofast.com",
            "phone": 1467353,
            "mtrnr": 659939,
            "course": "et"
        },
        {
            "birthday": "13.10.1966",
            "firstname": "Margo",
            "name": "Britt",
            "gender": "female",
            "email": "margobritt@slofast.com",
            "phone": 3058473,
            "mtrnr": 835803,
            "course": "cmd"
        },
        {
            "birthday": "6.1.1915",
            "firstname": "Faith",
            "name": "Macdonald",
            "gender": "female",
            "email": "faithmacdonald@slofast.com",
            "phone": 7584054,
            "mtrnr": 829023,
            "course": "inf"
        },
        {
            "birthday": "20.5.2053",
            "firstname": "Nixon",
            "name": "Keith",
            "gender": "male",
            "email": "nixonkeith@slofast.com",
            "phone": 8873004,
            "mtrnr": 772558,
            "course": "inf"
        },
        {
            "birthday": "26.8.1986",
            "firstname": "Dillard",
            "name": "Barton",
            "gender": "male",
            "email": "dillardbarton@slofast.com",
            "phone": 3257455,
            "mtrnr": 658950,
            "course": "inf"
        },
        {
            "birthday": "27.7.2047",
            "firstname": "Diane",
            "name": "Maldonado",
            "gender": "female",
            "email": "dianemaldonado@slofast.com",
            "phone": 2554258,
            "mtrnr": 727745,
            "course": "inf"
        },
        {
            "birthday": "14.5.1966",
            "firstname": "Pearson",
            "name": "Pollard",
            "gender": "male",
            "email": "pearsonpollard@slofast.com",
            "phone": 6925699,
            "mtrnr": 700344,
            "course": "et"
        },
        {
            "birthday": "12.10.2067",
            "firstname": "Corine",
            "name": "Ruiz",
            "gender": "female",
            "email": "corineruiz@slofast.com",
            "phone": 1209305,
            "mtrnr": 435726,
            "course": "inf"
        },
        {
            "birthday": "21.1.2039",
            "firstname": "Mcknight",
            "name": "Sawyer",
            "gender": "male",
            "email": "mcknightsawyer@slofast.com",
            "phone": 7892625,
            "mtrnr": 476772,
            "course": "inf"
        },
        {
            "birthday": "4.11.2011",
            "firstname": "Laura",
            "name": "Savage",
            "gender": "female",
            "email": "laurasavage@slofast.com",
            "phone": 7990520,
            "mtrnr": 126514,
            "course": "et"
        },
        {
            "birthday": "6.11.2031",
            "firstname": "Melton",
            "name": "Lynch",
            "gender": "male",
            "email": "meltonlynch@slofast.com",
            "phone": 3512656,
            "mtrnr": 364625,
            "course": "et"
        },
        {
            "birthday": "26.1.1930",
            "firstname": "Garrett",
            "name": "Christian",
            "gender": "male",
            "email": "garrettchristian@slofast.com",
            "phone": 5746131,
            "mtrnr": 870557,
            "course": "et"
        },
        {
            "birthday": "21.3.2047",
            "firstname": "Sloan",
            "name": "Slater",
            "gender": "male",
            "email": "sloanslater@slofast.com",
            "phone": 7006371,
            "mtrnr": 771446,
            "course": "et"
        },
        {
            "birthday": "7.7.1994",
            "firstname": "Lorrie",
            "name": "Hubbard",
            "gender": "female",
            "email": "lorriehubbard@slofast.com",
            "phone": 1441989,
            "mtrnr": 769496,
            "course": "et"
        },
        {
            "birthday": "3.7.1965",
            "firstname": "Brianna",
            "name": "Butler",
            "gender": "female",
            "email": "briannabutler@slofast.com",
            "phone": 9670500,
            "mtrnr": 726766,
            "course": "et"
        },
        {
            "birthday": "19.6.1999",
            "firstname": "Brady",
            "name": "Rodriguez",
            "gender": "male",
            "email": "bradyrodriguez@slofast.com",
            "phone": 5568810,
            "mtrnr": 330361,
            "course": "cmd"
        },
        {
            "birthday": "12.12.1934",
            "firstname": "Geraldine",
            "name": "Dean",
            "gender": "female",
            "email": "geraldinedean@slofast.com",
            "phone": 7840573,
            "mtrnr": 214760,
            "course": "et"
        },
        {
            "birthday": "10.6.2068",
            "firstname": "Alta",
            "name": "Morris",
            "gender": "female",
            "email": "altamorris@slofast.com",
            "phone": 7821151,
            "mtrnr": 408300,
            "course": "et"
        },
        {
            "birthday": "5.2.1994",
            "firstname": "Mandy",
            "name": "Levy",
            "gender": "female",
            "email": "mandylevy@slofast.com",
            "phone": 9730963,
            "mtrnr": 656296,
            "course": "cmd"
        },
        {
            "birthday": "25.11.2064",
            "firstname": "Allyson",
            "name": "Sweet",
            "gender": "female",
            "email": "allysonsweet@slofast.com",
            "phone": 7115260,
            "mtrnr": 239521,
            "course": "inf"
        },
        {
            "birthday": "5.8.2037",
            "firstname": "Rosalind",
            "name": "England",
            "gender": "female",
            "email": "rosalindengland@slofast.com",
            "phone": 1419886,
            "mtrnr": 449327,
            "course": "et"
        },
        {
            "birthday": "7.3.1965",
            "firstname": "Martinez",
            "name": "Wheeler",
            "gender": "male",
            "email": "martinezwheeler@slofast.com",
            "phone": 3164367,
            "mtrnr": 957591,
            "course": "inf"
        },
        {
            "birthday": "10.7.2064",
            "firstname": "Ware",
            "name": "Sharp",
            "gender": "male",
            "email": "waresharp@slofast.com",
            "phone": 5385774,
            "mtrnr": 925200,
            "course": "cmd"
        }
    ]


