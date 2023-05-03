const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const db = require('./config/dbConfig');
const port = 3000;
const app = express();
db.connect();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

const productRoutes = require('./routes/product.route');
const categoryRoutes = require('./routes/category.route');
const ownerRoutes = require('./routes/owner.route');
const userRoutes = require('./routes/user.route');
const reviewRoutes = require('./routes/review.route');
const adminRoutes = require('./routes/admin.route');
app.use('/api',productRoutes);
app.use('/api',categoryRoutes);
app.use('/api',ownerRoutes);
app.use('/api',userRoutes);
app.use('/api',reviewRoutes);
app.use('/admin',adminRoutes);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});