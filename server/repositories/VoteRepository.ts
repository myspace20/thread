import { createVote, voteId, voteQuery } from '../interfaces';
import TABLE from '../models';
import { HttpError } from '../util/HttpError';

class VoteRepository {
  async getById(id: voteId) {
    const vote = await TABLE.VOTE.query().findById(id);
    if (!vote) throw new HttpError(404, 'vote not found');
    return vote;
  }

  async getByFilter(query: voteQuery) {
    const vote = await TABLE.VOTE.query().findOne(query);
    return vote;
  }

  async createVote(data: createVote) {
    return await TABLE.VOTE.query().insert(data);
  }

  async deleteVote(id: voteId) {
    return await TABLE.VOTE.query().deleteById(id);
  }
}

export default VoteRepository;
