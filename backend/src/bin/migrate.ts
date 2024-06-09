import dbConnection from '../config/db.config';
import seed from './seed';

const migrate = async () => {
  try {
    await dbConnection.sq.sync();
    await dbConnection.sq.authenticate();
    await seed();
    console.log('Database synchronized successfully');
  } catch (error) {
    console.error('Error while synchronizing the database:', error);
  }
}

migrate();