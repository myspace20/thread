import { voteShape } from '../models/Vote';
import VoteRepository, { Vote } from '../repositories/VoteRepository';
import { HttpError } from '../util/HttpError';

type voteFilter = {
    post_id?: string;
    user_id: string;
    thread_id?: string;
};

class VoteService {
    private voteRepository = new VoteRepository();

    async castVote(data: Vote) {
        const vote = await this.voteRepository.getByFilter(data);
        if (vote) {
            return await this.voteRepository.deleteVote(vote.id);
        }
        return await this.voteRepository.createVote(data);
    }
}

export default VoteService;
