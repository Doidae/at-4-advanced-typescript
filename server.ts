import methodOverride from 'method-override';
import express, { Application, Request, Response } from 'express';
import mongoose from 'mongoose';

require('dotenv').config();
const PORT: number = parseInt(process.env.PORT || '3000', 10);
const app: Application = express();

app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'tsx');
app.engine('tsx', require('express-react-views').createEngine());

mongoose
    .connect(process.env.MONGO_URI!, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    } as mongoose.ConnectOptions)
    .then(() => console.log('connected to the database!~'))
    .catch((err: any) => console.error('Error connecting to the database:', err));

// ROUTES
app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to MY recipe app');
});

const recipeController = require('./controllers/recipeController');
app.use('/recipes', recipeController);

app.listen(PORT, () => {
    console.log('Listening on port', PORT);
});

// ERROR PAGE
app.get('*', (req: Request, res: Response) => {
    res.send('404');
});