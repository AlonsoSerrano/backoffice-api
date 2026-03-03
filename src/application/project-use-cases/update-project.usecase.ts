import { UserRepository } from "../../domain/repositories/UserRepository";
import { AuthService } from "../services/auth.service";
import { UpdateUserDTO } from "../dto/update-user.dto";

import { ProjectRepository } from "../../domain/repositories/ProjectRepository";
import { UpdateProjectDTO } from "../dto/update-project.dto"; 


export class UpdateProjectUseCase {
  constructor(
    private projectRepository: ProjectRepository,
  ) {}

  async execute(data: UpdateProjectDTO) {
    const project = await this.projectRepository.findById(data.id);
    if (!project) {
      throw new Error(`el projecto con id ${data.id} no existe`);
    }

   

    const updatedProject = await this.projectRepository.update({
      ...project,
      name: data.name ?? project.name,
      description: data.description ?? project.description,
      ownerId: data.ownerId ?? project.ownerId,
      progress: data.progress ?? project.progress
    });

    return {
      id: updatedProject.id,
      name: updatedProject.name,
      description: updatedProject.description,
      ownerId: updatedProject.ownerId,
      progress: updatedProject.progress
    };
  }
}