import knex from 'knex';
import config from '../infra/database/knexfile';
import { Model } from 'objection';
import VoteRepository from './VoteRepository';

describe('VoteRepository', () => {
  let voteRepository: VoteRepository;

  beforeAll(() => {
    voteRepository = new VoteRepository();
    Model.knex(knex(config));
  });

  afterAll(() => {
    knex(config).destroy();
  });

  const voteData = {};
});
