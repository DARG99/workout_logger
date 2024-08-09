const express = require("express");
const path = require("path");
const user = require("./controllers/user");
const db = require("./public/js/dbconnect");
const engine = require("ejs-mate");
const session = require("express-session");
const bcrypt = require("bcrypt");
const app = express();
const PORT = process.env.PORT || 8080;

//passport

const { name } = require("ejs");
const { isAuthenticated } = require("./middleware");
const sessionConfig = {
  secret: "secretkey",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7, //expira a cookie daqui a uma semana
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};

app.use(session(sessionConfig));
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

// Set the view engine to EJS
app.engine("ejs", engine);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.locals.currentUser = req.session.user || null;
  next();
});

//GET
app.get(
  "/",
  /*isAuthenticated*/ (req, res) => {
    res.render("index", { workouts });
  }
);
app.get("/calendar", isAuthenticated, (req, res) => {
  res.render("calendar");
});
app.get("/login", (req, res) => {
  res.render("login");
});
app.get("/logout", user.logout);
app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/addworkout", (req, res) => {
  const query = "SELECT * FROM exercises";

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).send("Error on server");
    }
    if (results.length === 0) {
      return res.status(401).send("No");
    }
    console.log("Fetched exercises:", results);
    res.render("add_workout", { exercises: results });
  });
});

//POST
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const query = "SELECT * FROM users WHERE email = ?";
  db.query(query, [email], async (err, results) => {
    if (err) {
      return res.status(500).send("Error on login");
    }
    if (results.length === 0) {
      return res.status(401).send("Invalid credentials");
    }

    const user = results[0];
    console.log(user);
    const passwordMatch = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatch) {
      return res.status(401).send("Invalid credentials");
    }

    req.session.user = {
      id: user.user_id,
      username: user.username,
      email: user.email,
    };
    res.redirect("/"); // Redirect to home page or any other protected route
  });
});

app.post("/register", user.register, (req, res) => {});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

let workouts = [
  {
    name: "xD",
    description: "xD",
  },
  {
    name: "x",
    description: "xD",
  },
  {
    name: "ola",
    description: "xD",
  },
  {
    name: "xD",
    description: "xD",
  },
  {
    name: "xDasddddddddddasd",
    description: "lorem ipsumasddd",
  },

  {
    name: "xDasddddddddddasd",
    description: "lorem ipsumasddd",
  },
];
