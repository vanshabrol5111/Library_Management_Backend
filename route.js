const express = require("express");

const{postBook,getBook,putBook,deleteBook,patchBook}= require("./controlfunction/function");

const router = express.Router();

router.post("/add",postBook);
router.get("/details",getBook);

router.put("/change",putBook);
router.delete("/remove",deleteBook)
router.patch("/changestatus",patchBook)

module.exports = router