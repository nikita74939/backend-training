import { Request, Response, NextFunction } from "express";
import { SLogin, SCreateAdmin, SUpdateAdmin, SDeleteAdmin } from "../services/auth.service";

export const CLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { username, password } = req.body;
    const result = await SLogin(username, password);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const CCreateAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const result = await SCreateAdmin(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const CUpdateAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);
    const result = await SUpdateAdmin(id, req.body);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const CDeleteAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);
    const result = await SDeleteAdmin(id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
