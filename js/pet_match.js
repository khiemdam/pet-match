$(document).ready(function() {
    console.log("successfully linked js");
    // dropdown menu
    $('.dropdown-button').on('click', function() {
        // JQuery handles animations for me!
        $('.dropdown-content').slideToggle("slow");
        console.log("clicked on dropdown button")
    });
    // animate buttons
    $('.dropdown-button, .yes-button, .no-button').hover(function() {
        $(this).animate({width: '+=15px'});
    }, function() {
        $(this).animate({width: '-=15px'});
    });
    // make the pet card moveable
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
        left_swipe(pets, curr_pet_index);
    });
    // handle button clicks
    $('.no-button').on("click", function() {
        ++curr_pet_index;
        left_swipe(pets, curr_pet_index);
    });
    $('.yes-button').on("click", function() {
        ++curr_pet_index;
        left_swipe(pets, curr_pet_index);
    });
})

function load_pets(pets_array) {
    pets_array.push(new Object({ name: "Shmeagle", info: "The cutest kitten!", age: "5 months", file: "pet00.jpeg" }));
    pets_array.push(new Object({ name: "Mittens", info: "The cutest mitten!", age: "5 months",  file: "pet00.jpeg" }));
    pets_array.push(new Object({ name: "Destroyer of Worlds", info: "Parrot", age: "5 months",  file: "pet00.jpeg" }));
    pets_array.push(new Object({ name: "Poochie", info: "The cutest doggie!", age: "5 months",  file: "pet00.jpeg" }));
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
}

function left_swipe(pets, curr_pet_index) {
    $('.pet-card').addClass("slide-left");
    $('.pet-card').on('transitionend', function() {
        $('.pet-card').addClass("teleport-in");
        $('.pet-card').on('transitionend', function() {
            $('.pet-card').removeClass('slide-left');
            if (curr_pet_index < pets.length) {
                load_next_pet(pets, curr_pet_index);
            }
            else {
                console.log(curr_pet_index);
                end_card();
            }
            $('.pet-card').removeClass('teleport-in');
            $('.pet-card').addClass('fade-in');
            $('.pet-card').on('transitionend', function() {
                $('.pet-card').removeClass('fade-in');
            })
        })
    });
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
            <p>${curr_pet_index}</p>
        </div>`;
    $('.pet-card').html(pet_html);
}

function end_card() {
    var pet_html = `
        <div class="end-info">
            <h2>No More pets!</h2>
            <p>Come back later to find new pets waiting to be adopted :)</p>
        </div>`;
    $('.pet-card').html(pet_html);
}