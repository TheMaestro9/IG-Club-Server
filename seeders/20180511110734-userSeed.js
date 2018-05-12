'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Users', [{
      username: 'walid',
      email: "walid@mail.com",
      password:"$2a$10$O4yehCz3rwdPej9NRgMW0.zESDl6aTHohQ8i6BJCZAvr.t7BCPRSK", // password
      mobile:"010010010",
      grade: "9",
      school: "naser el dean",
      verified:true ,
      admin: false, 
      createdAt: new Date().toISOString().replace("T"," ").replace("Z","") , 
      updatedAt: new Date().toISOString().replace("T"," ").replace("Z","")
    }, {
      username: 'amor',
      email: "amr@mail.com",
      password:"$2a$10$O4yehCz3rwdPej9NRgMW0.zESDl6aTHohQ8i6BJCZAvr.t7BCPRSK",//password
      mobile:"010010010",
      grade: "9",
      school: "naser el dean",
      verified:true ,
      admin: true, 
      createdAt: new Date().toISOString().replace("T"," ").replace("Z","") , 
      updatedAt: new Date().toISOString().replace("T"," ").replace("Z","") 
    } 
  ], {});

  },

  down: (queryInterface, Sequelize) => {
    
      return queryInterface.bulkDelete('Users', null, {});
  
  }
};
