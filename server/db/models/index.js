var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/begood');

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
    defaultValue: 'none specified'
  },

  // url under 'more info.' of expanded listing
  moreInfoUrl: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isUrl: { msg: 'invalid url.' },
      notEmpty: { msg: 'field required.' }
    },
    set: function(val) {
      console.log('$$$$$$$', val)
      if(val.slice(0,7) === 'http://' || val.slice(0,8) === 'https://'){
        this.setDataValue('moreInfoUrl', val);
      }
      else{
        this.setDataValue('moreInfoUrl', 'http://' + val);
      }
    }
  },

  contactEmail: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
     notEmpty: { msg: 'field required.' },
     isEmail: { msg: 'invalid email.' }
    }
  },

  expires: {
    type: Sequelize.DATEONLY, // this will be a string
    allowNull: false,
    validate: {
     notEmpty: { msg: 'field required.' },
     isAfter: { args: new Date().toISOString().slice(0,10), msg: 'date invalid.' }
    }
  },

  // listing (instance) uri
  routeTitle: {
    type: Sequelize.STRING,
    unique: true
  }
}, {

// virtuals on the instance of Listing (defining our uri's)

  hooks : {
    beforeCreate : function(listing){
      if(listing.title){
      listing.routeTitle = listing.title.replace(/\s+/g, '_').replace(/\W/g, '').toLowerCase();
      }
      if(listing.requirements){
        listing.requirements = listing.requirements.toLowerCase();
      }
    },
    beforeUpdate : function(listing){
      if(listing.title){
      listing.routeTitle = listing.title.replace(/\s+/g, '_').replace(/\W/g, '').toLowerCase();
      }
      if(listing.requirements){
        listing.requirements = listing.requirements.toLowerCase();
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

