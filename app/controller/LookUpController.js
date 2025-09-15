const User = require('../model/UserData')
const Product = require("../model/Product");


class LookUpController {

    async createUser(req, res) {
        console.log(req.body);

        try {
            const { name } = req.body
            const data = new User({
                name
            })
            const datas = await data.save()
            if (datas) {
                return res.status(201).json(datas);
            }
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }

    }


    async createProduct(req, res) {
        try {
            const { product_name, product_size, product_color, userdata_id } = req.body;
            const newProduct = await Product.create({ product_name, product_size, product_color, userdata_id });
            return res.status(201).json(newProduct);

        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
    async getproduct(req, res) {
        try {
            const Products = await Product.aggregate([
                {
                    $lookup: {
                        from: 'userdatas',
                        localField: 'userdata_id',
                        foreignField: '_id',
                        as: 'userdataDetails' // ✅ Correct alias
                    }
                },
                {
                    $unwind: '$userdataDetails' // ✅ Matches the alias above
                },
                {
                    $project: {
                        product_name: 1,
                        product_size: 1,
                        product_color: 1,
                        userdata_id: 1,
                        userdata_name: '$userdataDetails.name' // ✅ Display name
                    }
                }
            ]);

            res.render("productList", {
                title: "Product List",
                data: Products
            });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

   
}


module.exports = new LookUpController();