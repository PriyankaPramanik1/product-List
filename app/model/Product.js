const mongoose = require('mongoose')
const Schema = mongoose.Schema


const 
productSchema = new Schema({
    product_name: {
        type: String,
        required: true
    },
    product_size: {
        type: [String],
        required: true
    },
    product_color: {
        type: [String],
        required: true
    },
    userdata_id: {
    type: Schema.Types.ObjectId,
    ref: 'UserData',
    required: true
  }

},
    {
        timestamps: true,
        versionKey: false
    })

const Product = mongoose.model('Product', productSchema)

module.exports = Product