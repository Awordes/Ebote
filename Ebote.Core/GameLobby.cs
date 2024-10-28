using Ebote.Engine;

namespace Ebote.Core;

public class GameLobby(Guid id, Guid creatorId) : GameCycleAbstract(GameConstants.Consts.GameTickInMilliseconds)
{
    public Guid Id { get; init; } = id;

    public Guid CreatorId { get; init; } = creatorId;

    public float GameTimeInSeconds { get; private set; }

    public DateTime? StartTime { get; private set; }

    public DateTime CreateTime { get; init; } = DateTime.Now;

    public DateTime LobbyEndTime { get; init; } = DateTime.Now.AddSeconds(GameConstants.Consts.GameLifeTimeInSeconds);

    public ICollection<Wizard> Wizards { get; init; } = [];

    public void AddWizard(Guid profileId, MagicType magicType, SideType sideType, string name)
    {
        if (IsGameStarted) throw new Exception("Game already started.");

        if (Wizards.Any(x => x.ProfileId == profileId))
            throw new Exception("Profile already added.");

        var wizard = new Wizard(
            profileId,
            magicType,
            name,
            sideType,
            new Point(0, 0),
            GameConstants.Consts.WizardWidth,
            GameConstants.Consts.WizardHeight);

        wizard.EyeDirection = sideType == SideType.Green
            ? new Axis(1, 0)
            : new Axis(-1, 0);

        Wizards.Add(wizard);

        SetWizardsToDefaultPositions();
    }

    public override void Start()
    {
        if (IsGameStarted) throw new Exception("Game already started.");

        StartTime = DateTime.Now;

        base.Start();
    }

    public override Task Update()
    {
        if (LobbyEndTime < DateTime.Now)
        {
            Stop();
            return Task.CompletedTask;
        }

        foreach (var wizard in Wizards)
        {
            // todo
        }

        return Task.CompletedTask;
    }

    private void SetWizardsToDefaultPositions()
    {
        var greenTeamCount = Wizards.Count(x => x.SideType == SideType.Green);
        var redTeamCount = Wizards.Count(x => x.SideType == SideType.Red);

        var i = 0;
        float x = 0;
        float y = 0;

        foreach (var wizard in Wizards)
        {
            if (wizard.SideType == SideType.Green)
            {
                x = GameConstants.Consts.StartXMargin;
                y = GameConstants.Consts.LobbyHeight / (greenTeamCount + 1) * (i + 1);
            }
            else
            {
                x = GameConstants.Consts.LobbyWidth - GameConstants.Consts.WizardWidth - GameConstants.Consts.StartXMargin;
                y = GameConstants.Consts.LobbyHeight / (redTeamCount + 1) * (i + 1);
            }

            wizard.ChangePosition(new Point(x, y));
            i++;
        }
    }
}
