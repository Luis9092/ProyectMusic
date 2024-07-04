// Obtener el elemento partiqleCanvas
var partiqleCanvas = document.getElementById("systemsCanvas");
var ctx = partiqleCanvas.getContext("2d");

// Establecer el tamaño del partiqleCanvas
partiqleCanvas.width = window.innerWidth;
partiqleCanvas.height = window.innerHeight;

// Definir las propiedades de la animación
var particleCount = 100;
var particleSize = 2;
var particleSpeed = 2;
var particleColor = "#00FFFF"; // Cian

// Crear un array para almacenar las partículas
var particles = [];

// Función para generar una partícula aleatoria
function generateParticle() {
    var particle = {
        x: Math.random() * partiqleCanvas.width,
        y: Math.random() * partiqleCanvas.height,
        angle: Math.random() * 2 * Math.PI,
        speed: particleSpeed * (Math.random() * 0.5 + 0.2),
    };
    return particle;
}

// Función para dibujar las partículas
function drawParticles() {
    ctx.clearRect(0, 0, partiqleCanvas.width, partiqleCanvas.height);

    // Dibujar las partículas y las conexiones
    for (var i = 0; i < particles.length; i++) {
        var particle = particles[i];

        // Dibujar la partícula
        ctx.fillStyle = particleColor;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particleSize, 0, 2 * Math.PI);
        ctx.fill();

        // Dibujar las conexiones
        for (var j = i + 1; j < particles.length; j++) {
            var otherParticle = particles[j];
            var distance = Math.sqrt(
                Math.pow(particle.x - otherParticle.x, 2) +
                Math.pow(particle.y - otherParticle.y, 2)
            );
            if (distance < 200) {
                ctx.strokeStyle =
                    "rgba(0, 255, 255, " + (1 - distance / 200) + ")";
                ctx.beginPath();
                ctx.moveTo(particle.x, particle.y);
                ctx.lineTo(otherParticle.x, otherParticle.y);
                ctx.stroke();
            }
        }

        // Actualizar la posición de la partícula
        particle.x += Math.cos(particle.angle) * particle.speed;
        particle.y += Math.sin(particle.angle) * particle.speed;

        // Si la partícula sale de la pantalla, regenerarla
        if (
            particle.x < -particleSize ||
            particle.x > partiqleCanvas.width + particleSize ||
            particle.y < -particleSize ||
            particle.y > partiqleCanvas.height + particleSize
        ) {
            particles[i] = generateParticle();
        }
    }

    requestAnimationFrame(drawParticles);
}

// Generar las partículas iniciales
for (var i = 0; i < particleCount; i++) {
    particles.push(generateParticle());
}

// Iniciar la animación
drawParticles();

let canvas, ctx2, source, analyser, fbc_array, bars, bar_x, bar_width, bar_height;

function initMP3PlayerCanva(musicPlayer) {
    context3 = null;
    context3 = new AudioContext();

    context3.resume().then(() => {
        analyser = context3.createAnalyser();
        canvas = document.getElementById("analyser_render");
        ctx2 = canvas.getContext('2d');
        source = context3.createMediaElementSource(musicPlayer.audio);
        source.connect(analyser);
        analyser.connect(context3.destination);
        frameLooper();
    });
}



function frameLooper() {
    window.requestAnimationFrame(frameLooper);
    fbc_array = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(fbc_array);
    ctx2.clearRect(0, 0, canvas.width, canvas.height);
    ctx2.fillStyle = colors;

    bars = 100;
    for (var i = 0; i < bars; i++) {
        bar_x = i * 4;
        bar_width = 2;
        bar_height = -(fbc_array[i] / 1.60);
        ctx2.fillRect(bar_x, canvas.height, bar_width, bar_height);

    }
}