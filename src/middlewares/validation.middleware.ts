import { Request, Response, NextFunction } from "express";
import Joi, { ObjectSchema } from "joi";

export const validateRequest = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      return res.status(400).json({
        status: false,
        message: "Validation error",
        errors: error.details.map((d) => d.message),
      });
    }

    next();
  };
};

export const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

export const createAdminSchema = Joi.object({
  username: Joi.string().min(3).max(50).required(),
  password: Joi.string().min(6).required(),
  email: Joi.string().email().required(),
  name: Joi.string().min(3).max(255).required(),
});

export const updateAdminSchema = Joi.object({
  username: Joi.string().min(3).max(50),
  password: Joi.string().min(6),
  email: Joi.string().email(),
  name: Joi.string().min(3).max(255),
});
