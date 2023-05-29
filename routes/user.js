const router = require("express").Router();
const {verifyTokenAndAuthorization } = require("../middleware/verifyToken");


router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {

    if (req.body.password) {
        req.body.password = bcrypt.hash(req.body.password).toString();
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(
         req.params.id,   
         {
            $set: req.body,
         },
         { new : true }
        );
        res.status(200).json(updatedUser);
    } catch(err){
        res.status(500).json(err);
    }
            
   
    
    });
    







module.exports = router;