const fs = require('fs/promises');
const path = require('path');

class Database {

    constructor(name) {
        this.name = name
    }

    getFileName() {
        return path.join(__dirname, this.name + '.database.json');
    }

    async create(obj) {
        const data = await this.read();
        const maxIdObj = data.reduce((acc, val) => acc.id < val.id ? val : acc) || {id: 0}
        obj.id = maxIdObj.id + 1;
        data.push(obj);
        await this.write(data);
        return obj;
    }

    async read(id) {
        const findId = +id;
        const buffer = await fs.readFile(this.getFileName());
        const data = JSON.parse(buffer.toString()) || [];
        return (Number.isInteger(findId)) ? data.find(val => val.id === findId) : data;
    }

    async write(obj, id) {
        const findId = +id;
        if (Number.isInteger(findId)) {
            await this.update(obj, id);
        } else {
            await fs.writeFile(this.getFileName(), JSON.stringify(obj));
        }
    }

    async update(obj, id) {
        const findId = +id;
        if (!Number.isInteger(findId)) return false;
        const data = await this.read();
        const prevObj = data.find(val => val.id === findId);
        if (prevObj) {
            obj.id = id;
            Object.assign(prevObj, obj)
            await fs.writeFile(this.getFileName(), JSON.stringify(data));
        }

        return !!prevObj;
    }

    async delete(id) {
        const findId = +id;
        if (!Number.isInteger(findId)) return false;

        const data = await this.read();
        const index = data.findIndex(val => val.id === findId);
        if (index !== -1) {
            data.splice(index, 1);
            await fs.writeFile(this.getFileName(), JSON.stringify(data));
        }

        return index !== -1;
    }
}

const database = name => new Database(name)

module.exports = database;