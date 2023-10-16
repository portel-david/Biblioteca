
import { Router }  from 'express';
import { libro } from './controller.js';

export const router = Router()

router.get('/libros',libro.getAll);
router.get('/consulta',libro.getOne);