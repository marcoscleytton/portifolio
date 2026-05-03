/**
 * Neural Connectivity Animation with Data Packets
 * Specifically designed for the Projects section background.
 */

function initProjectsAnimation() {
    const canvas = document.getElementById('projects-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let packets = [];
    let width, height;

    const PARTICLE_COUNT = 40;
    const CONNECTION_DIST = 180;
    const PACKET_CHANCE = 0.015; // Chance to spawn a packet per frame

    function resize() {
        const parent = canvas.parentElement;
        width = canvas.width = parent.offsetWidth;
        height = canvas.height = parent.offsetHeight;
    }

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = Math.random() * 2 + 1;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255, 87, 0, 0.5)';
            ctx.fill();
        }
    }

    class Packet {
        constructor(start, end) {
            this.start = start;
            this.end = end;
            this.progress = 0;
            this.speed = 0.005 + Math.random() * 0.01;
        }

        update() {
            this.progress += this.speed;
            return this.progress < 1;
        }

        draw() {
            const x = this.start.x + (this.end.x - this.start.x) * this.progress;
            const y = this.start.y + (this.end.y - this.start.y) * this.progress;

            ctx.beginPath();
            ctx.arc(x, y, 2, 0, Math.PI * 2);
            ctx.fillStyle = '#ff5700';
            ctx.shadowBlur = 10;
            ctx.shadowColor = '#ff5700';
            ctx.fill();
            ctx.shadowBlur = 0;
        }
    }

    function init() {
        resize();
        particles = [];
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            particles.push(new Particle());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        // Update and draw particles
        particles.forEach(p => {
            p.update();
            p.draw();
        });

        // Draw connections and occasionally spawn packets
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const p1 = particles[i];
                const p2 = particles[j];
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < CONNECTION_DIST) {
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = `rgba(255, 87, 0, ${0.15 * (1 - dist / CONNECTION_DIST)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();

                    // Chance to spawn a data packet
                    if (Math.random() < PACKET_CHANCE / 100) { // Scaled down chance
                        packets.push(new Packet(p1, p2));
                    }
                }
            }
        }

        // Randomly spawn packets between any connected pairs
        if (Math.random() < PACKET_CHANCE) {
            const p1 = particles[Math.floor(Math.random() * particles.length)];
            // Find a close neighbor
            const neighbors = particles.filter(p => {
                if (p === p1) return false;
                const dist = Math.sqrt((p1.x - p.x)**2 + (p1.y - p.y)**2);
                return dist < CONNECTION_DIST;
            });
            
            if (neighbors.length > 0) {
                const p2 = neighbors[Math.floor(Math.random() * neighbors.length)];
                packets.push(new Packet(p1, p2));
            }
        }

        // Update and draw packets
        packets = packets.filter(packet => {
            const alive = packet.update();
            if (alive) packet.draw();
            return alive;
        });

        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', resize);
    init();
    animate();
}

// Start animation when DOM is loaded
document.addEventListener('DOMContentLoaded', initProjectsAnimation);
