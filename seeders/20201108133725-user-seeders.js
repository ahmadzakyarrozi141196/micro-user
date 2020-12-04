'use strict';

// module.exports = {
//   up: async (queryInterface, Sequelize) => {
//     /**
//      * Add seed commands here.
//      *
//      * Example:
//      * await queryInterface.bulkInsert('People', [{
//      *   name: 'John Doe',
//      *   isBetaMember: false
//      * }], {});
//     */
//   },

//   down: async (queryInterface, Sequelize) => {
//     /**
//      * Add commands to revert seed here.
//      *
//      * Example:
//      * await queryInterface.bulkDelete('People', null, {});
//      */
//   }
// };

const bcrypt = require('bcrypt')


module.exports = {
  up: async (queryInterface, Sequelize) => {
   
      await queryInterface.bulkInsert('users', [
        {
          name: "admin",
          profession: "admin",
          role: "admin",
          email:"admin@gmail.com",
          password: await bcrypt.hash('admin', 6),
          created_at: new Date(),
          updated_at: new Date(),
        },

        {
          name: "zaki",
          profession: "fullstackdeveloper",
          role: "student",
          email:"zaki@gmail.com",
          password: await bcrypt.hash('zaki', 10),
          created_at: new Date(),
          updated_at: new Date(),
        }
      ]);
   
  },

  down: async (queryInterface, Sequelize) => {
   
     await queryInterface.bulkDelete('users', null, {});
     
  }
};
