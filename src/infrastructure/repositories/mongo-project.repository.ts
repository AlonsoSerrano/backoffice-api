import { ProjectRepository } from "../../domain/repositories/ProjectRepository";
import { Project } from "../../domain/entities/Project";
import { ProjectModel } from "../database/project.model";

export class MongoProjectRepository implements ProjectRepository {
  async save(project: Project): Promise<Project> {
    const created = await ProjectModel.create({
      name: project.name,
      description: project.description,
      ownerId: project.ownerId,
      progress: project.progress,
    });

    return new Project(
      created.id,
      created.name,
      created.description,
      created.ownerId,
      created.progress,
    );
  }

  async findById(id: string): Promise<Project | null> {
    const project = await ProjectModel.findById(id);

    if (!project) return null;

    return new Project(
      project.id,
      project.name,
      project.description,
      project.ownerId,
      project.progress,
    );
  }

  async findAll(): Promise<Project[]> {
    const docs = await ProjectModel.find();

    return docs.map(
      (doc) =>
        new Project(
          doc.id,
          doc.name,
          doc.description,
          doc.ownerId,
          doc.progress,
        ),
    );
  }

  async update(project: Project): Promise<Project> {
    const updateFields: any = {};
    if (project.name) updateFields.name = project.name;
    if (project.description) updateFields.description = project.description;
    if (project.ownerId) updateFields.ownerId = project.ownerId;
    if (project.progress) updateFields.progress = project.progress;

    const updated = await ProjectModel.findByIdAndUpdate(
      project.id,
      { $set: updateFields },
      { new: true },
    );
    if (!updated) throw new Error("Proyecto no encontrado");

    return {
      id: updated._id.toString(),
      name: updated.name,
      description: updated.description,
      ownerId: updated.ownerId,
      progress: updated.progress,
    };
  }

  async delete(id: string): Promise<void> {
     const deleted = await ProjectModel.findByIdAndDelete(id);
        if (!deleted) throw new Error("proyecto no encontrado");
  }

  /*async update(user: User): Promise<User> {
        const updateFields: any = {};
        if (user.email) updateFields.email = user.email;
        if (user.password) updateFields.password = user.password;
        if (user.role) updateFields.role = user.role;

        const updated = await UserModel.findByIdAndUpdate(user.id, { $set: updateFields }, { new: true });
        if (!updated) throw new Error("usuario no encontrado");

        return { id: updated._id.toString(), email: updated.email, password: updated.password, role: updated.role };
    }

    async delete(id: string): Promise<void> {
        const deleted = await UserModel.findByIdAndDelete(id);
        if (!deleted) throw new Error("usuario no encontrado");
    }



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
    }*/
}
