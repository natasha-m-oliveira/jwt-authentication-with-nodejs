const Post = require('../models/Post');
const Services = require('./Services');

class PostServices extends Services {
  constructor() {
    super('posts');
  }

  async createRecord(data) {
    const post = new Post(data);
    post.valida();
    await super.createRecord(post);
  }
}

module.exports = PostServices;
