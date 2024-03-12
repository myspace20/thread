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
            await this.voteRepository.deleteVote(vote.id);
            return 'vote withdrawn';
        }
        await this.voteRepository.createVote(data);
        return 'vote casted suceessfully';
    }
}

export default VoteService;
