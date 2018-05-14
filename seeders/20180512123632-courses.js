'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Courses', [{
      description: "the great esl course",
      name: "ESL",
      currentPeriod: "2018-05-12 06:23:05",
      nextRound: "2018-06-12 06:23:05",
      cost: 500,
      createdAt: new Date().toISOString().replace("T", " ").replace("Z", ""),
      updatedAt: new Date().toISOString().replace("T", " ").replace("Z", "")
    },
    {
      description: "apply for IELTS",
      name: "IELTS",
      currentPeriod: "2018-05-12 06:23:05",
      nextRound: "2018-06-12 06:23:05",
      cost: 1000,
      createdAt: new Date().toISOString().replace("T", " ").replace("Z", ""),
      updatedAt: new Date().toISOString().replace("T", " ").replace("Z", "")
    }, {
      description: "the great esl course",
      name: "Admission",
      currentPeriod: "2018-05-12 06:23:05",
      nextRound: "2018-06-12 06:23:05",
      cost: 100,
      createdAt: new Date().toISOString().replace("T", " ").replace("Z", ""),
      updatedAt: new Date().toISOString().replace("T", " ").replace("Z", "")
    }, {
      description: "Prepare yourself for IELTS",
      name: "IELTS Preparation",
      currentPeriod: "2018-05-12 06:23:05",
      nextRound: "2018-06-12 06:23:05",
      cost: 2000,
      createdAt: new Date().toISOString().replace("T", " ").replace("Z", ""),
      updatedAt: new Date().toISOString().replace("T", " ").replace("Z", "")
    }])
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
