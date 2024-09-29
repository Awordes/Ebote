import { Application, Assets, Graphics, Sprite } from 'pixi.js';

export {
    DrawMenu
}

async function DrawMenu() {
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

    const scroll = new Graphics(await Assets.load({
        src: 'assets/menu-scroll.svg',
        data: {
            parseAsGraphicsContext: true,
        },
    }));

    const scrollBounds = scroll.getLocalBounds();
    scroll.pivot.set((scrollBounds.x + scrollBounds.width) / 2, (scrollBounds.y + scrollBounds.height) / 2);
    scroll.position.set(app.screen.width / 2, app.screen.height / 2);

    scroll.scale.set(9);
    app.stage.addChild(scroll);
}