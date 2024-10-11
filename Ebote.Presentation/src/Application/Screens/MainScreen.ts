import { Assets, Container, Graphics } from "pixi.js";
import { AssetStore } from "../Utils/AssetStore";
import { ScreenLoader } from "./ScreenLoader";
import { ScaleAndCenterToContainer } from "../Utils/SizeHelper";
import { MenuForm } from "../Components/MenuForm";
import { LobbyForm } from "../Components/LobbyForm";
import { LoginForm } from "../Components/LoginForm";
import { getAccountCheckAuth, getProfile, postAccountLogin, postAccountLogout, postLobby } from "../../client";

export async function InitMainScreen() {
    let mainScreen = new MainScreen();

    mainScreen.gameName = new Graphics(await Assets.load(AssetStore.gameName));
    mainScreen.addChild(mainScreen.gameName);

    mainScreen.scroll = new Graphics(await Assets.load(AssetStore.scroll));
    mainScreen.addChild(mainScreen.scroll);
    mainScreen.scroll.position.set(0, mainScreen.gameName.height + 1);

    mainScreen.content = new Container();
    mainScreen.addChild(mainScreen.content);
    mainScreen.content.position.set(
        mainScreen.scroll.x + 29,
        mainScreen.scroll.y + 10
    );

    let border = new Graphics();
    mainScreen.content.addChild(border);
    border.rect(0, 0, mainScreen.scroll.width - 34, mainScreen.scroll.height - 25);
    border.stroke({width: 1, color:0x000000});
    border.alpha = 0;

    mainScreen.menuForm = await MenuForm.Create();
    ScaleAndCenterToContainer(mainScreen.menuForm, mainScreen.content, 0.7);
    mainScreen.menuForm.createLobbyButton.on('pointerup', async ()  => {
        await postLobby();
        await mainScreen.ShowScreen('lobby');
    });
    mainScreen.menuForm.logoutButton.on('pointerup', async ()  => {
        await mainScreen.Logout();
        await mainScreen.ShowScreen('login');
    });
    
    mainScreen.lobbyForm = await LobbyForm.Create();
    ScaleAndCenterToContainer(mainScreen.lobbyForm, mainScreen.content);
    mainScreen.lobbyForm.backButton.on('pointerup', async () => { mainScreen.ShowScreen('menu'); });

    mainScreen.loginForm = await LoginForm.Create();
    ScaleAndCenterToContainer(mainScreen.loginForm, mainScreen.content);
    mainScreen.loginForm.loginButton.on('pointerup', async () => {
        await mainScreen.Login();

        await mainScreen.ShowScreen('menu');
    });

    mainScreen.content.addChild(mainScreen.menuForm);
    mainScreen.content.addChild(mainScreen.lobbyForm);
    mainScreen.content.addChild(mainScreen.loginForm);

    ScaleAndCenterToContainer(mainScreen, ScreenLoader.app.canvas, 0.9);
    ScreenLoader.app.stage.addChild(mainScreen);

    mainScreen.ShowScreen('menu');
}

class MainScreen extends Container {
    public gameName: Graphics;
    public scroll: Graphics;
    public content: Container;
    public menuForm: MenuForm;
    public lobbyForm: LobbyForm;
    public loginForm: LoginForm;

    public async ShowScreen(screenName: 'menu' | 'login' | 'lobby') {
        this.menuForm.visible = false;
        this.lobbyForm.visible = false;
        this.loginForm.visible = false;

        if (!(await this.isLogged())) {
            this.loginForm.visible = true;
            return;
        }

        switch (screenName) {
            case 'menu':
                this.menuForm.visible = true;
                let profile = await getProfile();
        
                if (profile.response.ok && profile.data.activeLobby)
                    this.menuForm.openLobbyButton.visible = true;
                else
                    this.menuForm.openLobbyButton.visible = false;
                break;
            case 'lobby':
                this.lobbyForm.visible = true;
                break;
            case 'login':
                this.loginForm.visible = true;
                break;
        }
    }

    public async isLogged(): Promise<boolean> {
        let request = await getAccountCheckAuth();

        console.log(request);
        
        return request.response.ok;
    }

    public async Login() {
        await postAccountLogin({
            body: {
                login: this.loginForm.loginInput.fieldValue,
                passwordHash: this.loginForm.passwordInput.fieldValue
            }
        });
    }

    public async Logout() {
        await postAccountLogout();
    }
}