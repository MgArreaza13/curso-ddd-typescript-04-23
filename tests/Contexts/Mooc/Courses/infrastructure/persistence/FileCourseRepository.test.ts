import { FileCourseRepository } from "../../../../../../src/Contexts/Mooc/Courses/infrastructure/persistence/FileCourseRepository"
import { CreateCourseCommandMother } from "../../application/create/CreateCourseCommandMother"
import { CourseMother } from "../../domain/CourseMother"

describe('FileCourseRepository', () => {
  it('should save a course', async () => {
    expect(async () => {
      const request = CreateCourseCommandMother.random()

      const course = CourseMother.from(request)

      const repository = new FileCourseRepository()

      await repository.save(course);

      const expectedCourse = await repository.search(course.id);
      expect(course).toEqual(expectedCourse)
    }).rejects.toThrow()
  })
})
