const recipesPoster = require ('../controllers/postRecipesCont')


module.exports = async (req, res) => {
    const {name, image, resume, health_score, step_by_step, diets} = req.body;
    try{
        const recipeCreated = await recipesPoster(name, image, resume, health_score, step_by_step, diets);
        res.status(200).json(recipeCreated)
    }
    catch(error){
        console.log(error.message)
        // res.status(400).send(error.message);
        res.status(400).json({error: error.message});
    }
}
