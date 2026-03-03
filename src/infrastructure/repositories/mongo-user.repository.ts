import { UserRepository } from "../../domain/repositories/UserRepository";
import { User } from "../../domain/entities/User";
import { UserModel } from "../database/user.model";

export class MongoUserRepository implements UserRepository {
  async update(user: User): Promise<User> {
    const updateFields: any = {};
    if (user.email) updateFields.email = user.email;
    if (user.password) updateFields.password = user.password;
    if (user.role) updateFields.role = user.role;

    const updated = await UserModel.findByIdAndUpdate(
      user.id,
      { $set: updateFields },
      { new: true },
    );
    if (!updated) throw new Error("usuario no encontrado");

    return {
      id: updated._id.toString(),
      email: updated.email,
      password: updated.password,
      role: updated.role,
    };
  }

  async delete(id: string): Promise<void> {
    const deleted = await UserModel.findByIdAndDelete(id);
    if (!deleted) throw new Error("usuario no encontrado");
  }

  async findAll(): Promise<User[]> {
    const docs = await UserModel.find();

    return docs.map(
      (doc) => new User(doc.id, doc.email, doc.password, doc.role),
    );
  }

  async findByEmail(email: string): Promise<User | null> {
    const doc = await UserModel.findOne({ email });

    if (!doc) return null;

    return new User(doc.id, doc.email, doc.password, doc.role);
  }

  async findById(id: string): Promise<User | null> {
    const doc = await UserModel.findById(id);

    if (!doc) return null;

    return new User(doc.id, doc.email, doc.password, doc.role);
  }

  async save(user: User): Promise<User> {
    const created = await UserModel.create({
      email: user.email,
      password: user.password,
      role: user.role,
    });

    return new User(created.id, created.email, created.password, created.role);
  }
}
