import app from './app.js';
import sequelize from './utils/connect.js';
import dotenv from 'dotenv';

dotenv.config();

const main = async () => {
  try {
    await sequelize.sync();
    console.info('✅ CONECTADO CORRECTAMENTE A LA BD');

    const PORT = process.env.APP_PORT || 3000;

    app.listen(PORT, () => {
      console.info(`🚀 EL SERVER ESTA CORRIENDO EN ${PORT}`);
    });
  } catch (error) {
    console.error('❌ ERROR EN LA CONEXION DE LA BD CON EL SERVIDOR:', error);
  }
};

main();
