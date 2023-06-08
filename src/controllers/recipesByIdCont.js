require('dotenv').config()
const { URL_API, KEY } = process.env
const axios = require('axios')
const {Recipe, Diet} = require('../db')
const { recipeRequestedAPI } = require('./auxiliar')

const recipesById = async(idRecipe) => {
    //Busca si el id viene con formato de la BD 
    if(idRecipe.includes("-")){
        const dbRecipe = await Recipe.findByPk(idRecipe, {
            include: {
                model: Diet,
                attributes: ['name'],
                through: {
                    attributes: [],
                },
            }
        })

        //Diets viene en un arreglo de objetos, se pasa arreglo de strings
        const dietArray = dbRecipe.diets.map(diet => diet.name);
        dbRecipe.dataValues.diets = dietArray;
        
        return dbRecipe.dataValues;
    }

    //Busca si el id viene con formato de la api
    else {
        const apiRecipe = await axios(`${URL_API}/${idRecipe}/information?apiKey=${KEY}`);
        const {id, title, image, summary, healthScore, analyzedInstructions, diets, vegetarian, vegan, glutenFree} = apiRecipe.data;
        const apiRecipeById = recipeRequestedAPI({id, title, image, summary, healthScore, analyzedInstructions, diets, vegetarian, vegan, glutenFree})
        return apiRecipeById;
    }
    //No tiene manejo de errores porque la selección se hace siempre mediante un id en existencia
}

module.exports = recipesById;

//Api example
//https://api.spoonacular.com/recipes/716426/information?apiKey=e9de31d9768e4d3ab04ef888b2095c63