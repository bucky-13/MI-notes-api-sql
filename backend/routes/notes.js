var express = require('express');
var router = express.Router();

// GET all notes - just for testing, not needed for the app
router.get('/', function (req, res, next) {
  req.app.locals.con.connect(function (err) {
    if (err) {
      console.log(err);
    }

    // GET all information from all notes
    let sql = `SELECT * FROM notes WHERE deleted="0"`;

    req.app.locals.con.query(sql, function (err, result) {
      if (err) {
        console.log(err);
      }
      res.json(result);
    });
  });
});

// GET all notes from logged in user
router.get('/:userId', function (req, res, next) {
  req.app.locals.con.connect(function (err) {
    if (err) {
      console.log(err);
    }

    // GET userName & userEmail from all users
    let sql = `SELECT * FROM notes WHERE deleted="0"`;

    req.app.locals.con.query(sql, function (err, result) {
      if (err) {
        console.log(err);
      }
      res.json(result);
    });
  });
});

// create new note
router.post('/', function (req, res, next) {
  req.app.locals.con.connect(function (err) {
    if (err) {
      console.log(err);
    }

    let userId = req.body.userId;
    let headline = req.body.headline;
    let textContent = req.body.textContent;

    let firstSql = `SELECT * FROM users WHERE userId="${userId}" AND deleted="0"`;

    // POST new user into database
    let secondSql = `INSERT INTO notes (userId, headline, textContent) VALUES ("${userId}", "${headline}", "${textContent}")`;

    req.app.locals.con.query(firstSql, function (err, result) {
      if (err) {
        console.log(err);
      }

      if (result[0]) {
        req.app.locals.con.query(secondSql, function (err, result) {
          if (err) {
            console.log(err);
          }
          res.json(result);
        });
      } else {
        res.status(409).json({ message: 'User does not exist' });
      }
    });
  });
});

module.exports = router;
