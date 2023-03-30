const express = require('express');
const bodyParser = require('body-parser');

const sequelize = require('./util/database');
const customErrHandler = require('./controller/middleware/customErrHandler');
const { userRoute } = require('./controller/user/route');
const adminRoute = require('./controller/admin/route');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//sync the database
sequelize.sync({force: false}).then((result)=>{
});

app.use('/user/web/',userRoute);

app.use('/admin', adminRoute);

//middleware to send error message
app.use(customErrHandler);

app.listen(5000,()=>{
    console.log("Server is listening on port 5000");
})


