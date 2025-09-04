import { Router } from 'express';
import { listProperties, getAvailability } from '../controllers/propertyController';


const router = Router();

router.get('/', listProperties);
router.get('/:id/availability', getAvailability);

export default router;
