require('dotenv').config()
const { URL_API, KEY } = process.env
const axios = require('axios')
const {recipeRequestedAPI, recipeRequestedDB} = require('./auxiliar')
const {Recipe, Diet} = require('../db')

const recipesGetter = async (search) => {
    //Trae todas las recetas de la BD
    const dbRecipes = await Recipe.findAll({
            include: {
                model: Diet,
                attributes: ['name'],
                through: {
                    attributes: [],
                },
            }
    })

    //Armado de objetos de BD para el front
    const dbRecipesOk = dbRecipes.map(recipe => {
        return recipeRequestedDB(recipe);
    });

    //Pedido Api
    const apiRecipes100 = await axios.get(`${URL_API}/complexSearch?apiKey=${KEY}&addRecipeInformation=true&number=100`)

    //Armado de objetos de API para el front
    const apiRecipes100ok = apiRecipes100.data.results.map(recipe => {
        return recipeRequestedAPI(recipe);
    })

    //Concatena todas las recetas
    const allRecipesOk = dbRecipesOk.concat(apiRecipes100ok);

    //Si recibe query filtra por conincidencia parcial en el nombre
    if(search) {
        const FilteredRecipes = allRecipesOk.filter(recipe => recipe.name.toLowerCase().includes(search.toLowerCase()));
        if(FilteredRecipes.length) return FilteredRecipes;
        throw new Error ('No recipes match the search');
    }
    
    return allRecipesOk;
}

module.exports = recipesGetter;

// Ej APi
// https://api.spoonacular.com/recipes/complexSearch?apiKey=e9de31d9768e4d3ab04ef888b2095c63&addRecipeInformation=true