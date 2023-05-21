//import axios from 'axios'
export const GET_RECIPES = 'GET_RECIPES'
export const GET_DETAIL = 'GET_DETAIL'
export const GET_DIETS = 'GET_DIETS'
export const GET_RECIPES_QUERY = 'GET_RECIPES_QUERY'
export const GET_RECIPES_BY_DIET = 'GET_RECIPES_BY_DIET'
export const ORDERED_BY_NAME = 'ORDERED_BY_NAME'
export const ORDERED_BY_SCORE = 'ORDERED_BY_SCORE'

export const getRecipes = () => {
    return async function(dispatch){
        try{
            await fetch(`http://localhost:3001/recipes`)
            .then((res) => res.json())
            .then((data) => dispatch({type: GET_RECIPES, payload: data}))
        }
        catch (error){
            console.log(error)
            alert(error.message)
        }
    }
}

export const getDetail = (id) => {
    return function(dispatch){
        fetch(`http://localhost:3001/recipes/${id}`)
            .then((res) => res.json())
            .then((data) => dispatch({type: GET_DETAIL, payload: data}))
    }
}

export const getDiets = () => {
    return function(dispatch){
        fetch(`http://localhost:3001/diets`)
            .then((res) => res.json())
            .then((data) => dispatch({type: GET_DIETS, payload: data}))
    }
}

export const getRecipesByDiet = (diet) => {
    return function(dispatch){
        fetch(`http://localhost:3001/diets?diet=${diet}`)
            .then((res) => res.json())
            .then((data) => dispatch({type: GET_RECIPES_BY_DIET, payload: data}))
    }
}

export const getRecipeQuery = (search) => {
    return async function(dispatch){
        try{
            const response = await (await fetch(`http://localhost:3001/recipes?search=${search}`)).json()
            const recipesByName = response.data
            console.log(response)
            console.log(recipesByName)
            // dispatch({type: GET_RECIPES_QUERY, payload: recipesByName})
            // .then((res) => res.json())
            // .then((data) => dispatch({type: GET_RECIPES_QUERY, payload: data}))
        }
        catch(error){
            console.log("Hubo un error")
            console.log(error.message)
        }
    }
}


export const orderedByName = (value) => {
    return { type: ORDERED_BY_NAME, payload: value }
}

export const orderedByScore = (value) => {
    return { type: ORDERED_BY_SCORE, payload: value }
}


// export const postRecipe = (recipeData) => {
//     return async function (dispatch){
//         const response = await postData(recipeData);
//         if(response.error) alert(('Error trying to create new recipe: '+ response.error)) //Alerta adicional por si algún error pasa las validaciones del form
//         else alert("Recipe saved successfully");
//     }     
// }

// const postData = async (recipeData) => {
//     try {
//       const response = await fetch(`http://localhost:3001/recipes`, {
//         method: 'POST',
//         mode: 'cors',
//         cache: 'no-cache', 
//         credentials: 'same-origin', 
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         redirect: 'follow', 
//         referrerPolicy: 'no-referrer', 
//         body: JSON.stringify(recipeData) 
//       });
//       return response.json(); 
//     } 
//     catch (error) {
//         console.log(error)
//     }
//  };
