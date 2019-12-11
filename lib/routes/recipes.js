const Recipe = require('../models/Recipe');
const { Router } = require('express');



module.exports = Router()
  .get('/', async(req, res) => {
    const recipes = await Recipe.find();
    res.send(recipes);
  })

  .get('/:id', async(req, res) => {
    const recipe = await Recipe.findById(req.params.id);
    res.send(recipe);
  })
  .post('/', async(req, res) => {
    const recipe = await Recipe.create(req.body);
    res.send(recipe);
  })

  .put('/:id', async(req, res) => {
    const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    }); res.send(recipe);
  })


  .patch('/:id', async(req, res) => {
    const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    }); res.send(recipe);
  })

  .delete('/:id', async(req, res) => {
    const recipe = await Recipe.findByIdAndDelete(req.params.id);
    res.send(recipe);
  });
