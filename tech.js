
const express = require("express");
const app = express();
const port = 8000;
const passwordhash = require("password-hash");
const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

const serviceAccount = require("./key.json");

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();
app.set("view engine", "ejs");


let userData = [];

app.use((req, res, next) => {
  db.collection("SIGNUP")
    .get()
    .then((docs) => {
      userData = [];
      docs.forEach((doc) => {
        userData.push(doc.data());
      });
      next();
    })
    .catch((error) => {
      console.error("Error fetching user data:", error);
      res.sendStatus(500);
    });
});
app.get("/base.html", (req, res) => {
  res.sendFile(__dirname + "/views/base.html");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/loginsubmit", (req, res) => {
  const email = req.query.email;

  db.collection("SIGNUP")
    .where("email", "==", email)
    .get()
    .then((docs) => {
      let result = false;
      let userName = ""; 
      let mail ="";
      docs.forEach((doc) => {
        const hashp = doc.data().password;
        result = passwordhash.verify(req.query.password, hashp);
        
        if (result) {
          userName = doc.data().name; 
          mail=doc.data().email;

          if ((email == "vinaythanay@gmail.com" || email == "raj34@gmail.com") && (req.query.password == "987654" ||req.query.password == "123456" ) )
          {
            res.render("term", { userData: data,userName,mail},);
          } 
          else {
            res.sendFile(__dirname + "/views/letstart.html");
          }
        } else {
          res.render("login_fail");
        }
      });
    })
    .catch((error) => {
      console.error("Error during login:", error);
      res.sendStatus(500);
    });
});


app.get("/signup", (req, res) => {
  res.render("signup");
});

app.post("/signupsubmit", (req, res) => {
  const full_name = req.body.fullname;
  const email = req.body.email;
  const password = req.body.password;

  db.collection("SIGNUP")
    .where("email", "==", email)
    .get()
    .then((docs) => {
      if (docs.size > 0) {
        res.render("signup_fail");
      } else {
        db.collection("SIGNUP")
          .where("fullname", "==", full_name)
          .get()
          .then((docs) => {
            if (docs.size > 0) {
              res.render("signup_fail");
            } else {
              db.collection("SIGNUP")
                .add({
                  name: full_name,
                  email: email,
                  password: passwordhash.generate(password),
                })
                .then(() => {
                  res.render("signup_success");
                })
                .catch((error) => {
                  console.error("Error adding user: ", error);
                  res.render("signup_fail", { message: "Error signing up" });
                });
            }
          })
          .catch((error) => {
            console.error("Error checking name: ", error);
            res.render("signup_fail", { message: "Error signing up" });
          });
      }
    })
    .catch((error) => {
      console.error("Error checking email: ", error);
      res.render("signup_fail", { message: "Error signing up" });
    });
});


app.get('/get-expenses', (req, res) => {
  res.json(expenses);
});
app.get("/term.html", (req, res) => {
  res.sendFile(__dirname + "/views/term.html");
});
app.get("/try.html", (req, res) => {
  res.sendFile(__dirname + "/views/try.html");
});

app.get("/base.html", (req, res) => {
  res.sendFile(__dirname + "/views/base.html");
});
app.get("/limit.html", (req, res) => {
  res.sendFile(__dirname + "/views/limit.html");
});
app.get("/try.html", (req, res) => {
  res.sendFile(__dirname + "/views/try.html");
});
app.get("/letstart.html", (req, res) => {
  res.sendFile(__dirname + "/views/letsart.html");
});
app.get("/countup.html", (req, res) => {
  res.sendFile(__dirname + "/views/countup.html");
});
app.get("/report.html", (req, res) => {
  res.sendFile(__dirname + "/views/report.html");
});
app.get("/expense.html", (req, res) => {
  res.sendFile(__dirname + "/views/expense.html");
});
app.get("/settings.html", (req, res) => {
  res.sendFile(__dirname + "/views/settings.html");
});
app.get("/contact.html", (req, res) => {
  res.sendFile(__dirname + "/views/contact.html");
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});