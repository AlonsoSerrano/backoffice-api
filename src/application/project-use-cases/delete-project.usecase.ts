import { ProjectRepository } from "../../domain/repositories/ProjectRepository";

export class DeleteProjectUseCase {
  constructor(private projectRepository: ProjectRepository) {}

  async execute(userId: string) {
    const user = await this.projectRepository.findById(userId);
    if (!user) {
      throw new Error("proyecto no encontrado");
    }

    await this.projectRepository.delete(userId);

    return { message: "proyecto eliminado correctamente" };
  }
}
