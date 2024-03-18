import TABLE from '../models';
import { voteShape } from '../models/Vote';
import { HttpError } from '../util/HttpError';

type Filter = Pick<voteShape, 'post_id' | 'thread_id' | 'user_id' | 'type'>;
type Vote = Pick<voteShape, 'post_id' | 'thread_id' | 'user_id' | 'type'>;

export { Filter, Vote };

/*
all edits should allow only specific fileds
for example:
1. can only edit the vote type and nothing else
2. can only edit post text
3. can only edit thread title or text

1-3 should have methods to handle each concern

4. password edit should exists separate from profile details(changePassword method in repository)
5. can only edit the text of a comment
6. completing a profile should have its own way of handling fields(completeProfile and edit method)
*/

class VoteRepository {
  async getById(id: string) {
    const vote = await TABLE.VOTE.query().findById(id);
    if (!vote) throw new HttpError(404, 'vote not found');
    return vote;
  }

  async getByFilter(filter: Filter) {
    const vote = await TABLE.VOTE.query().findOne(filter);
    // if (!vote) throw new HttpError(404, 'vote not found');
    return vote;
  }

  async createVote(data: Vote) {
    return await TABLE.VOTE.query().insert(data);
  }

  // async editVote(id:string,data:Vote){
  //     const vote = await TABLE.VOTE.query().patchAndFetchById(id,data)
  //     return vote
  // }

  async deleteVote(id: string) {
    return await TABLE.VOTE.query().deleteById(id);
  }
}

export default VoteRepository;
