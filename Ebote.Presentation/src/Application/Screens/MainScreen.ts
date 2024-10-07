import { Assets, Container, Graphics } from "pixi.js";
import { LoginForm } from "../Components/LoginForm";
import { ScaleAndCenter } from "../Utils/SizeHelper";
import { AssetStore } from "../Utils/AssetStore";
import { ScreenLoader } from "./ScreenLoader";
import { MenuForm } from "../Components/MenuForm";
import { LobbyForm } from "../Components/LobbyForm";
import { getAccountCheckAuth, getProfile, postAccountLogin, postAccountLogout, postLobby } from "../../client";

export class MainScreen extends Container {
    public scroll: Container;
    public gameName: Container;
    public loginForm: LoginForm;
    public menuForm: MenuForm;
    public lobbyForm: LobbyForm;

    public static async Init() {
        var mainScreen = new MainScreen();
        ScreenLoader.app.stage.addChild(mainScreen);

        mainScreen.gameName = new Graphics(await Assets.load(AssetStore.gameName));
        mainScreen.addChild(mainScreen.gameName);

        mainScreen.scroll = new Container();
        mainScreen.addChild(mainScreen.scroll);
        mainScreen.scroll.addChild(new Graphics(await Assets.load(AssetStore.menuScroll)));
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
            this.scroll.addChild(this.lobbyForm);
            ScaleAndCenter(this.lobbyForm, this.scroll, 0.4);
            this.lobbyForm.backButton.on('pointerup', async () => { await this.InitMenuForm(); });

            await postLobby();
        } else {
            this.scroll.addChild(this.lobbyForm);
        }
    }

    private async InitLoginForm() {
        this.ClearScroll();

        if (!this.loginForm) {
            this.loginForm = await LoginForm.Create();
            this.scroll.addChild(this.loginForm);
            ScaleAndCenter(this.loginForm, this.scroll, 0.6);
            this.loginForm.loginButton.on('pointerup', async () => { await this.Login(); });
        } else {
            this.scroll.addChild(this.loginForm);
        }
    }

    private async InitMenuForm() {
        this.ClearScroll();

        if (!this.menuForm) {
            this.menuForm = await MenuForm.Create();
            this.scroll.addChild(this.menuForm);
            ScaleAndCenter(this.menuForm, this.scroll, 0.4);    
            this.menuForm.logoutButton.on('pointerup', async () => { await this.Logout(); });
            this.menuForm.createLobbyButton.on('pointerup', async () => { await this.InitLobbyForm() });
        } else {
            this.scroll.addChild(this.menuForm);
        }

        var response = await getProfile();
        if (response.response.ok) {
            this.menuForm.openLobbyButton.visible = response.data.activeLobby?.id ? true : false;
        }
    }

    private ClearScroll() {
        this.scroll.removeChild(this.menuForm);
        this.scroll.removeChild(this.loginForm);
        this.scroll.removeChild(this.lobbyForm);
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