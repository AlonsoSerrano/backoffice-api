import { UserRepository } from "../../domain/repositories/UserRepository";
import { User } from "../../domain/entities/User";

export class CreateUserUseCase {
    
  constructor(private userRepository: UserRepository) {}

  async execute(email: string, password: string) {
    const existing = await this.userRepository.findByEmail(email);

    if (existing) {
      throw new Error("ya existe un usuario ligado al correo ingresado");
    }

    const user = User.create(email, password);

    return await this.userRepository.save(user);
  }
}