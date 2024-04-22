$(document).ready(function() {
    console.log("successfully linked js");
    // reset all event handlers before we reinitialize them
    $('.dropdown-button').off("click");
    $('.pet-card').off("swipeleft");
    $('.pet-card').off("swiperight");
    $('.no-button').off("click");
    $('.yes-button').off("click");
    $('.continue').off("click");
    $('.logo img, .dropdown-button, .yes-button, .no-button').off("mouseenter");
    $('.logo img, .dropdown-button, .yes-button, .no-button').off("mouseleave");
    $('.adopt, .continue, .dropdown-content a').off("mouseenter");
    $('.adopt, .continue, .dropdown-content a').off("mouseleave");
    $(".skip-main").off("click");

    // initialize css
    $('.dropdown-content a, .buttons2 a').css("color", "#8b324d");
    $('.link-button, .home-button, .active').css("color", "#000000")

    // skip to main
    $(".skip-main").on("click", function () {
        $('#main').attr('tabIndex', -1).focus();
    });
    $(".skip-main2").on("click", function () {
        $('#main2').attr('tabIndex', -1).focus();
    });
    $(".skip-main3").on("click", function () {
        $('#main3').attr('tabIndex', -1).focus();
    });
    $(".skip-main4").on("click", function () {
        $('#main4').attr('tabIndex', -1).focus();
    });

    // dropdown menu
    $('.dropdown-button').on('click', function() {
        // JQuery handles animations for me!
        $('.dropdown-content').slideToggle("slow");
        console.log("clicked on dropdown button");
    });
    $('.dropdown-content a').on('click',function() {
        $('.dropdown-content').slideToggle("slow");
        console.log("selected dropdown button");
    });
    $('.logo img').on('click',function() {
        if ($(".dropdown-content").is(":visible")) {
            $('.dropdown-content').slideToggle("slow");
        }
        console.log("selected dropdown button");
    });

    // animate buttons
    $('.logo img, .dropdown-button, .yes-button, .no-button').on("mouseenter", function() {
        $(this).animate({width: '+=20px'});
    }).on("mouseleave", function() {
        $(this).animate({width: '-=20px'});
    });
    $('.adopt, .continue, .dropdown-content a').on("mouseenter", function() {
        $(this).animate({fontSize: '+=10px', fontWeight: 'bold'}, 200);
        $(this).addClass('dropdown-hover');
    }).on("mouseleave", function() {
        $(this).animate({fontSize: '-=10px', fontWeight: 'normal'}, 200);
        $(this).removeClass('dropdown-hover');
    });

    var pets = [];
    var curr_pet_index = 0;
    load_pets(pets);
    shuffle_pets(pets);
    load_first_pet(pets);
    // handle swipes
    $('.pet-card').on("swipeleft", function() {
        ++curr_pet_index;
        left_swipe(pets, curr_pet_index);
    });
    $('.pet-card').on("swiperight", function() {
        ++curr_pet_index;
        right_swipe(pets, curr_pet_index);
    });
    // handle button clicks
    $('.no-button').on("click", function() {
        ++curr_pet_index;
        left_swipe(pets, curr_pet_index);
    });
    $('.yes-button').on("click", function() {
        ++curr_pet_index;
        right_swipe(pets, curr_pet_index);
    });
    $('.continue').on("click", function() {
        $('.pet-yes').css("display", "none");
        continue_right_swipe(pets, curr_pet_index);
    });
})

