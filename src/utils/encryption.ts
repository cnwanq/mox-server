import { createHash } from 'crypto';
import * as bcrypt from 'bcrypt';


export default class EncryptionUtils {
    static generateSalt(length: number): string {
        let salt = "";
        for (let i = 0; i < length; i++) {
            salt += String.fromCharCode(Math.floor(Math.random() * 26) + 97);
        }
        return salt;
    }

    static hashPassword(password: string, salt: string): string {
        const hash = createHash('sha256');
        hash.update(password + salt);
        return hash.digest('hex');
      }
    
    static async encryptPasswordWithBcrypt(password: string, saltRounds: number): Promise<string> {
        return bcrypt.hash(password, saltRounds);
    }
}