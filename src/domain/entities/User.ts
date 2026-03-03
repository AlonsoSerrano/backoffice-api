export class User {
  constructor(
    public id: string | null,
    public email: string,
    public password: string,
    public role: string = "USER",
  ) {}

  static create(email: string, password: string) {
    return new User(null, email, password);
  }
}
