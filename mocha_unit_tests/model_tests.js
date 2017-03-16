const path = require('path');
const Sequelize = require('Sequelize');
const models = require('../server/db/models/index.js');
const db = models.db;
const Listing = models.Listing;
const Promise = require('bluebird');
const example = require('./example.js');

const mocha = require('mocha');
const chai = require('chai');
const expect = chai.expect;

chai.use(require('chai-properties'));
chai.use(require('chai-things'));

describe('Sequelize model tests', () => {

  beforeEach('Sync & clear database', () => {
    return Listing.sync({force:true});
  });

  after('Sync & clear database', () => {
    return Listing.sync({force:true});
  });

  describe('Listing Model', () => {

    it('The model exists', () => {
        expect(Listing.findAll).to.be.a('function');
    });

    describe('Listing attributes', () => {


      it('It has the expected title definition', () => {
          console.log(Listing.attributes.title)
          expect(Listing.attributes.title).to.be.an('object');
      });

      it('It has the expected brief description definition', () => {
          expect(Listing.attributes.briefDescription).to.be.an('object');
          expect(Listing.attributes.briefDescription.type.options.length).to.equal(95);
      });

      it('It has the expected full description definition', () => {
          expect(Listing.attributes.fullDescription).to.be.an('object');
          expect(Listing.attributes.fullDescription.type.options.length).to.equal(330);
      });

    })

    describe('Listing Defaults & Validations', () => {

      it('it defaults listing status to "pending"', () => {
          let listing = Listing.build();
          expect(listing.status).to.be.equal('pending');
      });

      it('it defaults listing hours to "scheduling tbd"', () => {
          let listing = Listing.build();
          expect(listing.hours).to.be.equal('scheduling tbd');
      });

      it('it defaults listing requirements to "none specified"', () => {
          let listing = Listing.build();
          expect(listing.requirements).to.be.equal('none specified');
      });

      it('it requires a moreInfoUrl', () => {
          const listing = Listing.build();
          return listing.validate()
                 .then( (err) => {
                    expect(err).to.be.an('object');
                    //console.log(err.errors)
                    expect(err.errors).to.contain.a.thing.with.properties({path: 'moreInfoUrl', type: 'notNull Violation'});
                  });
      });

      it('it requires an Expiration Date', () => {
          const listing = Listing.build();
          return listing.validate()
                 .then( (err) => {
                    expect(err).to.be.an('object');
                    //console.log(err.errors)
                    expect(err.errors).to.contain.a.thing.with.properties({path: 'expires', type: 'notNull Violation'});
                  });
      });

    })


    describe('Listing functionality', () => {

        it('given data successfully creates a listing', () => {
          return Listing.create(example[1])
          .then( (savedListing) => {
              expect(savedListing.title).to.be.a('string');
          })
        })

        it('beforeCreate hook ensures requirements are lower cased', () => {
          return Listing.create(example[1])
          .then( (savedListing) => {
            expect(savedListing.requirements).to.equal(savedListing.requirements.toLowerCase());
          })
        })

        it('beforeCreate hook ensures routeTitle is dynamically generated', () => {
          return Listing.create(example[1])
          .then( (savedListing) => {
            expect(savedListing.routeTitle).to.equal('union_settlement_meals_on_wheels')
          })
        })

        it('virtual getterMethod titled "route" should attach listing id + "_" to front of routeTitle', () => {
          return Listing.create(example[1])
          .then( (savedListing) => {
            let id = savedListing.id + '_';
            expect(savedListing.route).to.equal(id + savedListing.routeTitle)
          })
        })

    })

  })

})
