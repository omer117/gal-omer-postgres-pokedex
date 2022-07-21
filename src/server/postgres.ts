// import { Pokemon } from 'src/client/shared/pokemon';
import {client} from './server'
import fs from  'fs';
import { filePath } from './serverFunctions';


export async function createPokemonTable() {
    let text = "CREATE TABLE IF NOT EXISTS pokemons (id SERIAL PRIMARY KEY,name VARCHAR(255) NOT NULL,url VARCHAR(255) NOT NULL,img VARCHAR(255) NOT NULL,height INTEGER NOT NULL,weight INTEGER NOT NULL,types VARCHAR(255)[] NOT NULL,hp INTEGER NOT NULL,attack INTEGER NOT NULL,defense VARCHAR(255) NOT NULL);"
      client.query(text, (err) => {
        if (err) throw err;
    })
}

export async function deletePokemonTable(){
    client.query("DROP TABLE IF EXISTS Pokemons",(err)=>{
        if(err) throw err
    })
} 


export async function InsertPokemonsTable(pokemonArr: any) {   
    let text = "INSERT INTO TABLE pokemons (id ,name ,url ,img ,height ,weight ,types ,hp ,attack ,defense) VALUES" ;
    let text2 = ''
    for (let i = 0; i < pokemonArr.length; i++) {
        let a = (Object.values((pokemonArr[i])).slice(0, 6));
         text2 += `${text}(${a[0]},'${a[1]}','${a[2]}','${a[3]}','${a[4]}','${a[5]}'),`
    }
    client.query(text2).catch();
}



// export async function getPokemonsDB(collection: Collection<Pokemon>, res: any, page: number) {
//   collection.find({$and:[ {id: {$gte: page * 100}}, {id: {$lte: (page+1)*100}}]}).toArray((err, result: any) => {
//     if (err) throw err;
//     res.status(200).send(result);
//   });



// }



