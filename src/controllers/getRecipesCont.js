const axios = require('axios')
const { Op } = require('sequelize');
const {Recipe} = require('../db');
const { recipeRequestedAPI } = require('./auxiliar');


const recipesGetter = async (search) => {
   
    //Si recibe query filtra por conincidencia parcial en el nombre
    if (search) {
        //Busca en la DB
        const dbRecipesByName = await Recipe.findAll({
          where: {
            name: {
              [Op.like]: `%${search}%`,
            },
          },
          attributes: ['id', 'name', 'image', 'health_score'],
        });

        //Busca en la api
        const apiRecipesByName = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=d29a59e3258a48219fc8b4873f6ac44e&addRecipeInformation=true&query=${search}&number=50`)

        //Modifica el formato para el front
        const apiRecipesByNameOk= apiRecipesByName.data.results.map(recipe => {
          const {id, title, image, healthScore} = recipe;
          return recipeRequestedAPI({id, title, image, healthScore})
        })

        //Concatena resultados y retorna
        const allRecipesByName = dbRecipesByName.concat(apiRecipesByNameOk);

        if (!allRecipesByName) throw new Error ('No recipes match the search');
        return allRecipesByName
    }

    //Si no recibe query trae todas las recetas de la BD
    const dbRecipes = await Recipe.findAll({
        attributes: ['id', 'name', 'image', 'health_score'],
    })

    //Pedido Api
    const apiRecipes50 = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=d29a59e3258a48219fc8b4873f6ac44e&addRecipeInformation=true&number=50`)

    //Modifica el formato para el front
    const apiRecipesOk= apiRecipes50.data.results.map(recipe => {
      const {id, title, image, summary, healthScore, analyzedInstructions, diets, vegetarian, vegan, glutenFree} = recipe;
      return recipeRequestedAPI({id, title, image, summary, healthScore, analyzedInstructions, diets, vegetarian, vegan, glutenFree})
    })

    //Concatena todas las recetas
    const allRecipes = dbRecipes.concat(apiRecipesOk);
    
    return allRecipes;
}

module.exports = recipesGetter;

// Ej APi
// https://api.spoonacular.com/recipes/complexSearch?apiKey=e9de31d9768e4d3ab04ef888b2095c63&addRecipeInformation=true