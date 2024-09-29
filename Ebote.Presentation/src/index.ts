import Alpine from 'alpinejs';
import { ScreenLoader } from "./Application/Screens/ScreenLoader";
import { MainScreen } from "./Application/Screens/Main/MainScreen";

(async () => {
    Alpine.start();
    await ScreenLoader.Init();
    await MainScreen.Init();
})();