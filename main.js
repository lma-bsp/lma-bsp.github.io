let cnv;
let width = window.innerWidth
let height = window.innerHeight
let numBalls = 50
let balls1 = [], balls2 = [], balls3 = []
const spring = 0.05;
let gravity = .03;
const friction = -0.9;


let mandatory_button_style = "background-color:#1a00db;border-radius:28px;border:1px solid #000000;display:inline-block;cursor:pointer;color:#ffffff;font-family:Arial;font-size:56px;padding:16px 31px;text-decoration:none;text-shadow:0px 1px 0px #2f6627;font-family: 'Lobster', cursive;"
let name_text_style = "color:white;font-family:'Lobster';text-decoration:none;font-size:56px"

function setup() {
    cnv = createCanvas(width, height)
    cnv.size(width, height)
    cnv.style('z-index', '-1')
    cnv.position(0, 0)
    initial_styling()

}


function windowResized() {
    cnv.size(width, height)
    cnv.position(0, 0)
    initial_styling()
}

function Ball(xin, yin, din, idin, oin) {
    this.x = xin;
    this.y = yin;
    var vx = 0;
    var vy = 0;
    this.diameter = din;
    this.id = idin;
    this.others = oin;
    this.color = 100;
    this.color2 = random(255);
    this.color3 = 255
    this.collide = function () {
        for (var i = this.id + 1; i < numBalls; i++) {
            // console.log(others[i]);
            var dx = this.others[i].x - this.x;
            var dy = this.others[i].y - this.y;
            var distance = sqrt(dx * dx + dy * dy);
            var minDist = this.others[i].diameter / 2 + this.diameter / 2;
            //   console.log(distance);
            //console.log(minDist);
            if (distance < minDist) {
                //console.log("2");
                var angle = atan2(dy, dx);
                var targetX = this.x + cos(angle) * minDist;
                var targetY = this.y + sin(angle) * minDist;
                var ax = (targetX - this.others[i].x) * spring;
                var ay = (targetY - this.others[i].y) * spring;
                vx -= ax;
                vy -= ay;
                this.others[i].vx += ax;
                this.others[i].vy += ay;
            }
        }
    };

    this.move = function () {
        vy += gravity;
        this.x += vx;
        this.y += vy;
        if (this.x + this.diameter / 2 > width) {
            this.x = width - this.diameter / 2;
            vx *= friction;
        } else if (this.x - this.diameter / 2 < 0) {
            this.x = this.diameter / 2;
            vx *= friction;
        }
        if (this.y + this.diameter / 2 > height) {
            this.y = height - this.diameter / 2;
            vy *= friction;
        } else if (this.y - this.diameter / 2 < 0) {
            this.y = this.diameter / 2;
            vy *= friction;
        }
    };

    this.display = function () {
        fill(this.color, this.color2, this.color3);
        this.color -= 1;
        this.color3 -= 1
        this.color2 -= 2
        if (this.color < 0) {
            balls = []
        }

        ellipse(this.x, this.y, this.diameter, this.diameter);
    };
}


function initial_styling() {
    background(0)
    try {
        mandatory_button = select('#start_button')
        mandatory_button.position((width / 2) - 104, (height / 2) - 53)
        mandatory_button.id('start_button')
        mandatory_button.style(mandatory_button_style)
        mandatory_button.size(208, 106)
        mandatory_button.mousePressed(introduction)
    } catch {
        console.log('')
    }


}

function introduction() {
    $('body').append('<audio id="audio" controls autoplay><source src="intro.wav" type="audio/wav">')
    $('#audio').hide()
    $('#start_button').fadeOut(1000)
    setTimeout(function () {
        new_explode_1(width / 2, height / 2)
    }, 419)
    setTimeout(function () {
        new_explode_2(width / 4, height / 2)
    }, 1337)
    setTimeout(function () {
        new_explode_3(width / 1.25, height / 2)
    }, 3133)
    setTimeout(function () {
        new_explode_1(width / 2, height / 2)
    }, 4171)
    setTimeout(function () {
        new_explode_2(width / 4, height / 2)
    }, 5089)
    setTimeout(function () {
        new_explode_3(width / 1.25, height / 2)
    }, 6885)
    setTimeout(function () {
        balls1 = []
        balls2 = []
        balls3 = []
        $('body').append('<video id="signature" src="signature.mp4" style="position:absolute;left:15%;width:75%;"autoplay></video>')
    }, 7500)

    setTimeout(function () {
        $('#signature').remove()
    }, 14500)
    setTimeout(function () {
        new_explode_1(width / 2, height / 1.1)
    }, 14629)
    setTimeout(function () {
        new_explode_2(width / 4, height / 1.1)
    }, 14629)
    setTimeout(function () {
        new_explode_3(width / 1.25, height / 1.1)
    }, 14629)
    setTimeout(function () {
        $('canvas').remove()
        $('#start_button').remove()
        $('body').css('background-color', 'black')
        main_page()
    }, 15500)


}


function main_page() {
    $('body').append('<div style=' + name_text_style
        + ' id="name_text"><h2>Alexis Reyes</h2><br><a class="links" href="https://docs.google.com/document/d/19U_yaxM1rOc779b8xfrlK5TSoGfL4BVFyZ9WugkFzl0/edit?usp=sharing">' + 'Current Resume' + '</a><br><a class="links" href="http://www.brewy.org">' + 'Current Project' + '</a></div>')
    select('#name_text').position(width / 2.5, height / 4)
}

function new_explode_1(x_loc, y_loc) {
    for (var i = 0; i < numBalls; i++) {
        balls1[i] = new Ball(x_loc + random(10), y_loc + random(10), 10, i, balls1);
    }

}

function new_explode_2(x_loc, y_loc) {
    for (var i = 0; i < numBalls; i++) {
        balls2[i] = new Ball(x_loc + random(10), y_loc + random(10), 10, i, balls2);

    }

}

function new_explode_3(x_loc, y_loc) {
    for (var i = 0; i < numBalls; i++) {
        balls3[i] = new Ball(x_loc + random(10), y_loc + random(10), 10, i, balls3);
    }

}

function draw() {
    background(0)
    balls3.forEach(ball => {
        ball.collide();
        ball.move();
        ball.display();
    });
    balls2.forEach(ball => {
        ball.collide();
        ball.move();
        ball.display();
    });
    balls1.forEach(ball => {
        ball.collide();
        ball.move();
        ball.display();
    });


}
