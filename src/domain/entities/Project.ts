export class Project {
  constructor(
    public id: string | null,
    public name: string,
    public description: string,
    public ownerId: string,
    public progress: string,
  ) {}

  static create(
    name: string,
    description: string,
    ownerId: string,
    progress: string,
  ) {
    return new Project(null, name, description, ownerId, progress);
  }
}
