const axios = require('axios')
const { Op } = require('sequelize');
const {Recipe} = require('../db')


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
          attributes: ['id', 'name', 'image'],
        });

        //Busca en la api
        const apiRecipesByName = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=d29a59e3258a48219fc8b4873f6ac44e&query=${search}&number=50`)

        //Concatena resultados y retorna
        const allRecipesByName = dbRecipesByName.concat(apiRecipesByName.data.results);

        if (!allRecipesByName) throw new Error ('No recipes match the search');
        return allRecipesByName
    }

    //Si no recibe query trae todas las recetas de la BD
    const dbRecipes = await Recipe.findAll({
        attributes: ['id', 'name', 'image'],
    })

    //Pedido Api
    const apiRecipes50 = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=d29a59e3258a48219fc8b4873f6ac44e&number=50`)

    //Concatena todas las recetas
    const allRecipes = dbRecipes.concat(apiRecipes50.data.results);
    
    return allRecipes;
}

module.exports = recipesGetter;

// Ej APi
// https://api.spoonacular.com/recipes/complexSearch?apiKey=e9de31d9768e4d3ab04ef888b2095c63&addRecipeInformation=true