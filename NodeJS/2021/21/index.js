const trackSpaces = 10;
const deterministicDieSize = 100;
const winningScore = 1000;

export const firstChallenge = (input) => {
	let [player1, player2] = determineStartingPositions(input);
	let die = newDie();

	while (true) {
		// Player 1: roll three times
		movePlayer(player1, die);
		movePlayer(player1, die);
		movePlayer(player1, die);
		player1.score += player1.position;
		if (player1.score >= winningScore) {
			// Player 1 wins!
			console.log(
				`PLayer 1 wins. Loser score: ${player2.score}, rolls: ${die.rolls}`
			);
			return player2.score * die.rolls;
		}

		// Player 2: roll three times
		movePlayer(player2, die);
		movePlayer(player2, die);
		movePlayer(player2, die);
		player2.score += player2.position;
		if (player2.score >= winningScore) {
			// Player 2 wins!
			console.log(
				`Player 2 wins. Loser score: ${player1.score}, rolls: ${die.rolls}`
			);
			return player1.score * die.rolls;
		}
	}
	// Shouldn't get here
	return 0;
};

export const secondChallenge = (input) => {};

export const determineStartingPositions = (input) => {
	let players = [];
	let score = 0;
	for (let l in input) {
		let position = parseInt(input[l].split(": ")[1]);
		players.push({ position, score });
	}
	return players;
};

export const newDie = () => {
    return {
        rolls: 0,
        currentPosition: deterministicDieSize,
        sides: deterministicDieSize,
        roll: function() {
            this.rolls++;
            this.currentPosition++;
            // If the roll goes past the dice size, roll back around to 1
            if (this.currentPosition > this.sides) {
                this.currentPosition = (this.currentPosition % this.sides);
            }
            return this.currentPosition;
        }
    }
}


export const movePlayer = (player, die) => {
    player.position += die.roll();
    if (player.position > trackSpaces) {
        // If the roll is big and the player "lands" on a position that evenly divides by 10 (like 90), modulu returns 0 but they should be on spot 10
        player.position = player.position % trackSpaces;
        if (player.position == 0) {
            player.position = trackSpaces;
        }
    }
};