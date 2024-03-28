import VoteRepository, { Vote } from '../repositories/VoteRepository';

class VoteService {
  private voteRepository = new VoteRepository();

  async castVote(data: Vote) {
    const vote = await this.voteRepository.getByFilter(data);
    console.log(data, vote);
    if (vote) {
      await this.voteRepository.deleteVote(vote.id);
      return 'vote withdrawn';
    }
    await this.voteRepository.createVote(data);
    return 'vote casted suceessfully';
  }
}

export default VoteService;
