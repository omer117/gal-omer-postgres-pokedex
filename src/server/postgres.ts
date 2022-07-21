// import { Pokemon } from 'src/client/shared/pokemon';
import {client} from './server'
// import fs from  'fs';
// import { filePath } from './serverFunctions';
import { Client } from 'pg';


export async function createPokemonTable() {
    let text = "CREATE TABLE IF NOT EXISTS pokemons (id SERIAL PRIMARY KEY,name VARCHAR(255) NOT NULL,url VARCHAR(255) NOT NULL,img VARCHAR(255) NOT NULL,height INTEGER NOT NULL,weight INTEGER NOT NULL,types VARCHAR(255)[] NOT NULL,hp INTEGER NOT NULL,attack INTEGER NOT NULL,defense VARCHAR(255) NOT NULL);"
      client.query(text, (err) => {
        if (err) throw err;
    })
}

export async function deletePokemonTable(){
    client.query("DROP TABLE IF EXISTS pokemons",(err)=>{
        if(err) throw err
    })
} 

export async function InsertPokemonsTable(pokemonArr: any) {   
    let text = "INSERT INTO pokemons (id ,name ,url ,img ,height ,weight ,types ,hp ,attack ,defense) VALUES " ;
    let text2: string = "";
    // for (let i = 0; i < pokemonArr.length; i++) {
        for(let i = 0; i< pokemonArr.length;i++){
        let a = (Object.values((pokemonArr[i])).slice(0, 10));
        text2 += `(${a[0]},'${a[1]}','${a[2]}','${a[3]}','${a[4]}','${a[5]}',
        '{${a[6]}}','${a[7]}','${a[8]}','${a[9]}'),`
    }
    text2 = text + text2.substring(0,text2.length-1) + ";";
    client.query(text2).catch();
    console.log(text2);
}

export async function selectPokemonTable(client: Client, res: any, page: number){
    // client.query(`SELECT * FROM pokemons WHERE id > ${page * 100} AND WHERE id < ${(page+1) * 100}`
    client.query(`SELECT * FROM pokemons WHERE id > ${page * 100} AND id < ${(page+1) * 100};`, (err: Error,res2:any) => {
		if (err) throw err;
        res.status(200).send(res2.rows);
	});
} 

// export async function getPokemonsDB(collection: Collection<Pokemon>, res: any, page: number) {
//   collection.find({$and:[ {id: {$gte: page * 100}}, {id: {$lte: (page+1)*100}}]}).toArray((err, result: any) => {
//     if (err) throw err;
//     res.status(200).send(result);
//   });



// }



