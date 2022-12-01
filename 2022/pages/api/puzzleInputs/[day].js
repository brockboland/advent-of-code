import path from "path";
import { promises as fs } from "fs";

export default async function handler(req, res) {
	const { day } = req.query;
	//Find the absolute path of the puzzleInputs directory
	const puzzleInputsDirectory = path.join(process.cwd(), "puzzleInputs");
	//Read the input data file
	var fileContents;
	try {
		fileContents = await fs.readFile(
			puzzleInputsDirectory + "/" + day + ".txt",
			"utf8"
		);
		//Return the content of the puzzle input file
		res.status(200).send(fileContents);
	} catch (err) {
		//Return the content of the puzzle input file
		res.status(404);
	}
}
