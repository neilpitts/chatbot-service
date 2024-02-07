'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Create extension for UUID generation
    await queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "pgcrypto";');

    await queryInterface.createTable('Rubrics', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()')
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Rubrics');
  }
};