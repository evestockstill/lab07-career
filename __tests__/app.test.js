require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Recipe = require('../lib/models/Recipe');

describe('app routes', () => {
  beforeAll(() => {
    connect();
  });
  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });
  let recipe;
  beforeEach(async() => {
    recipe = await Recipe.create({
      name: 'cookies',
      ingredients: [
        { amount: 2, measurement: 'cups', name: 'flour' }
      ],
      directions: [
        'preheat oven to 375',
        'mix ingredients',
        'put dough on cookie sheet',
        'bake for 10 minutes'
      ]
    });
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('creates a recipe', () => {
    return request(app)
      .post('/api/v1/recipes')
      .send({
        name: 'cookies',
        ingredients: [
          { amount: 2, measurement: 'cups', name: 'flour' }
        ],
        directions: [
          'preheat oven to 375',
          'mix ingredients',
          'put dough on cookie sheet',
          'bake for 10 minutes'
        ]
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'cookies',
          ingredients: [
            { _id: expect.any(String), amount: 2, measurement: 'cups', name: 'flour' }
          ],
          directions: [
            'preheat oven to 375',
            'mix ingredients',
            'put dough on cookie sheet',
            'bake for 10 minutes'
          ],
          __v: 0
        });
      });
  });

  it('gets all recipes', async() => {
    const recipes = await Recipe.create([
      { name: 'cookies', ingredients: [], directions: [] },
      { name: 'cake', ingredients: [], directions: [] },
      { name: 'pie', ingredients: [], directions: [] }
    ]);

    return request(app)
      .get('/api/v1/recipes')
      .then(res => {
        recipes.forEach(recipe => {
          expect(res.body).toContainEqual({
            _id: recipe._id.toString(),
            name: recipe.name,
            ingredients: [],
            directions: [],
            __v:0
          });
        });
      });
  });

  it('updates a recipe by id', async() => {
    return request(app)
      .patch(`/api/v1/recipes/${recipe._id}`)
      .send({ 
        name: 'good cookies' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'good cookies',
          ingredients: [
            { _id: expect.any(String), amount: 2, measurement: 'cups', name: 'flour' }
          ],
          directions: [
            'preheat oven to 375',
            'mix ingredients',
            'put dough on cookie sheet',
            'bake for 10 minutes'
          ],
          __v: 0
        });
      });
  });
  it('gets a recipe by id', async()=> {
    return request(app)
  
      .get(`/api/v1/recipes/${recipe._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'cookies',
          ingredients: [
            { _id: expect.any(String), amount: 2, measurement: 'cups', name: 'flour' }
          ],
          directions: [
            'preheat oven to 375',
            'mix ingredients',
            'put dough on cookie sheet',
            'bake for 10 minutes'
          ],
          __v: 0
        });
      });
  });
  it('deletes a recipe by id', async()=> {
    return request(app)
      .delete(`/api/v1/recipes/${recipe._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: recipe._id.toString(),
          name: 'cookies',
          ingredients: [
            { _id: expect.any(String), amount: 2, measurement: 'cups', name: 'flour' }
          ],
          directions: [
            'preheat oven to 375',
            'mix ingredients',
            'put dough on cookie sheet',
            'bake for 10 minutes'
          ],
          __v:0
        });
      });
  });
  it('updates a whole recipe by id', async() => {
    return request(app)
      .put(`/api/v1/recipes/${recipe._id}`)
      .send({
        name: 'good cookies',
        ingredients: [
          { amount: 2, measurement: 'cups', name: 'flour' }
        ],
        directions: [
          'preheat oven to 375',
          'mix ingredients',
          'put dough on cookie sheet',
          'bake for 10 minutes'
        ]
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: recipe._id.toString(),
          name: 'good cookies',
          ingredients: [
            { _id: expect.any(String), amount: 2, measurement: 'cups', name: 'flour' }
          ],
          directions: [
            'preheat oven to 375',
            'mix ingredients',
            'put dough on cookie sheet',
            'bake for 10 minutes'
          ],
          __v: 0
        });
      });
  });
});

