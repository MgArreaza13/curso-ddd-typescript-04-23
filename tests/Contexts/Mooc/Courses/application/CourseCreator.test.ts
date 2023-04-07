import { CourseCreator } from '../../../../../src/Contexts/Mooc/Courses/application/CourseCreator';
import { Course } from '../../../../../src/Contexts/Mooc/Courses/domain/Course';
import { CourseDuration } from '../../../../../src/Contexts/Mooc/Courses/domain/CourseDuration';
import { CourseName } from '../../../../../src/Contexts/Mooc/Courses/domain/CourseName';
import { Uuid } from '../../../../../src/Contexts/Shared/domain/value-object/Uuid';
import { CourseRepositoryMock } from '../__mocks__/CourseRepositoryMock';
import { CourseMother } from '../domain/CourseMother';
import { CreateCourseCommandMother } from './create/CreateCourseCommandMother';

let repository: CourseRepositoryMock;
let creator: CourseCreator;
const errorMessage: string = "The Course Name <aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa> has more than 30 characters";

beforeEach(() => {
  repository = new CourseRepositoryMock();
  creator = new CourseCreator(repository);
  // TODO: Mejorar
});

describe('CourseCreator', () => {
  it('should create a valid course', async () => {
    const id = Uuid.random();
    const name = 'some-name';
    const duration = 'some-duration';

    const course = new Course({
      id,
      name: new CourseName(name),
      duration: new CourseDuration(duration)
    });

    await creator.run({ id: id.value, name, duration });

    repository.assertSaveHaveBeenCalledWith(course);
    repository.assertLastSavedCourseIs(course);
  });

  it('should throw error if course name length more than 30', async () => {
    const id = Uuid.random();
    const name = 'a'.repeat(30);
    const duration = 'some-duration';

    expect(async () => {
      const course = new Course({
        id,
        name: new CourseName(name),
        duration: new CourseDuration(duration)
      });

      await creator.run({ id: id.value, name, duration });

      repository.assertSaveHaveBeenCalledWith(course);
      repository.assertLastSavedCourseIs(course);
    }).rejects.toThrow(
      // CourseNameLengthExceeded
      errorMessage
    );
  });

  it('should create a valid course with CreateCourseRequestMother', async () => {
    const request = CreateCourseCommandMother.random()

    const course = CourseMother.from(request)

    await creator.run(request);

    repository.assertSaveHaveBeenCalledWith(course);
    repository.assertLastSavedCourseIs(course);
  });

  it('should throw error if course name length more than 30 with CreateCourseRequestMother', async () => {
    expect(async () => {
      const request = CreateCourseCommandMother.invalid()

      const course = CourseMother.from(request)

      await creator.run(request);

      repository.assertSaveHaveBeenCalledWith(course);
      repository.assertLastSavedCourseIs(course);
    }).rejects.toThrow(
      // CourseNameLengthExceeded
      errorMessage
    );
  });
});
