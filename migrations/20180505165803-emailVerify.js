'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Users', 'verified', {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    }).then()
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Users', 'verified')
  }
};
