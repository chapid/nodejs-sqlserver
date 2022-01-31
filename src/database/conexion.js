import config from '../config';
import sql from 'mssql';

const dbSettings = {
    user:config.dbUser,
    password:config.dbPassword,
    server:config.server,
    database:config.database,
    options:{
        encrypt:true,
        trustServerCertificate:true
    }
}

export async function getConnection(){
    try {
        const pool = await sql.connect(dbSettings);
        return pool;
    } catch (error) {
        console.log(error);
    }
}

export { sql };