function Dog(feature) {
    if (feature) {
        this.name = feature.name;
        this.weight = feature.weight;
        this.breed = feature.breed;
    }
}
Dog.prototype.bark = function () {
    if (this.weight > 30) {
        console.log(this.name + " says woof!");
    } else {
        console.log(this.name + " says yip!");
    }
}
function ShowDog(feature) {
    Dog.call(this, feature);
    this.handler = feature.handler;
}
//重点1
ShowDog.prototype = new Dog();

//重点2
ShowDog.prototype.constructor = ShowDog;

ShowDog.prototype.sitted = true;
ShowDog.prototype.sit = function () {
    if (this.sitted) {
        console.log(this.name + " is sitted already!");
    } else {
        this.sitted = true;
        console.log(this.name + " is sitted.");
    }
}
ShowDog.prototype.standUp = function () {
    this.sitted = false;
}
ShowDog.prototype.bait = function () {
    console.log("Bait.");
}
ShowDog.prototype.showSomething = function (things) {
    console.log(things + "ing!");
}

var fidoFeature = {
    name: "fido",
    weight: 48,
    breed: "Mixed"
}
var fido = new Dog(fidoFeature);

var spotFeature = {
    name: "spot",
    weight: 28,
    breed: "Chihuahua"
}
var spot = new Dog(spotFeature);

var wangcaiFeature = {
    name: "旺财",
    weight: 30,
    breed: "中华田园犬",
    handler:"Sunny"
}
var wangcai = new ShowDog(wangcaiFeature);

fido.bark();//fido says woof!
spot.bark();//spot says yip!
wangcai.bark();//旺财 says yip!
wangcai.bait();//Bait.
wangcai.showSomething("Run");//Runing!
fido.bait();//TypeError: fido.bait is not a function
spot.showSomething("Run");//TypeError: spot.showSomething is not a function
debugger;