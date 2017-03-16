'use strict';

const models = require('../server/db/models/index.js');
const db = models.db;
const Listing = models.Listing;

const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const app = require('../app.js');
const agent = request.agent(app);
const example = require('./example.js');

chai.use(require('chai-properties'));
chai.use(require('chai-things'));

describe('Server-side route tests', () => {

  after('Sync & clear database', () => {
    return Listing.sync({force:true});
  });

  describe('GET "/api"', () => {

    it('responds with an array via JSON', () => {
      return agent
      .get('/api')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect(function (res) {
        // res.body is the JSON return object
        expect(res.body).to.be.an.instanceOf(Array);
        expect(res.body).to.have.length(0);
      });
    });

    it('returns an active listing if there is one in the DB', () => {

      Listing.create(example[0]).then( () => {
        return agent
        .get('/api')
        .expect(function (res) {
          expect(res.body).to.be.an.instanceOf(Array);
          expect(res.body[0].author).to.equal('Steph Harris');
          expect(res.body[0].status).to.equal('active');
        });
      });

    });

  })


  describe('GET "/admin/pending"', () => {

    it('responds with an array via JSON', () => {
      return agent
      .get('/admin/pending')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect(function (res) {
        // res.body is the JSON return object
        expect(res.body).to.be.an.instanceOf(Array);
        expect(res.body).to.have.length(0);
      });
    });

    it('returns a pending listing if there is one in the DB', () => {

      Listing.create(example[1]).then( () => {
        return agent
        .get('/admin/pending')
        .expect(function (res) {
          expect(res.body).to.be.an.instanceOf(Array);
          expect(res.body[0].author).to.equal('Steph Harris');
          expect(res.body[0].status).to.equal('pending');
        })
      });
    })

  })


  describe('GET "/admin/expired"', () => {

    it('responds with an array via JSON', () => {
      return agent
      .get('/admin/expired')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect(function (res) {
        // res.body is the JSON return object
        expect(res.body).to.be.an.instanceOf(Array);
        expect(res.body).to.have.length(0);
      });
    });

    it('returns a pending listing if there is one in the DB', () => {

      Listing.create(example[2]).then( () => {
        return agent
        .get('/admin/expired')
        .expect(function (res) {
          expect(res.body).to.be.an.instanceOf(Array);
          expect(res.body[0].author).to.equal('Steph Harris');
          expect(res.body[0].status).to.equal('expired');
        })
      });
    })

  })


  describe('POST "/admin/create"', () => {

    it('creates a new listing', () => {
      let data = example[3];
      return agent
      .post('/admin/create')
      .send({data})
      .expect(201)
    });

    it('returns a 500 error if the data is invalid/incomplete', () => {
      let data = { email: 'steph' };
      return agent
      .post('/admin/create')
      .send({data})
      .expect(500);
    });

  })

})
