const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const { PORT } = require('./config/serverConfig');
const apiRoutes = require('./routes/index');
const db = require('./models/index');


const setUpAndStartServer = () => {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended : true}));

    app.use('/api', apiRoutes);

    app.listen(PORT, () => {
        console.log(`server started on port ${PORT}`);
        if(process.env.DB_SYNC){
            db.sequelize.sync({alter : true});
        }
    });
}

setUpAndStartServer();