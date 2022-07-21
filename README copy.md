# Pokedex-4 Task - Deploy to Heroku + Postgres add-on!

[The Pokémon Company](https://en.wikipedia.org/wiki/The_Pok%C3%A9mon_Company) heard about your Pokédex product and they think it'd be a huge success.

Now that you've made the proper changes to support 1M Pokémons, you are well-positioned to be the best Pokédex on the planet and the universe!

We're looking at a multi-million-Yen deal which will make you rich!

There's one catch though - being Japanese, they are both traditional _and_ strict.

They will not agree to having your server use Mongo - a modern and zorem DB - only Postgres! They were even slightly offended by your initial offer to use Mongo.

Please follow these instructions to please the Pokémon Company people:
* Migrate your code to use Heroku Postgres instead of Mongo
* As you do this, separate your express code from your db code. Your express code shouldn't "care" whether it's using Mongo or Postgres.
* Deploy your Pokédex to the cloud - such that it uses Heroku + Postgres Heroku add-on.

Note, Postgres free tier has a 10K row limit, so you can truncate your data to fit that limit.
