
document.querySelectorAll(".category")[0].addEventListener("click", function(){
    document.querySelector(".purpose").innerHTML = "Education";
    document.querySelectorAll(".category")[0].classList.add("category-active");
    document.querySelectorAll(".category")[1].classList.remove("category-active");
    document.querySelectorAll(".category")[2].classList.remove("category-active");
    document.querySelectorAll(".category")[3].classList.remove("category-active");
});
document.querySelectorAll(".category")[1].addEventListener("click", function(){
    document.querySelector(".purpose").innerHTML = "Medical";
    document.querySelectorAll(".category")[1].classList.add("category-active");
    document.querySelectorAll(".category")[0].classList.remove("category-active");
    document.querySelectorAll(".category")[2].classList.remove("category-active");
    document.querySelectorAll(".category")[3].classList.remove("category-active");
});
document.querySelectorAll(".category")[2].addEventListener("click", function(){
    document.querySelector(".purpose").innerHTML = "Sports";
    document.querySelectorAll(".category")[2].classList.add("category-active");
    document.querySelectorAll(".category")[0].classList.remove("category-active");
    document.querySelectorAll(".category")[1].classList.remove("category-active");
    document.querySelectorAll(".category")[3].classList.remove("category-active");
});
document.querySelectorAll(".category")[3].addEventListener("click", function(){
    document.querySelector(".purpose").innerHTML = "Co-curricular activities";
    document.querySelectorAll(".category")[3].classList.add("category-active");
    document.querySelectorAll(".category")[0].classList.remove("category-active");
    document.querySelectorAll(".category")[1].classList.remove("category-active");
    document.querySelectorAll(".category")[2].classList.remove("category-active");
});



