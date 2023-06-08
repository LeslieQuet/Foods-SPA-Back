const recipesById = require ('../controllers/recipesByIdCont')

module.exports = async(req, res) => {
    try{
        const {idRecipe} = req.params;
        const recipe = await recipesById(idRecipe);
        res.status(200).send(recipe);
    }
    catch(err){
        res.status(500).json({err: err.message})
    }
}