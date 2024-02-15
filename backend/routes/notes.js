var express = require('express');
var router = express.Router();

// recieve all notes from logged in user
router.get('/:userId', function (req, res, next) {
  let userId = req.params.userId;

  req.app.locals.con.connect(function (err) {
    if (err) {
      console.log(err);
    }

    // GET all notes from a specific user
    let sql = `SELECT * FROM notes WHERE userId="${userId}" AND deleted="0"`;

    req.app.locals.con.query(sql, function (err, result) {
      if (err) {
        console.log(err);
      }
      res.json(result);
    });
  });
});

// recieve specific note
router.get('/:userId/:noteId', function (req, res, next) {
  let userId = req.params.userId;
  let noteId = req.params.noteId;

  req.app.locals.con.connect(function (err) {
    if (err) {
      console.log(err);
    }

    // GET one specific note from one specific user
    let sql = `SELECT * FROM notes WHERE userId="${userId}" AND deleted="0" AND noteId="${noteId}"`;

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

// update content in one note

router.put('/', (req, res, next) => {
  req.app.locals.con.connect(function (err) {
    if (err) {
      console.log(err);
    }

    let noteId = req.body.noteId;
    let userId = req.body.userId;
    let headline = req.body.headline;
    let textContent = req.body.textContent;
    let sql = `UPDATE notes SET headline="${headline}", textContent="${textContent}" WHERE noteId=${noteId} AND userId=${userId}`;

    req.app.locals.con.query(sql, function (err, result) {
      if (err) {
        console.log(err);
      }
      console.log('result', result);
      res.send(result);
    });
  });
});

// GET all notes - just for testing, not needed for the app, delete route when no longer needed
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

module.exports = router;
