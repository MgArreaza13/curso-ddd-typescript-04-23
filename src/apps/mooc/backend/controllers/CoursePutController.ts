import { Request, Response } from 'express';
import httpStatus from 'http-status';

import { Controller } from './Controller';
import { CourseCreator } from '../../../../Contexts/Mooc/Courses/application/CourseCreator';

export class CoursePutController implements Controller {
  constructor(private courseCreator: CourseCreator) {}

  async run(req: Request, res: Response): Promise<void> {
    const id: string = req.params.id;
    const name: string = req.body.name;
    const duration: string = req.body.duration;

    await this.courseCreator.run({id, name, duration});

    res.status(httpStatus.CREATED).send();

  }
}
