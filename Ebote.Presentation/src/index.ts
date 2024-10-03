import { ScreenLoader } from "./Application/Screens/ScreenLoader";
import { MainScreen } from "./Application/Screens/Main/MainScreen";

(async () => {
    await ScreenLoader.Init();
    await MainScreen.Init();
})();