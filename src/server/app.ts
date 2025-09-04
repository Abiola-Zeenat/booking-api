import express from 'express';
import propertyRoutes from '../routes/propertyRoutes';
import bookingRoutes from '../routes/bookingRoutes';
import { errorHandler } from '../middlewares/error.middleware';

const app = express();
app.use(express.json());

app.get('/health', (_req, res) => res.json({ ok: true }));

app.use('/properties', propertyRoutes);
app.use('/bookings', bookingRoutes);

app.use(errorHandler);

export default app;
