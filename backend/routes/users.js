var express = require('express');
var router = express.Router();
const CryptoJS = require('crypto-js');

const nameRegEx = new RegExp(/[A-Za-z0-9_-]{3,}/);
const emailRegEx = new RegExp(/^[a-z0-9.]{1,64}@[a-z0-9.]{1,64}$/i);

function checkForm(userName, userEmail) {
  let email = emailRegEx.exec(userEmail);
  let name = nameRegEx.exec(userName);

  if (email === null && name === null) {
    return 'User name and email are incorrect';
  } else if (email === null) {
    return 'Email is incorrect';
  } else if (name === null) {
    return 'User name is incorrect, valid characters are a-z, A-Z, 0-9, dash - and underscore _';
  } else {
    return 'regexOK';
  }
}

// recieve all users
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
    let userPassword = req.body.userPassword;

    // CHECK IF FORM INFO PASSES REGEX + CHECK PASSWORD LENGTH
    let isUserDataCorrect = checkForm(userName, userEmail);

    if (isUserDataCorrect !== 'regexOK') {
      res.status(409).json({
        message: isUserDataCorrect,
      });
      return;
    } else if (userPassword.length < 3) {
      res.status(409).json({
        message: 'Password needs to be at least 3 characters long',
      });
      return;
    }

    let encryptedPw = CryptoJS.AES.encrypt(
      userPassword,
      process.env.KEY_OF_SALT
    ).toString();

    // THIS CHECKS IF USER NAME OR EMAIL ALREADY ARE TAKEN BY ANOTHER USER
    let firstSql = `SELECT * FROM users WHERE userName="${userName}" OR userEmail="${userEmail}"`;

    // POST new user into database
    let secondSql = `INSERT INTO users (userName, userEmail, userPassword) VALUES ("${userName}", "${userEmail}", "${encryptedPw}")`;

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

    let sql = `SELECT userId, userName, userEmail, userPassword FROM users WHERE userEmail="${userEmail}"AND deleted="0"`;
    // CHECK IF USEREMAIL EXISTS, AND GET USER INFORMATION IF IT DOES
    req.app.locals.con.query(sql, function (err, result) {
      if (err) {
        console.log(err);
      }

      if (!result[0]) {
        res.status(401).json({
          message: 'Login failed, email is incorrect.',
        });
      } else {
        // CHECK IF SENT PASSWORD MATCHES PASSWORD IN DATABASE
        let storedPassword = CryptoJS.AES.decrypt(
          result[0].userPassword,
          process.env.KEY_OF_SALT
        ).toString(CryptoJS.enc.Utf8);
        if (storedPassword === userPassword) {
          let user = result[0];
          delete user.userPassword;
          res.json(user);
        } else {
          res.status(401).json({
            message: 'Login failed, password is incorrect.',
          });
        }
      }
    });
  });
});

// UPDATE USER DETAILS
router.put('/updateUser', (req, res, next) => {
  req.app.locals.con.connect(function (err) {
    if (err) {
      console.log(err);
    }
    let oldPassword = req.body.oldPassword;
    let userPassword = req.body.newPassword;
    let userId = req.body.userId;
    let userEmail = req.body.userEmail;
    let userName = req.body.userName;
    let firstSql = `SELECT userId, userPassword FROM users WHERE userId="${userId}" AND deleted="0"`;

    // FIRST CHECK: SEE IF USER TYPED IN CORRECT OLD PASSWORD
    req.app.locals.con.query(firstSql, function (err, user) {
      if (err) {
        console.log(err);
      }
      let storedPassword = CryptoJS.AES.decrypt(
        user[0].userPassword,
        process.env.KEY_OF_SALT
      ).toString(CryptoJS.enc.Utf8);

      if (oldPassword !== storedPassword) {
        res.status(401).json({
          message: 'update failed, password is incorrect.',
        });
      } else {
        let secondSql = `SELECT * FROM users WHERE NOT userId="${userId}" AND (userName="${userName}" OR userEmail="${userEmail}")`;

        // SECOND CHECK: SEE IF USERNAME OR EMAIL IS ALREADY TAKEN BY ANOTHER USER
        req.app.locals.con.query(secondSql, function (err, users) {
          if (err) {
            console.log(err);
          }
          if (users[0]) {
            res.status(401).json({
              message: 'User name or email already in use by another user.',
            });
          } else {
            let encryptedPw = CryptoJS.AES.encrypt(
              userPassword,
              process.env.KEY_OF_SALT
            ).toString();
            console.log(encryptedPw);
            let thirdSql = `UPDATE users SET userName="${userName}", userEmail="${userEmail}", userPassword="${encryptedPw}" WHERE userId="${userId}"`;

            req.app.locals.con.query(thirdSql, function (err, result) {
              if (err) {
                console.log(err);
              }
              // RETRIEVE UPDATED USER INFORMATION TO SEND BACK AS A RESPONSE
              let fourthSql = `SELECT userId, userName, userEmail FROM users WHERE userId="${userId}"`;
              req.app.locals.con.query(fourthSql, function (err, updatedUser) {
                res.json(updatedUser[0]);
              });
            });
            // console.log('yay');
          }
        });
      }
    });
  });
});
module.exports = router;
