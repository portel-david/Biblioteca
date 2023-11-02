
import { Router }  from 'express';
import { libro } from './controller.js';

export const router = Router()

/*rutas*/
router.get('/libros',libro.getAll);

router.get('/libros/:id',libro.getOne);

router.post('/libros',libro.agregar);
router.delete('/libros',libro.eliminar);
router.put('/libros',libro.actualizar);
router.put('/libros/Baja',libro.Baja);
router.put('/libros/Alta',libro.Alta);