import { Course } from "../../../../../../src/Contexts/Mooc/Courses/domain/Course"
import { CourseDuration } from "../../../../../../src/Contexts/Mooc/Courses/domain/CourseDuration"
import { CourseName } from "../../../../../../src/Contexts/Mooc/Courses/domain/CourseName"
import { FileCourseRepository } from "../../../../../../src/Contexts/Mooc/Courses/infrastructure/persistence/FileCourseRepository"
import { Uuid } from "../../../../../../src/Contexts/Shared/domain/value-object/Uuid"

describe('FileCourseRepository', () => {
  it('should save a course', async () => {
    const _course: Course = {
      id: new Uuid("62a3ae0c-897d-4360-9cbb-94ba9c847978"),
      name: new CourseName("name"),
      duration: new CourseDuration("duracion")
    }
    const course = new Course(_course)
    const repository = new FileCourseRepository()

    await repository.save(course);

    const expectedCourse = await repository.search(course.id);
    expect(course).toEqual(expectedCourse)
  })
})
