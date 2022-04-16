const client = require('../config/dbconfig');

async function get_one(req, res){
    const query = {
        text: 'SELECT * FROM products WHERE id = $1',
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
        if(!req.body['nome'] || !req.body['valor'] || !req.body['quantidade']){
            return res.status(400).json({"error": "Preencha todos os campos"});
        }

        const query = {
            text: 'INSERT INTO products(nome, valor, quantidade) VALUES($1, $2, $3)',
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
            text: 'SELECT * FROM products'
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
        if(!req.body['nome'] || !req.body['valor'] || !req.body['quantidade']){
            return res.status(400).json({"error": "Preencha todos os campos"});
        }

        const { id } = req.params;
        let query = {
            text: 'UPDATE products SET nome = $1, valor = $2, quantidade = $3 WHERE id = $4',
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
            text: 'DELETE FROM products WHERE id = $1',
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
    }
}