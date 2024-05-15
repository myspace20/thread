import bcrypt from 'bcrypt';

class HashService {
  static async createHash(data: string) {
    return await bcrypt.hash(data, 10);
  }

  static async verifyHash(plaintext: string, hash: string) {
    return await bcrypt.hash(plaintext, hash);
  }
}

export default HashService;
