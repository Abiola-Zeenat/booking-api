import { NextFunction, Request, Response } from 'express';
import { propertyService } from '../services/propertyService';


export async function listProperties(req: Request, res: Response, next: NextFunction) {
  try {
    const properties = await propertyService.getAll(req.query);
    return res.status(200).json({
        data:properties,
        status:"success",
        message:"Properties fetched successfully"  
    });
  } catch (err: any) {
   next(err);
  }
}

export async function getAvailability(req: Request, res: Response, next: NextFunction) {
  try {
    const {id} = req.params;
    const availability =await propertyService.getAvailability(Number(id));

    return res.status(200).json({
        data:availability,
        status: 'success',
        message: 'Property Availability fetched successfully'
    });
  } catch (err: any) {
    next(err);
  }
}
