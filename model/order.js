const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    customer: {
        type: String,
        required: true,
        maxlength: 60,
      },
      address: {
        type: String,
        required: true,
        maxlength: 200,
      },
    total: {
        type: Number,
        required: true
    },
    products: {
        type:[ {
            product: {type: mongoose.Schema.Types.ObjectId, ref: 'ProductModel'},
            count: {type: Number}
        }],
    },
    
});

module.exports = mongoose.model('OrderModel', orderSchema);