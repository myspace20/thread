import { Model } from 'objection';
import config from '../infra/database/knexfile';
import knex from 'knex';
import TagRepository from './TagRepository';

describe('TagRepository', () => {
  let tagRepository: TagRepository;

  beforeAll(() => {
    tagRepository = new TagRepository();
    Model.knex(knex(config));
  });

  afterAll(() => {
    knex(config).destroy();
  });

  const id = 'b460698d-dc2a-44f0-9817-2241e2dcea7d';

  const newTag = {
    name: 'test tag',
    description: 'description for a test tag',
  };

  const updates = {
    name: 'update oftest tag',
    description: 'update of description for a test tag',
  };

  describe('create a tag', () => {
    it('creates a new tag', async () => {
      const tag = await tagRepository.create(newTag);
      expect(tag.name).toBe(newTag.name);
      expect(tag.description).toBe(newTag.description);
    });
  });

  describe('retrieve tag', () => {
    it('retrieves a tag by id', async () => {
      const tag = await tagRepository.getById(id);
      expect(tag).toBeTruthy();
    });

    // it("fails to retrieve a tag",async()=>{
    //   const tag = await tagRepository.getById("")
    //   expect(tag).toBeNull()
    // })
  });

  describe('update tag', () => {
    it('updates a tag', async () => {
      const tag = await tagRepository.patch(id, updates);
      expect(tag.name).toBe(updates.name);
      expect(tag.description).toBe(updates.description);
    });
  });
});
