import { fileContents } from "advent-of-code-2021-a1329730-utils";
import {
	firstChallenge,
	secondChallenge,
	determineStartingPositions,
	newDie,
  movePlayer,
} from "../index";

// describe("Input parsing", () => {
//   test("Mock input start", () => {
//     let players = determineStartingPositions(mockInput);
//     expect(players[0].position).toEqual(4);
//     expect(players[1].position).toEqual(8);
//     expect(players[0].score).toEqual(0);
//     expect(players[1].score).toEqual(0);
//   });
// });

// describe("Die handling", () => {
//   test("Basic rolls", () => {
//     let die = newDie();
//     expect(die.rolls).toEqual(0);

//     let rollValue = die.roll();
//     expect(rollValue).toEqual(1);
//     expect(die.rolls).toEqual(1);

//     let rollValue2 = die.roll();
//     expect(rollValue2).toEqual(2);
//     expect(die.rolls).toEqual(2);
//   });

//   test("100 Rolls", () => {
//     let die = newDie();
//     for(let i = 0; i < 100; i++) {
//       die.roll();
//     }
//     expect(die.rolls).toEqual(100);
//     expect(die.currentPosition).toEqual(100);
//   });

//   test("101 Rolls", () => {
//     let die = newDie();
//     for(let i = 0; i < 101; i++) {
//       die.roll();
//     }
//     expect(die.rolls).toEqual(101);
//     expect(die.currentPosition).toEqual(1);
//   });

//   test("120 Rolls", () => {
//     let die = newDie();
//     for(let i = 0; i < 120; i++) {
//       die.roll();
//     }
//     expect(die.rolls).toEqual(120);
//     expect(die.currentPosition).toEqual(20);
//   });

//   test("Rolls over 200", () => {
//     let die = newDie();
//     for(let i = 0; i < 275; i++) {
//       die.roll();
//     }
//     expect(die.rolls).toEqual(275);
//     expect(die.currentPosition).toEqual(75);
//   });
// });

describe("Player moving", () => {
	test("Simple move", () => {
		let die = newDie();
		let player = { position: 1, score: 0 };
    movePlayer(player, die);
    expect(player.position).toEqual(2);
    expect(die.currentPosition).toEqual(1);

    die.currentPosition=3;
    movePlayer(player, die);
    expect(player.position).toEqual(6);
    expect(die.currentPosition).toEqual(4);
	});

  test("Rollover move", () => {
		let die = newDie();
		let player = { position: 1, score: 0 };
    die.currentPosition = 23;

    movePlayer(player, die);
    expect(player.position).toEqual(5);
    expect(die.currentPosition).toEqual(24);
	});

  test("Big move", () => {
		let die = newDie();
		let player = { position: 6, score: 0 };
    die.currentPosition = 98;

    movePlayer(player, die);
    expect(player.position).toEqual(5);
    expect(die.currentPosition).toEqual(99);
	});

  test("Move to 10", () => {
		let die = newDie();
		let player = { position: 6, score: 0 };
    die.currentPosition = 3;
    movePlayer(player, die);
    expect(player.position).toEqual(10);
	});

  test("Move to 1", () => {
		let die = newDie();
		let player = { position: 6, score: 0 };
    die.currentPosition = 4;
    movePlayer(player, die);
    expect(player.position).toEqual(1);
	});

  test("Move to 10 with big roll", () => {
		let die = newDie();
		let player = { position: 6, score: 0 };
    die.currentPosition = 93;
    movePlayer(player, die);
    expect(player.position).toEqual(10);
	});

  test("Move to 1 with big roll", () => {
		let die = newDie();
		let player = { position: 6, score: 0 };
    die.currentPosition = 84;
    movePlayer(player, die);
    expect(player.position).toEqual(1);
	});
});

describe("Part 1", () => {
	test("Sample input", () => {
		let result = firstChallenge(mockInput);
		expect(result).toEqual(739785);
	});

	test("Real problem input", () => {
	  let input = fileContents(realInputPath());
	  let result = firstChallenge(input);
	  expect(result).toEqual(908091);
	});
});

// describe("Part 2", () => {
//   test("Sample input", () => {
//     let result = secondChallenge(mockInput);
//     expect(result).toEqual(739785); // TODO: put real value here
//   })

//   test("Real problem input", () => {
//     let input = fileContents(realInputPath());
//     let result = secondChallenge(input);
//     // expect(result).toEqual(4775);
//   });
// });

const mockFilePath = (filename) => {
	return `${__dirname}/${filename}`;
};

const realInputPath = () => {
	return `${__dirname}/puzzleInput.txt`;
};

const mockInput = fileContents(mockFilePath("sampleInput.txt"));
