'use strict';

const Service = require('egg').Service;
const awaitWriteStream = require('await-stream-ready').write;
const sendToWormhole = require('stream-wormhole');
const md5 = require('md5');
const fs = require('fs-extra');
const path = require('path');

class UploadService extends Service {
  filename(filename) {
    return md5(filename) + path
      .extname(filename)
      .toLocaleLowerCase();
  }
  async local(stream) {
    const filename = this.filename(stream.filename);
    const target = path.join(this.config.baseDir, '/app/public/uploads', filename);
    fs.ensureFileSync(target);
    const writeStream = fs.createWriteStream(target);
    try {
      await awaitWriteStream(stream.pipe(writeStream));
    } catch (err) {
      await sendToWormhole(stream);
      throw err;
    }
    return filename;
  }

  async cos(stream) {
    const filename = this.filename(stream.filename);
    const { app, config: { cos: { client: { bucket, region } } } } = this;
    return new Promise((resolve, reject) => {
      app.cos.putObject({
        Bucket: bucket,
        Region: region,
        Key: filename,
        Body: stream,
      }, function(err, data) {
        if (err) {
          console.log(err);
          reject(err);
        }
        console.log(data);
        resolve('test');
      });
    });
  }
}

module.exports = UploadService;
