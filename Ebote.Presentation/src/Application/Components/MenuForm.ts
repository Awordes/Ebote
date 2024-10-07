import { FancyButton } from "@pixi/ui";
import { Container } from "pixi.js";
import { CreateButton } from "./CreateButton";
import { TextService } from "../Localization/TextService";

export class MenuForm extends Container {
    public createLobbyButton: FancyButton;
    public logoutButton: FancyButton;
    public openLobbyButton: FancyButton;

    public static async Create(): Promise<MenuForm> {
        var menuForm = new MenuForm();

        menuForm.openLobbyButton = await CreateButton(TextService.GetStringValue('openLobby'));
        menuForm.addChild(menuForm.openLobbyButton);

        menuForm.createLobbyButton = await CreateButton(TextService.GetStringValue('createLobby'));
        menuForm.addChild(menuForm.createLobbyButton);
        menuForm.createLobbyButton.position.set(
            menuForm.openLobbyButton.x,
            menuForm.openLobbyButton.y + menuForm.openLobbyButton.height + 5
        );

        menuForm.logoutButton = await CreateButton(TextService.GetStringValue('logout'));
        menuForm.addChild(menuForm.logoutButton);
        menuForm.logoutButton.position.set(
            menuForm.createLobbyButton.x,
            menuForm.createLobbyButton.y + menuForm.createLobbyButton.height + 5
        );

        menuForm.openLobbyButton.visible = false;
        return menuForm;
    }
}