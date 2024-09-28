import { Application } from 'pixi.js';

(async () => {
    const app = new Application();
    await app.init({
        resizeTo: window,
        antialias: true,
        backgroundAlpha: 0.3
    });
    console.log(window.innerWidth);
    app.canvas.style.position = 'absolute';
    app.canvas.style.right = '0';
    app.canvas.style.bottom = '0';
    document.body.appendChild(app.canvas);
})();