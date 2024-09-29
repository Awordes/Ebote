using Ebote.Engine;

namespace Ebote.Domain;

public class GameLobby(Guid creatorId) : GameCycleAbstract(GameConstants.GameTickInMilliseconds)
{
    public Guid Id { get; init; } = Guid.NewGuid();

    public Guid CreatorId { get; init; } = creatorId;
    
    private Dictionary<Guid, IGameObject> GameObjects { get; set; } = [];

    private ICollection<(MagicType magicType, SideType sideType, string name)> WizardsToAdd { get; set; } = [];

    public override void Start()
    {
        if (IsGameStarted) return;

        var greenTeam = WizardsToAdd.Where(x => x.sideType == SideType.Green).ToArray();
        var redTeam = WizardsToAdd.Where(x => x.sideType == SideType.Red).ToArray();

        for (int i = 0; i < greenTeam.Length; i++)
        {
            var x  = GameConstants.StartXMargin;
            var y = GameConstants.LobbyHeight / (greenTeam.Length + 1) * (i + 1);

            var wizard = new Wizard(
                greenTeam[i].magicType, 
                greenTeam[i].name,
                greenTeam[i].sideType,
                new Point(x, y),
                GameConstants.WizardWidth,
                GameConstants.WizardHeight);

            GameObjects.TryAdd(wizard.Id, wizard);
        }
        
        for (int i = 0; i < redTeam.Length; i++)
        {
            var x  = GameConstants.LobbyWidth - GameConstants.WizardWidth - GameConstants.StartXMargin;
            var y = GameConstants.LobbyHeight / (greenTeam.Length + 1) * (i + 1);

            var wizard = new Wizard(
                greenTeam[i].magicType, 
                greenTeam[i].name,
                greenTeam[i].sideType,
                new Point(x, y),
                GameConstants.WizardWidth,
                GameConstants.WizardHeight);

            GameObjects.TryAdd(wizard.Id, wizard);
        }

        base.Start();
    }

    public void AddWizard(MagicType magicType, SideType sideType, string name)
    {
        if (IsGameStarted) return;

        WizardsToAdd.Add((magicType, sideType, name));
    }

    public override Task Update()
    {
        foreach (var gameObject in GameObjects)
        {
            //todo
        }

        return Task.CompletedTask;
    }
}
