import { createTag, tagId, tagUpdate } from '../interfaces';
import TagRepository from '../repositories/TagRepository';

class TagService {
  private tagRepository = new TagRepository();

  async getById(id: tagId) {
    return await this.tagRepository.getById(id);
  }

  async getAllTags(options: any) {
    return await this.tagRepository.get(options);
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
