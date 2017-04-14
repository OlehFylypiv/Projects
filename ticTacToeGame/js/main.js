$(document).ready(function() {
		/* By default player turn X */
	let turn = "X";
		/* Array stores values that we will check later for a winer */
	let turns = ["#", "#", "#", "#", "#", "#", "#", "#", "#"];
		/* Default computer turn */
	let computerTurn = "O";
		/* Keeps track if it is the computer's turn */
	let gameOn = false;
		/* Keeps track of computer turn */
	let count = 0;

	$("#turnX").click(function() {
		turn = "0";
		computerTurn = "X";
		$("#turnX").removeClass("btn-primary");
		$("#turnO").addClass("btn-primary");
		reset();
	});

	$("#turnO").click(function() {
		turn = "X";
		computerTurn = "O";
		$("#turnO").removeClass("btn-primary");
		$("#turnX").addClass("btn-primary");
		reset();
	});

	function computersTurn() {
		let taken = false;
		while (taken === false && count !== 5) {
			/* Generate computer's random turn */
			let computersMove = (Math.random()*10).toFixed();
			let move = $("#" + computersMove).text();
			if (move === "#") {
				$("#" + computersMove).text(computerTurn);
				taken = true;
				turns[computersMove] = computerTurn;
			}
		}
	}

	function payerTurn(turn, id) {
		let spotTaken = $("#" + id).text();
		if (spotTaken === "#") {
			count++;
			turns[id] = turn;
			$("#" + id).text(turn);
			winCondition(turns, turn);
			if (gameOn === false) {
				computersTurn();
				winCondition(turns, computerTurn);
			}
		} 
	}

	function winCondition(turnArray, curentTurn) {
		if (turnArray[0] === curentTurn && turnArray[1] === curentTurn && turnArray[2] === curentTurn) {
			gameOn = true;
			reset();
			alert("Player " + curentTurn + " win!");
		}
		else if (turnArray[2] === curentTurn && turnArray[4] === curentTurn && turnArray[6] === curentTurn) {
			gameOn = true;
			reset();
			alert("Player " + curentTurn + " win!");
		}
		else if (turnArray[0] === curentTurn && turnArray[3] === curentTurn && turnArray[6] === curentTurn) {
			gameOn = true;
			reset();
			alert("Player " + curentTurn + " win!");
		}
		else if (turnArray[0] === curentTurn && turnArray[4] === curentTurn && turnArray[8] === curentTurn) {
			gameOn = true;
			reset();
			alert("Player " + curentTurn + " win!");
		}
		else if (turnArray[1] === curentTurn && turnArray[4] === curentTurn && turnArray[7] === curentTurn) {
			gameOn = true;
			reset();
			alert("Player " + curentTurn + " win!");
		}
		else if (turnArray[2] === curentTurn && turnArray[5] === curentTurn && turnArray[8] === curentTurn) {
			gameOn = true;
			reset();
			alert("Player " + curentTurn + " win!");
		}
		else if (turnArray[6] === curentTurn && turnArray[7] === curentTurn && turnArray[8] === curentTurn) {
			gameOn = true;
			reset();
			alert("Player " + curentTurn + " win!");
		}
		else if (turnArray[3] === curentTurn && turnArray[4] === curentTurn && turnArray[5] === curentTurn) {
			gameOn = true;
			reset();
			alert("Player " + curentTurn + " win!");
		}
		else {
			gameOn = false;
		}
	}

	$(".tic").click(function() {
		let slot = $(this).attr("id");
		payerTurn(turn, slot);
	});

	function reset() {
		turns = ["#", "#", "#", "#", "#", "#", "#", "#", "#"];
		count = 0;
		$(".tic").text("#");
		gameOn = true;
	}
});