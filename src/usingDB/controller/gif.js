const moment = require('moment');
const uuidv4 = require('uuid/v4');
const db = require('../db');

const Gif = {
  /**
   * Create A gif
   * @param {object} req 
   * @param {object} res
   * @returns {object} gif object 
   */
  async create(req, res) {
    const createQuery =  `INSERT INTO
    gif(gifid, message, createdon, title, imageurl)
    VALUES($1, $2, $3, $4, $5)`;
    const values = [
      uuidv4(),
      req.body.message,
      moment(new Date()),
      req.body.title,
      req.body.imageurl
    ];

    try {
      const { rows } = await db.query(createQuery, values);
      return res.status(201).send(rows[0]);
    } catch(error) {
      return res.status(400).send(error);
    }
  },
  /**
   * Get All gif
   * @param {object} req 
   * @param {object} res 
   * @returns {object} gif array
   */
  async getAll(req, res) {
    const findAllQuery = 'SELECT * FROM gif where gifid = $1';
    try {
      const { rows, rowCount } = await db.query(findAllQuery, [req.user.id]);
      return res.status(200).send({ rows, rowCount });
    } catch(error) {
      return res.status(400).send(error);
    }
  },
  /**
   * Get A gif
   * @param {object} req 
   * @param {object} res
   * @returns {object} gif object
   */
  async getOne(req, res) {
    const text = 'SELECT * FROM gif WHERE gifid = $1';
    try {
      const { rows } = await db.query(text, [req.params.id, req.user.id]);
      if (!rows[0]) {
        return res.status(404).send({'message': 'gifnot found'});
      }
      return res.status(200).send(rows[0]);
    } catch(error) {
      return res.status(400).send(error)
    }
  },
  /**
   * Update A gif
   * @param {object} req 
   * @param {object} res 
   * @returns {object} updated gif
   */
  async update(req, res) {
    const findOneQuery = 'SELECT * FROM gif WHERE id=$1';
    const updateOneQuery =`UPDATE gif
      SET message=$1,createdon=$2,title=$3,imageurl=$4
      WHERE gifid=$5`;
    try {
      const { rows } = await db.query(findOneQuery, [req.params.id, req.user.id]);
      if(!rows[0]) {
        return res.status(404).send({'message': 'gif not found'});
      }
      const values = [
        req.body.message || rows[0].message,
        moment(new Date()),
        req.body.title || rows[0].title,
        req.body.imageurl || rows[0].imageurl,
        req.params.id,
        req.user.id
      ];
      const response = await db.query(updateOneQuery, values);
      return res.status(200).send(response.rows[0]);
    } catch(err) {
      return res.status(400).send(err);
    }
  },
  /**
   * Delete A gif
   * @param {object} req 
   * @param {object} res 
   * @returns {void} return status code 204 
   */
  async delete(req, res) {
    const deleteQuery = 'DELETE FROM gif WHERE gifid=$1';
    try {
      const { rows } = await db.query(deleteQuery, [req.params.id, req.user.id]);
      if(!rows[0]) {
        return res.status(404).send({'message': 'gif not found'});
      }
      return res.status(204).send({ 'message': 'deleted' });
    } catch(error) {
      return res.status(400).send(error);
    }
  }
}

module.exports = Gif;
`INSERT INTO
      gif(gifid, message, createdon, title, imageurl)
      VALUES($1, $2, $3, $4, $5)
      returning *`;


      `INSERT INTO
      gif(gifid, message, createdon, title, imageurl)
      VALUES($1, $2, $3, $4, $5)
      returning *`;