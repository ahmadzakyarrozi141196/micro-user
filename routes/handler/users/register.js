const bcrypt = require('bcrypt')
const {User } = require('../../../models');
const validator = require('fastest-validator')
const v = new validator()
module.exports = async (req, res) =>{

    //pertama validasi
    const schema = {

        //ini dengan fastest validator dokumentasi
        name:'string|empty:false',
        email:'email|empty:false',
        password:'string|min:6',
        profession:'string|optional',
        
    }

    const validate = v.validate(req.body, schema);

    if(validate.length) {
        return res.status(400).json({
            status: 'error',
            message: validate
        })
    }

    //temukan salah satu kalo ada validasi

    const user = await User.findOne({
        where: {email: req.body.email }
    })
    if(user) {
        return res.status(409).json({
            status: 'error',
            message: 'email already exist'
        })
    } 

    //gunakan hashing password biar ga ketahuan
    const password = await bcrypt.hash(req.body.password, 10);

    //inisialisasi data
    const data = {
        password,
        name: req.body.name,
        email: req.body.email,
        profession: req.body.profession,
        role: req.body.role
    }

    //isi dbnta
    const createUser = await User.create(data);
    return res.json({
        data: 'success',
        id: createUser
    })

}