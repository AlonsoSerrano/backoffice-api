import { UserRepository } from "../../domain/repositories/UserRepository";
import { User } from "../../domain/entities/User";
import { AuthService } from "../services/auth.service";

export class CreateUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private authService: AuthService,
  ) {}

  async execute(email: string, password: string) {
    const existing = await this.userRepository.findByEmail(email);

    if (existing) {
      throw new Error("ya existe un usuario ligado al correo ingresado");
    }

    // se hace hash de pw para guardarla encriptada
    console.log("LLEGA ANTES DEL HASH " + password);
    const hashed = await this.authService.hash(password);

    const user = User.create(email, hashed);

    return await this.userRepository.save(user);
  }
}
