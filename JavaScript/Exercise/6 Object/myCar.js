var myCar = {
    mark: "Mitsubishi",
    model: "ASX",
    year: 2013,
    color: "white",
    passengers: 5,
    convertible: false,
    mileage: 102400,

    //通过发动机的状态，以及对发动机状态的改变 来表现 方法与属性的联动
    started: false,
    start: function () {
        if (this.fuel === 0) {
            console.log("The car is on empty,fill up before start!");
        } else {
            this.started = true;
        }
    },
    stop: function () {
        this.started = false;
    },
    //通过油箱状态，以及对油箱的操作，和 打火，行驶 的等方法的关联理解 属性与方法、方法与方法之间的联动
    fuel: 0,
    addFuel: function (amount) {
        if (amount === undefined || amount < 0 || !Number(amount)) {
            amount = 0;
        }
        this.fuel = this.fuel + amount;
        if (this.fuel > 10) {
            this.fuel = 10;
        }
    },
    //这里的 drive 属性是一个匿名函数，因此它也可以被叫做是 myCar 的方法
    drive: function () {
        if (this.started) {
            if(this.fuel===0){
                console.log("Oh no,out the fuel!");
                this.stop();
            }else{
                console.log("Zoom Zoom~");
                console.log(this.mark+" "+this.model+" on the way!");
                this.fuel--;
            }
        } else {
            console.log("You should start the engine first.");
        }
    }

}
myCar.start();
myCar.drive();
myCar.addFuel(2);
myCar.start();
myCar.drive();  
myCar.drive(); 
myCar.drive(); 
myCar.stop();