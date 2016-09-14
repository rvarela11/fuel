$(document).ready(function() {
  $('#startButtonId').on('click', startButton);
  $('#arrowGenderRight').on('click', arrowGenderRight);
  $('#arrowInfoLeft').on('click', arrowInfoLeft);
  $('#arrowInfoRight').on('click', arrowInfoRight);
  $('#arrowActiveLeft').on('click', arrowActiveLeft);
  $('#arrowActiveRight').on('click', arrowActiveRight);
  $('#arrowGoalLeft').on('click', arrowGoalLeft);
  $('input:radio').on("click", radioButtonFun);
  $("input[type='number']").on('mousedown', numberFun);

  $('#submitButtonStep1').on('click', inputsInfoClick);
  $('#submitButtonStep2').on('click', search);
  $('#foodButtonFinish').on('click', finish);

  var total = 0,
    goalCal,
    nowCal = 0,
    $userListId = $('#userListId'),
    $resultsListId = $('#resultsListId'),
    resultsArr = [],
    userArr = [],
    breakfastArr = [],
    lunchArr = [],
    dinnerArr = [],
    snackArr = [];
  $('.step1Gender').hide();
  $('.step1Info').hide();
  $('.step1Active').hide();
  $('.step1Goal').hide();

  $('.imageBox').show();
  $('.inputsCalories').hide();
  $('.inputsSearch').hide();
  $('.outputFinish').hide();

  function startButton() {
    $('.imageBox').hide();
    $('.inputsCalories').show();
    $('.step1Gender').show();
  }

  function arrowGenderRight() {
    var $genderInput = $("input[type='radio'][name='gender']:checked").val();
    if ($genderInput === undefined) {
      $(".genderLabel").addClass("noText");
      $('.radioButtonGender').prop('required', true);
    } else {
      $('.step1Gender').hide();
      $('.step1Info').show();
      $('.step1Active').hide();
      $('.step1Goal').hide();
      $(".genderLabel").removeClass("noText");
    }
  }

  function arrowInfoLeft() {
    $('.step1Gender').show();
    $('.step1Info').hide();
    $('.step1Active').hide();
    $('.step1Goal').hide();
  }

  function arrowInfoRight() {
    var $weight = $('#weight').val(),
      $height = $('#height').val(),
      $age = $('#age').val();
    if ($weight === "" && $height === "" && $age === "") {
      $("#weight").addClass("no");
      $("#height").addClass("no");
      $("#age").addClass("no");
      $("#arrowInfoRight").stop();
    } else if ($weight > 0 && $height === "" && $age === "") {
      $("#weight").addClass("yes");
      $("#height").addClass("no");
      $("#age").addClass("no");
      $("#arrowInfoRight").stop();
    } else if ($weight === "" && $height > 0 && $age === "") {
      $("#weight").addClass("no");
      $("#height").addClass("yes");
      $("#age").addClass("no");
      $("#arrowInfoRight").stop();
    } else if ($weight === "" && $height === "" && $age > 0) {
      $("#weight").addClass("no");
      $("#height").addClass("no");
      $("#age").addClass("yes");
      $("#arrowInfoRight").stop();
    } else if ($weight > 0 && $height > 0 && $age === "") {
      $("#weight").addClass("yes");
      $("#height").addClass("yes");
      $("#age").addClass("no");
      $("#arrowInfoRight").stop();
    } else if ($weight === "" && $height > 0 && $age > 0) {
      $("#weight").addClass("no");
      $("#height").addClass("yes");
      $("#age").addClass("yes");
      $("#arrowInfoRight").stop();
    } else if ($weight > 0 && $height === "" && $age > 0) {
      $("#weight").addClass("yes");
      $("#height").addClass("no");
      $("#age").addClass("yes");
      $("#arrowInfoRight").stop();
    } else if ($weight > 0 && $height > 0 && $age > 0) {
      $('.step1Gender').hide();
      $('.step1Info').hide();
      $('.step1Active').show();
      $('.step1Goal').hide();
      $("#weight").addClass("yes");
      $("#height").addClass("yes");
      $("#age").addClass("yes");
    }
  }

  function arrowActiveLeft() {
    $('.step1Gender').hide();
    $('.step1Info').show();
    $('.step1Active').hide();
    $('.step1Goal').hide();
  }

  function arrowActiveRight() {
    var $activeInput = $("input[type='radio'][name='active']:checked").val();
    if ($activeInput === undefined) {
      $(".fontSizeBox span").css("color", "red");
      $('.fontSizeBox').prop('required', true);
    } else {
      $('.step1Gender').hide();
      $('.step1Info').hide();
      $('.step1Active').hide();
      $('.step1Goal').show();
      $(".fontSizeBox span").css("color", "black");
    }
  }

  function arrowGoalLeft() {
    $('.step1Gender').hide();
    $('.step1Info').hide();
    $('.step1Active').show();
    $('.step1Goal').hide();
  }

  function radioButtonFun() {
    $('.genderLabel').css("color", "black");
    $(".fontSizeBox span").css("color", "black");
    $(".fontSizeBox").css("color", "black");
  }

  function numberFun() {
    $(this).addClass("yes");
  }

  //--------------- STEP 1 GOAL Calories ---------------

  function inputsInfoClick() {
    var $genderInput = $("input[type='radio'][name='gender']:checked").val(),
      $goalInput = $("input[type='radio'][name='goal']:checked").val(),
      $weight = $('#weight').val(),
      $height = $('#height').val(),
      $age = $('#age').val(),
      $activeInput = $("input[type='radio'][name='active']:checked").val();
    if ($goalInput === undefined) {
      $(".fontSizeBox").addClass("noText");
      $('.fontSizeBox').prop('required', true);
    } else {
      if ($genderInput === "Male") {
        var total1Male = 66 + (6.23 * $weight) + (12.7 * $height) - (6.8 *
          $age);
        var total2Male = total1Male * $activeInput;
        total = total2Male;
      } else {
        var total1Female = 655 + (4.35 * $weight) + (4.7 * $height) - (4.7 *
          $age);
        var total2Female = total1Female * $activeInput;
        total = total2Female;
      }
      if ($goalInput == "Lose") {
        total = total - 500;
      } else if ($goalInput == "Maintain") {
        total = total;
      } else {
        total = total + 500;
      }
      $('#totalCaloriesDisplayGoal').text(Math.round(total));
      $('.inputsCalories').hide();
      $('.inputsSearch').show();
    }
  }

  $('#searchBarId').keyup(function(e) {
    if (e.keyCode === 13) {
      search(e);
    }

  });

  //--------------- STEP 2 Item Search ---------------

  function search(ev) {
    ev.preventDefault();
    var $resultsList = $('#resultsListId'),
      $searchBarId = $('#searchBarId'),
      $input = $searchBarId.val(),
      $searchBarInput = encodeURI($input);
    $resultsList.empty();

    var results = $.ajax({
      type: 'POST',
      ContentType: 'application/json',
      dataType: 'JSON',
      url: 'https://api.nutritionix.com/v1_1/search',
      data: {
        "appId": "ac2eca48",
        "appKey": "070587b79fa048410207e13028e65c7b",
        "query": $input,
        "fields": ["item_name", "brand_name", "nf_calories",
          "nf_serving_size_qty", "nf_serving_size_unit"
        ],
        "sort": {
          "field": "_score",
          "order": "desc"
        },
        "filters": {
          "item_type": [1, 2]
        }
      }
    });

    results.done(function(data) {
      var allResults = data.hits;
      allResults.forEach(function(resultsField) {
        var allResultsFields = resultsField.fields;
        var resultsFieldLi = $(
          "<li class='resultsFieldLi'>" +
          allResultsFields.item_name +
          ' = ' + allResultsFields.nf_calories + "</li>");
        resultsFieldLi.draggable({
          helper: "clone",
          containment: ".inputsSearch"
        });
        $resultsList.append(resultsFieldLi);
      });
    });
    $searchBarId.val('');
  }

  //--------------- STEP 2 Drop ---------------

  $('.userListClass').droppable({
    drop: function(event, ui) {
      ui.draggable.detach().appendTo($(this));
      var item = $(this).children('li').last().text();
      var parent = $(this);
      var calories = parseInt(item.replace(/.*=/, ""), 10);
      userArr.push(calories);
      $('#totalCaloriesDisplayNow').text(userArr.reduce((prev,
        curr) => prev + curr));
      if (parent.attr('id') == 'userListBreakfast') {
        breakfastArr.push(calories);
        $('#totalCaloriesBreakfast').text(breakfastArr.reduce((prev,
          curr) => prev + curr));
      } else if (parent.attr('id') == 'userListLunch') {
        lunchArr.push(calories);
        $('#totalCaloriesLunch').text(lunchArr.reduce((prev,
          curr) => prev + curr));
      } else if (parent.attr('id') == 'userListDinner') {
        dinnerArr.push(calories);
        $('#totalCaloriesDinner').text(dinnerArr.reduce((prev,
          curr) => prev + curr));
      } else if (parent.attr('id') == 'userListSnack') {
        snackArr.push(calories);
        $('#totalCaloriesSnack').text(snackArr.reduce((prev,
          curr) => prev + curr));
      }
    }
  });

  //--------------- STEP 2 Buttons ---------------

  function foodButtons() {
    $('#userListBreakfast').show();
    $('#userListLunch').hide();
    $('#userListDinner').hide();
    $('#userListSnack').hide();
  }
  foodButtons();

  $('#foodButtonBreakfast').on('click', breakfastButton);
  $(
    '#foodButtonLunch').on('click', lunchButton);
  $('#foodButtonDinner').on(
    'click', dinnerButton);
  $('#foodButtonSnack').on('click', snackButton);

  function breakfastButton() {
    $('#userListBreakfast').show();
    $('#userListLunch').hide();
    $('#userListDinner').hide();
    $('#userListSnack').hide();
  }

  function lunchButton() {
    $('#userListBreakfast').hide();
    $('#userListLunch').show();
    $('#userListDinner').hide();
    $('#userListSnack').hide();
  }

  function dinnerButton() {
    $('#userListBreakfast').hide();
    $('#userListLunch').hide();
    $('#userListDinner').show();
    $('#userListSnack').hide();
  }

  function snackButton() {
    $('#userListBreakfast').hide();
    $('#userListLunch').hide();
    $('#userListDinner').hide();
    $('#userListSnack').show();
  }

  //--------------- STEP 2 Finish Buttons ---------------

  function finish() {
    if (breakfastArr.length === 0) {
      breakfastButton();
      $('#foodButtonFinish').stop();
    } else if (lunchArr.length === 0) {
      lunchButton();
      $('#foodButtonFinish').stop();
    } else if (dinnerArr.length === 0) {
      dinnerButton();
      $('#foodButtonFinish').stop();
    } else if (snackArr.length === 0) {
      snackButton();
      $('#foodButtonFinish').stop();
    } else {
      goalCal = Math.round(total);
      nowCal = userArr.reduce((prev,
        curr) => prev + curr);
      var difOver = "Over goal by: ";
      var difCalOver = nowCal - goalCal;
      var difUnder = "Under goal by: ";
      var difCalUnder = goalCal - nowCal;
      var difEven = "Keep up the good work!";

      $('#goalCal').text(Math.round(total));
      $('#nowCal').text(userArr.reduce((prev,
        curr) => prev + curr));
      $('#breakfastCal').text(breakfastArr.reduce((prev,
        curr) => prev + curr));
      $('#lunchCal').text(lunchArr.reduce((prev,
        curr) => prev + curr));
      $('#dinnerCal').text(dinnerArr.reduce((prev,
        curr) => prev + curr));
      $('#snackCal').text(snackArr.reduce((prev,
        curr) => prev + curr));

      if (nowCal > goalCal) {
        $('#difText').text(difOver);
        $('#difCal').text(difCalOver);
      } else if (goalCal > nowCal) {
        $('#difText').text(difUnder);
        $('#difCal').text(difCalUnder);
      } else {
        $('#difText').text(difEven);
        $('#difCal').text(0);
      }
      $('.inputsSearch').hide();
      $('.outputFinish').show();
    }
  }

});
