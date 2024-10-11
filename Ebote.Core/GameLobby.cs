using Ebote.Engine;

namespace Ebote.Core;

public class GameLobby(Guid id, Guid creatorId) : GameCycleAbstract(GameConstants.GameTickInMilliseconds)
{
    public Guid Id { get; init; } = id;

    public Guid CreatorId { get; init; } = creatorId;

    private Dictionary<Guid, IGameObject> GameObjects { get; set; } = [];

    public ICollection<WizardToAdd> WizardsToAdd { get; set; } = [];

    public override void Start()
    {
        if (IsGameStarted) return;

        var greenTeam = WizardsToAdd.Where(x => x.SideType == SideType.Green).ToArray();
        var redTeam = WizardsToAdd.Where(x => x.SideType == SideType.Red).ToArray();

        for (int i = 0; i < greenTeam.Length; i++)
        {
            var x = GameConstants.StartXMargin;
            var y = GameConstants.LobbyHeight / (greenTeam.Length + 1) * (i + 1);

            var wizard = new Wizard(
                greenTeam[i].ProfileId,
                greenTeam[i].MagicType,
                greenTeam[i].Name,
                greenTeam[i].SideType,
                new Point(x, y),
                GameConstants.WizardWidth,
                GameConstants.WizardHeight);

            GameObjects.TryAdd(wizard.Id, wizard);
        }

        for (int i = 0; i < redTeam.Length; i++)
        {
            var x = GameConstants.LobbyWidth - GameConstants.WizardWidth - GameConstants.StartXMargin;
            var y = GameConstants.LobbyHeight / (redTeam.Length + 1) * (i + 1);

            var wizard = new Wizard(
                redTeam[i].ProfileId,
                redTeam[i].MagicType,
                redTeam[i].Name,
                redTeam[i].SideType,
                new Point(x, y),
                GameConstants.WizardWidth,
                GameConstants.WizardHeight);

            GameObjects.TryAdd(wizard.ProfileId, wizard);
        }

        base.Start();
    }

    public void AddWizard(Guid profileId, MagicType magicType, SideType sideType, string name)
    {
        if (IsGameStarted) return;

        WizardsToAdd.Add(new WizardToAdd(profileId, magicType, sideType, name));
    }

    public override Task Update()
    {
        foreach (var gameObject in GameObjects)
        {
            //todo
        }

        return Task.CompletedTask;
    }

    public bool IsWizardAlreadyAdded(Guid profileId)
    {
        return WizardsToAdd.Any(x => x.ProfileId == profileId);
    }
}
