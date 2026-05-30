import {readFile} from 'node:fs/promises'; 
import fs from "fs";
import { summarizeReadme, summarizeTechStack } from './summarize.js';
import pathModule from "path";

export type fileType = {
    filename: string,
    content: string
};

export async function readFilesAndSummarize(path:string){
    try{
        let readmeRes, techStackRes;
        // 1. get Readme
        const possibleReadmes = [
            "README.md",
            "README.MD",
            "readme.md",
            "Readme.md"
        ];
        
        const readmePath = possibleReadmes
            .map(file => pathModule.join(path, file))
            .find(file => fs.existsSync(file));
        
        if (!readmePath) {
            readmeRes= "Readme not found";
        }
        else {
            const data = await readFile(readmePath, 'utf8', );
            readmeRes = await summarizeReadme(data);
        }
        // 2. determine tech stack and get data
        const importantFiles  = [
            "package.json",
            "requirements.txt",
            "pyproject.toml",
            "pom.xml",
            "build.gradle",
            "Cargo.toml",
            "go.mod",
            "Dockerfile",
            "docker-compose.yml"
        ] 
        const importantFilesPath = importantFiles.map(file=>pathModule.join(path, file)).filter(file=>fs.existsSync(file));
        let importantFilesData: fileType[] = [];
        for(const filePath of importantFilesPath){
            const content = await readFile(filePath, 'utf-8');
            importantFilesData.push({
                filename: pathModule.basename(filePath),
                content: content
            });
        }
        if(importantFilesData.length>0){
            techStackRes = await summarizeTechStack(importantFilesData);
        }
        else{
            techStackRes = "No file found"
        }
        return {
            summary: readmeRes,
            techStack: techStackRes
        }
    }
    catch(err){
        console.error('Error reading file:', err);
    }
}