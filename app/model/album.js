'use strict';

module.exports = app => {
  const { INTEGER, STRING, DATE } = app.Sequelize;

  const Album = app.model.define('Album', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    // 用户id
    user_id: {
      type: INTEGER,
      allowNull: false,
    },
    // 相册名
    name: {
      type: STRING(50),
      allowNull: false,
      defaultValue: '',
    },
    // 相册封面图
    avatar: {
      type: STRING(512),
      allowNull: false,
      defaultValue: '',
    },
    // 相册描述
    desc: {
      type: STRING(100),
      defaultValue: '',
    },
    // 是否开放访问(1: 是  0: 否)
    public: {
      type: INTEGER,
      defaultValue: 1,
    },
    // 建立时间
    created_at: DATE,
    // 更新时间
    updated_at: DATE,
  }, {
    indexes: [
      {
        method: 'BTREE',
        fields: [ 'created_at', 'user_id' ],
      },
    ],
  });

  Album.associate = function() {
    const model = app.model;
    model.Album.belongsTo(model.User, { foreignKey: 'id' });
  };

  return Album;
};
