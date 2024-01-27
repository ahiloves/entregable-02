const catchError = require('../utils/catchError');
const User = require('../models/user');

const getAll = catchError(async(req, res) => {
    // Operaciones...
    const user = await User.findAll()
    return res.json( user /* valor a retornar */)
});

const create = catchError(async (req, res)=>{
    const { firstName, lastName, email, password, birthday } = req.body
    const newBody = { firstName, lastName, email, password, birthday }
    const user = await User.create(newBody)
    return res.json(user)
})

const getOne = catchError(async (req, res)=>{
    const { id } = req.params
    const user = await User.findByPk(id)
    if(!user) return res.sendStatus(404)
    return res.json(user)
})

const destroy = catchError(async (req, res) =>{
    const { id } = req.params
    const user = await User.findByPk(id)
    if (!user) return res.sendStatus(404)

    await User.destroy({where:{ id }})
    // await song.destroy()
    return res.send('User Deleted').status(204)
})

const update = catchError(async (req, res)=>{
    const { id } = req.params
    const { firstName, lastName,  email, password,  birthday } = req.body
    const newBody = { firstName, lastName,  email, password,  birthday }

    const user = await User.findByPk(id)
    if (!user) return res.sendStatus(404)

    const userUpdate = await user.update(
        newBody,
        { where: { id }, returning: true}
    )
    return res.send(userUpdate[1][0])
})

module.exports = {
    getAll,
    create,
    getOne,
    destroy,
    update
}