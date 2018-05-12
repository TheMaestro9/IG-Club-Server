'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Activities', [{
      title: "Paris Visit",
      content: "You are very welcomed",
      imageUrl: null,
      type: "International Trips",
      createdAt: new Date().toISOString().replace("T", " ").replace("Z", ""),
      updatedAt: new Date().toISOString().replace("T", " ").replace("Z", "")
    },
    {
      title: "Gmasa",
      content: "1 day in gamasa",
      imageUrl: null,
      type: "Domestic Trips",
      createdAt: new Date().toISOString().replace("T", " ").replace("Z", ""),
      updatedAt: new Date().toISOString().replace("T", " ").replace("Z", "")

    }, {
    title: "Sharm El Shekh" ,
    content:"4 days in sharm",
    imageUrl:null,
    type:"Domestic Trips",
    createdAt: new Date().toISOString().replace("T"," ").replace("Z","") , 
    updatedAt: new Date().toISOString().replace("T"," ").replace("Z","")
    }
    ])
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
