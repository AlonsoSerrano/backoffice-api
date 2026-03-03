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
}
