const fs = require('node:fs')

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

const prepare = (dir, readyCallback) => {
    fs.stat(dir, (err) => {
        if (err) {
            if (err.code === 'ENOENT') {
                fs.mkdir(dir, {recursive: true}, (err) => {
                    if (err) {
                        console.log(err);
                    } else {
                        readyCallback(dir);
                    }
                })
            } else {
                console.log(err);
            }
        } else {
            fs.readdir(dir, { withFileTypes: true }, (err, files) => {
                let total = files.length;
                if (!total) {
                    readyCallback(dir);
                    return;
                }
                for (const file of files) {
                    if (file.isFile()) {
                        console.log('REMOVE', file.name);
                        fs.unlink(dir + '/' + file.name, (err) => {
                            if (err) {
                                console.log(err);
                            } else {
                                total--;
                                if(total === 0) readyCallback(dir);
                            }
                        });
                    }
                }
            });
        }
    });
}

const genFile = (filename, name, gender) => {
    const obj = {name, gender}
    fs.writeFile(filename, JSON.stringify(obj), err => err && console.log(err))
}

const genDirFiles = (dir, count) => {
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
        genFile(dir + '/' + gender + '-' + name + '.json', name, gender);
    }
}

const readFiles = (dir, ext, filenameCallback) => {
    fs.readdir(dir, { withFileTypes: true }, (err, files) => {
        if (err) {
            console.log(err);
            return;
        }

        for (const file of files) {
            if (file.isFile() && file.name.slice(-5) === ext) {
                filenameCallback(file.name);
            }
        }
    });
}

const sortFiles = (readDir, gender, writeDir) => {
    readFiles(readDir, '.json', (filename) => {
        console.log('SORT', filename);

        fs.readFile(readDir + '/' + filename, (err, data) => {
            if (err) {
                console.log(err);
                return;
            }

            const person = JSON.parse(data.toString());

            if (person.gender === gender) return;

            fs.rename(readDir + '/' + filename, writeDir + '/' + filename, err => {
                if (err) {
                    console.log(err);
                }
            })

        })
    })
}


const isGenerate = process.argv.includes('generate');
const isSort = process.argv.includes('sort');

if(!isGenerate && !isSort) {
    console.warn('1. У випадку генерування файлів, скрипт необхідно запустити так: node app generate');
    console.warn('2. У випадку сортування файлів по каталогах, скрипт необхідно запустити так: node app sort');
}

if(isGenerate) {
    console.warn('Генерування файлів у директорії ./data');
    prepare('./data/boys', dir => genDirFiles(dir, 10));
    prepare('./data/girls', dir => genDirFiles(dir, 10));
}

if(isSort) {
    console.warn('Сортування файлів у директорії ./data');
    sortFiles('./data/boys', 'male', './data/girls');
    sortFiles('./data/girls', 'female', './data/boys');
}

