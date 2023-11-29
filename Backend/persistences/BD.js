import pg from 'pg'

// Função de conectar o banco de dados PostgreSQL
async function conectar(){
    const pool = new pg.Pool({
        // postgres://nomeusuario:senha banco de dados | @ servidor do banco de dados(se local 127.0.0.1 com porta) / nome banco de dados
        connectionString:"postgres://sfhsyzmp:sAjmlKQOjrrfuwxzJo1lj9wcezpBn0No@isabelle.db.elephantsql.com/sfhsyzmp"
    })
    return pool.connect();
}

export default {conectar}