const mongoose = require("mongoose");

const ReviewsSchema = new mongoose.Schema(
    {
        userId:{type: String},
        filmId:{type: String},
        rate:Number,
        title:{type:String},
        text:{type:String}
    },
    {
        collection: "ReviewsInfo",
    }
);

mongoose.model("ReviewsInfo",ReviewsSchema);
