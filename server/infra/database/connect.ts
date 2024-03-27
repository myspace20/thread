import knex, { Knex } from 'knex';
import { Model } from 'objection';
import config from './knexfile';

function knexObjectionInstance(config: Knex) {
  const connection = Model.knex(config);
}

const knexConfig = knex(config);

const dbInstance = knexObjectionInstance(knexConfig);

export default dbInstance;
