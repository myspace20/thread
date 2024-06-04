import { createVote } from '../interfaces';
import VoteRepository from '../repositories/VoteRepository';

class VoteService {
  private voteRepository = new VoteRepository();

  async castVote(data: createVote) {
    const vote = await this.voteRepository.getByFilter(data);
    if (vote) {
      await this.voteRepository.deleteVote(vote.id);
      return 'Vote withdrawn';
    }
    await this.voteRepository.createVote(data);
    return 'Vote casted suceessfully';
  }
}

export default VoteService;
