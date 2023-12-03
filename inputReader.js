import fs from 'fs'

export function getLines(file){
    const path = `inputs/${file}`;
    fs.readFile(path, 'utf8', (err, data)=>{
        if (err) {
            console.error(err);
            return;
        }

        return data;
    })
}