import dotenv from 'dotenv';

dotenv.config({
    path: "../astroquantum-ju/.env"
});
import connectDB from './db/index.js';
import { app } from './app.js';

connectDB()
.then( () => {
    app.on("error", ()=>{
        console.log("Database couldnot communicate with the app. Error : ", error);
        process.exit(1);
    });

    app.listen( process.env.PORT || 8000, () => {
        console.log(`Server is running on the port ${process.env.PORT || 8000}`);
    } );
} )
.catch( ( error ) => {
    console.log(`Error occured after connecting the database. Error `, error?.message );
} );