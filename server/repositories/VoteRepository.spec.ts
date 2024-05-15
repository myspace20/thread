import knex from 'knex';
import config from '../infra/database/knexfile';
import { Model } from 'objection';
import VoteRepository from './VoteRepository';

describe('VoteRepository', () => {
  beforeAll(() => {
    Model.knex(knex(config));
  });

  afterAll(() => {
    knex(config).destroy();
  });

  const voteRepository = new VoteRepository();

  const voteData = {};
});
