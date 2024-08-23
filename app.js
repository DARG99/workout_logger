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
app.use(express.json());

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

app.get("/addworkout", isAuthenticated, (req, res) => {
  const query = "SELECT * FROM exercises";

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).send("Error on server");
    }
    if (results.length === 0) {
      return res.status(401).send("No");
    }
    res.render("add_workout", { exercises: results });
  });
});

//APAGAR O ISTO E SO PARA SABER COMO FUNCIONA
app.get("/exercise/:id", (req, res) => {
  // Extract the exercise ID from the route parameters
  const exerciseId = req.params.id;

  // Query the database for the exercise using the ID
  const query = "SELECT * FROM exercises WHERE exercise_id = ?";
  db.query(query, [exerciseId], (err, results) => {
    if (err) {
      return res.status(500).send("Server error");
    }
    if (results.length === 0) {
      return res.status(404).send("Exercise not found");
    }

    const data = results[0];
    // Render the exercise details page with the retrieved exercise data
    res.json(data);
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
    const passwordMatch = await bcrypt.compare(password, user.passwordHash);

    if (!passwordMatch) {
      return res.status(401).send("Invalid credentials");
    }

    req.session.user = {
      id: user.userID,
      username: user.username,
      email: user.email,
    };


    const redirectTo = req.session.returnTo || "/";
    delete req.session.returnTo;
    res.redirect(redirectTo); // Redirect to home page or any other protected route
  });
});

app.post("/register", user.register, (req, res) => {});

app.post("/addworkout", (req, res) => {
  const exercisesData = req.body.exercises;
  const title = req.body.name;

  if (exercisesData.length === 0) {
    return res.status(401).send("No exercises data");
  }

  const userID = req.session.user.id; //TROCAR O ID PARA O CURRENT USER

  const queryWorkoutPlans =
    "INSERT INTO workoutplans(userID, title, creationDate) VALUES (?, ?, ?)";
  db.query(queryWorkoutPlans, [userID, title, new Date()], (err, results) => {
    if (err) {
      console.error("Error registering user:", err);
      return res.status(500).send("Error on server");
    }
    const workoutPlanID = results.insertId;

    for (let i = 0; i < exercisesData.length; i++) {
      const exercise = JSON.parse(exercisesData[i]);

      const queryExercises =
        "INSERT INTO workoutplanexercises(workoutPlanID, exerciseID, sets) VALUES (?, ?, ?)";
      db.query(
        queryExercises,
        [workoutPlanID, exercise.id, exercise.sets],
        (err, results) => {
          if (err) {
            console.error("Error registering plan exercise:", err);
            return res.status(500).send("Error on server");
          }
        }
      );
    }
  });

  res.redirect("/");
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

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
