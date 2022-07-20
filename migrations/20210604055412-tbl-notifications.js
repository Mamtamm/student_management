'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      await queryInterface.createTable('notifications', {
        id: {
          primaryKey: true,
          type: Sequelize.UUID,
          defaultValue: Sequelize.literal('uuid_generate_v4()'),
        },
        title: { type: Sequelize.STRING, allowNull: false },
        discription: { type: Sequelize.STRING, allowNull: false },
        is_read: { type: Sequelize.BOOLEAN, defaultValue: false },
        user_id: {
          type: Sequelize.UUID,
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
          references: {
            model: {
              tableName: 'users',
            },
            key: 'id',
            as: 'user_id',
          },
        },
        created_at: { type: Sequelize.DATE, allowNull: false },
        updated_at: { type: Sequelize.DATE, allowNull: false },
        deleted_at: { type: Sequelize.DATE },
      }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([await queryInterface.dropTable('notifications')]);
  },
};
