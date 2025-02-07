const Users = require('../models/users')

/**
 * @author Iván Sánchez
 * @name GET_ALL
 * @description Function to send to call all users
 * @params req(body)
 * */
const GET_ALL = async(res) => {
    const users = await Users.findAll()
    return res.status(200).json(users)
}

/**
 * @author Iván Sánchez
 * @name CREATE_ONE
 * @Description Function to create a new user
 * @Params req(body)
 * */
const CREATE_ONE = async(req, res) => {
    const user_created = await Users.create(req.body)
    return res.status(201).json(user_created)
}

/**
 * @author Iván Sánchez
 * @name GET_ONE
 * @Description Function to send to call all
 * users with id_user
 * @Params req(body.id_user)
 * */
const GET_ONE = async(req, res) => {
    const { id_user } = req.body
    const user = await Users.findByPk(id_user)
    if(!user) return res.sendStatus(404)
    return res.status(200).json(user)
}

/**
 * @author Iván Sánchez
 * @name DELETE_USER
 * @Description Function to delete from 
 * DB one register selected
 * @Params req(body.id_user)
 * */
const DELETE_USER = async(req, res) => {
    const { id_user } = req.body
    const userDeleted = await Users.destroy({
        where: {id_user}
    })
    if(!userDeleted) return res.sendStatus(404)
    return res.status(203).json(userDeleted)
}

/**
 * @author Iván Sánchez
 * @name UPDATE_USER
 * @Description Function to update from 
 * DB one register selected
 * @Params req(body.id_user)
 * */
const UPDATE_USER = async (req, res) => {
    const { id_user } = req.body;
    if (!id_user) {
        return res.status(400).json({ error: "Missing user ID" });
    }
    try {
        const [rowsUpdated, [updatedUser]] = await Users.update(
            { 
                name: req.body.name, 
                last_name: req.body.last_name, 
                email: req.body.email, 
                status: req.body.status, 
                rol: req.body.rol 
            },
            {
                where: { id_user },
                returning: true
            }
        );
        if (rowsUpdated === 0) {
            return res.status(404).json({ error: "User not found" });
        }
        return res.status(202).json(updatedUser);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = {
    GET_ALL,
    CREATE_ONE,
    GET_ONE,
    DELETE_USER,
    UPDATE_USER
}