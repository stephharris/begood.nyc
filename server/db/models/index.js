var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/begood');


// function helper(expDate) {
//       let currentTime = new Date();
//       let currYear = currentTime.getFullYear();
//       let currMonth = currentTime.getMonth() + 1;
//       let currDay = currentTime.getDate();
//       let expYear = parseInt(expDate.slice(0,4));

//       if(parseInt(expDate.slice(0,4)) < currYear){
//         this.setDataValue('status', 'expired');
//         return; //set to expired
//       }else{
//         if(parseInt(expDate.slice(5,7)) < currMonth ){
//           this.setDataValue('status', 'expired');
//           return; //set to expired
//         }else{
//           if(parseInt(expDate.slice(8,10)) < currDay ){
//             this.setDataValue('status', 'expired');
//             return; //set to expired
//           }else{
//             return;
//           }
//         }
//       }
// }


let Listing = db.define('listing', {

  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },

  status: {
    type: Sequelize.ENUM,
    defaultValue: 'pending',
    values: ['active', 'pending', 'expired']
  },

  author: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'field required.' }
    }
  },

  personalEmail: {
    type: Sequelize.STRING,
    validate: {
     notEmpty: { msg: 'field required'},
     isEmail: { msg: 'invalid email.'}
    }
  },

  title: {
    type: Sequelize.STRING(45),
    allowNull: false,
    validate: {
      notEmpty: { msg: 'field required.' }
    },
    set: function(val) {
      this.setDataValue('title', val.toUpperCase());
    }
  },

  briefDescription: {
    type: Sequelize.STRING(95),
    allowNull: false,
    validate: {
      notEmpty: { msg: 'field required.' }
    },
    set: function(val){
      this.setDataValue('briefDescription', val.toLowerCase());
    }
  },

  // INPUTS: Saturday, January 7 || Ongoing || Weekly || Tuesdays, etc.
  timeCommitment: {
    type: Sequelize.STRING(30),
    allowNull: false,
    validate: {
      notEmpty: { msg: 'field required.' }
    },
    // set ensures every first letter is capitalized
    set: function(val) {
      let result = '';
      for(let i = 0; i < val.length; i++) {
        i === 0 || val[i - 1] === ' ' ? result += val[i].toUpperCase() : result += val[i];
      }
      this.setDataValue('timeCommitment', result);
    }
  },

  hours: {
    type: Sequelize.STRING(30),
    allowNull: true,
    defaultValue: 'scheduling tbd'
  },

  neighborhood: {
    type: Sequelize.STRING(25),
    allowNull: false,
    validate: {
      notEmpty: { msg: 'field required.' }
    },
    set: function(val) {
      this.setDataValue('neighborhood', val.toLowerCase());
    }
  },

  // dropdown menu
  borough: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'field required.' }
    }
  },

  meetingLocation: {
    type: Sequelize.STRING(60),
    allowNull: false,
    validate: {
      notEmpty: { msg: 'field required.' }
    },
    set: function(val) {
      let result = '';
      for(let i = 0; i < val.length; i++) {
        i === 0 || val[i - 1] === ' ' ? result += val[i].toUpperCase() : result += val[i];
      }
      this.setDataValue('meetingLocation', result);
    }
  },

  // come back to this one
  tags: {
    type: Sequelize.ARRAY(Sequelize.TEXT),
    allowNull: false,
    validate: {
      notEmpty: { msg: 'field required.' }
    }
  },

  fullDescription: {
    type: Sequelize.STRING(330),
    allowNull: false,
    validate: {
      notEmpty: { msg: 'field required.' }
    }
  },

  requirements: {
    type: Sequelize.STRING(130),
    allowNull: true,
    defaultValue: 'none specified',
    set: function(val) {
      this.setDataValue('requirements', val.toLowerCase());
    }
  },

  // url under 'more info.' of expanded listing
  moreInfoUrl: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isUrl: { msg: 'invalid url.' },
      notEmpty: { msg: 'field required.' }
    }
  },

  contactEmail: {
    type: Sequelize.STRING,
    validate: {
     notEmpty: { msg: 'field required.' },
     isEmail: { msg: 'invalid email.' }
    }
  },

  expires: {
    type: Sequelize.DATEONLY, // this will be a string
    allowNull: false,
    validate: {
     notEmpty: { msg: 'field required.' }
    }
  },

  // listing uri
  routeTitle: {
    type: Sequelize.STRING,
    unique: true
  }
}, {

// virtuals on the instance of Listing (defining our uri's)

  hooks : {
    beforeValidate : function(listing){
      if(listing.title){
      listing.routeTitle = listing.title.replace(/\s+/g, '_').replace(/\W/g, '');
      }
    }
  },

  getterMethods : {
    route: function(){
      return this.id + '_' + this.routeTitle.toLowerCase();
    }
  }

});


module.exports = {
  Listing: Listing,
  db: db
};

