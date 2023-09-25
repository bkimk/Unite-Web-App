const { createJWT } = require('../helpers/JWTHelper')
const clientModel = require('../models/ClientModel')


/**
 * registerClient: registers a new client
 */
const createClient = async (name, email, password) => {
    // Check if user already exists in database for given phonenumber + email
    const clientExistsResult = await clientModel.clientExists(email, null)
    if(clientExistsResult.userExists) {
        throw new Error('User already exists.')
    }

    // Use model to create client entry in database
    const createClientResult = await clientModel.createClient(name, email, password)    

    const clientResponse = {
        data: {
            msg: "Client creation successful",
        },
        error: null
    }
    return {clientResponse}
}


/**
 * loginClient: logs client in
 */
const loginClient = async (email, password) => {
    // Use model to check if client exists/credentials match in db, if so then pass back user's information
    const clientExistsResult = await clientModel.clientExists(email, password, null)
    console.log(clientExistsResult)
    if(!clientExistsResult.userExists) {
        throw new Error('Email and password combination do not match.')
    }


    // Create/Sign JWT
    const outgoingJWT = createJWT(clientExistsResult.userData[0].id)

    const clientResponse = {
        data: {
            msg: "Client Login successful",
            client: {
                name: clientExistsResult.userData[0].name,
                phonenumber: clientExistsResult.userData[0].phonenumber,
                email: clientExistsResult.userData[0].email,
                password: clientExistsResult.userData[0].password
            }
        },
        error: null
    }
    return {outgoingJWT, clientResponse}
}


/**
 * updateClient: updates existing client information
 */
const updateClient = async (userid, name, phonenumber, email, password) => {
    // Update user's info in database
    await clientModel.updateClient(userid, name, phonenumber, email, password)

    const clientResponse = {
        data: {
            msg: "Client update successful",
            client: {
                name: name,
                phonenumber: phonenumber,
                email: email,
                password: password,
            }
        },
        error: null
    }
    return clientResponse
}


/**
 * getClient: gets client's information
 */
const getClient = async (userid) => {
    // call sql here
    const getClientResult = await clientModel.getClient(userid)
    const userData = getClientResult.userData[0]

    const clientResponse = {
        data: {
            msg: "Get client successful",
            client: userData,
        },
        error: null
    }

    return clientResponse
}


/**
 * logoutClient: logs client out
 */
const logoutClient = () => {
    // Save to audit log? to do for later

    // return
}


/**
 * recoverPasswordClient: recovers client's password
 */
const recoverClientPassword = (email) => {
    // generate new password

    // call model function to save new password to database for given email

    // send email with new password

    const clientResponse = {
        data: {
            msg: "Reset Client Password Successful"
        },
        error: null
    }
    return response
}


/**
 * refreshClientToken: gets client's information
 * @param {string} userid 
 * @returns {Object}
 */
const refreshClientToken = async (userid) => {
    // Check if user already exists in database (email & phonenumber exist), if so throw error (to do)

    // if exists, give replacement JWT (All done using sql queries)

    // Create/Sign JWT
    const outgoingJWT = await createJWT(clients[0])

    const clientResponse = {
        data: {
            msg: "Refresh JWT Successful"
        },
        error: null
    }

    return {outgoingJWT, clientResponse}
}


module.exports = {
    createClient,
    loginClient,
    updateClient,    
    getClient,
    logoutClient,
    recoverClientPassword,
    refreshClientToken
}