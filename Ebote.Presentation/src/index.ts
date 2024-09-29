import Alpine from 'alpinejs';
import { ScreenLoader } from "./Application/Screens/ScreenLoader";

(async () => {
    Alpine.start();
    await ScreenLoader.Init();
})();