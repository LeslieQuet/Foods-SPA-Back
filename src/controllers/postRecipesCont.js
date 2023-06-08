const {Recipe} = require('../db')

//mejorar validaciones db
const recipesPoster = async (name, image, resume, health_score, step_by_step, diets) => {
        if(/^\s*$/.test(name)|| /^\s*$/.test(resume)||/^\s*$/.test(step_by_step)) throw new Error ('Missing obligatory data') 
        if(!/^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/.test(name)) throw new Error ('It must only include letters') 
        if(await Recipe.findOne({where:{name:name}})) throw new Error ('There is already a recipe with that name')
        if(!/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(image)) throw new Error ('Url is not valid')
        if(isNaN(health_score)) throw new Error ('The nutritional value must by placed in numbers only')
        if(!diets.length) throw new Error ('Must have a diet to relate')

        const newRecipe = await Recipe.create({name, image, resume, health_score, step_by_step});
        newRecipe.addDiet(diets);
        return newRecipe;
}

//|| /^\s*$/.test(resume) || 
module.exports = recipesPoster;