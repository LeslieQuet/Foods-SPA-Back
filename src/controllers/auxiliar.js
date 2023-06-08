//Se arma el objeto para el front con info de la API
const recipeRequestedAPI = (recipe) => {
    const {id, title, image, summary, healthScore, analyzedInstructions, diets, vegetarian, vegan, glutenFree} = recipe;

    //Responde a consigna del readme: Para los tipos de dieta debes tener en cuenta las propiedades vegetarian, 
    //vegan y glutenFree por un lado, y también analizar las que se incluyan dentro de la propiedad diets por otro.
    const dietsOk = new Set();
        if(vegetarian) dietsOk.add("vegetarian");
        if(vegan) dietsOk.add("vegan");
        if(glutenFree) dietsOk.add("gluten free");
        if(diets) diets.forEach(diet => dietsOk.add(diet));
        
        const dietsArr = Array.from(dietsOk)
        
        const stepsOk = []
        if(analyzedInstructions.length){
            analyzedInstructions[0].steps.forEach(step => stepsOk.push(step.step))
        }

        let recipeOk = {
            id,
            name: title,
            image,
            resume: summary.replace(/<[^>]*>?/g, ""),
            health_score: healthScore,
            step_by_step: stepsOk,
            diets: dietsArr,
        }
        return recipeOk;
}

//Se arma el objeto para el front con info de la BD
const recipeRequestedDB = (recipe) => {
    const {id, name, image, health_score, diets} = recipe;

            //Diets viene en un arreglo de objetos, se pasa arreglo de strings
            const dietsArray = diets.map(diet => diet.name);
            
            const recipeOk = {
                id,
                name,
                image,
                health_score,
                diets: dietsArray,
            };

            return recipeOk;
}


module.exports = {
    recipeRequestedAPI,
    recipeRequestedDB,
}