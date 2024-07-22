const reviews = require('../models/reviewModel')

 // Add a review
 exports.addReview = async (req,res) => {
    console.log('inside addReview');
    const { review,rating } = req.body;
    console.log(req.body);
    const userId = req.payload
    console.log(userId);
    try {
        const existingreview = await reviews.findOne({userId});
        console.log(existingreview);
        if (existingreview) {
            res.status(406).json('Review is already in DB!');
        } else {
            const newReview = new reviews({userId,review,rating});
            await newReview.save();
            res.status(200).json(newReview);
        }
    } catch (err) {
        console.error(err);
        res.status(401).json('Error occurred');
    }
  };

  //for home page
    exports.getReviews = async (req, res) => {
        console.log('inside getReviews');
        try {
        const homeReviews = await reviews.find()
             .populate('userId', 'username');
        res.status(200).json(homeReviews);
        } catch(err){
        res.status(400).json(err);
        }
    };
