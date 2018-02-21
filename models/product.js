var mongoose = require("mongoose");
// Product schema 
    var ProductSchema = new mongoose.Schema({
    title: {type: String, required: true},
    slug: {type: String},
    desc: {type: String, required: true},
    category: {type: String, required: true},
    price: {type: Number},
    image: {type: String}
});

module.exports = mongoose.model("Product", ProductSchema);