const reviewService = require('../services/ReviewService')

module.exports = {
    /**
	 * Create Resource Review
	 * @param {Object} req 
	 * @param {Object} res 
	 */
    createResourceReview: async (req, res) => {
		try {
			const userid = req.user.id
			const {resourceid, rating, review}  = req.body
			const {clientResponse} = await reviewService.createResourceReview(userid, resourceid, rating, review)
			res.json(clientResponse)
		} catch (err) {
			console.log('Create Resource Review Error', err)

			const errorResponse = {
				data: null,
				error: 'Failed to create resource review'
			}
			res.status(500).send(errorResponse)
		}
	},
    /**
	 * Create Resource Review
	 * @param {Object} req 
	 * @param {Object} res 
	 */
    getResourceReviews: async (req, res) => {
		try {
			const {resourceid}  = req.body
			const {clientResponse} = await reviewService.getResourceReviews(resourceid)
			res.json(clientResponse)
		} catch (err) {
			console.log('Get Resource Reviews Error', err)

			const errorResponse = {
				data: null,
				error: 'Failed to get resource reviews'
			}
			res.status(500).send(errorResponse)
		}
	}

}