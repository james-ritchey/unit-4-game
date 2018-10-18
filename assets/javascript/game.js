$(document).ready(function() {


var obiWan = {
    name: "Obi-Wan",
    image: "assets/images/fallout.jpg",
    health: 100,
    baseAP: 12,
    attackPower: this.baseAP,
    counterAP: this.baseAP,
}

var obi2 = {
    name: "Obi-Too",
    image: "assets/images/fallout.jpg",
    health: 137,
    baseAP: 24,
    attackPower: this.baseAP,
    counterAP: this.baseAP,
}

var gameManager = {
    characters: [obiWan, obi2],

    createCharacters: function() {
        for(var i = 0; i < this.characters.length; i++){
            var newDiv = $("<div>");
            newDiv.attr("id", this.characters[i].name);
            newDiv.addClass("character");
            newDiv.append("<p>" + this.characters[i].name + "</p>")
            newDiv.append("<img src= " + this.characters[i].image + " height='200px'>");
            newDiv.append("<p>" + this.characters[i].health + "</p>");
            $("#characters").append(newDiv);
        }

    },
}



gameManager.createCharacters();

});