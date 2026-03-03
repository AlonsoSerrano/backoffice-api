import { UserRepository } from "../../domain/repositories/UserRepository";
import { AuthService } from "../services/auth.service";
import { UpdateUserDTO } from "../dto/update-user.dto";


export class UpdateUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private authService: AuthService
  ) {}

  async execute(data: UpdateUserDTO) {
    const user = await this.userRepository.findById(data.id);
    if (!user) {
      throw new Error("no existe el usuario");
    }

    let updatedPassword = user.password;
    if (data.password) {
      updatedPassword = await this.authService.hash(data.password);
    }

    const updatedUser = await this.userRepository.update({
      ...user,
      email: data.email ?? user.email,
      password: updatedPassword,
      role: data.role ?? user.role
    });

    return {
      id: updatedUser.id,
      email: updatedUser.email,
      role: updatedUser.role
    };
  }
}