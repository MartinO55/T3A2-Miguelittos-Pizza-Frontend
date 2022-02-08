import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DIYPizza = () =>{
  const [ingredients, setIngredients] = useState([])

  useEffect(async () => {
    console.log("menu ingredients fetched")
      try{
        const {status, data} = await axios.get("https://pizzaria-miguel.herokuapp.com/api/products/index/1") 
        console.log (status, data)
        setIngredients(data)
      }
      catch(error){
          console.error(error)
      }
  }, [])
  const availableIngredients = ingredients.map((ingredient) => {
    return <li key={ingredient.category}>{ingredient.base}</li>
  })

  return <ul>{availableIngredients}</ul>  
}

export default DIYPizza;
