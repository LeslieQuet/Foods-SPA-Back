const dietsGetter = require ('../controllers/getDietsCont')

module.exports = async(req, res) => {
    const {diet} = req.query;
    try{
        const dietsOrRecipes = await dietsGetter(diet);
        res.status(200).json(dietsOrRecipes)
      }
      catch(error){
        res.status(400).json({error: error.message})
      }
}