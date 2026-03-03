import { UserRepository } from "../../domain/repositories/UserRepository";

export class GetUsersUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute() {
    const users = await this.userRepository.findAll();

    if (!users) {
      throw new Error("no hay usuarios");
    }

    return users;
  }
}