import { ProjectRepository } from "../../domain/repositories/ProjectRepository";
import { CreateProjectDTO } from "../dto/create-project.dto";
import { Project } from "../../domain/entities/Project";

export class CreateProjectUseCase {
  constructor(private projectRepository: ProjectRepository) {}

  async execute(dto: CreateProjectDTO) {
    const project = Project.create(
      dto.name,
      dto.description!,
      dto.ownerId,
      dto.progress!,
    );

    return await this.projectRepository.save(project);
  }
}
