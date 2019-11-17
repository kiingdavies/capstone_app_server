const moment = require('moment');
const uuid = require('uuid');

class Gif {
  /**
   * class constructor
   * @param {object} data
   */
  constructor() {
    this.gif = [];
  }
  /**
   * 
   * @returns {object} gif object
   */
  create(data) {
    const newGif = {
      gifid: uuid.v4(),
      message: data.message || '',
      createdon: moment.now(),
      title: data.title || '',
      imageurl: data.imageurl || '',
    };
    this.gif.push(newGif);
    return newGif
  }
  /**
   * 
   * @param {uuid} gifid
   * @returns {object} rgif object
   */
  findOne(gifid) {
    return this.gif.find(reflect => reflect.gifid === gifid);
  }
  /**
   * @returns {object} returns all gif
   */
  findAll() {
    return this.gif;
  }
  /**
   * 
   * @param {uuid} gifid
   * @param {object} data 
   */
  update(gifid, data) {
    const gif = this.findOne(gifid);
    const index = this.gif.indexOf(gif);
    this.gif[index].message = data['message'] || gif.message;
    this.gif[index].title = data['title'] || gif.title;
    this.gif[index].imageurl = data['imageurl'] || gif.imageurl;
    return this.gif[index];
  }
  /**
   * 
   * @param {uuid} gifid 
   */
  delete(gifid) {
    const gif = this.findOne(gifid);
    const index = this.gif.indexOf(gif);
    this.gif.splice(index, 1);
    return {};
  }
}
module.exports = new Gif();
