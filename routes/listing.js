const express = require("express")
const router = express.Router();
exports.router = router;
const wrapAsync = require("../utils/wrapAsync.js")
const expressError = require("../utils/expressError.js");
const { listingSchema} = require("../schema.js");
const {isLoggedIn, validateListing} = require("../middleware.js")
const ListingController = require("../controllers/listing.js")
const multer = require('multer')
const {storage} = require("../cloudConfig.js")
const upload = multer({storage})

// const validateListing = (req, res, next) =>{
//     let {error} = listingSchema.validate(req.body)
//     if(error){ 
//         let errMsg = error.details.map((el) => el.message).join(",")
//         throw new expressError(400, error)
//     } else {
//         next()
//     }
// }

router
.route("/")
.get( wrapAsync(ListingController.index))
.post( isLoggedIn, upload.single("listing[image]"), wrapAsync(ListingController.createListing))

router.get("/new", isLoggedIn, ListingController.renderNewForm)
 
router.route("/:id")
.get( wrapAsync(ListingController.showListing))
.put(isLoggedIn, upload.single("listing[image]"), validateListing, wrapAsync(ListingController.updateListing))
.delete(isLoggedIn, wrapAsync(ListingController.destroyListing))
 
router.get("/:id/edit", isLoggedIn, wrapAsync(ListingController.renderEditForm))

module.exports = router