function load_pets(pets_array) {
    pets_array.push(new Object({ name: "Bob Barker", info: "Border Collie & Siberian Husky Mix", age: "Adult Male Medium", file: "bobbarker.jpeg", url: "https://www.petfinder.com/dog/bob-barker-71227564/mi/ann-arbor/humane-society-of-huron-valley-mi175/"}));
    pets_array.push(new Object({ name: "Fozzie", info: "Domestic Short Hair", age: "Senior Male Medium",  file: "fozzie.jpeg", url: "https://www.petfinder.com/cat/fozzie-71330227/mi/ann-arbor/humane-society-of-huron-valley-mi175/"}));
    pets_array.push(new Object({ name: "Hypatia", info: "Domestic Short Hair", age: "Adult Female Medium",  file: "hypatia.png", url: "https://www.petfinder.com/cat/hypatia-71263576/mi/ann-arbor/humane-society-of-huron-valley-mi175/"}));
    pets_array.push(new Object({ name: "Hoss", info: "Pit Bull Terrier", age: "Adult Male Large",  file: "hoss.png", url: "https://www.petfinder.com/dog/hoss-71004801/mi/ann-arbor/humane-society-of-huron-valley-mi175/"}));
    pets_array.push(new Object({ name: "Tito", info: "Pit Bull Terrier", age: "Adult Male Medium",  file: "tito.png", url: "https://www.petfinder.com/dog/tito-71039560/mi/ann-arbor/humane-society-of-huron-valley-mi175/"}));
    pets_array.push(new Object({ name: "Fluffy", info: "Domestic Short Hair", age: "Adult Female Medium",  file: "fluffy.png", url: "https://www.petfinder.com/cat/fluffy-71303992/mi/ann-arbor/humane-society-of-huron-valley-mi175/"}));
    pets_array.push(new Object({ name: "Winger", info: "Domestic Medium Hair", age: "Young Male Medium",  file: "winger.png", url: "https://www.petfinder.com/cat/winger-49961156/mi/manchester/happy-hearts-feline-rescue-mi951/"}));
    pets_array.push(new Object({ name: "Jojo", info: "Domestic Short Hair", age: "Adult Male Medium",  file: "jojo.png", url: "https://www.petfinder.com/cat/jo-jo-71214479/mi/ann-arbor/humane-society-of-huron-valley-mi175/"}));
    pets_array.push(new Object({ name: "BB", info: "Rabbit Rex", age: "Adult Female Small",  file: "bb.png", url: "https://www.petfinder.com/rabbit/bb-70938351/mi/ann-arbor/humane-society-of-huron-valley-mi175/"}));
    pets_array.push(new Object({ name: "Maisy", info: "Rabbit Bunny Rabbit", age: "Adult Female Small",  file: "maisy.png", url: "https://www.petfinder.com/rabbit/maisy-48066128/mi/whittaker/great-lakes-rabbit-sanctuary-mi120/"}));
    pets_array.push(new Object({ name: "Sunny (Sundance)", info: "Domestic Short Hair", age: "Adult Male Large",  file: "sunny.png", url: "https://www.petfinder.com/cat/sunny-sundance-65783931/mi/manchester/happy-hearts-feline-rescue-mi951/"}));
    pets_array.push(new Object({ name: "Jolie", info: "Pit Bull Terrier Mix", age: "Adult Female Medium",  file: "jolie.png", url: "https://www.petfinder.com/dog/jolie-71304002/mi/ann-arbor/humane-society-of-huron-valley-mi175/"}));
    pets_array.push(new Object({ name: "Cinderella", info: "Calico", age: "Young Female Medium",  file: "cinderella.png", url: "https://www.petfinder.com/cat/cinderella-54337933/mi/manchester/happy-hearts-feline-rescue-mi951/"}));
}

function shuffle_pets(pets_array) {
    // Fisher-Yates Algorithm
    // Shuffle 3 times for good measure...
    for (var count = 0; count < 3; ++count) {
        for (var i = pets_array.length - 1; i > 0; --i) {
            // Math.random is either 0 or 1
            var random_index = Math.floor(Math.random()) * (i + 1);
            var temp_pet = pets_array[i];
            pets_array[i] = pets_array[random_index];
            pets_array[random_index] = temp_pet;
        }
    }
}

function load_first_pet(pets_array) {
    var pet = pets_array[0];
    var pet_html = `
        <img src="static/images/${pet.file}" alt="${pet.name}">
        <div class="pet-info">
            <h2>${pet.name}, ${pet.age}</h2>
            <p>${pet.info}</p>
        </div>`;
    $('.pet-card').html(pet_html);
    var yes_html = `
        <h2>You Matched With ${pet.name}!<h2>
        <p>Do you want to invite ${pet.name} into your family?</p>
    `;
    $('.yes-text').html(yes_html);
    $('.adopt').attr('href', pet.url);
}

function display_adoption_options() {
    $('.pet-yes').fadeIn("slow");
}

function left_swipe(pets, curr_pet_index) {
    if (curr_pet_index <= pets.length) {
        $('.pet-card').addClass("slide-left");
        $('.pet-card').on('transitionend', function() {
            $('.pet-card').css("display", "none");
            $('.pet-card').removeClass('slide-left');
            if (curr_pet_index < pets.length) {
                load_next_pet(pets, curr_pet_index);
            }
            else {
                console.log(curr_pet_index);
                end_card();
            }
            $('.pet-card').fadeIn('fast');
        });
    }
}

function right_swipe(pets, curr_pet_index) {
    if (curr_pet_index <= pets.length) {
        $('.pet-card').addClass("slide-right");
        $('.pet-card').on('transitionend', function() {
            $('.pet-card').css("display", "none");
            $('.pet-card').removeClass('slide-right');
        });
        display_adoption_options();
    }
}

function continue_right_swipe(pets, curr_pet_index) {
    if (curr_pet_index < pets.length) {
        load_next_pet(pets, curr_pet_index);
    }
    else {
        console.log(curr_pet_index);
        end_card();
    }
    $('.pet-card').fadeIn("slow");
}

function load_next_pet(pets_array, curr_pet_index) {
    console.log("test");
    console.log(curr_pet_index);
    var pet = pets_array[curr_pet_index];
    var pet_html = `
        <img src="static/images/${pet.file}" alt="${pet.name}">
        <div class="pet-info">
            <h2>${pet.name}, ${pet.age}</h2>
            <p>${pet.info}</p>
        </div>`;
    $('.pet-card').html(pet_html);
    var yes_html = `
        <h2>You Matched With ${pet.name}!<h2>
        <p>Do you want to invite ${pet.name} into your family?</p>
    `;
    $('.yes-text').html(yes_html);
    $('.adopt').attr('href', pet.url);
}

function end_card() {
    var pet_html = `
        <div class="end-info">
            <h2>No More Pets!</h2>
            <p>Come back later to find new pets waiting to be adopted :)</p>
        </div>`;
    $('.pet-card').html(pet_html);
}