var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/begood');

let Listing = db.define('listing', {

  status: {
    type: Sequelize.ENUM,
    values: ['active', 'pending', 'expired']
  },

  title: {
    type: Sequelize.STRING(45),
    allowNull: false,
    set: function(val) {
      this.setDataValue('title', val.toUpperCase());
    }
  },

  // Saturday, January 7 || Ongoing || First Monday, Every Month || Scheduling Flexible
  timeCommitment: {
    type: Sequelize.STRING(30),
    allowNull: false
  },

  neighborhood: {
    type: Sequelize.STRING(25),
    allowNull: false,
    set: function(val) {
      this.setDataValue('neighborhood', val.toLowerCase());
    }
  },

  // this will be a dropdown menu
  borough: {
    type: Sequelize.STRING,
    allowNull: false,
    // validate: {
    //   isIn: [['manhattan', 'queens', 'brooklyn', 'the bronx', 'bronx', 'staten island']],
    //   msg: 'must be an nyc borough'
    // }
  },

  keyphrase: {
    type: Sequelize.STRING(70),
    allowNull: false
  },

  location: {
    type: Sequelize.STRING(60),
    allowNull: false
  },

  expires: {
    type: Sequelize.DATEONLY, // this will be a string
    allowNull: false,
    validate: {
      isAfter: new Date().toJSON().slice(0,10)
    }
  },

  // i.e. 12:30 - 1:30 (time of volunteer project)
  times: {
    type: Sequelize.STRING,
    alowNull: true,
    defaultValue: 'hours tbd'
  },

  description: {
    type: Sequelize.STRING(325),
    allowNull: false
  },

  // url under 'more info.' of expanded listing
  moreInfoUrl: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isUrl: true
    }
  },

  requirements: {
    type: Sequelize.STRING,
    allowNull: true,
    defaultValue: 'no requirements specified'
  },

  tags: {
    type: Sequelize.ARRAY(Sequelize.TEXT),
    allowNull: false,
    validate: {
      isArray: true
    }
  },

  author: {
    type: Sequelize.STRING,
    allowNull: false
  },

  email: {
    type: Sequelize.STRING,
    unique: true,
    validate: {
     isEmail: true
    }
  },

  // different from urlMoreInfo
  // this one is specifically the uri in url-bar so users can share a link to the listing
  urlTitle: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  }
}, {

// virtuals on the instance of Listing (defining urlTitle)

  hooks : {
    beforeValidate : function(listing){
      if(listing.title){
      listing.urlTitle = listing.title.replace(/\s+/g, '_').replace(/\W/g, '');
      }
    }
  },

  getterMethods : {
    route: function(){
      return '/listings/' + this.urlTitle
    }
  }

});


module.exports = {
  Listing: Listing
};
