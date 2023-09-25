const imageService = require('../services/ImageService')

module.exports = {
  /**
   * Create Client Image
   */
  createClientImage: async (req, res) => {
    try {
      // const {client_id, image_url} = req.body
      const client_id = req.user.userid
      const {image_url} = req.body

      const {clientImageResponse} = await imageService.createClientImage(client_id, image_url)

      res.json(clientImageResponse)
    } catch (err) {
      console.log('Create Client Image Error', err)

      const errorResponse = {
        data: null,
        error: 'Create client image failed: ' + err
      }
      res.status(500).send(errorResponse)
    }
  },

  /**
   * Get Client Image
   */
  getClientImage: async (req, res) => {
    try {
      const client_id = req.user.userid
      console.log('client_id', client_id)
      const {clientImageResponse} = await imageService.getClientImage(client_id)
      res.json(clientImageResponse)
      console.log('Get Client Image Success', clientImageResponse)
    } catch (err) {
      console.log('Get Client Image Error', err)

    }
  },

  /**
   * Update Client Image
   */
  updateClientImage: async (req, res) => {
    try {
      // const {client_id, image_url} = req.body;
      const client_id = req.user.userid;
      const image_url = req.body.image_url;

      const {clientImageResponse} = await imageService.updateClientImage(client_id, image_url);

      res.json(clientImageResponse);
    } catch (err) {
      console.log('Update Client Image Error', err);

      const errorResponse = {
        data: null,
        error: 'An error occurred: ' + err.message
      };
      res.status(500).json(errorResponse);
    }
  },

  /**
   * Get Resource Image
   */
  getResourceImage: async (req, res) => {
    try {
      const {resource_id} = req.body
      const {resourceImageResponse} = await imageService.getResourceImage(resource_id)
      res.json(resourceImageResponse)
      console.log('Get Resource Image Success', resourceImageResponse)
    } catch (err) {
      console.log('Get Resource Image Error', err)
    }
  },


  /**
   * Create Resource Image
   */
  createResourceImage: async (req, res) => {
    try {
      const {resource_id, image_url} = req.body
      const {data, error} = await imageService.createResourceImage(resource_id, image_url)
      if (error) {
        res.status(500).json({data: null, error});
      } else {
        res.json(data);
      }
    } catch (err) {
      console.log('Create Client Image Error', err);
      res.status(500).json({
        data: null,
        error: 'An error occurred: ' + err.message
      });
    }
  },

  /**
   * Delete Resource Image
   */
  deleteResourceImage: async (req, res) => {
    try {
      const {resourceImage_id} = req.params
      const {data, error} = await imageService.deleteResourceImage(resourceImage_id)
      if (error) {
        res.status(500).json({data: null, error});
      } else {
        res.json(data);
      }
    } catch (err) {
      console.log('Delete Client Image Error', err);
      res.status(500).json({
        data: null,
        error: 'An error occurred: ' + err.message
      });
    }
  }

}