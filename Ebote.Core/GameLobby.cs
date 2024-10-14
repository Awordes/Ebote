using Ebote.Engine;

namespace Ebote.Core;

public class GameLobby(Guid id, Guid creatorId) : GameCycleAbstract(GameConstants.GameTickInMilliseconds)
{
    public Guid Id { get; init; } = id;

    public Guid CreatorId { get; init; } = creatorId;

    public float GameTimeInSeconds { get; private set; }

    public DateTime? StartTime { get; set; }

    public Dictionary<Guid, IGameObject> GameObjects { get; init; } = [];

    public ICollection<WizardToAdd> WizardsToAdd { get; init; } = [];

    public void AddWizard(Guid profileId, MagicType magicType, SideType sideType, string name)
    {
        if (IsGameStarted) throw new Exception("Game already started.");

        WizardsToAdd.Add(new WizardToAdd(profileId, magicType, sideType, name));
    }

    public override void Start()
    {
        if (IsGameStarted) throw new Exception("Game already started.");

        var greenTeamCount = WizardsToAdd.Count(x => x.SideType == SideType.Green);
        var redTeamCount = WizardsToAdd.Count(x => x.SideType == SideType.Red);
        var wizards = WizardsToAdd.ToArray();

        for (int i = 0; i < wizards.Length; i++)
        {
            float x;
            float y;

            if (wizards[i].SideType == SideType.Green)
            {
                x = GameConstants.StartXMargin;
                y = GameConstants.LobbyHeight / (greenTeamCount + 1) * (i + 1);
            }
            else
            {
                x = GameConstants.LobbyWidth - GameConstants.WizardWidth - GameConstants.StartXMargin;
                y = GameConstants.LobbyHeight / (redTeamCount + 1) * (i + 1);
            }

            var wizard = new Wizard(
                wizards[i].ProfileId,
                wizards[i].MagicType,
                wizards[i].Name,
                wizards[i].SideType,
                new Point(x, y),
                GameConstants.WizardWidth,
                GameConstants.WizardHeight);

            GameObjects.TryAdd(wizard.Id, wizard);
        }

        StartTime = DateTime.Now;

        base.Start();
    }

    public override Task Update()
    {
        foreach (var gameObject in GameObjects)
        {
            // todo
        }

        return Task.CompletedTask;
    }
}
