const clientService = require('../services/ClientService')

module.exports = {
	/**
	 * Create Client
	 * @param {Object} req 
	 * @param {Object} res 
	 */
    createClient: async (req, res) => {
		try {
			const {name, email, password} = req.body
			const clientResponse = await clientService.createClient(name, email, password)

			res.json(clientResponse)
		}
		catch (err) {
			console.log('Create Client:', err)

			const errorResponse = {
				data: null,
				error: 'Failed to register client'
			}

			res.status(500).send(errorResponse)
		}
	},


	/**
	 * Login Client
	 * @param {Object} req 
	 * @param {Object} res 
	 */
	loginClient: async (req, res) => {
		try {
			const {email, password} = req.body
			const {outgoingJWT, clientResponse} = await clientService.loginClient(email, password)

			res.set("Authorization", outgoingJWT)		// sets JWT header
			res.json(clientResponse)
		}
		catch (err) {
			console.log('Login Client Error', err)

			const errorResponse = {
				data: null,
				error: "Failed to log in"
			}
			res.status(500).send(errorResponse)
		}
	},


	/**
	 * Update Client Info
	 * - Add location later
	 */
    updateClient: async (req, res) => {
		try {
			const userid = req.user.userid
			const {name, phonenumber, email, password} = req.body
			const clientResponse = await clientService.updateClient(userid, name, phonenumber, email, password)

			res.json(clientResponse)
		}
		catch (err) {
			console.log('Update Client Error', err)

			const errorResponse = {
				data: null,
				error: "Failed to update client information"
			}
			res.status(500).send(errorResponse)
		}
	},


	/**
	 * Get Client Info
	 * @param {Object} req 
	 * @param {Object} res 
	 */
	getClient: async (req, res) => {
		try {
			const userid = req.user.userid
			const clientResponse = await clientService.getClient(userid)

			// Status 200 OK, response: client object w/ information
			res.json(clientResponse)
		}
		catch (err) {
			console.log('Get Client Error: ', err)
			const errorResponse = {
				data: null,
				error: "Failed to get client information"
			}
			res.status(500).send(errorResponse)
		}
	},
    

	/**
	 * 
	 */
    logoutClient: async (req, res) => {		// Using a 200 ok response as placeholder
		try {
			res.status(200).send('OK');
		}
		catch (err) {
			console.log('Logout Client Error: ', err)
			const errorResponse = {
				data: null,
				error: 'Logout Client failed: ' + err
			}
			res.status(500).send(errorResponse)
		}
	},


	/**
	 * Recover Client Password
	 */
    recoverClientPassword: async (req, res) => {
		try {
			const email = req.body.email
			const { clientResponse } = await clientService.recoverClientPassword(email)

			// Status 200 OK, response: success message
			res.json(clientResponse)
		}
		catch (err) {
			// Status 500 Internal Server Error
			const errorResponse = {
				data: null,
				error: err.toString()
			}
			res.status(500).send(errorResponse)
		}
	},

	/**
	 * Refresh JWT
	 * @param {Object} req 
	 * @param {Object} res 
	 */
    refreshClientToken: async (req, res) => {
		try {
			const userid = req.user.id
			const { outgoingJWT, clientResponse } = await clientService.refreshClientToken(userid)
			
			res.set("Authorization", outgoingJWT)		// sets JWT header
			res.json(clientResponse)
		}
		catch (err) {
			const errorResponse = {
				data: null,
				error: 'Failed to refresh JWT'
			}
			res.status(500).send(errorResponse)
		}
	},
}