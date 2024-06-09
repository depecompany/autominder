import dbConnection from '../config/db.config'
import CarModel from '../model/Car';
import SparePartsModel from '../model/SpareParts';
import UserModel from '../model/User'

const seed = async () => {
    try {
        await UserModel.bulkCreate([
            { name: 'John Doe', email: 'jonh.doe@example', password: "123456" },
            { name: 'admin', email: 'admin@admin.cl', password: 'Testing-1@' }
        ])
        await CarModel.bulkCreate([
            { brand: 'Toyota', model: 'Corolla', releaseYear: 2020, userId: 1 },
            { brand: 'Chevrolet', model: 'Sail', releaseYear: 2021, userId: 1 },
            { brand: 'Hyundai', model: 'Accent', releaseYear: 2022, userId: 2 }
        ])
        await SparePartsModel.bulkCreate([
            { name: 'Engine', isOriginal: true, price: 1000, carId: 1 },
            { name: 'Brakes', isOriginal: true, price: 2000, carId: 2 },
            { name: 'Clutch', isOriginal: true, price: 3000, carId: 3 }
        ])
    } catch (error) {
        throw new Error('Error while synchronizing the database:');
    } finally {
        process.exit();
    }
}

export default seed;