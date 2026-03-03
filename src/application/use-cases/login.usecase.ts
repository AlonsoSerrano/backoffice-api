import { UserRepository } from "../../domain/repositories/UserRepository";
import { AuthService } from "../services/auth.service";

export class LoginUseCase {
  constructor(
    private userRepository: UserRepository,
    private authService: AuthService
  ) {}

  async execute(email: string, password: string) {

    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error("credenciales invalidas");
    }

    const valid = await this.authService.compare(
      password,
      user.password
    );

    if (!valid) {
      throw new Error("credenciales invalidas");
    }

    const token = this.authService.generateToken(
      user.id!,
      user.role
    );

    return { token };
  }
}