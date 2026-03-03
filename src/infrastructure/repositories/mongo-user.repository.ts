import { UserRepository } from "../../domain/repositories/UserRepository";
import { User } from "../../domain/entities/User";
import { UserModel } from "../database/user.model";

export class MongoUserRepository implements UserRepository {
    
    async findAll(): Promise<User[]> {
    const docs = await UserModel.find();

    return docs.map(doc => 
        new User(
            doc.id,
            doc.email,
            doc.password,
            doc.role
        )
    );
}

    async findByEmail(email: string): Promise<User | null> {
        const doc = await UserModel.findOne({ email });

        if (!doc) return null;

        return new User(
            doc.id,
            doc.email,
            doc.password,
            doc.role
        );
    }

    async findById(id: string): Promise<User | null> {
        const doc = await UserModel.findById(id);

        if (!doc) return null;

        return new User(
            doc.id,
            doc.email,
            doc.password,
            doc.role
        );
    }

    async save(user: User): Promise<User> {
        const created = await UserModel.create({
            email: user.email,
            password: user.password,
            role: user.role
        });

        return new User(
            created.id,
            created.email,
            created.password,
            created.role
        );
    }
}