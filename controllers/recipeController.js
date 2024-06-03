const express = require('express')
const recipes = express.Router()
const Recipe = require('../models/recipes.js')

//Index Page
recipes.get('/', (req, res) => {
    Recipe.find()
        .then(foundRecipe => {
            res.render('index', {
                recipe: foundRecipe
            })
        })
})

//NEW
recipes.get('/new', (req, res) => {
    Recipe.find()
        .then(foundRecipe => {
            res.render('new', {
                recipes:foundRecipe
            })
        })
}) //TODO: DOUBLE CHECK THIS ROUTE LATER

recipes.delete('/:id', (req, res) => {
    Recipe.findByIdAndDelete(req.params.id)
        .then(deletedRecipe =>{
            res.status(303).redirect('/recipes')
    })
})

recipes.put('/:id', (req,res) =>{
    Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(updateRecipe => {
            if (!updateRecipe) {
                return res.status(404).send('Recipe not found');
            }
            res.redirect('/recipes/' + req.params.id);
        })
        .catch(err => {
            console.error('Error updating recipe:', err);
            res.status(500).send('Error updating recipe');
        });
});

//EDIT
recipes.get('/:id/edit', (req,res) => {
    Recipe.findById(req.params.id)
        .then(foundRecipe => {
            res.render('edit', {
                recipe:foundRecipe
            })
        })
})

//SHOW
recipes.get('/:id', (req, res) => {
    Recipe.findById(req.params.id)
        .then(foundRecipe => {
            res.render('show', {
                recipe: foundRecipe
            })
        })
        .catch(err => {
            res.send('404')
        })
    })


//CREATE
recipes.post('/', (req, res) =>{
    const { title, prepTime, createdAt, image,category, ingredients, instructions } = req.body;

    const recipe = new Recipe({
        title,
        prepTime,
        createdAt,
        image,
        category,
        ingredients,
        instructions
    });

    recipe.save()
        .then(() => res.json(recipe))
        .catch(err => {
            console.error('Error saving recipe to database:', err);
            res.status(500).send('Error saving recipe to database');
        });
})

module.exports = recipes