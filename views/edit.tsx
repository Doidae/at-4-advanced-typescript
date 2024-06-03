import React from 'react';
import Default from './layouts/default';

interface Recipe {
    id: string;
    title: string;
    prepTime: number;
    category: string;
    image: string;
    ingredients: string;
    instructions: string;
}

interface EditProps {
    recipe: Recipe;
    index: number;
}

const Edit: React.FC<EditProps> = ({ recipe, index }) => {
    return (
        <Default>
            <h2>Edit The Recipe</h2>
            <form action={`/recipes/${recipe.id}?_method=PUT`} method='POST'>
                <label htmlFor="title">Name</label>
                <input 
                    type="text" 
                    name="title"
                    id="title"
                    required
                    defaultValue={recipe.title}
                />
                <label htmlFor="prepTime">Prep Time</label>
                <input 
                    type="number"
                    name='prepTime'
                    id='prepTime'
                    required
                />
                <label htmlFor="category">Category</label>
                <select name="category" id="category">
                    <option value="Breakfast">Breakfast</option>
                    <option value="Lunch">Lunch</option>
                    <option value="Dinner">Dinner</option>
                    <option value="Dessert">Dessert</option>
                </select>
                <label htmlFor="image">Image</label>
                <input
                    type="text"
                    name="image"
                    id="image"
                    defaultValue={recipe.image}
                />
                <label htmlFor='ingredients'>Ingredients</label>
                <input 
                    type="text"
                    name='ingredients'
                    id='ingredients'
                    defaultValue={recipe.ingredients}
                />
                <label htmlFor='instructions'>Instructions</label>
                <input 
                    type="text" 
                    name='instructions'
                    id='instructions'
                    defaultValue={recipe.instructions}
                />
                <br />
                <input type="submit"/>
            </form>
        </Default>
    );
};

export default Edit;