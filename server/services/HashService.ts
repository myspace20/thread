import * as bcrypt from 'bcrypt';

class HashService {
  async createHash(data: string) {
    const hash = await bcrypt.hash(data, 10);
    return hash;
  }

  async verifyHash(plaintext: string, hash: string) {
    return await bcrypt.compare(plaintext, hash);
  }
}

export default HashService;
