const client = require('../config/dbconfig')

module.exports = {
    async create(req,res){
        const query = {
            text: 'INSERT INTO users(usuario, nome, senha, email, estado) VALUES($1, $2, $3, $4)',
            values: ['rebeca', 22, 'Ceará', 'rebeca.m.mariana@gmail.com'],
        };
        client
        .query(query)
        .then(res => console.log(res.rows[0]))
        .catch(e => console.error(e.stack));
    },

    async read(req,res){
        const query = {
            text: 'SELECT * FROM users'
        };
        client
        .query(query)
        .then(res => console.log(res.rows[0]))
        .catch(e => console.error(e.stack));
    },

    async update(req,res){

    },

    async delete(req,res){

    }
}