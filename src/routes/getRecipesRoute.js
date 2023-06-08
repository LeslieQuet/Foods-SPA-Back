const recepiesGetter = require ('../controllers/getRecipesCont')

module.exports = async(req, res) => {
    try{
        const {search} = req.query;
        const matchedRecepies = await recepiesGetter(search);
        res.status(200).json(matchedRecepies);
    }
    catch(error){
        //res.status(400).send(error.message)
        res.status(400).json({error: error.message})
    }
}