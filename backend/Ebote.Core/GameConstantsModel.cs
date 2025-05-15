namespace Ebote.Core;

public class GameConstantsModel
{
    public float StartHitPoints { get; init; }

    public int GameTickInMilliseconds { get; init; }

    public uint TimeToReviveInSeconds { get; init; }

    public float WizardHeight { get; init; }

    public float WizardWidth { get; init; }

    public float WizardSpeed { get; init; }

    public float WizardAttackSpeed { get; init; }

    public float BulletDamage { get; init; }

    public float BulletHeight { get; init; }

    public float BulletWidth { get; init; }

    public float BulletSpeed { get; init; }

    public float LobbyWidth { get; init; }

    public float LobbyHeight { get; init; }

    public float StartXMargin { get; init; }

    public float StartYMargin { get; init; }

    public int GameLifeTimeInSeconds { get; init; }
}
