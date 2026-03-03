import { ProjectRepository } from "../../domain/repositories/ProjectRepository";

export class FindAllProjectsUseCase {
  constructor(private projectRepository: ProjectRepository) {}

  async execute() {
    const result = await this.projectRepository.findAll();

    if (!result) {
      throw new Error("no hay proyectos");
    }
    return result;
  }
}