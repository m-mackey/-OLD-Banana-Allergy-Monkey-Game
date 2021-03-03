/*eslint-env jquery*/
'use strict';
$(document).ready(function() {
	let fruits = [
		'banana',
		'safe',
		'milk',
		'banana',
		'safe',
		'milk',
		'banana',
		'safe',
		'milk',
		'banana',
		'safe',
		'milk',
		'safe',
		'banana',
		'safe',
		'safe'
	];

	function shuffle(arr) {
		let buffer = [];
		let	start;

		for (let i = arr.length; i >= arr.length && i > 0; i--) {
			start = Math.floor(Math.random() * arr.length);
			buffer.push(arr.splice(start, 1)[0]);
		}

		let deck = buffer.length;
		let text = '<div class="playarea">';

		for (let i = 0; i < deck; i++) {
			text +=
				'<button class="cardtop" tabindex="0"><img  class="card" src="images/' +
				buffer[i] +
				'.svg" alt="' + buffer[i] + '"></button>';
		}

		text += '</div>';
		document.getElementById('table').insertAdjacentHTML('beforeend', text);
	}

	shuffle(fruits);

	//sets initial score/lives for game start & the scoring function below
	let totalScore = 0;
	let lives = 3;
	$('#lives').html('Lives: ' + lives);

	$('.cardtop').click(function() {
		$('.cardtop', this).fadeTo(400, 0);
		$('.card', this).fadeTo(400, 1);
		$(this).attr('tabindex', -1); //removes card from tabindex so it's skipped when using keyboard
		
		//scoring rules
		switch ($('.card', this).attr('src')) {
		case 'images/safe.svg':
			totalScore = Number(totalScore) + 100;
			$('#total').html('Score: ' + totalScore);
			$(this).off('click');
			break;
		case 'images/banana.svg':
			totalScore = Number(totalScore) - 200;
			$('#total').html('Score: ' + totalScore);
			lives = Number(lives) - 1;
			$('#lives').html('Lives: ' + lives);
			$(this).off('click');
			break;
		case 'images/milk.svg':
			totalScore = Number(totalScore) + 300;
			$('#total').html('Score: ' + totalScore);
			$(this).off('click');
			break;
		}

		livesCheck();
	});

	function livesCheck (){
	//check to see if lives remaining are 0 and if to end and restart game
		if (lives <= 0) {
			$('.cardtop').off('click');
			$('#table').fadeOut(1500, function() {
				$('#gameover')
					.fadeIn(1500)
					.html('<p class="goText">Game Over</p>');
				document
					.getElementById('gameover')
					.insertAdjacentHTML(
						'beforeend',
						'<button id="restart">New Game</button>'
					);
				$('#restart').click(function() {
					window.location.reload();
				});
			});
		};
	};
	
	$('#total').html('Score: ' + totalScore);

});

