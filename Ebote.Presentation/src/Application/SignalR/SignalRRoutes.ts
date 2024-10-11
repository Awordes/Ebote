class SignalRequest {
    public request: string;
    public response: string;

    constructor(request: string, response?: string) {
        this.request = request;
        this.response = response;        
    }
}

export abstract class WizardHub {
    public static hubName = 'Wizard';
    public static getLobbyWizardList = new SignalRequest('GetLobbyWizardList', 'GetLobbyWizardList');
}