'use strict';

const Controller = require('egg').Controller;

class PhotoController extends Controller {
  async index() {
    const { ctx } = this;
    const { query } = ctx;
    const photos = await ctx.model.Photo.findAll({
      where: Object.assign(query, {
        user_id: ctx.userId,
      }),
    });
    ctx.body = photos;
  }

  async create() {
    const { ctx } = this;
    const body = ctx.request.body;
    ctx.validate({
      album_id: {
        required: true,
        type: 'int',
      },
      name: {
        type: 'string',
      },
      desc: {
        type: 'string',
      },
      url: {
        required: true,
        type: 'string',
      },
    });
    const data = Object.assign(body, {
      user_id: ctx.userId,
    });
    const photo = await ctx.model.Photo.create(data);
    ctx.body = photo;
  }
}

module.exports = PhotoController;
