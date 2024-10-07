import { Assets, Container, Graphics } from "pixi.js";
import { LoginForm } from "../Components/LoginForm";
import { ScaleAndCenter } from "../Utils/SizeHelper";
import { AssetStore } from "../Utils/AssetStore";
import { ScreenLoader } from "./ScreenLoader";
import { MenuForm } from "../Components/MenuForm";
import { LobbyForm } from "../Components/LobbyForm";
import { getAccountCheckAuth, getProfile, postAccountLogin, postAccountLogout, postLobby } from "../../client";

export class MainScreen extends Container {
    public scroll: Scroll;
    public gameName: Container;
    public loginForm: LoginForm;
    public menuForm: MenuForm;
    public lobbyForm: LobbyForm;

    public static async Init() {
        var mainScreen = new MainScreen();
        ScreenLoader.app.stage.addChild(mainScreen);

        mainScreen.gameName = new Graphics(await Assets.load(AssetStore.gameName));
        mainScreen.addChild(mainScreen.gameName);

        mainScreen.scroll = await Scroll.Create();
        mainScreen.addChild(mainScreen.scroll);
        
        mainScreen.scroll.position.set(mainScreen.gameName.x, mainScreen.gameName.height);
        
        ScaleAndCenter(mainScreen, ScreenLoader.app.canvas, 0.9);

        await mainScreen.CheckLogin();
    }

    private async CheckLogin() {
        var request = await getAccountCheckAuth();

        if (request.response.status == 200) {
            await this.InitMenuForm();
        } else {
            await this.InitLoginForm();
        }
    }

    private async InitLobbyForm() {
        this.ClearScroll();

        if (!this.lobbyForm) {
            this.lobbyForm = await LobbyForm.Create();
            this.scroll.content.addChild(this.lobbyForm);
            ScaleAndCenter(this.lobbyForm, this.scroll.content, 0.3);
            this.lobbyForm.backButton.on('pointerup', async () => { await this.InitMenuForm(); });

            await postLobby();
        } else {
            this.scroll.content.addChild(this.lobbyForm);
        }
    }

    private async InitLoginForm() {
        this.ClearScroll();

        if (!this.loginForm) {
            this.loginForm = await LoginForm.Create();
            this.scroll.content.addChild(this.loginForm);
            ScaleAndCenter(this.loginForm, this.scroll.content, 0.6);
            this.loginForm.loginButton.on('pointerup', async () => { await this.Login(); });
        } else {
            this.scroll.content.addChild(this.loginForm);
        }
    }

    private async InitMenuForm() {
        this.ClearScroll();

        if (!this.menuForm) {
            this.menuForm = await MenuForm.Create();
            this.scroll.content.addChild(this.menuForm);
            ScaleAndCenter(this.menuForm, this.scroll.content, 0.4);    
            this.menuForm.logoutButton.on('pointerup', async () => { await this.Logout(); });
            this.menuForm.createLobbyButton.on('pointerup', async () => { await this.InitLobbyForm() });
        } else {
            this.scroll.content.addChild(this.menuForm);
        }

        var response = await getProfile();
        if (response.response.ok) {
            this.menuForm.openLobbyButton.visible = response.data.activeLobby?.id ? true : false;
        }
    }

    private ClearScroll() {
        this.scroll.content.removeChild(this.menuForm);
        this.scroll.content.removeChild(this.loginForm);
        this.scroll.content.removeChild(this.lobbyForm);
    }
    
    private async Login() {
        await postAccountLogin({
            body: {
                login: this.loginForm.loginInput.fieldValue,
                passwordHash: this.loginForm.passwordInput.fieldValue
            }
        });
        
        await this.CheckLogin();
    }
    
    private async Logout() {
        await postAccountLogout();
        
        await this.CheckLogin();
    }
}

class Scroll extends Container {
    public background: Graphics;
    public content: Container;

    public static async Create(): Promise<Scroll> {
        var scroll = new Scroll();

        scroll.background = new Graphics(await Assets.load(AssetStore.menuScroll));
        scroll.addChild(scroll.background);

        scroll.content = new Container();
        scroll.addChild(scroll.content);
        scroll.content.position.set(
            scroll.background.x + scroll.background.width * 0.2,
            scroll.background.y + scroll.background.height * 0.15
        );

        var border = new Graphics();
        scroll.content.addChild(border);
        border.rect(
            0,
            0,
            scroll.background.width * 0.8,
            scroll.background.height * 0.8,
        );
        border.stroke({width: 0, color: 0x000000});

        return scroll;
    }
}