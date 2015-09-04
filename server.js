var express = require('express'),
    http = require('http'),
    mongoose = require('mongoose'),
    moment = require('moment');
    
var app = express();
var server = server = http.createServer(app);
var io = require('socket.io').listen(server);

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if(process.env.NODE_ENV == "prod") {
  io.configure( function(){
    io.set('log level', 1);
    io.set( 'origins', '*ot2014.herokuapp.com*:*' );
  });

  mongoose.connect(process.env.MONGOLAB_URI);
} else {
  mongoose.connect('mongodb://localhost/ot2014');
}

var Course = require('./model/course.js').make();
var Erstie = require('./model/erstie.js').make();
var Group = require('./model/group.js').make();
var Tutor = require('./model/tutor.js').make();
var Member = require('./model/member.js').make();

require("./fixtures/ot2013.js").addFixtures(Tutor, Course, Group);

app.configure(function(){
  app.use(express.favicon(__dirname + '/public/favicon.ico'));
  app.use(express.logger('dev'));
  app.use(express.compress());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});

function getStats(cb) {
    var result = {
      gender: {
        male: 0,
        female: 0
      },
      course: {
        et: 0,
        inf: 0,
        cmd: 0
      }
    };
    
    // [ { _id: 'female', count: 1 }, { _id: 'male', count: 2 } ] 
    Erstie.aggregate({ $group: { _id: "$gender", count: {$sum: 1} } },
      function (err, g) {
        for(var i = 0; i < g.length; i++) {
          result.gender[g[i]._id] = g[i].count;
        }
        
        Erstie.aggregate({ $group: { _id: "$course", count: {$sum: 1} } },
          function (err, c) {
            for(var i = 0; i < c.length; i++) {
              result.course[c[i]._id] = c[i].count;
            }
            
            cb(result);
        });
    });
}

var limit = 17;

function createComparator(course) {
  return function compare(a,b) {
      if (a[course] > b[course])
         return -1;
      if (a[course] < b[course])
        return 1;
    
      if (a.total > b.total)
         return -1;
      if (a.total < b.total)
        return 1;
    
      return 0;
    }
}

function findGroup(erstie, callback) {
  var groups = [];
  var g = [];
  var processGroups = function(callback) {
    var sort = createComparator(erstie.course);
    var mygroups = groups.sort(sort);
    callback(mygroups[mygroups.length-1]);
  };

  var l = 0;
  var processMembers = function(group) {
    Member.find({ group: group._id }).populate("erstie").exec(function(err, members) {
        group.cmd = group.cmd || 0;
        group.et = group.et || 0;
        group.inf = group.inf || 0;
        group.total = members.length;
        for(var j = 0; j < members.length; j++) {
          if(members[j].erstie.course == "cmd") {
            group.cmd++;  
          } else if(members[j].erstie.course == "et"){
            group.et++;
          } else if(members[j].erstie.course == "inf") {
            group.inf++;
          }
        }
        groups.push(group);
      
        l++;
        if(l == g.length) {
          processGroups(callback); 
        }
      });
  }
  
  Group.find({}).limit(limit).populate("tutors").exec(function(err, sg) {
    for(var i = 0; i < sg.length; i++) {
      g.push(sg[i].toObject());
    }
    
    for(var i = 0; i < g.length; i++) {   
      processMembers(g[i]);
    }
  });
}

app.get('/api/v1/admin/stats',
	function(req, res) { 
    getStats(function(result) {
      res.charset = 'utf-8';
	    res.type('json');
      res.send(JSON.stringify(result));
    });
  }
);

app.get('/api/v1/admin/group/:id',
	function(req, res) { 
    Group.findOne({_id: req.params.id }).exec(function(err, group) {
      
      if(err || !group) {
        res.send(404, "Group not found");  
      } else {
        res.charset = 'utf-8';
	      res.type('json');
        res.send(JSON.stringify(group));
      }
      
    });
  }
);

app.get('/api/v1/admin/group/:id/members',
	function(req, res) { 
    Member.find({group: req.params.id }).populate("erstie").exec(function(err, members) {
      if(err || !members) {
        res.send(404, "Members not found");  
      } else {
        var m = [];
        
        for(var i = 0; i < members.length; i++) {
          m.push(members[i].erstie);  
        }
      
        res.charset = 'utf-8';
	      res.type('json');
        res.send(JSON.stringify(m));
      }
      
    });
  }
);

app.get('/api/v1/admin/groups',
	function(req, res) { 
    Group.find({}).exec(function(err, groups) {
      
      if(err || !groups) {
        res.send(404, "Groups not found");  
      } else {
        res.charset = 'utf-8';
	      res.type('json');
        res.send(JSON.stringify(groups));
      }
    });
  }
);

app.get('/api/v1/erstie/lookup/:email',
	function(req, res) {
    Erstie.findOne({ email: req.params.email }).exec(function(err, erstie) {
      if(err || !erstie) {
        res.send(404, "Erstie not found");  
      } else {
        Member.findOne({ erstie: erstie._id }).populate("group").exec(function(err, member) {
          if(err || !member) {
            res.send(404, "Membership not found"); 
          } else {
            res.send(JSON.stringify(member.group));
          }
        });
      }
    });
  }
);

function sendList(group) {
  Member.find({group: group._id }).populate("erstie").exec(function(err, members) {
      if(err || !members) {
        res.send(404, "Members not found");  
      } else {
        var m = [];
        
        for(var i = 0; i < members.length; i++) {
          m.push(members[i].erstie);  
        }
      
        io.sockets.emit("group",{ _id: group._id, members: m});
      }
      
    });
}

app.post('/api/v1/erstie/signup',
	function(req, res) {
    var rawErstie = req.body;
    var birthday = rawErstie.birthday;
    delete rawErstie.birthday;
    var erstie = new Erstie(rawErstie);
    
    erstie.birthday = moment(birthday, "DD.MM.YYYY").toDate();
    erstie.save();
    
    findGroup(erstie, function(group) {
        res.charset = 'utf-8';
        res.type('json');
      
        var membership = new Member();
        membership.erstie = erstie._id;
        membership.group = group._id;
        membership.save();
        
        console.log(group.name);
        var result = {
          success: true,
          group: group
        };
      
        process.nextTick(function() {
          getStats(function(data) {
            io.sockets.emit("stats",data);
          });
          sendList(group);
        });
      
        res.send(JSON.stringify(result));
    });
	}
);

// Start server
server.listen(process.env.PORT || 8080, process.env.IP || '0.0.0.0', function () {
  console.log('Express server listening on %s:%d', process.env.IP || '0.0.0.0', process.env.PORT || 8080);
});