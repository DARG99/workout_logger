const bcrypt = require("bcrypt");
const db = require("../public/js/dbconnect");
module.exports.register = (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);

  const sql =
    "INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)";
  db.query(sql, [username, email, hashedPassword], (err, result) => {
    if (err) {
      console.error("Error registering user:", err);
      return res.status(500).json({ error: "Error registering user" });
    }
    console.log("User registered successfully:", result);
    res.redirect('/login'); // Redirect to the login page after successful registration
  });
};

module.exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("Error logging out");
    }
    res.redirect("/");
  });
};
