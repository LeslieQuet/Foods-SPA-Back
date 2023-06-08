const { Router } = require('express');
const postRecipesRoute = require('./postRecipesRoute');
const getRecipesRoute = require('./getRecipesRoute');
const getDietsRoute = require('./getDietsRoute');
const recipesByIdRoute =  require('./recipesById')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/recipes/:idRecipe', recipesByIdRoute)
router.post('/recipes', postRecipesRoute)
router.get('/recipes', getRecipesRoute)
router.get('/diets', getDietsRoute)

module.exports = router;
