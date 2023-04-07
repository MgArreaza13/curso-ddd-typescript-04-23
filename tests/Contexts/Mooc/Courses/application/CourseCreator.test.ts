import { CourseCreator } from '../../../../../src/Contexts/Mooc/Courses/application/CourseCreator';
import { Course } from '../../../../../src/Contexts/Mooc/Courses/domain/Course';
import { CourseDuration } from '../../../../../src/Contexts/Mooc/Courses/domain/CourseDuration';
import { CourseName } from '../../../../../src/Contexts/Mooc/Courses/domain/CourseName';
import { Uuid } from '../../../../../src/Contexts/Shared/domain/value-object/Uuid';
import { CourseRepositoryMock } from '../__mocks__/CourseRepositoryMock';

let repository: CourseRepositoryMock;
let creator: CourseCreator;

beforeEach(() => {
  repository = new CourseRepositoryMock();
  creator = new CourseCreator(repository);
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
    const name = 'some-name'.repeat(30);
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
      'The Course Name <some-namesome-namesome-namesome-namesome-namesome-namesome-namesome-namesome-namesome-namesome-namesome-namesome-namesome-namesome-namesome-namesome-namesome-namesome-namesome-namesome-namesome-namesome-namesome-namesome-namesome-namesome-namesome-namesome-namesome-name> has more than 30 characters'
    );
  });
});
