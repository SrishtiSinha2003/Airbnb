const express = require("express")
const router = express.Router({mergeParams: true})
const wrapAsync = require("../utils/wrapAsync.js")
const expressError = require("../utils/expressError.js");
const { reviewSchema } = require("../schema.js");
const Review = require("../models/reviews.js");
const Listing = require("../models/listing.js")
const { isLoggedIn, isReviewAuthor } = require("../middleware.js")

const validateReview = (req, res, next) =>{
    let {error} = reviewSchema.validate(req.body)
    if(error){ 
        let errMsg = error.details.map((el) => el.message).join(",")
        throw new expressError(400, error)
    } else {
        next()
    }
}

const reviewController = require("../controllers/reviews.js");
const review = require("../models/reviews.js");


router.post("/", isLoggedIn, validateReview, wrapAsync(reviewController.createReview))

router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(reviewController.destroyReview))

module.exports = router
