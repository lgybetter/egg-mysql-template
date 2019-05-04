'use strict';

const Controller = require('egg').Controller;

class WxController extends Controller {
  async photos() {
    const { ctx } = this;
    const { params } = ctx;
    const photos = await ctx.model.Photo.findAll({
      where: {
        album_id: params.album_id,
      },
    });
    ctx.body = photos;
  }
}

module.exports = WxController;
