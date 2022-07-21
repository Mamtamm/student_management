'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return Promise.all([
      await queryInterface.createTable('course', {
        id: {
          primaryKey: true,
          type: Sequelize.UUID,
          defaultValue: Sequelize.literal('uuid_generate_v4()'),
        },
        name: { type: Sequelize.STRING, allownull: false },
        noOfSeatsAvailable: { type: Sequelize.STRING, allownull: false },
        created_at: { type: Sequelize.DATE, allowNull: false },
        updated_at: { type: Sequelize.DATE, allowNull: false },
        deleted_at: { type: Sequelize.DATE },
      }),
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return Promise.all([await queryInterface.dropTable('course')]);
  },
};
