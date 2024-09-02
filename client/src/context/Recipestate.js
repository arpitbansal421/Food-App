import RecipeContext from "./Recipecontext";
import { useState } from "react";

const Recipestate = (props) => {
  const host = "http://localhost:5000"
  const RecipeInitial = []
  const [Recipe, setRecipe] = useState(RecipeInitial)

  // Get all Recipe
  const getRecipe = async () => {
    // API Call 
    const response = await fetch(`${host}/api/recipe/fetchallrecipe`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzMWRjNWUzZTQwMzdjZDQ3MzRhMDY2In0sImlhdCI6MTYzMDY2OTU5Nn0.hJS0hx6I7ROugkqjL2CjrJuefA3pJi-IU5yGUbRHI4Q"
      }
    });
    const json = await response.json() 
    setRecipe(json)
  }

  // Add a Note
  const addNote = async (title, description, tag) => {
    // TODO: API Call
    // API Call 
    const response = await fetch(`${host}/api/recipe/addrecipe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzMWRjNWUzZTQwMzdjZDQ3MzRhMDY2In0sImlhdCI6MTYzMDY2OTU5Nn0.hJS0hx6I7ROugkqjL2CjrJuefA3pJi-IU5yGUbRHI4Q"
      },
      body: JSON.stringify({title, description, tag})
    });

    const note = await response.json();
    setRecipe(Recipe.concat(note))
  }

  // Delete a Note
  const deleteNote = async (id) => {
    // API Call
    const response = await fetch(`${host}/api/recipe/deleterecipe/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzMWRjNWUzZTQwMzdjZDQ3MzRhMDY2In0sImlhdCI6MTYzMDY2OTU5Nn0.hJS0hx6I7ROugkqjL2CjrJuefA3pJi-IU5yGUbRHI4Q"
      }
    });
    const json = response.json(); 
    const newRecipe = Recipe.filter((note) => { return note._id !== id })
    setRecipe(newRecipe)
  }

  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    // API Call 
    const response = await fetch(`${host}/api/recipe/updaterecipe/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzMWRjNWUzZTQwMzdjZDQ3MzRhMDY2In0sImlhdCI6MTYzMDY2OTU5Nn0.hJS0hx6I7ROugkqjL2CjrJuefA3pJi-IU5yGUbRHI4Q"
      },
      body: JSON.stringify({title, description, tag})
    });
    const json = await response.json(); 

     let newRecipe = JSON.parse(JSON.stringify(Recipe))
    // Logic to edit in client
    for (let index = 0; index < newRecipe.length; index++) {
      const element = newRecipe[index];
      if (element._id === id) {
        newRecipe[index].title = title;
        newRecipe[index].description = description;
        newRecipe[index].tag = tag; 
        break; 
      }
    }  
    setRecipe(newRecipe);
  }

  return (
    <RecipeContext.Provider value={{ Recipe, addNote, deleteNote, editNote, getRecipe }}>
      {props.children}
    </RecipeContext.Provider>
  )

}
export default Recipestate;