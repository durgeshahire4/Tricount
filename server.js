var express  = require('express');
var app      = express();                               // create our app w/ express
var mongoose = require('mongoose');                     // mongoose for mongodb
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); 


//mongoose.connect('mongodb://node:nodeuser@mongo.onmodulus.net:27017/uwO3mypu');     // connect to mongoDB database on modulus.io
mongoose.connect('mongodb://127.0.0.1:27017/TricountDB', function (err, db) {
	if (!err) {
		console.log('db connection successful');
	} else {
		console.log('error', err);
	}
})

app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

    // listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080");

var Schema = mongoose.Schema;
var UserSchema = new Schema({
  name: String,
	username : String,
  password: String,
  mobile : String
});

var AccountsSchema = new Schema({
  name: String,
  description: String,
  currency: String
});

var User = mongoose.model('User', UserSchema);
var Accounts = mongoose.model('Accounts', AccountsSchema);

app.get('/api/getAllUser', function(req, res) {
  User.find(function(err, data) {
    if (err) {
      res.send(err);
    }
    res.json(data); 
  });
});

app.get('/api/getUser/:user_id', function (req, res) {
  User.find({
    _id : req.params.user_id
  }, function(err, data) {
    if (err) {
      res.send(err);
    }
    res.json(data);
  });
})


app.post('/api/addNewUser', function(req, res) {
  User.create({
    name : req.body.name,
    username : req.body.username,
    password : req.body.password,
    mobile: req.body.mobile,
    done : false
  }, function(err, data) {
    if (err) {
      res.send(err);
    }
    User.find(function(err, list) {
      if (err) {
        res.send(err);
      }   
      res.json(list);
    });
  });
});

app.get('/api/getByUsername/:username', function(req, res) {
  console.log(req, res);
  User.find({
    username: req.params.username
  }, function(err, data) {
    if (err) {
      res.send(err);
    }
    res.json(data);
  });
});

app.post('/api/updateUser/:user_id', function (req, res) {
  User.update({
    _id: req.params.user_id
  }, {
    name : req.body.name,
    username : req.body.username,
    password : req.body.password,
    mobile: req.body.mobile
  }, function (err, data) {
    if (err) {
      res.send(err);
    }
    User.find(function (er, list) {
      if (er) {
        res.send(er);
      }
      res.json(list);
    });
  });
})

app.delete('/api/deleteUser/:user_id', function(req, res) {
  User.remove({
    _id : req.params.user_id
  }, function(err, data) {
    if (err) {
      res.send(err);
    }
    User.find(function(err, list) {
      if (err) {
        res.send(err);
      }
      res.json(list);
    });
  });
});

//Accounts api

app.get('/api/getAllAccounts', function(req, res) {
  Accounts.find(function(err, data) {
    if (err) {
      res.send(err);
    }
    res.json(data); 
  });
});
app.get('/api/getAccount/:account_id', function (req, res) {
  Accounts.find({
    _id : req.params.account_id
  }, function(err, data) {
    if (err) {
      res.send(err);
    }
    res.json(data);
  });
})


app.post('/api/addNewAccount', function(req, res) {
  Accounts.create({
    name : req.body.name,
    description : req.body.description,
    currency: req.body.currency,
    done : false
  }, function(err, data) {
    if (err) {
      res.send(err);
    }
    Accounts.find(function(err, list) {
      if (err) {
        res.send(err);
      }   
      res.json(list);
    });
  });
});
app.delete('/api/deleteAccount/:account_id', function(req, res) {
  Accounts.remove({
    _id : req.params.account_id
  }, function(err, data) {
    if (err) {
      res.send(err);
    }
    Accounts.find(function(err, list) {
      if (err) {
        res.send(err);
      }
      res.json(list);
    });
  });
});