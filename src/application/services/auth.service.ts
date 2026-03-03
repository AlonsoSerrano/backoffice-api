export interface AuthService {

    generateToken(userId: string, role: string): string;
    
    verifyToken(token: string): any;
    
    hash(password: string): Promise<string>;
    
    compare(password: string, hash: string): Promise<boolean>;

}