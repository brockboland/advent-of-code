import { readFileSync } from "fs";

export const fileContents = (filename) => {    
    return readFileSync(filename).toString("utf-8").split("\n");
}