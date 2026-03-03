import { ProjectRepository } from "../../domain/repositories/ProjectRepository";

export class FindProjectByIdUseCase {
  constructor(private projectRepository: ProjectRepository) {}

  async execute(id: string) {
    const project = await this.projectRepository.findById(id);

    if (!project) {
      throw new Error("no se encontro un proyecto para el id " + id);
    }

    return project;
  }
}
