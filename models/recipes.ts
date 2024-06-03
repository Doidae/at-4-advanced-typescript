import mongoose, { Schema, Document } from 'mongoose';

// Custom validator function for the ingredients array
function arrayLimit(val: string[]): boolean {
  return val.length > 0;
}

interface Recipe extends Document {
  title: string;
  ingredients: string[];
  image: string;
  instructions: string;
  category: 'Breakfast' | 'Lunch' | 'Dinner' | 'Dessert';
  prepTime: number;
  createdAt: Date;
}

const recipeSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  ingredients: {
    type: [String],
    required: true,
    validate: [arrayLimit, 'Ingredients list cannot be empty'],
  },
  image: {
    type: String,
    default: 'http://placehold.it/500x500.png',
  },
  instructions: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['Breakfast', 'Lunch', 'Dinner', 'Dessert'], // Example categories
    trim: true,
  },
  prepTime: {
    type: Number,
    required: true,
    min: [0, 'Preparation time cannot be negative'], // Ensure non-negative values
  },
  createdAt: {
    type: Date,
    default: Date.now, // Default to the current date
  },
});

const RecipeModel = mongoose.model<Recipe>('Recipe', recipeSchema);

export default RecipeModel;
