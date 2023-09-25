const resourceService = require('../services/ResourceService')

module.exports = {
    // Service functions go here
    createResource: async (req, res) => {
		try {
            const userid = req.user.userid
			const {name, kindofresource, email, address, description, location, phonenumber, website, publishedby, hours} = req.body

			const clientResourceResponse = await resourceService.createResource(userid, name, kindofresource, email, address, description, location, phonenumber, website, hours)

			res.json(clientResourceResponse)
		}
		catch (err) {
			console.log('Create Client Resource Error', err)

			const errorResponse = {
				data: null,
				error: 'Failed to create resource'
			}
			res.status(500).send(errorResponse)
		}
	},
    /**
     * Get  Resource by ID
     */
    getResourceByID: async (req, res) => {
        try {
            const resource_id = req.body.resourceid
            
            const resourceResponse = await resourceService.getResourceByID(resource_id)
            
            console.log('Get Resource Success', resourceResponse)
            res.json(resourceResponse)
        }   catch (err) {
            console.log('Get Resource Error', err)

            const errorResponse = {
				data: null,
				error: 'Failed to get resource by ID'
			}
            res.status(500).send(errorResponse)
    
        }
    },
    /**
     * Get  Resource by Name
     */
    getResourceByName: async (req, res) => {
        try {
            const name = req.body.name
            
            const resourceResponse = await resourceService.getResourceName(name)
            res.json(resourceResponse)
            console.log('Get resource Success', resourceResponse)
        }   catch (err) {
            console.log('Get resource Error', err)
            const errorResponse = {
				data: null,
				error: 'Failed to get resource by Name'
			}
            res.status(500).send(errorResponse)
        }
    },
    /**
     * Get  Resource by Kind
     */
       getResourceByKind: async (req, res) => {
        try {
            const kindOfResource = req.body.kindofresource
            
            const resourceResponse = await resourceService.getResourceByKind(kindOfResource)
            
            console.log('Get Resource By Kind Success', resourceResponse)
            res.json(resourceResponse)
        }   catch (err) {
            console.log('Get Resource By Kind Error', err)

            const errorResponse = {
				data: null,
				error: 'Failed to get resource by kind'
			}
            res.status(500).send(errorResponse)
        }
    },
    /**
     * Get Resource Nearby
     * - UNFINISHED
     */
    getResourceNB: async (req, res) => {
        try {
            const {latitude,longitude,maxDistance} = req.body
            
            const {resourceResponse} = await resourceService.getResourceNB(latitude,longitude,maxDistance)

            res.json(resourceResponse)
            console.log('Get Resource Success', resourceResponse)
        }   catch (err) {
            console.log('Get Resource Error', err)
            const errorResponse = {
				data: null,
				error: 'Failed to get resources nearby'
			}
            res.status(500).send(errorResponse)
        }
    },
    /**
     * Update resource
     */
    updateResource: async (req, res) => {
        try {
        
        const userid = req.user.userid;
        
        const {resourceid, name, kindofresource, email, address, description, location, phonenumber, website, rating, publishedby, hours} = req.body;

        const resourceResponse = await resourceService.updateResource(userid, resourceid, name, kindofresource, email, address, description, location, phonenumber, website, rating, hours);
       
        res.json(resourceResponse);
        } catch (err) {
            console.log('Update resource Error', err);

            const errorResponse = {
                data: null,
                error: 'Failed to update resource'
            };
            res.status(500).json(errorResponse);
        }
    },

    /**
     * Delete Resource Image
     */
    deleteResource: async (req, res) => {
        try {
            const resourceid = req.body.resourceid
            const {data, error} = await resourceService.deleteResource(resourceid)
            if (error) {
                res.status(500).json({data: null, error});
            } else {
                res.json(data);
            }
        } catch (err) {
            console.log('Delete resource Error', err);
            res.status(500).json({
                data: null,
                error: 'Failed to delete resource'
            });
        }
    }

    
}
