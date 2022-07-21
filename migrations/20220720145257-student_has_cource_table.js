'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     return Promise.all([
        await queryInterface.createTable('student_has_course', {
          id: {
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.literal('uuid_generate_v4()'),
          },
          student_id: {
            type: Sequelize.UUID,
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            references: {
              model: {
                tableName: 'student',
              },
              key: 'id',
              as: 'student_id',
            },
          },
          cource_id:{
            type: Sequelize.UUID,
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            references: {
              model: {
                tableName: 'cource',
              },
              key: 'id',
              as: 'cource_id',
            },
          },
          enrolledOn: { type: Sequelize.INTEGER, allownull: false, autoIncrement: true,  },
          status: { type: Sequelize.STRING, allownull: true },
          created_at: { type: Sequelize.DATE, allowNull: false },
          updated_at: { type: Sequelize.DATE, allowNull: false },
          deleted_at: { type: Sequelize.DATE },
        }),
      ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     return Promise.all([await queryInterface.dropTable('student_has_course')]);    
  }
};
