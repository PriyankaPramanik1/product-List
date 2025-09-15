const User = require('../model/UserData');
const Product = require('../model/Product')
class ProductController {

    // productForm
    async productForm(req, res) {
        const user = await User.find();
        res.render(
            'productForm', {
            title: "product_form", user
        }
        )
    }

    // edit product
    async productEdit(req, res) {
        const id = req.params.id;
        try {
            const editdata = await Product.findById(id);
            if (!editdata) {
                return res.status(404).send({ message: "Product not found" });
            }
            res.render('editProduct', {
                title: "edit_Product_form",
                data: editdata,
                user: await User.find()
            });
        } catch (error) {
            console.log(error);
            res.status(500).send({ message: "Error fetching product" });
        }
    }


    // post product

    async createProduct(req, res) {
        try {
            const { product_name, product_size, product_color, userdata_id } = req.body;
            const newProduct = await Product.create({ product_name, product_size, product_color, userdata_id });

            if (newProduct) {
                res.redirect('/product')
            }

        } catch (error) {
            return res.status(500).json({ error: error.message });
        }

    }
    //get edit form

    async productEdit(req, res) {
        const id = req.params.id;
        try {
            const editdata = await Product.findById(id);
            if (!editdata) {
                return res.status(404).send({ message: "Product not found" });
            }

            const users = await User.find();

            res.render('editProduct', {
                title: "edit_Product_form",
                data: editdata,   // product document
                user: users       // all users
            });
        } catch (error) {
            console.log(error);
            res.status(500).send({ message: "Error fetching product" });
        }
    }



    // update product
    async updateProduct(req, res) {
        try {
            const id = req.params.id;
            const { product_name, product_size, product_color, user_id } = req.body;

            const updatedata = await Product.findByIdAndUpdate(
                id,
                { product_name, product_size, product_color, user_id },
                { new: true } // return updated doc
            );

            if (updatedata) {
                res.redirect('/product');
            } else {
                res.redirect(`/edit/products/${id}`);
            }
        } catch (error) {
            console.log(error);
            res.status(500).send("Error updating product");
        }
    }


    // delete
    async deleteProduct(req, res) {
        try {
            const id = req.params.id;

            // Delete the product
            const result = await Product.findByIdAndDelete(id);

            if (!result) {
                return res.status(404).json({ error: 'Product not found' });
            }

            res.redirect('/product')
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

}

module.exports = new ProductController();