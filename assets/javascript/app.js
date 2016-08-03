

//QUESTION BANK WITH ASSOCIATED FILES
var york = new Audio('york.mp3');

var questBank = [
  {
    question: "The iconic mask this movie's villian wears was actually a Captain Kirk mask painted white",
    ansPoss: ['The Fog', 'Prince of Darkness', 'Halloween', 'The Thing', 'Vampires'],
    answer: 2,
    image: 'assets/images/halloween.gif',
    wrongImage: 'assets/images/hallowrong.gif',
  },

  {
    question: "The model city used in which movie was later re-used in Blade Runner?",
    ansPoss: ['Big Trouble In Little China', 'Assault On Precinct 13', 'Escape From New York', 'Escape from L.A.'],
    answer: 2,
    image: 'assets/images/newyork.gif',
    wrongImage: 'assets/images/yorkwrong.gif',
  },

  {
    question: "Which one of these films was originally conceived as a period Western?",
    ansPoss: ['Big Trouble In Little China', 'Assault On Precinct 13', 'Christine', 'The Thing'],
    answer: 0,
    image: 'assets/images/china.gif',
    wrongImage: 'assets/images/chinawrong.gif',
  },

  {
    question: "This film is based on the sci-fi novella 'Who Goes There?'",
    ansPoss: ['Dark Star','In the Mouth Of Madness', 'The Thing', 'Ghosts of Mars'],
    answer: 2,
    image: "assets/images/thing.gif",
    wrongImage: 'assets/images/thething.gif',
  },

  {
    question:"The script for this film was chosen over E.T. by Columbia Pictures",
    ansPoss: ['Dark Star', 'Halloween', 'Ghosts of Mars', 'Starman'],
    answer: 3,
    image: 'assets/images/starmanwr.gif',
    wrongImage: 'assets/images/starman.gif',
  },

  {
    question:"Based on a Stephen King novel, this movie features a haunted, jealous car",
    ansPoss: ['Elvis', 'Escape From L.A.', 'Vampires', 'Christine', 'The Ward'],
    answer: 3,
    image: 'assets/images/christine.gif',
    wrongImage: 'assets/images/christinewr.gif',
  },

  {
    question:"Which film features a cameo by rocker Alice Cooper?",
    ansPoss: ['In the Mouth of Madness', 'They Live', 'The Fog', 'The Ward', 'Prince of Darkness'],
    answer: 4,
    image: "assets/images/prince.gif",
    wrongImage: 'assets/images/darkness.gif',
  },

  {
    question:"The epic fight scene from this film took four weeks to rehearse",
    ansPoss: ['In the Mouth of Madness', 'They Live', 'The Fog', 'The Ward', 'Prince of Darkness'],
    answer: 1,
    image: "assets/images/they.gif",
    wrongImage: 'assets/images/live.gif',
  }
]

//VARIABLES FOR KEEPING SCORE/QUESTIONS
$(document).ready(function() {
	var correctAns = 0;
  var wrongAns = 0;
  var Unanswered = 0;
  var counter = 16;
	var selection = false;

  $('#startButton').on('click', function() {
    showQuestion(0);
    york.play().loop=false;
  });


//GAME FUNCTION. QUESTION ANSWER MATCHES CORRECT ARRAY CHOICE IN QUESTION BANK.
//LOOPS THROUGH BANK UNTIL QUESTION MATCHES ARRAY LENGTH.
function showQuestion(questionNum) {
  if (questionNum === questBank.length) {
    score();
} else {
	counter = 16;
 	var question = questBank[questionNum];
 	selection = false;
	var countDown = setInterval(function() {
 		counter--;
 		$('#time').html('TIME');
 		$('#jumbotron').css("margin-top", "0px");
 		$('#timer').html(+counter);
 		$('#title').empty();
    $('#title2').empty();
 		$('#announce').empty();
 		$('#1').remove();
    $('#2').remove();
    $('#fatty').remove();
 		$('#mainEvent').html("<div class='question'>"+question.question+"</div>")
    for (var i = 0; i < question.ansPoss.length; i++) {
 			$('#mainEvent').append("<div class='ansPoss' data-val='"+i+"'>"+question.ansPoss[i]+"</button>"+"</div>");
    }
	if (selection === false) {
		$('.ansPoss').on('click', function() {
			selection === true;
			clearInterval(countDown);
			if ($(this).data('val') === question.answer) {
				rightAnswer(questionNum, question);
				correctAns = correctAns + 1;
			} else {
        wrongAnswer(questionNum, question);
				wrongAns = wrongAns + 1;
			}
		});
	}
	if (selection !== false) {
		$('.ansPoss').on('click', function() {

      	})
	}
	if (counter === 0) {
		clearInterval(countDown);
    outofTime(questionNum,question)
    Unanswered += 1;
      }
  }, 1000);
}
}

function rightAnswer(questionNum, question) {
	$('#announce').html("<div class='correctAns'>" + "Correct!" + "</div>");
	$('#mainEvent').html("<div class='question'>" + "</div>" + "<img src='" + question.image + "'></div>");
  setTimeout(function() {
    showQuestion(questionNum + 1);
	}, 1700);
}

function wrongAnswer(questionNum, question) {
	$('#announce').html("<div class='wrongAns'>" + "Wrong!" + "</div>");
	$('#mainEvent').html("<div class='question'>" + "</div>" + "<div class='question'>" + "&nbsp;" + question.ansPoss[question.answer] + "</div>" + "<img src='" + question.wrongImage + "'>");
  setTimeout(function() {				     	        	    
     showQuestion(questionNum + 1);
 },1500);
}

function outofTime(questionNum, question) {
	$('#announce').html("<div class='outtaTime'>" + "No Time Remains!" + "</div>");
	$('#mainEvent').html("<div class='question'>" + "The correct answer is &nbsp;" + question.ansPoss[question.answer] + "</div>" + "<img src='" + question.wrongImage + "'>");
  setTimeout(function() {
    	showQuestion(questionNum + 1);
    },1700);
}

function score() {
	$('#mainEvent').html(
 	"<div class='question'>" + "RESULTS" + "</div>" + "<div class='question'>" + "Correct: &nbsp;" + correctAns + "</div>"
 	+ "<div class='question'>" + "Incorrect: &nbsp;" + wrongAns + "</div>"+ "<div class='question'>" + "Too Slow To Answer: &nbsp;" + Unanswered + "</div>"
 	+ "<button type='button' class='restart'>Again?</button>");
}

$('#mainEvent').on('click','.restart', function() {
	restart();
});

function restart() {
	var counter = 16;
	var selection = false;
	var correctAns = 0;
	var wrongAns = 0;
	var Unanswered = 0;
  york.load();
	showQuestion(0);
  york.play().loop=false;
}
})

$('#pause').on('click', function() {
  $(this).find('#vol').toggleClass('glyphicon-volume-up').toggleClass('glyphicon-volume-off');
  york.volume = 0;
});



