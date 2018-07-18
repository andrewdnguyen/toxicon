/*  Document: quizQuestions.js
    Purpose: This is a javascript file, meant to serve various functions
    for the quiz.html webpage. This document ensures that the essential
    interactions within the buttons and responses from the user are
    collected to provide scores and reviews of their response.
*/

"use strict"; /*Forces variable declaration syntax to be included.*/

$(document).ready(() => {
    /*  This block of variables are declared and correspond to elements
        of quiz.html. This also sets various number variables for usage
        in later code within this file.*/
    let quizButton = $('.quizButton');
    let graph = $('#graph');
    let quizQuotes = $('.quoteNum');
    let topic = $('.topic');
    let quote = $('.quote');
    let number = 0;
    let counter = 0;
    let count = 1;
    let maxQuotes = 10;
        //let prevQuotes = $('#prevQ');
    let nextQuotes = $('.nextQ');
    let answer = $('.answer');
    let showResp = $('.showResp');
    let responses = $('#responses');

    /*  By default, the elements related to the quiz are hidden.
        This would include the quote number, quote topic, radio
        buttons for responses, and the "Next Quote" button to
        proceed to the next quote.*/
    graph.hide();
    topic.hide();
    // prevQuotes.hide();
    nextQuotes.hide();
    answer.hide();
    showResp.hide();
    responses.hide();
    responses.empty();

    /*  This block of code is part of the algorithm to generate the
        set of quotes from the backend within the database.js files.
        First,this code makes an empty array, randArray, puts
        integers in the array in ascending numerical order. Then,
        the array is sorted in a random fashion, using the function
        below called shuffle. The array generated would be used to
        call random, non-repeatable quotes.*/
    let randArray = [];
    for (let i = 1; i <= maxQuotes; i++) {randArray.push(i)}
    console.log(randArray);
    shuffle(randArray);
    console.log(randArray);
    function shuffle(array) {
        var currIndex = array.length, tempVal, randIndex;
        while (currIndex > 0){
            randIndex = Math.floor(Math.random() * currIndex);
            currIndex--;
            tempVal = array[currIndex];
            array[currIndex] = array[randIndex];
            array[randIndex] = tempVal;
        }
        return array;
    }

    /*  Once the user clicks on the button labeled "Click to start
        the quiz!", the number and counter variables in this file
        will reset to their values of 0. The counter div element
        will appear.*/
    quizButton.click( function(){
        toggleQuiz();
        if (quizButton.text() == 'Click to start the quiz!'){
            quizQuotes.show();
            $('.counter').hide();
            showResp.hide();
        } else if (quizButton.text() == 'Take the quiz again!'){
            console.log()(quizButton.text());
        } else {
            number = 0;
            counter = 0;
            count = 1;
            console.log('Quote Number: '+ randArray[number] + ' Order: ' + count);
            randQuote(randArray[number], count);
            nextQuotes.text('Next Quote');
            $('.counter').show();
        }
    });

    // Old, deprecated code for functionality of the previous quote.
    /*$('#prevQ').click(() => {
        if (number > 1){
            number--;
            quizQuotes.text('Quote #' + number);
            randQuote(number);
            console.log('Previous quote!');
        } else {
            console.log('No previous quote!');
        }
    });*/
    // Once any of the radio buttons is clicked, this enables the user to submit their response and move on to the next quote.

    /*  If a user selects a response, the "Next Quote" button toggles
        on, enabling the user to advance to the next quote. This is
        done to ensure that the user must answer the quote with one
        of the radio button choices before moving on in the quiz.*/
    $('input:radio').click( function(){
         $(".nextQ").prop("disabled",false);
    });

    /*  This event handler for clicking the "Next Quote" button does many things:
            - It triggers an event to have information about the quote,
              including user response and evaluation of response, to be
              recorded. All information about the responses would appear at the
              end of the quiz when the user answers all of the quotes.
            - It updates the next quote shown for the user to answer.
            - It resets the properties of the radio buttons and itself (the next
              Quote goes back to being disabled).
            - Once the quote number shown reaches specific points, the button
              text either changes by itself or the quote information gets hidden
              and there is a message showing how many quotes the user answered
              correctly. During that time, the user would be able to see the
              responses made.
    */
    $('.nextQ').click(() => {
        /*The button would first take all of the relevant quote elements,
          extract the text shown, and place them in the response section.
          This information for every quote would be viewed later.*/
        let responses = $('#responses');
        responses.append('<h2>' + $('.quoteNum').text() + '</h2>');
        responses.append('<p>' + $('.topic').text() + '</p>');
        responses.append('<p>' + $('.quote').text() + '</p>');
        let checked = $("input:checked").attr('id');
        responses.append(checked);

        /*This checks the value of the selected radio button. If the
          selected radio button is correct (represented with a boolean
          value of true), a message would be shown in the responses
          section that the choice was correct. Otherwise, a different
          message would be shown, saying that the choice was incorrect
          and that the other radio button is actually the correct choice. */
        if ($("input:checked").val() == 'true'){
            counter++;
            //console.log('Correct!');
            $('#responses').append(' - Correct!');
        } else {
            //console.log('Incorrect! Try again.');
            $('#responses').append(' - Incorrect!');
            if (checked == 'badmouth'){
                $('#responses').append(' This quote is considered banter.');
            } else {
                $('#responses').append(' This quote is considered badmouth.');
            }
        }
        $('#responses').append('<br><br>');

        /*This counter dynamically keeps track of how many responses the
          user would get right.*/
        $('.counter').text('Answers Correct: ' + counter + '/' + count);

        /*This code below is used for developing the quiz functionality
          and for testing purposes as well. This would display the
          corresponding numbers for the current question number (count)
          and the quote number extracted from the database.js file
          (randArray[number] being the randomized number in the array).*/
        number++;
        count++;
        if (count <= maxQuotes){
            console.log('Quote Number: '+ randArray[number] + ' Order: ' + count);
            randQuote(randArray[number], count);
            console.log('Next quote!');
            /*Once information about the last quote is shown, the text
              on the "Next Quote" button changes. */
            if (count == maxQuotes){
                nextQuotes.text('Finish quiz.');
            }
        } else {
        /*Otherwise, once the user submits a choice for the last quote
          quote content becomes cleared up and the user is able to see
          the final score of the quotes answered correctly. This would
          allow the "Show Responses" button to appear.*/
            console.log('Finished quiz.');
            quizQuotes.hide();
            topic.hide();
            quote.hide();
            //prevQuotes.hide();
            nextQuotes.hide();
            answer.hide();
            showResp.show();
            $('.counter').text('You have finished the quiz! You answered ' + counter + ' quotes correctly!');
            quizButton.text('Take the quiz again!');
            let percentage = (counter/10)*100 + '%'
            responses.prepend('<p> You got ' + percentage + ' correct guesses compared to the average of 80% correct.</p>');
            console.log('You have finished the quiz! You answered ' + counter + ' quotes correctly!');
            number = 0;
            counter = 0;
            count = 1;
        }
        /*This would reset the settings of the radio buttons and the
          "Next Quote" button each time the "Next Quote" button is
          clicked on.*/
        $('input:radio').prop("checked",false);
        $('.nextQ').prop("disabled", true);
    });

    /* This enables the user to toggle the visibility of the
       recorded responses.*/
    $('.showResp').click(() => {
        responses.toggle();
        graph.toggle();
        showResp.text(showResp.text() == 'Show Responses' ? 'Hide Responses' : 'Show Responses');
    });
});

