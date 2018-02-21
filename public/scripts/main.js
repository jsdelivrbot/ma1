$(function(){
  if ($('textarea#ta').length) {
    CKEDITOR.replace('ta');
  }
    
  
  $('a.confirmDeletion').on('click', function(){
     if(!confirm('Подтверждаю удаление'))
     return false;
  });
  if ($("[data-fancybox]").length) {
    $("[data-fancybox]").fancybox();
  }
});

  // ################
  // Add navbar background color when scrolled
  // */
  $(window).scroll(function() {
    if ($(window).scrollTop() > 56) {
      $(".navbar").addClass("bg-white");
    } else {
      $(".navbar").removeClass("bg-white");
    }
  });
  // If Mobile, add background color when toggler is clicked
  
  $(".navbar-toggler").click(function() {
    if (!$(".navbar-collapse").hasClass("show")) {
      $(".navbar").addClass("bg-white");
    } else {
      if ($(window).scrollTop() < 56) {
        $(".navbar").addClass("bg-white");
      }
    }
  });
  // ############

  // document ready


// footer callback

	const modal = document.getElementById("myModal");

const newModal = document.getElementById("newModal");

const btn = document.getElementById("btn");

const nope = document.getElementById("nope");

const closeMe = document.getElementById("closeMe");

const yep = document.getElementById("yes");

const close = document.getElementsByClassName("close")[0];

btn.onclick = function() {
  modal.style.display = "block";
};

nope.onclick = function() {
  modal.style.display = "none";
};

closeMe.onclick = function() {
  newModal.style.display = "none";
};

yep.onclick = function() {
  modal.style.display = "none";
  newModal.style.display = "block";
  countdownStart(60, "status");
};

close.onclick = function() {
  modal.style.display = "none";
  newModal.style.display = "none";
};

window.onclick = function(e) {
  if (e.target == modal || e.target == newModal) {
    modal.style.display = "none";
    newModal.style.display = "none";
  }
};

function countdownStart(secs, elem) {
  var element = document.getElementById(elem);
  element.innerHTML = "Пожалуйста ожидайте " + secs + " секунд";
  if (secs < 1) {
    clearTimeout(timer);
    element.innerHTML =
      "Мы уже звоним Вам :)";
  }
  secs--;

  var timer = setTimeout("countdownStart(" + secs + ', "' + elem + '")', 1000);
}


