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
      await queryInterface.createTable('student', {
        id: {
          primaryKey: true,
          type: Sequelize.UUID,
          defaultValue: Sequelize.literal('uuid_generate_v4()'),
        },
        full_name: { type: Sequelize.STRING, allownull: false },
        address: { type: Sequelize.STRING, allownull: true },
        email: { type: Sequelize.STRING },
        phone_number: { type: Sequelize.STRING },
        password: { type: Sequelize.STRING },
        created_at: { type: Sequelize.DATE, allowNull: false },
        updated_at: { type: Sequelize.DATE, allowNull: false },
        deleted_at: { type: Sequelize.DATE },
      })
    ]);
  },

  async down(queryInterface, Sequelize) {
    return Promise.all([await queryInterface.dropTable('student')]);
  },
};