/*This would change the text of the "Click to start the quiz" button.
  This would show the quote information if clicked and that button's
  text is changed to "Quit quiz and hide quotes.". If the text is
  "Quit quiz and hide quotes.", the quote information would disappear.*/
function toggleQuiz(){
    let quizButton = $('.quizButton');
    let quizQuotes = $('.quoteNum');
    let topic = $('.topic');
    let quote = $('.quote');
    let number = 0;
    let counter = 0;
    let count = 1;
    //let prevQuotes = $('#prevQ');
    let nextQuotes = $('.nextQ');
    let answer = $('.answer');
    let counterShown = $('.counter');
    let showResp = $('.showResp');
    let responses = $('#responses');
    quizButton.text(quizButton.text() == 'Click to start the quiz!' ? 'Quit quiz and hide quotes.' : 'Click to start the quiz!');
    if (quizButton.text() != 'Quit quiz and hide quotes.') {
        quizQuotes.empty();
        topic.hide();
        quote.hide();
        //prevQuotes.hide();
        nextQuotes.hide();
        answer.hide();
        counterShown.empty();
        responses.hide();
        responses.empty();
        console.log('Quitted quiz.');
    } else {
        quizButton.text('Quit quiz and hide quotes.');
        randQuote();
        quizQuotes.text("Quote #" + number);
        topic.show();
        quote.show();
        //prevQuotes.show();
        nextQuotes.show();
        nextQuoteButton(false);
        answer.show();
        console.log('Started quiz.');
      }
}

