import React from "react";
import style from './About.module.css'

export default function About() {
    return(
        <div className={style.container}>
            <h2 style={{fontSize: '2em'}}>Hi, I'm Leslie! Welcome to my app</h2>
            <h5 style={{fontSize: '1em'}}>Soy FullStack Developer en formación en la comunidad de SoyHenry!</h5>
            <p style={{fontSize: '1.2em'}}>Esta es una single page aplication que utiliza las tecnologías React Native, React-Redux, Node, Express y Sequelize</p>
            <p style={{fontSize: '1.2em'}}>Consume datos de una base de datos propia así como de una API, maneja diferentes filtrados y ordenamientos de información y permite al usuario ingresar recetas a la base de datos mediante un formulario controlado, validando los datos tanto en el front end como en el back end de la aplicación y base de datos. </p>
        </div>
    )
}