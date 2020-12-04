const {
User,
RefreshToken

} = require('../../../models');

//Refresh Token pas dia logout
module.exports = async (req, res) => {
    const userId = req.body.user_id;
    
    const user = await User.findByPk(userId)

    if(!user) {
        return res.status(404).json({
            status: 'error',
            message: 'User Note found'
        })
    }

    //setelah logout dia menghapus tokennya dari modelrefreshtoken
    await RefreshToken.destroy({
        where : {
            user_id: userId
        }
    })

    return res.json({
        status: 'success',
        message: 'refresh_tokens deleted'
    })
}