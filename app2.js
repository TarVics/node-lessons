import fs from 'node:fs/promises';
import path from 'node:path';

const maleNames = ['Yahir', 'Milton', 'Dominique', 'Dylan', 'Bo', 'Jackson', 'Brenton', 'Bruno', 'River', 'Vance',
    'Joel', 'Adrian', 'Sean', 'Brennen', 'Kaeden', 'Marco', 'Mateo', 'Trent', 'Reese', 'Darren', 'Ezra', 'Jabari',
    'Ezekiel', 'Cristian', 'Emerson', 'Craig', 'Seamus', 'Draven', 'Giovanni', 'Tomas', 'Kevin', 'Geovanni', 'Francis',
    'Curtis', 'Jaxson', 'Milo', 'Zackary', 'Kareem', 'Troy', 'Levi', 'Colten', 'Nikhil', 'Casey', 'Urijah', 'Elisha',
    'Korbin', 'Brock', 'Ronald', 'London', 'Brycen', 'Porter', 'August', 'Gustavo', 'Allan', 'Antoine', 'Alvin', 'Ismael',
    'Octavio', 'Alejandro', 'Malakai', 'German', 'Kamron', 'Alonso', 'Mark', 'Zavier', 'Braedon', 'Khalil', 'Max', 'Roy',
    'Beau', 'Cash', 'Ralph', 'Charles', 'Gaige', 'Marlon', 'Tyshawn', 'Maximilian', 'Maximillian', 'Johnny', 'Preston',
    'Eduardo', 'Nasir', 'Lorenzo', 'Markus', 'Rodney', 'Donavan', 'Franklin', 'Jonathon', 'Matias', 'Abraham', 'Sonny',
    'Gauge', 'Cohen', 'Randy', 'Jagger', 'Malik', 'Dallas', 'Micah', 'Jamison', 'Calvin'];

const femaleNames = ['Dayanara', 'Stephany', 'Joanna', 'Lydia', 'Judith', 'Maribel', 'Heidi', 'Camille', 'Kiersten',
    'Abbigail', 'Samara', 'Gwendolyn', 'Alexus', 'Casey', 'Priscilla', 'Laurel', 'Piper', 'Liana', 'Jaelyn', 'Jakayla',
    'Cassie', 'Summer', 'Leyla', 'Ivy', 'Alena', 'Jamiya', 'Victoria', 'Tamara', 'Tia', 'Abbey', 'Cameron', 'Celia',
    'Brenda', 'Aliya', 'Shayla', 'Jazmin', 'Miranda', 'Brooklynn', 'Liliana', 'Angelica', 'Mya', 'Raquel', 'Kelly',
    'Averi', 'Zoie', 'Renee', 'Mckenna', 'Cristina', 'Mariana', 'Scarlet', 'Adeline', 'Phoebe', 'Maeve', 'Savannah',
    'Kendal', 'Destiney', 'Estrella', 'Litzy', 'Jamya', 'Natasha', 'Tori', 'Elle', 'Joselyn', 'Nayeli', 'Ashlyn', 'Monique',
    'Kaya', 'Ariella', 'Liberty', 'Aleah', 'Michelle', 'Dana', 'Desiree', 'Isabelle', 'Kaleigh', 'Jaelynn', 'Mikayla',
    'Andrea', 'Paula', 'Miley', 'Elaina', 'Emilee', 'Chelsea', 'Kierra', 'Kennedy', 'Deja', 'Alma', 'Melanie', 'Taliyah',
    'Londyn', 'Rayne', 'Janiah', 'Danika', 'Damaris', 'Martha', 'Rose', 'Bethany', 'Kiana', 'Logan', 'Sarai'];

const genFile = async (filename, name, gender, age) => {
    const obj = {name, gender, age};
    await fs.writeFile(filename, JSON.stringify(obj))
}

const genDirFiles = async (dir, count) => {
    for (let i = 0; i < count; i++) {
        let gender;
        let list;
        if (Math.random() < 0.5) {
            list = maleNames;
            gender = 'male';
        } else {
            list = femaleNames;
            gender = 'female';
        }
        let name = list[Math.round(Math.random() * list.length - 1)];
        let age = 10 + Math.round(Math.random() * 40);
        await genFile(path.join(dir, gender + '-' + name + '.json'), name, gender, age);
    }
}

const prepare = async (dir, count) => {
    try {
        const isNew = await fs.mkdir(dir, {recursive: true});

        if (!isNew) {
            const files = await fs.readdir(dir, {withFileTypes: true});

            for (const file of files) {
                if (file.isFile()) {
                    console.log('REMOVE', file.name);
                    await fs.unlink(path.join(dir, file.name));
                }
            }
        }

        await genDirFiles(dir, count);
    } catch (e) {
        console.error(e);
    }
}

const sortFiles = async (readDir, gender, writeDir) => {
    try {
        const files = await fs.readdir(readDir, { withFileTypes: true });

        for (const file of files) {
            if (file.isFile() && file.name.slice(-5) === '.json') {
                console.log('SORT', file.name);

                const data = await fs.readFile(path.join(readDir, file.name)) || '';
                const person = JSON.parse(data);

                if (person.gender !== gender) {
                    await fs.rename(path.join(readDir, file.name), path.join(writeDir, file.name));
                }
            }
        }
    } catch (e) {
        console.error(e);
    }
}

const isGenerate = process.argv.includes('generate');
const isSort = process.argv.includes('sort');
const boysDir = './data/boys';
const girlsDir = './data/girls';


if (!isGenerate && !isSort) {
    console.warn('1. У випадку генерування файлів, скрипт необхідно запустити так: node app2 generate');
    console.warn('2. У випадку сортування файлів по каталогах, скрипт необхідно запустити так: node app2 sort');
}

if (isGenerate) {
    console.warn('Генерування файлів у директорії ./data');
    prepare(boysDir, 10).then();
    prepare(girlsDir, 10).then();
}

if (isSort) {
    console.warn('Сортування файлів у директорії ./data');
    sortFiles(boysDir, 'male', girlsDir).then();
    sortFiles(girlsDir, 'female', boysDir).then();
}

