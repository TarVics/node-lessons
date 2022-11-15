const express = require('express');
const fs = require('fs/promises');

const APP_PORT = 5000;
const DB_FILE = './database/users.json';

const app = express();

const userAPI = {
    async getAll() {
        const data = await fs.readFile(DB_FILE);
        return JSON.parse(data.toString());
    },
    async getById(id) {
        const data = await this.getAll();
        return data.find(user => user.id === id);
    },
    async create(user) {
        const users = await this.getAll();
        users.push({...user, id: users.length + 1});
        await fs.writeFile(DB_FILE, JSON.stringify(users));
        return user;
    },
    async update(id, user) {
        const users = await this.getAll();
        const dbUser = users.find(user => user.id === id);
        if (dbUser) {
            Object.assign(dbUser, user);
        }
        await fs.writeFile(DB_FILE, JSON.stringify(users));
        return dbUser;
    },
    async delete(id) {
        const users = await this.getAll();
        const index = users.findIndex(user => user.id === id);
        if (~index) {
            users.splice(index, 1);
            await fs.writeFile(DB_FILE, JSON.stringify(users));
        }
        return ~index;
    }
}

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/users', async (req, res) => {
    try {
        const data = await userAPI.getAll();
        res.status(200).json(data);
    } catch (e) {
        res.status(400).json(e.toString());
    }
});

app.get('/users/:id', async (req, res) => {
    try {
        const userId = +req.params.id;
        if (!isFinite(userId)) {
            res.status(400).end('Bad request');
        } else {
            const data = await userAPI.getById(userId);
            if (!data) {
                res.status(404).end('Not found');
            } else {
                res.status(200).json(data);
            }
        }
    } catch (e) {
        res.status(400).json(e.toString());
    }
})

app.post('/users', async (req, res) => {
    try {
        const userInfo = req.body;

        if (!userInfo.name) {
            res.status(400).end('Bad or empty user name');
        } else if (!userInfo.age || !isFinite(+userInfo.age) || +userInfo.age < 0 || +userInfo.age > 200) {
            res.status(400).end('Bad or empty user age');
        } else {
            const user = await userAPI.create(userInfo);
            res.status(201).json(user);
        }
    } catch (e) {
        res.status(400).json(e.toString());
    }
});

app.put('/users/:id', async (req, res) => {
    try {
        const userId = +req.params.id;
        if (!isFinite(userId)) {
            res.status(400).end('Bad request');
            return;
        }

        const user = await userAPI.getById(userId);
        if (!user) {
            res.status(404).end('Not found');
            return;
        }

        const userInfo = req.body;

        if (!userInfo.id || !isFinite(+userInfo.id)) {
            res.status(400).end('Bad or empty user id');
        } else if (!userInfo.name) {
            res.status(400).end('Bad or empty user name');
        } else if (!userInfo.age || !isFinite(+userInfo.age) || +userInfo.age < 0 || +userInfo.age > 200) {
            res.status(400).end('Bad or empty user age');
        } else {
            const user = await userAPI.update(userId, userInfo);
            res.status(201).json(user);
        }
    } catch (e) {
        res.status(400).json(e.toString());
    }
});

app.delete('/users/:id', async (req, res) => {
    try {
        const userId = +req.params.id;
        if (!isFinite(userId)) {
            res.status(400).end('Bad request');
            return;
        }

        const user = await userAPI.getById(userId);
        if (!user) {
            res.status(404).end('Not found');
            return;
        }

        await userAPI.delete(userId);
        res.status(201);
    } catch (e) {
        res.status(400).json(e.toString());
    }
});

app.listen(APP_PORT, () => {
    console.log('Server listening on %s port...', APP_PORT);
})