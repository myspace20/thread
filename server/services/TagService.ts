import TagRepository from '../repositories/TagRepository';

class TagService {
  private tagRepository = new TagRepository();

  async getAllTags() {
    return await this.tagRepository.get();
  }

  async createTag(data: any) {
    return await this.tagRepository.create(data);
  }

  async editTag(id: string, data: any) {
    await this.tagRepository.getById(id);
    return await this.tagRepository.patch(id, data);
  }

  async deleteTag(id: string) {
    await this.tagRepository.getById(id);
    return await this.tagRepository.delete(id);
  }
}

export default TagService;
