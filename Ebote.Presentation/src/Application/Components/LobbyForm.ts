import { FancyButton } from "@pixi/ui";
import { Container } from "pixi.js";
import { CreateButton } from "./CreateButton";
import { TextService } from "../Localization/TextService";

export class LobbyForm extends Container {
    public backButton: FancyButton;

    public static async Create(): Promise<LobbyForm> {
        var lobbyForm = new LobbyForm();

        lobbyForm.backButton = await CreateButton(TextService.GetStringValue('back'));
        lobbyForm.addChild(lobbyForm.backButton);

        return lobbyForm;
    }
}