/*This function would perform the ajax call to database.js to
  retrieve relevant information about each quote question. The
  quote information shown would be dependent of what
  corresponding number in randArray would be retrieved. The
  following information would be retrieved:
    - Quote id/number.
    - Quote topic.
    - The actual quote related to the topic.
    - Radio button boolean values assigned to each quote.

  An error would be shown to the user if the quote number
  can't be retrieved.*/
function randQuote(number, count) {
    let quizButton = $('.startQuiz');
    let quizQuotes = $('.quoteNum');
    let topic = $('.topic');
    //let prevQuotes = $('#prevQ');
    let nextQuotes = $('.nextQ');
    let responses = $('#responses');

    topic.show();
    //prevQuotes.show();
    nextQuotes.show();
    const requestURL = 'quizQ/' + number;
    console.log('making ajax request to:', requestURL);
    if (number == undefined){
        number = 1;
    }
    $.ajax({
      // all URLs are relative to http://localhost:3000/
      url: requestURL,
      type: 'GET',
      dataType : 'json', // this URL returns data in JSON format
      success: (quotes) => {
          console.log('Quiz question shown!', quotes);
          if (quotes.number && quotes.content && quotes.topic &&
              quotes.badmouth && quotes.banter) {
            //$('#status').html('Successfully fetched data at URL: ' + requestURL);
            $('.quoteNum').html('Quote: ' + count);
            $('.topic').html('Topic: ' + quotes.topic);
            $('.quote').html('Read this: ' + quotes.content);
            $('#badmouth').val(quotes.badmouth);
            $('#banter').val(quotes.banter);
          } else {
              //$('#status').html('Error: could not find user at URL: ' + requestURL);
              // clear the display
              $('.quote').html('Couldn\'t retrieve quote at ' + requestURL);
          }
      }
    })
    .always(function(xhr, status) {
        console.log("The request is complete!");
    });
    $(document).ajaxError(() => {
      $('.quote').html('Error: unknown ajaxError!');
    });

}

/*This function would be used to toggle the ability
  for the user to click on the "Next Quote" button.*/
function nextQuoteButton(boolean){
    if (boolean){
        $(".nextQ").prop("disabled",false);
    } else {
        $(".nextQ").prop("disabled",true);
    }
}

/*$(document).ready(() => {
  $('#startQuiz').click(() => {
      let quizQuotess = $('.quizQs');
      console.log('startQuiz clicked!');
      if ($('#startQuiz').text() == 'Click me!') {
          $('#startQuiz').text() == 'Quit quiz and hide questions.'
          quizQuotess.empty();
      } else {
          $('#startQuiz').text() == 'Click me!';
          quizQuotess.append("text");
      }
  });
});
*/

/*Discarded code for quiz buttons.*/
/*$('#startQuiz').click(() => {
  quizButton.text(quizButton.text()== 'Click me!' ? 'Quit quiz and hide quotes.' : 'Click me!');
  if (quizQuotes.text() != "") {
      quizQuotes.empty();
      prevQuotes.hide();
      nextQuotes.hide();
      number = 1;
      console.log('Quitted quiz.');
  } else {
      $('#startQuiz').change(randQuote);
      quizQuotes.text("Quote #" + number);
    }
});
$('#prevQ').click(() => {
    if (number > 1){
        number--;
        quizQuotes.text('Quote #' + number);
        console.log('Previous quote!');
        $('#prevQ').change(randQuote);
    } else {
        console.log('No previous quote!');
        $('#prevQ').change(randQuote);
    }
});
$('#nextQ').click(() => {
    number++;
    quizQuotes.text('Quote #' + number);
    $('#nextQ').change(randQuote);
    console.log('Next quote!');
});*/
