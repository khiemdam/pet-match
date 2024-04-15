$(document).ready(function() {
    console.log("successfully linked js");
    // dropdown menu
    $('.dropdown-button').on('click', function() {
        // JQuery handles animations for me!
        $('.dropdown-content').slideToggle("slow");
    });
    // animate buttons
    $('.dropdown-button, .yes-button, .no-button').hover(function() {
        $(this).animate({width: '+=15px'});
    }, function() {
        $(this).animate({width: '-=15px'});
    });
    // make the pet card moveable
    var pets = [];
    load_pets(pets);
    shuffle_pets(pets);
    load_first_pet(pets);
    var curr_pet_index = 1;
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
            <div class="pet-card-item" id="hammer">
                <img src="static/images/${pet.file}" alt="${pet.name}">
                <div class="pet-info">
                    <h2>${pet.name}, ${pet.age}</h2>
                    <p>${pet.info}</p>
                </div>

            </div>`;
    $('.pet_card').append(pet_html);
}