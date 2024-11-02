using Ebote.Engine;

namespace Ebote.Core;

public class Bullet(Wizard wizard, float width, float height) : RectangleObjectAbstract(width, height)
{
    public Guid WizardId { get; set; } = wizard.Id;

    public SideType SideType { get; set; } = wizard.SideType;

    public MagicType MagicType { get; set; } = wizard.MagicType;

    public Axis EyeDirection { get; set; } = wizard.EyeDirection;

    public void MoveBullet()
    {
        base.Move(new Point(
            GameConstants.Consts.BulletSpeed * EyeDirection.X,
            GameConstants.Consts.BulletSpeed * EyeDirection.Y)
        );
    }
}
