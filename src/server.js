const app = require('./app');
const sequelize = require('./utils/connect');
require('dotenv').config();

const main = async () => {
    try{
        await sequelize.sync();
        console.info('CONNECT TO BD');
        app.listen(process.env.APP_PORT, ()=>{
            console.info('SERVER ON PORT ', process.env.APP_PORT);
        });
    } catch(error) {
        console.error('DONT CONECT TO BD & SV ', error);
    }
};

main()