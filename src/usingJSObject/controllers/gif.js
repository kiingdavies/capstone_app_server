const GifModel = require('../models/gif');

const Gif = {
  /**
   * 
   * @param {object} req 
   * @param {object} res
   * @returns {object} gif object 
   */
  create(req, res) {
    if (!req.body.message && !req.body.title && !req.body.imageurl) {
      return res.status(400).send({'message': 'All fields are required'})
    }
    const gif = GifModel.create(req.body);
    return res.status(201).send(gif);
  },
  /**
   * 
   * @param {object} req 
   * @param {object} res 
   * @returns {object} gif array
   */
  getAll(req, res) {
    const gif = GifModel.findAll();
    return res.status(200).send(gif);
  },
  /**
   * 
   * @param {object} req 
   * @param {object} res
   * @returns {object} gif object
   */
  getOne(req, res) {
    const gif = GifModel.findOne(req.params.gifid);
    if (!gif) {
      return res.status(404).send({'message': 'gif not found'});
    }
    return res.status(200).send(gif);
  },
  /**
   * 
   * @param {object} req 
   * @param {object} res 
   * @returns {object} updated gif
   */
  update(req, res) {
    const gif = GifModel.findOne(req.params.gifid);
    if (!gif) {
      return res.status(404).send({'message': 'gif not found'});
    }
    const updatedGif = GifModel.update(req.params.gifid, req.body)
    return res.status(200).send(updatedGif);
  },
  /**
   * 
   * @param {object} req 
   * @param {object} res 
   * @returns {void} return statuc code 204 
   */
  delete(req, res) {
    const gif = GifModel.findOne(req.params.gifid);
    if (!gif) {
      return res.status(404).send({'message': 'gif not found'});
    }
    const ref = GifModel.delete(req.params.gifid);
    return res.status(204).send(ref);
  }
}

module.exports= Gif;
