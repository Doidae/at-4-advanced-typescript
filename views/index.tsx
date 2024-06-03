import React from 'react';
import Default from './layouts/default';

interface Recipe {
    id: string;
    title: string;
    image: string;
}

interface IndexProps {
    recipe: Recipe[];
}

const Index: React.FC<IndexProps> = ({ recipe }) => {
    return (
        <Default>
            <div className="container">
                <h2>Home</h2>
                <div className="row">
                    {recipe && recipe.map((recipeItem, index) => (
                        <div key={index} className="col-md-4 mb-4">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title"><a href={`/recipes/${recipeItem.id}`}>{recipeItem.title}</a></h5>
                                </div>
                                <img src={recipeItem.image} className='card-img-top' alt={recipeItem.title}></img>
                            </div>
                        </div>
                    ))}
                </div>
                <br />
                <div>
                    <a href={`/recipes/new`}><button>Add a new Recipe</button></a>
                </div>
            </div>
        </Default>
    );
};

export default Index;