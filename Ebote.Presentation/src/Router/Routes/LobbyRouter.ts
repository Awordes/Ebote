import { getProfile, getProfileGetActiveLobbyState } from "../../API";
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

    window.location.hash = '/lobby/' + ScreenLoader.mainScreen.lobbyForm.id;

    if (gameState.data.isGameStarted) {
        await Route('game');
        return;
    }

    ScreenLoader.mainScreen.lobbyForm.startGameButton.visible = gameState.data.creatorId == profile.data.id;

    let isWizardAlreadyAdded = false;

    gameState.data.wizards.forEach(element => {
        if (element.profileId == profile.data.id) {
            isWizardAlreadyAdded = true;
            return;
        }
    });

    ScreenLoader.mainScreen.lobbyForm.addWizardButton.visible = !isWizardAlreadyAdded;

    ScreenLoader.mainScreen.lobbyForm.visible = true;

}