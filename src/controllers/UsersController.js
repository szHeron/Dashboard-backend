const client = require('../config/dbconfig');

async function get_one(req, res){
    const query = {
        text: 'SELECT * FROM users WHERE id = $1',
        values: [req]
    };
    try{
        const data = await client.query(query);
        return data.rows[0];
    }catch(e){
        console.error(e.stack);
    }
}

module.exports = {
    async create(req, res){
        if(req.body['nome'] || req.body['usuario'] || req.body['senha'] || req.body['email'] || req.body['estado']){
            return res.status(400).json({"error": "Preencha todos os campos"});
        }

        const query = {
            text: 'INSERT INTO users(usuario, nome, senha, email, estado) VALUES($1, $2, $3, $4, $5)',
            values: Object.keys(req.body).map(i=>req.body[i])
        };

        client
        .query(query)
        .then(() => {return res.status(200)})
        .catch(e => {
            console.error(e.stack);
            return res.status(400).json(e.stack);
        });
    },

    async read(req, res){
        const query = {
            text: 'SELECT * FROM users'
        };
        client
        .query(query)
        .then(data => {
            return res.json(data.rows);
        })
        .catch(e => {
            console.error(e.stack);
            return res.status(400).json(e.stack);
        });
    },

    async update(req, res){
        if(req.body['nome'] || req.body['usuario'] || req.body['senha'] || req.body['email'] || req.body['estado']){
            return res.status(400).json({"error": "Preencha todos os campos"});
        }

        const { id } = req.params;
        let query = {
            text: 'UPDATE users SET usuario = $1, nome = $2, senha = $3, email = $4, estado = $5 WHERE id = $6',
            values: Object.keys(req.body).map(i=>req.body[i])
        };
        const user = await get_one(id);

        query.values.push(id);
        client
        .query(query)
        .then(() => {
            return res.json(user);
        })
        .catch(e => {
            console.error(e.stack);
            return res.status(400).json(e.stack);
        });
    },

    async delete(req, res){
        const { id } = req.params;
        const query = {
            text: 'DELETE FROM users WHERE id = $1',
            values: [id]
        };
        const user = await get_one(id);

        client
        .query(query)
        .then(() => {
            return res.json(user);
        })
        .catch(e => {
            console.error(e.stack);
            return res.status(400).json(e.stack);
        });
    },

    //ADMIN
    async read_admin(req, res){
        const query = {
            text: 'SELECT nome, avatar FROM admins'
        };
        client
        .query(query)
        .then(data => {
            return res.json(data.rows);
        })
        .catch(e => {
            console.error(e.stack);
            return res.status(400).json(e.stack);
        });
    },
}