var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/begood');

let Listing = db.define('listing', {

  status: {
    type: Sequelize.ENUM,
    values: ['active', 'pending', 'expired']
  },

  author: {
    type: Sequelize.STRING,
    allowNull: false
  },

  personalEmail: {
    type: Sequelize.STRING,
    validate: {
     isEmail: true
    }
  },

  title: {
    type: Sequelize.STRING(45),
    allowNull: false,
    set: function(val) {
      this.setDataValue('title', val.toUpperCase());
    }
  },

  briefDescription: {
    type: Sequelize.STRING(95),
    allowNull: false,
    set: function(val){
      this.setDataValue('briefDescription', val.toLowerCase());
    }
  },

  // INPUTS: Saturday, January 7 || Ongoing || Weekly || Tuesdays, etc.
  timeCommitment: {
    type: Sequelize.STRING(30),
    allowNull: false,
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
    set: function(val) {
      this.setDataValue('neighborhood', val.toLowerCase());
    }
  },

  // dropdown menu
  borough: {
    type: Sequelize.STRING,
    allowNull: false
  },

  meetingLocation: {
    type: Sequelize.STRING(60),
    allowNull: false,
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
    allowNull: false
  },

  fullDescription: {
    type: Sequelize.STRING(330),
    allowNull: false
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
      isUrl: true
    }
  },

  contactEmail: {
    type: Sequelize.STRING,
    validate: {
     isEmail: true
    }
  },

  expires: {
    type: Sequelize.DATEONLY, // this will be a string
    allowNull: false,
    validate: {
      isAfter: new Date().toJSON().slice(0,10)
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
      return this.id + '_' + this.routeTitle;
    }
  }

});

// need to write a virtual that checks for status


module.exports = {
  Listing: Listing,
  db: db
};
