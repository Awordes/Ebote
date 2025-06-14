using System.Collections.Concurrent;
using Ebote.Engine;

namespace Ebote.Core;

public class GameLobby(Guid id, Guid creatorId) : GameCycleAbstract(GameConstants.Consts.GameTickInMilliseconds)
{
    public Guid Id { get; init; } = id;

    public Guid CreatorId { get; init; } = creatorId;

    public DateTime? StartTime { get; private set; }

    public DateTime CreateTime { get; init; } = DateTime.Now;

    public DateTime LobbyEndTime { get; init; } = DateTime.Now.AddSeconds(GameConstants.Consts.GameLifeTimeInSeconds);

    public ICollection<Wizard> Wizards { get; init; } = [];

    public Bullet[] Bullets => [.. BulletDict.Values];

    private ConcurrentDictionary<Guid, Bullet> BulletDict { get; init; } = [];

    public void AddWizard(Guid profileId, MagicType magicType, SideType sideType, string name)
    {
        if (IsGameStarted) throw new Exception("Game already started.");

        if (Wizards.Any(x => x.ProfileId == profileId))
            throw new Exception("Profile already added.");

        var wizard = new Wizard(profileId, magicType, name, sideType, new Point(0, 0));

        Wizards.Add(wizard);

        SetWizardsSpawnPositions();
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

        var bulletsToRemove = new List<Guid>();
        foreach (var (key, bullet) in BulletDict)
        {
            if (IsBorderCollision(bullet, bullet.EyeDirection))
            {
                bulletsToRemove.Add(key);
                continue;
            }

            foreach (var wizard in Wizards)
                if (wizard.SideType != bullet.SideType && wizard.IsCollision(bullet.Center))
                {
                    wizard.GetDamage(GameConstants.Consts.BulletDamage);
                    bulletsToRemove.Add(key);
                    continue;
                }

            bullet.MoveBullet();
        }

        foreach (var bullet in bulletsToRemove)
            BulletDict.TryRemove(bullet, out var _);

        return Task.CompletedTask;
    }

    public void MoveWizard(Guid profileId, Axis axis)
    {
        var wizard = Wizards.FirstOrDefault(x => x.ProfileId == profileId)
            ?? throw new Exception("Wizard not found");

        if (!IsBorderCollision(wizard, axis))
            wizard.Move(axis);
    }

    public void Shoot(Guid profileId, Point? pointerPoint)
    {
        var wizard = Wizards.FirstOrDefault(x => x.ProfileId == profileId)
            ?? throw new Exception("Wizard not found");
        
        Axis? axis = null;

        if (pointerPoint.HasValue)
        {
            float line = (float)Math.Sqrt(Math.Pow(pointerPoint.Value.X - wizard.Center.X, 2)
                + Math.Pow(pointerPoint.Value.Y - wizard.Center.Y, 2));

            float x1 = (wizard.Center.X + 1 / line * pointerPoint.Value.X) / (1 + 1 / line);
            float y1 = (wizard.Center.Y + 1 / line * pointerPoint.Value.Y) / (1 + 1 / line);

            axis = new Axis(x1 - wizard.Center.X, y1 - wizard.Center.Y);
        }

        var bullet = wizard.Shoot(axis);

        if (bullet is not null)
            BulletDict.TryAdd(bullet.Id, bullet);
    }

    public void Undefence(Guid profileId)
    {
        var wizard = Wizards.FirstOrDefault(x => x.ProfileId == profileId)
            ?? throw new Exception("Wizard not found");

        if (wizard.State == WizardState.Defenced)
            wizard.State = WizardState.Idle;
    }

    public void Defence(Guid profileId)
    {
        var wizard = Wizards.FirstOrDefault(x => x.ProfileId == profileId)
            ?? throw new Exception("Wizard not found");

        if (wizard.State == WizardState.Idle)
            wizard.State = WizardState.Defenced;
    }

    private static bool IsBorderCollision(RectangleObjectAbstract obj, Axis axis)
        => axis.X < 0 && obj.LeftTop.X < 0
        || axis.Y < 0 && obj.LeftTop.Y < 0
        || axis.X > 0 && obj.RightBottom.X > GameConstants.Consts.LobbyWidth
        || axis.Y > 0 && obj.RightBottom.Y > GameConstants.Consts.LobbyHeight;

    private void SetWizardsSpawnPositions()
    {
        var greenTeamCount = Wizards.Count(x => x.SideType == SideType.Green);
        var redTeamCount = Wizards.Count(x => x.SideType == SideType.Red);

        var i = 0;
        var j = 0;
        float x = 0;
        float y = 0;

        foreach (var wizard in Wizards)
        {
            if (wizard.SideType == SideType.Green)
            {
                x = GameConstants.Consts.StartXMargin;
                y = GameConstants.Consts.LobbyHeight / (greenTeamCount + 1) * (i + 1);
                i++;
            }
            else
            {
                x = GameConstants.Consts.LobbyWidth - GameConstants.Consts.WizardWidth - GameConstants.Consts.StartXMargin;
                y = GameConstants.Consts.LobbyHeight / (redTeamCount + 1) * (j + 1);
                j++;
            }

            wizard.SpawnPosition = new Point(x, y);
            wizard.Spawn();
        }
    }
}
