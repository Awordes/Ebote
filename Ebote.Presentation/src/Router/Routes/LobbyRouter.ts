import { getProfile, getProfileGetActiveLobbyState } from "../../API";
import { WizardHub } from "../../SignalR/WizardHub";
import { ScreenLoader } from "../../UI/ScreenLoader";
import { Route } from "../Router";

export async function RouteLobby() {
    let profile = await getProfile();

    if (!profile.response.ok) {
        await ScreenLoader.ShowModal('Ошибка при<br>получении профиля');
        return;
    }

    let gameState = await getProfileGetActiveLobbyState();

    if (!gameState.response.ok) {
        await ScreenLoader.ShowModal('Ошибка при получении<br>состояния лобби.');
        return;
    }

    if (gameState.data.isGameStarted) {
        await Route('game');
        return;
    }

    ScreenLoader.mainScreen.lobbyForm.startGameButton.visible = gameState.data.creatorId == profile.data.id;

    let isWizardAlreadyAdded = false;

    gameState.data.wizardsToAdd.forEach((element) => {
        if (element.profileId == profile.data.id) {
            isWizardAlreadyAdded = true;
            return;
        }
    });

    ScreenLoader.mainScreen.lobbyForm.addWizardButton.visible = !isWizardAlreadyAdded;

    ScreenLoader.mainScreen.HideContent();
    ScreenLoader.mainScreen.lobbyForm.visible = true;

    window.location.hash = '/lobby/' + ScreenLoader.mainScreen.lobbyForm.id;
}