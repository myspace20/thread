//@ts-nocheck
import TagService from './TagService';
import TagRepository from '../repositories/TagRepository';
import sinon from 'sinon';
import { v4 } from 'uuid';
import { HttpError } from '../util/HttpError';

describe('TagService', () => {
  let tagService: TagService;
  let tagRepositoryStub;

  beforeEach(() => {
    tagService = new TagService();
    tagRepositoryStub = sinon.stub(TagRepository.prototype);
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('retrieve tags', () => {
    it('gets all tags', async () => {
      const dummyTag = { name: '2030', description: 'sample tag' };
      tagRepositoryStub.get.resolves([dummyTag]);
      const results = await tagService.getAllTags();
      expect(results).toBeDefined();
      expect(results).toEqual([dummyTag]);
    });
    it('get a tag by id -- error', async () => {
      let error;
      tagRepositoryStub.getById.throws(new HttpError(404, 'tag not found'));
      try {
        await tagService.getById('wrong id');
      } catch (e) {
        error = e;
      }
      expect(error.status).toEqual(404);
      expect(error.message).toEqual('tag not found');
    });
  });

  describe('create tag', () => {
    it('create a tag', async () => {
      const id = v4();
      const dummyTag = { id, name: '2030', description: 'sample tag' };
      const tagInput = { name: '2030', description: 'sample tag' };
      tagRepositoryStub.create.resolves(dummyTag);
      const results = await tagService.createTag(tagInput);
      expect(results).toEqual(dummyTag);
      expect(tagRepositoryStub.create.calledOnceWithExactly(tagInput)).toEqual(
        true,
      );
    });
  });

  describe('update tag', () => {
    it('updates a tag', async () => {
      const id = v4();
      const tagInput = { name: '2030', description: 'sample tag' };
      const updatedTag = {
        id,
        name: '2024',
        description: 'sample update to tag',
      };
      tagRepositoryStub.getById.resolves({ ...tagInput, id });
      tagRepositoryStub.patch.resolves(updatedTag);
      const result = await tagService.editTag(id, tagInput);
      expect(result).toEqual(updatedTag);
      expect(result).toBeDefined();
      expect(tagRepositoryStub.getById.calledOnceWithExactly(id)).toEqual(true);
      expect(
        tagRepositoryStub.patch.calledOnceWithExactly(id, tagInput),
      ).toEqual(true);
    });
  });

  describe('remove a tag', () => {
    it('removes a tag by id', async () => {
      const id = v4();
      const tag = { id, name: '2024', description: 'sample update to tag' };
      tagRepositoryStub.getById.resolves(tag);
      tagRepositoryStub.delete.resolves('tag deleted successfully');
      const result = await tagService.deleteTag(id);
      expect(result).toEqual('tag deleted successfully');
      expect(tagRepositoryStub.getById.calledOnceWithExactly(id)).toEqual(true);
      expect(tagRepositoryStub.delete.calledOnceWithExactly(id)).toEqual(true);
    });
  });
});
