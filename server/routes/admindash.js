const router = require("express").Router()
const pool = require("../db")
const bcrypt = require("bcrypt")
const jwtGenerator = require("../utils/jwtGenerator")
const authorisation = require("../middleware/authorization");
const validAdmin = require("../middleware/validAdmin");

router.post("/adminlogin", validAdmin, async(req, res) => {
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

        if(user.rows[0].user_email !== "admin@gmail.com"){
            return res.status(401).send("Email or Password is incorrect");
        }

        const token = jwtGenerator(user.rows[0].user_id);

        res.json({token})

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
})

router.get("/admindash", authorisation,  async(req, res) =>{
    try {
        
        const user = await pool.query("Select * from users", );

        res.json(user.rows)
        // res.json(user.rows[0]);

    } catch (err) {
        console.err(err.message)
        res.status(500).send("Server Error")
    }
})

router.delete("/admindash", async(req, res) => {
    try {
        
        const { name } = req.body;

        const data = await pool.query(" Delete from users where user_name = $1 ", [name]);

        res.json(data.rowCount)

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error")
    }
})

module.exports = router;
