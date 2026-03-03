import { UserRepository } from "../../domain/repositories/UserRepository";

export class DeleteUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(userId: string) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error("usuario no encontrado");
    }

    await this.userRepository.delete(userId);

    return { message: "usuario eliminado correctamente" };
  }
}
