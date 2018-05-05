'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.addColumn('EslRequests', 'UserId', {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      })
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.removeColumn('EslRequests', 'UserId');
  }
};
