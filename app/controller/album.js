'use strict';

const Controller = require('egg').Controller;

class AlbumController extends Controller {

  async index() {
    const { ctx } = this;
    const albums = await ctx.model.Album.findAll({
      where: {
        user_id: ctx.userId,
      },
    });
    ctx.body = albums;
  }

  async show() {
  }

  async create() {
    const { ctx } = this;
    const body = ctx.request.body;
    ctx.validate({
      name: {
        required: true,
        type: 'string',
      },
      avatar: {
        required: true,
        type: 'string',
      },
      public: {
        required: true,
        type: 'enum',
        values: [ 0, 1 ],
      },
      desc: {
        required: true,
        type: 'string',
      },
    }, body);
    const data = Object.assign(body, {
      user_id: ctx.userId,
    });
    const album = await ctx.model.Album.create(data);
    ctx.body = album;
  }

  async update() {
  }

  async destroy() {
  }
}

module.exports = AlbumController;
