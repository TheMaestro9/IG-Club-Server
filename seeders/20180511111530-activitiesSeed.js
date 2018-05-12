'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('activities', [{
    title: "Welcome Ya Shabab" ,
    content:"You are very welcomed",
    imageUrl:null,
    type:"International Trips",
    createdAt: new Date().toISOString().replace("T"," ").replace("Z","") , 
    updatedAt: new Date().toISOString().replace("T"," ").replace("Z","")
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
