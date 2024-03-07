import Auth from './Auth';
import Comment from './Comment';
import Post from './Post';
import Tag from './Tag';
import Thread from './Thread';
import ThreadTag from './ThreadTag';
import User from './User';
import Vote from './Vote';

const TABLE = {
    AUTH: Auth,
    USER: User,
    POST: Post,
    TAG: Tag,
    THREAD: Thread,
    THREADTAG: ThreadTag,
    VOTE: Vote,
    COMMENT: Comment,
};

export default TABLE;
