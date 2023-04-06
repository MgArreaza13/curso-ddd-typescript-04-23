import { Course } from "../../../../../../src/Contexts/Mooc/Courses/domain/Course"
import { FileCourseRepository } from "../../../../../../src/Contexts/Mooc/Courses/infrastructure/persistence/FileCourseRepository"

describe('FileCourseRepository', () => {
  it('should save a course', async () => {
    const _course: Course = {
      id: "id",
      name: "name",
      duration: "duracion"
    }
    const course = new Course(_course)
    const repository = new FileCourseRepository()

    await repository.save(course);

    const expectedCourse = await repository.search("id");
    expect(course).toEqual(expectedCourse)
  })
})
