


//QUESTION BANK WITH ASSOCIATED FILES
var york = new Audio('york.mp3');

var questBank = [
  {
    question: "The iconic mask this movie's villian wears was actually a Captain Kirk mask painted white.",
    choices: ['The Fog', 'Prince of Darkness', 'Halloween', 'The Thing', 'Vampires'],
    answer: 2,
    image: 'assets/images/halloween.gif',
    wrongImage: 'assets/images/hallowrong.gif',
  },

  {
    question: "The model city used in this movie was later re-used in Blade Runner?",
    choices: ['Big Trouble In Little China', 'Assault On Precinct 13', 'Escape From New York', 'Escape from L.A.'],
    answer: 2,
    image: 'assets/images/newyork.gif',
    wrongImage: 'assets/images/yorkwrong.gif',
  },

  {
    question: "Which one of these films was originally conceived as a period Western?",
    choices: ['Big Trouble In Little China', 'Assault On Precinct 13', 'Christine', 'The Thing'],
    answer: 0,
    image: 'assets/images/china.gif',
    wrongImage: 'assets/images/chinawrong.gif',
  },

  {
    question: "This film is based on the sci-fi novel 'Who Goes There?'",
    choices: ['Dark Star','In the Mouth Of Madness', 'The Thing', 'Ghosts of Mars'],
    answer: 2,
    image: "assets/images/thing.gif",
    wrongImage: 'assets/images/thething.gif',
  },

  {
    question:"The script for this film was chosen over E.T. by Columbia Pictures",
    choices: ['Dark Star', 'Halloween', 'Ghosts of Mars', 'Starman'],
    answer: 3,
    image: 'assets/images/starmanwr.gif',
    wrongImage: 'assets/images/starman.gif',
  },

  {
    question:"Based on a Stephen King novel, this movie features a jealous, haunted car",
    choices: ['Elvis', 'Escape From L.A.', 'Vampires', 'Christine', 'The Ward'],
    answer: 3,
    image: 'assets/images/christine.gif',
    wrongImage: 'assets/images/christinewr.gif',
  },

  {
    question:"This film features a cameo by rocker Alice Cooper",
    choices: ['In the Mouth of Madness', 'They Live', 'The Fog', 'The Ward', 'Prince of Darkness'],
    answer: 4,
    image: "assets/images/prince.gif",
    wrongImage: 'assets/images/darkness.gif',
  },

  {
    question:"The epic, iconic fight scene from this film took four weeks to rehearse",
    choices: ['In the Mouth of Madness', 'They Live', 'The Fog', 'The Ward', 'Prince of Darkness'],
    answer: 1,
    image: "assets/images/they.gif",
    wrongImage: 'assets/images/live.gif',
  }
]

//VARIABLES FOR KEEPING SCORE/QUESTIONS
$(document).ready(function() {
	var counter = 16;
	var selection = false;
	var correctA = 0;
	var incorrectA = 0;
	var Unanswered = 0;

 $('#startButton').on('click', function() {
        showQuestion(0);
        york.play().loop=false;
    });


//GAME FUNCTION. QUESTION ANSWER MATCHES CORRECT ARRAY CHOICE IN QUESTION BANK. LOOPS THROUGH BANK
//UNTIL QUESTION MATCHES ARRAY LENGTH. 
function showQuestion(questionId) {
	if (questionId === questBank.length) {
		score();
} else {
	counter = 16;
 	var question = questBank[questionId];
 	selection = false;
	var countDown = setInterval(function() {
 		counter--;
 		$('#time').html('TIME');
 		$('#jumbotron').css("margin-top", "0px");
 		$('#timer').html(+counter);
 		$('#title').empty();
 		$('#announce').empty();
 		$('#1').remove();
    $('#2').remove();
    $('#fatty').remove();
 		$('#mainEvent').html("<div class='question'>"+question.question+"</div>")
 		for (var i = 0; i < question.choices.length; i++) {
 			$('#mainEvent').append(
			"<div class='choices' data-val='"+i+"'>"+question.choices[i]+"</button>"+"</div>");
	}
	if (selection === false) {
		$('.choices').on('click', function() {
			selection === true;
			clearInterval(countDown);
			if ($(this).data('val') === question.answer) {
				rightAnswer(questionId, question);
				correctA = correctA + 1;
			} else {
				wrongAnswer(questionId, question);
				incorrectA = incorrectA + 1;
			}
		});
	}
	if (selection !== false) {
		$('.choices').on('click', function() {

      	})
	}
	if (counter === 0) {
		clearInterval(countDown);
      	outofTime(questionId,question)
      	Unanswered += 1;
      }
  }, 1000);
}
}

function rightAnswer(questionId, question) {
	$('#announce').html(
	"<div class='correctAns'>" + "Correct!" + "</div>")
	$('#mainEvent').html(
	"<div class='question'>" + "</div>" + "<img src='" + question.image + "'></div>")
	setTimeout(function() {
		showQuestion(questionId + 1)
	}, 1700);
}

function wrongAnswer(questionId, question) {
	$('#announce').html(
	"<div class='wrongAns'>" + "Wrong!" + "</div>")
	$('#mainEvent').html(
	"<div class='question'>" + "</div>" + "<div class='question'>" + "&nbsp;" + question.choices[question.answer] + "</div>" + "<img src='" + question.wrongImage + "'>")
     setTimeout(function() {				     	        	    
     showQuestion(questionId + 1);
 },1500);
}

function outofTime(questionId, question) {
	$('#announce').html(
	"<div class='correctAns'>" + "Outta Time!" + "</div>")
	$('#mainEvent').html("<div class='question'>" + "The correct answer is &nbsp;"+question.choices[question.answer] + "</div>" + "<img src='" + question.wrongImage + "'>")
    setTimeout(function() {
    	showQuestion(questionId + 1);
    },2500);
}

function score() {
	$('#mainEvent').html(
 	"<div class='question'>" + "RESULTS" + "</div>" + "<div class='question'>" + "Correct: &nbsp;" + correctA + "</div>"
 	+ "<div class='question'>" + "Incorrect: &nbsp;" + incorrectA + "</div>"+ "<div class='question'>" + "Too Slow to Answer: &nbsp;" + Unanswered + "</div>"
 	+ "<button type='button' class='restart'>Again?</button>")
}

$('#mainEvent').on('click','.restart', function() {
	restart();
});
function restart() {
	var counter = 16;
	var selection = false;
	var correctA = 0;
	var incorrectA = 0;
	var Unanswered = 0;
  york.load();
	showQuestion(0);
}
})

$('#pause').on('click', function() {
  york.volume = 0;
});



