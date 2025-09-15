const User = require('../model/UserData');

class UserController {
    
    // user form
    async userCreate(req, res) {
        res.render(
            'addUser', {
            title: "user_form"
        }
        )
    }
    // post user
    async createUser(req, res) {
        console.log(req.body);

        try {
            const { name } = req.body
            const data = new User({
                name
            })
            const datas = await data.save()
            if (datas) {
                return res.redirect('/product/form')
            }
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }

    }

    // get user
    async getUser(req, res) {
        try {
            const user = await User.find();
            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new UserController();