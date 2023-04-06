import { Request, Response, Router } from 'express';

import { CoursePutController } from '../controllers/CoursePutController';
import container from '../dependency-injection';
import { body, param } from 'express-validator';
import { validateReqSchema } from '.';

export const register = (router: Router): void => {
  const reqSchema = [
    param('id').exists().isString(),
    body('name').exists().isString(),
    body('duration').exists().isString()
  ];

  const coursePutController = container.get<CoursePutController>('Apps.mooc.controllers.CoursePutController');
  router.put('/courses/:id', reqSchema, validateReqSchema, (req: Request, res: Response) =>
    coursePutController.run(req, res)
  );
};
