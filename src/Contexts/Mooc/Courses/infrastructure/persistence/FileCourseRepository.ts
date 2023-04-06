import { CourseRepository } from '../../domain/CourseRepository';
import { Course } from '../../domain/Course';
import fs from 'fs';
import BSON from 'bson';


export class FileCourseRepository implements CourseRepository {
  private FILE_PATH = `${__dirname}/courses`;

  async save(course: Course): Promise<void> {
    const filePath = this.filePath(course.id);
    const data = BSON.serialize(course);

    return fs.writeFileSync(filePath, data);
  }

  async search(courseId: string): Promise<Course> {
    const courseData = await fs.promises.readFile(this.filePath(courseId))
    const { id, name, duration } = BSON.deserialize(courseData);
    const _course: Course = {
      id,
      name,
      duration
    }
    return new Course(_course)
  }

  private filePath(id: string): string {
    return `${this.FILE_PATH}.${id}.repo`;
  }
}
