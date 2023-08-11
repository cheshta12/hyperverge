const router = require("express").Router();
const pool = require("../db")
const bcrypt = require("bcrypt")
const jwtGenerator = require("../utils/jwtGenerator")
const validInfo = require("../middleware/vaildinfo");
const authorisation = require("../middleware/authorization")
const validAdmin = require("../middleware/validAdmin");

//Reg

router.post("/register", validInfo, async(req, res) => {
    try {
        const { name, email, password} = req.body;

        const user = await pool.query("SELECT * FROM  users WHERE user_email = $1", [email]);

        if(user.rows.length !== 0){
            return res.status(401).send("User already exits");
        }

        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        const bcryptPassword = await bcrypt.hash(password, salt);

        const newUser = await pool.query("INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *", [name, email, bcryptPassword]);

        // res.json(newUser)

        const token = jwtGenerator(newUser.rows[0].user_id);

        res.json({token})

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error")
    }
})


router.post("/login", validInfo, async(req, res) => {
    try {
        
        const { email, password } = req.body;

        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
            email
        ]);

        if(user.rows.length === 0){
            return res.status(401).send("Email or Password is incorrect")
        }

        const validPassword = await bcrypt.compare(password, user.rows[0].user_password);

        if(!validPassword){
            return res.status(401).json("Email or Password is incorrect");
        }

        const token = jwtGenerator(user.rows[0].user_id);

        res.json({token})

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
})


router.get("/verify", authorisation, async(req, res) => {
    try {

        res.json(true)
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error")
    }
})

router.post("/adminlogin", validAdmin, async(req, res) => {
    try {
        
        const { password } = req.body;

        const user = await pool.query("SELECT * FROM users WHERE user_email = 'admin@gmail.com'");

        if(user.rows.length === 0){
            return res.status(401).send("Email or Password is incorrect")
        }

        const validPassword = await bcrypt.compare(password, user.rows[0].user_password);

        if(!validPassword){
            return res.status(401).json("Email or Password is incorrect");
        }

        const token = jwtGenerator(user.rows[0].user_id);

        res.json({token})

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
})

router.get("/admindash", authorisation, async(req, res) =>{
    try {
        
        const user = await pool.query("Select * from users", );

        res.json(user.rows)
        // res.json(user.rows[0]);

    } catch (err) {
        console.err(err.message)
        res.status(500).send("Server Error")
    }
})

router.delete("/admindash/:user_id", async(req, res, next) => {
    try {
        
        const id  = req.params.user_id;

        const data = await pool.query(" Delete from users where user_id = $1 ", [id]);

        res.json({message: "User deleted successfully"})

        next();

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error")
    }
})
module.exports = router;