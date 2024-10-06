import { FancyButton } from "@pixi/ui";
import { Container } from "pixi.js";
import { CreateButton } from "./CreateButton";
import { TextService } from "../Localization/TextService";

export class MenuForm extends Container {
    public createGameButton: FancyButton;
    public logoutButton: FancyButton;

    public static async Create(): Promise<MenuForm> {
        var menuForm = new MenuForm();

        menuForm.createGameButton = await CreateButton(TextService.GetStringValue('createLobby'));
        menuForm.addChild(menuForm.createGameButton);

        menuForm.logoutButton = await CreateButton(TextService.GetStringValue('logout'));
        menuForm.addChild(menuForm.logoutButton);
        menuForm.logoutButton.position.set(
            menuForm.createGameButton.x,
            menuForm.createGameButton.y + menuForm.createGameButton.height + 5
        );

        return menuForm;
    }
}