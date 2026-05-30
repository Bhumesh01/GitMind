import { Router } from "express";
import { simpleGit } from "simple-git";
import type { SimpleGit } from "simple-git";

export const repoRouter = Router();

repoRouter.post("/", async (req, res) => {
    const { repoUrl } = req.body;

    if (!repoUrl) {
        return res.status(400).json({
            message: "Invalid repo URL",
        });
    }

    const git: SimpleGit = simpleGit();

    const repoPath = `./temp/${Date.now()}`;

    try {
        await git.clone(repoUrl, repoPath, ["--depth", "1"]);

        return res.status(200).json({
            message: "Repository cloned successfully",
            path: repoPath,
        });

    } catch (err) {
        console.error(err);

        return res.status(500).json({
            message: "Failed to clone repository",
        });
    }
});
