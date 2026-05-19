import { Router } from "express";
import {repoRouter} from "./analyzeRepo.js";

export const router = Router();
router.use("/repo", repoRouter);