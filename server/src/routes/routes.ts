import { Router } from "express";
import {repoRouter} from "./repo_services/analyzeRepo.js";

export const router = Router();
router.use("/repo", repoRouter);