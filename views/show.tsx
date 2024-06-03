import React from 'react';
import Default from './layouts/default';

interface Recipe {
    id: string;
    title: string;
    category: string;
    prepTime: number;
    createdAt: Date;
    image: string;
    ingredients: string;
    instructions: string;
}

interface ShowProps {
    recipe: Recipe;
    index: number;
}

const Show: React.FC<ShowProps> = ({ recipe }) => {
    const formattedDate = `${recipe.createdAt.getMonth() + 1}/${recipe.createdAt.getDate()}/${recipe.createdAt.getFullYear()}`;

    return (
        <Default>
            <h2>{recipe.title}</h2>
            <h4>For: {recipe.category}</h4>
            <h4>PrepTime: {recipe.prepTime}</h4>
            <h4>Created on: {formattedDate}</h4>
            <img src={recipe.image} alt={recipe.title} />
            <h5>{recipe.ingredients}</h5>
            <h5>{recipe.instructions}</h5>

            <br />

            <a href='/recipes'><button>Return</button></a>
            <form action={`/recipes/${recipe.id}?_method=DELETE`} method="POST">
                <input type='submit' value="DELETE"/>
            </form>
            <a href={`/recipes/${recipe.id}/edit`}><button>Edit</button></a>
        </Default>
    );
};

export default Show;