'use strict';

const Controller = require('egg').Controller;

class UploadController extends Controller {

  // 本地服务器上传
  async local() {
    const { ctx, service } = this;
    const stream = await ctx.getFileStream();
    const filename = await service.upload.local(stream);
    ctx.body = {
      url: `http://127.0.0.1:7001/public/uploads/${filename}`,
    };
  }

  // 腾讯云cos上传
  async cos() {
    const { ctx, service } = this;
    const stream = await ctx.getFileStream();
    const url = await service.upload.cos(stream);
    ctx.body = {
      url,
    };
  }
}

module.exports = UploadController;
