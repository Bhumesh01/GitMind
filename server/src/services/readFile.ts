import {readFile} from 'node:fs/promises'; 
import { summarizeContent } from './summarize.js';
export async function readReadme(path:string){
    try{
        const readmePath = path+"/README.md";
        const data = await readFile(readmePath, 'utf8', );
        return await summarizeContent(data);
    }
    catch(err){
        console.error('Error reading file:', err);
    }
}