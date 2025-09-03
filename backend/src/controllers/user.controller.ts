import { Request, Response } from "express";
import { UserService } from "../services/user.service";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const user = await UserService.createUser(req.body);
    res.status(201).json(user);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const user = await UserService.loginUser(req.body);
    res.status(200).json(user);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};
