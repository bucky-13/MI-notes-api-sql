var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  req.app.locals.con.connect(function (err) {
    if (err) {
      console.log(err);
    }

    // GET userName & userEmail from all users
    let sql = `SELECT userId, userName, userEmail FROM users WHERE deleted="0"`;

    req.app.locals.con.query(sql, function (err, result) {
      if (err) {
        console.log(err);
      }
      res.json(result);
    });
  });
});

// create new user
router.post('/', function (req, res, next) {
  req.app.locals.con.connect(function (err) {
    if (err) {
      console.log(err);
    }

    let userName = req.body.userName;
    let userEmail = req.body.userEmail;
    //  ADD password encryption later on
    let userPassword = req.body.userPassword;

    let firstSql = `SELECT * FROM users WHERE userName="${userName}" OR userEmail="${userEmail}"`;

    // POST new user into database
    let secondSql = `INSERT INTO users (userName, userEmail, userPassword) VALUES ("${userName}", "${userEmail}", "${userPassword}")`;

    req.app.locals.con.query(firstSql, function (err, result) {
      if (err) {
        console.log(err);
      }
      if (!result[0]) {
        req.app.locals.con.query(secondSql, function (err, result) {
          if (err) {
            console.log(err);
          }
          res.json(result);
        });
      } else {
        res.status(409).json({ message: 'user name or email already exists' });
      }
    });
  });
});

// login user
router.post('/login', (req, res, next) => {
  req.app.locals.con.connect(function (err) {
    if (err) {
      console.log(err);
    }

    let userEmail = req.body.userEmail;
    let userPassword = req.body.userPassword;

    // If a user have been soft deleted, they cannot login

    let sql = `SELECT userId, userName, userEmail FROM users WHERE userEmail="${userEmail}"  AND userPassword="${userPassword}" AND deleted="0"`;

    req.app.locals.con.query(sql, function (err, result) {
      if (err) {
        console.log(err);
      }

      if (!result[0]) {
        res.status(401).json({
          message: 'Login failed, email or password are incorrect.',
        });
      } else {
        res.json(result);
      }
    });
  });
});

module.exports = router;
