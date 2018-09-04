'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Books', [{
      bookTitle: "First Book",
      imgUrl: null,
      ISBN: "123-123-123",
      category: "Edexcel",
      paymentMethod: "Vodafone Cash",
      bookCondition: "Good",
      price: 100,
      byAdmin: true,
      createdAt: new Date().toISOString().replace("T", " ").replace("Z", ""),
      updatedAt: new Date().toISOString().replace("T", " ").replace("Z", "")
    },
    {
      bookTitle: "Second Book",
      imgUrl: "https://about.canva.com/wp-content/uploads/sites/3/2015/01/art_bookcover.png",
      ISBN: "123-321-123",
      category: "Edexcel",
      paymentMethod: "Vodafone Cash",
      bookCondition: "Good",
      price: 200,
      byAdmin: true,
      createdAt: new Date().toISOString().replace("T", " ").replace("Z", ""),
      updatedAt: new Date().toISOString().replace("T", " ").replace("Z", "")
    },
    {
      bookTitle: "applied Arts",
      imgUrl: "https://99designs-blog.imgix.net/wp-content/uploads/2017/12/attachment_83090027.jpg?auto=format&q=60&fit=max&w=930",
      ISBN: "123-987-123",
      category: "Edexcel",
      paymentMethod: "Vodafone Cash",
      bookCondition: "Good",
      price: 300,
      byAdmin: false,
      createdAt: new Date().toISOString().replace("T", " ").replace("Z", ""),
      updatedAt: new Date().toISOString().replace("T", " ").replace("Z", "")
    }
    ], {});

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
