module.exports = (req, res, next) => {
    const { email, password } = req.body;

    function validEmail(userEmail){
        if (userEmail === "admin@gmail.com"){
            return true;
        }
        else{
            return false;
        }
    }

    if(req.path === "./adminlogin"){
        if(![email, password].every(Boolean)){
            return res.status(401).json("Missing Credentials");
        }
        else if (!validEmail(email)){
            return res.status(401).json("Invalid Email Address")
        }
    }

    next();
}