'use strict';

const fs = require('fs-extra');
const path = require('path');
const Controller = require('egg').Controller;
const awaitWriteStream = require('await-stream-ready').write;
const sendToWormhole = require('stream-wormhole');
const md5 = require('md5');

class UploadController extends Controller {

  async index() {
    const ctx = this.ctx;
    const stream = await ctx.getFileStream();
    const filename = md5(stream.filename) + path
      .extname(stream.filename)
      .toLocaleLowerCase();
    const target = path.join(this.config.baseDir, '/app/public/uploads', filename);
    fs.ensureFileSync(target);
    const writeStream = fs.createWriteStream(target);
    try {
      await awaitWriteStream(stream.pipe(writeStream));
    } catch (err) {
      await sendToWormhole(stream);
      throw err;
    }
    ctx.body = {
      url: 'http://127.0.0.1:7001/public/uploads/' + filename,
    };
  }
}

module.exports = UploadController;
