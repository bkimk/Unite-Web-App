const bookmarkService = require('../services/BookmarkService')

module.exports = {
	/**
	 * Create Client Bookmark
	 * @param {Object} req 
	 * @param {Object} res 
	 */
    createClientBookmark: async (req, res) => {
		try {
			const userId = req.user.userid
			const {resourceId}  = req.body
			const {clientResponse} = await bookmarkService.createClientBookmark(userId, resourceId)
			res.json(clientResponse)
		} catch (err) {
			console.log('Create Client Bookmarks Error', err)

			const errorResponse = {
				data: null,
				error: 'Failed to create bookmark'
			}
			res.status(500).send(errorResponse)
		}
	},


	/**
	 * Get Client Bookmarks (plural)
	 * @param {Object} req 
	 * @param {Object} res 
	 */
	getClientBookmarks: async (req, res) => {
		try {
			const userId = req.user.userid     
			const clientResponse = await bookmarkService.getClientBookmarks(userId)
			res.json(clientResponse)
		}
		catch (err) {
			console.log('Get Client Bookmarks Error', err)

			const errorResponse = {
				data: null,
				error: 'Failed to get bookmakrs'
			}
			res.status(500).send(errorResponse)
		}
	},


	/**
	 * Delete Client Bookmark (singular)
	 * @param {Object} req 
	 * @param {Object} res 
	 */
    deleteClientBookmark: async (req, res) => {
		try {
			const userId = req.user.userid    
			const {resourceId}  = req.body
			const clientResponse = await bookmarkService.deleteClientBookmark(userId, resourceId)
			res.json(clientResponse)
		}
		catch (err) {
			console.log('Delete Client Bookmark Error', err)

			const errorResponse = {
				data: null,
				error: 'Failed to remove bookmark'
			}
			res.status(500).send(errorResponse)
		}
	}
}
