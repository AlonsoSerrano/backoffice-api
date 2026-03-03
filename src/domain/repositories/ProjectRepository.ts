import { Project } from "../entities/Project";

export interface ProjectRepository {
  save(project: Project): Promise<Project>;
  findById(id: string): Promise<Project | null>;
  findAll(): Promise<Project[]>;
  update(project: Project): Promise<Project>;
  delete(id: string): Promise<void>;
}
