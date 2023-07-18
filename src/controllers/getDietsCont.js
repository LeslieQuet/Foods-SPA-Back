const axios = require('axios')
const {Diet, Recipe} = require('../db')

//Controlador exportado
const dietsGetter = async (diet) => {
    try{
        const allDiets = await dietsManager(diet);
        return allDiets; 
    }
    catch(error){
        return {error: error.message};
    }
};

//auxiliar
const dietsManager = async (dietName) => {
    
    //Si recibe query filtra las recetas por dieta
    if(dietName){
        //Trae todas las recetas de la BD que conincidan con la dieta
        const dbRecipes = await Recipe.findAll({
            include: [
              {
                model: Diet,
                where: { name: dietName },
                attributes: [],
              }
            ],
            attributes: ['id', 'name', 'image'],
        });
        
        //Trae todas las recetas de la API que coincidan con la búsqueda
        const apiRecipes = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=d29a59e3258a48219fc8b4873f6ac44e&diet=${dietName}&number=50`)
        
        //Concatena ambas busquedas y devuelve
        const allRecipes = dbRecipes.concat(apiRecipes.data.results);
        
        if (!allRecipes.length) throw new Error('No recipes for that diet');
        return allRecipes; 
    }
    
    //Si no recibe query devuelve una lista de dietas en existencia en BD[{name + id}]
    const DBDiets = await Diet.findAll();
    if (DBDiets.length >= 1) return DBDiets;

    //Si la BD no tiene dietas las trae de la Api y los Bulkea en la tabla de la BD
    //Trae un muestrario de recetas
    const apiData = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=d29a59e3258a48219fc8b4873f6ac44e&addRecipeInformation=true&number=50`);
    const recipesData = apiData.data;

    //Depura las dietas encontradas
    const dietsSet = new Set();
    recipesData.results.forEach(recipe => {
            recipe.diets.forEach(diet => dietsSet.add(diet))
        }
    );

    //Bulkea las dietas en la BD
    const toBulkCreate = [];
    dietsSet.forEach(diet =>{
        toBulkCreate.push({"name":diet})
    })
    const savedDiets = await Diet.bulkCreate(toBulkCreate);
    return savedDiets;
};

module.exports = dietsGetter;

//Api example
//https://api.spoonacular.com/recipes/complexSearch?apiKey=e9de31d9768e4d3ab04ef888b2095c63&addRecipeInformation=true