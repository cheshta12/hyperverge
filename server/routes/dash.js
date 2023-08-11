const router = require("express").Router()
const pool = require("../db")
const authorisation = require("../middleware/authorization")

router.get("/", authorisation, async(req, res) =>{
    try {
        
        const user = await pool.query("Select * from users where user_id = $1", [ req.user ]);

        res.json(user.rows[0]);

    } catch (err) {
        console.err(err.message)
        res.status(500).send("Server Error")
    }
})

router.post("/", async(req,res) => {
    try {

        const { phone, addr, name } = req.body;

        const data = await pool.query("Update users set phone_no = $1 , addr = $2 where user_name = $3 ", [phone, addr, name]);

        res.json(data)
        
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
})

module.exports = router;
