const client = require('../config/dbconfig');

async function get_one(req, res){
    const query = {
        text: 'SELECT * FROM transactions WHERE id = $1',
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
        if(req.body['tipo'] || req.body['remetente'] || req.body['produtos'] || req.body['valor'], req.body['realizada_em']){
            return res.status(400).json({"error": "Preencha todos os campos"});
        }

        const query = {
            text: 'INSERT INTO transactions(tipo, remetente, produtos, valor, realizada_em) VALUES($1, $2, $3, $4, $5)',
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
            text: 'SELECT * FROM transactions'
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
        if(req.body['tipo'] || req.body['remetente'] || req.body['produtos'] || req.body['valor'], req.body['realizada_em']){
            return res.status(400).json({"error": "Preencha todos os campos"});
        }

        const { id } = req.params;
        let query = {
            text: 'UPDATE products SET tipo = $1, remetente = $2, produtos = $3, valor = $4, realizada_em = $5 WHERE id = $5',
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
            text: 'DELETE FROM transactions WHERE id = $1',
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