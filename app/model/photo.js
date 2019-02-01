'use strict';

module.exports = app => {
  const { INTEGER, STRING, DATE } = app.Sequelize;

  const Photo = app.model.define('Photo', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    // 关联相册
    album_id: {
      type: INTEGER,
      allowNull: false,
    },
    // 相片名称
    name: {
      type: STRING(30),
      defaultValue: '',
    },
    // 相片描述
    desc: {
      type: STRING(100),
      defaultValue: '',
    },
    // 相片地址
    url: {
      type: STRING(512),
      allowNull: false,
      defaultValue: '',
    },
    user_id: {
      type: INTEGER,
      allowNull: false,
    },
    created_at: DATE,
    updated_at: DATE,
  }, {
    indexes: [
      {
        method: 'BTREE',
        fields: [ 'album_id' ],
      },
    ],
  });

  Photo.associate = function() {
    const model = app.model;
    model.Photo.belongsTo(model.Album, { foreignKey: 'album_id' });
  };

  return Photo;
};
