import { createTag, tagId, tagQuery, tagUpdate } from '../interfaces';
import TagRepository from '../repositories/TagRepository';

class TagService {
  private tagRepository = new TagRepository();

  async getAllTags() {
    return await this.tagRepository.get();
  }

  async createTag(data: createTag) {
    return await this.tagRepository.create(data);
  }

  async editTag(id: tagId, data: tagUpdate) {
    await this.tagRepository.getById(id);
    return await this.tagRepository.patch(id, data);
  }

  async deleteTag(id: tagId) {
    await this.tagRepository.getById(id);
    return await this.tagRepository.delete(id);
  }
}

export default TagService;
