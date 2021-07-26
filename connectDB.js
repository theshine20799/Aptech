var sql= require('mssql/msnodesqlv8');

var config={
    host: 1999,
    server: 'localhost\\SQLEXPRESS01',
    user: 'sa',
    password: 'huuthang20799',
    database: 'Aptech',
    driver: 'msnodesqlv8'
}

const conn=new sql.ConnectionPool(config).connect().then(pool => {
    return pool;
});

module.exports= {
     conn: conn,
     SQL: sql
}