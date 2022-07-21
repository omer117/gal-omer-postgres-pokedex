import path from 'path';
import fs from 'fs';
import express, { Express } from 'express';
import cors from 'cors';
import { json } from 'body-parser';
import fetch from 'cross-fetch';
// import { Collection } from 'mongodb';
import { writeData, handleJson, filePath } from './serverFunctions';
import { Client } from 'pg'



import { selectPokemonTable } from './postgres';


export const client = new Client({
    // connectionString: process.env.DATABASE_URL,
    connectionString: "postgres://mdwcichlijeqci:c3103d6373cf31cdf5407a264213c77abdbe84de81c057dcd580b1e6cf97328d@ec2-3-219-229-143.compute-1.amazonaws.com:5432/dd6f3fguojv4v1",  ssl: {
       rejectUnauthorized: false
     }
   });


const app: Express = express();
app.use(cors());
app.use(json());
const root: string = path.join(process.cwd(), 'dist');

app.use(express.static(root));

app.use(express.static(root), (_req, _res, next) => {
    next();
});

// Run to get the data from the data.json and write it to the database
app.get('/writeToPostgras', (_req, res) => {
    console.log("getting data.json to database");
    res.sendFile(path.join(root, 'index.html'));
    let pokemon_url =  "http://127.0.0.1:4000/getDataJson";
    fetch(pokemon_url)
      .then(res => res.json())
      .then(pokemonsData => writeData(pokemonsData))
      .catch(err => console.log(err));
});

// Run to write the data from the api and to the data.json
app.get('/writeDataJson', (_req, res) => {
  console.log("writing api to data json");
  res.sendFile(path.join(root, 'index.html'));
  handleJson();
});

// Run to get the data from data.json
app.get('/getDataJson', (_req, res) => {
  console.log("getting api from data json");
  res.send(JSON.parse(fs.readFileSync(filePath, "utf8")));
});

// Run to get 100 pokemons based on the page
app.get("/getData/page=:page", (req, res) => {
  selectPokemonTable(client, res, Number(req.params.page));
});

app.get('*', (_req, res) => {
  res.sendFile(path.join(root, 'index.html'));
});

(async () => {

  await client.connect();
  //await createPokemonTable(client);
  //await InsertPokemonsTable(client);

  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log('Hosted: http://localhost:' + port);
  });
})()
  .catch
  (console.log)
