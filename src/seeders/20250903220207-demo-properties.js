'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Properties', [
      {
        title: 'Cozy Beach House',
        description: 'Beautiful view of the ocean',
        price_per_night: 150.00,
        available_from: '2025-09-01',
        available_to: '2025-12-31',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Mountain Cabin',
        description: 'Quiet getaway in the mountains',
        price_per_night: 100.00,
        available_from: '2025-09-15',
        available_to: '2025-11-30',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Properties', null, {});
  }
};
