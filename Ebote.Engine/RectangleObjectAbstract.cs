using System.Drawing;

namespace Ebote.Engine;

public class RectangleObjectAbstract: IGameObject
{
    public Point Position { get; private set; }

    public float Height { get; private set; }

    public float Width { get; private set; }

    public Point LeftTop { get; private set; }
    
    public Point LeftBottom { get; private set; }

    public Point RightTop { get; private set; }

    public Point RightBottom { get; private set; }

    public Guid Id { get; init; } = Guid.NewGuid();
    
    public RectangleObjectAbstract(float width, float height)
    {
        Position = new Point();
        Width = width;
        Height = height;
        CalculateBorders();
    }

    public void ChangePosition(Point position)
    {
        Position = position;
        CalculateBorders();
    }

    private void CalculateBorders()
    {
        LeftTop = Position;
        LeftBottom = new Point(Position.X, Position.Y + Height);
        RightTop = new Point(Position.X + Width, Position.Y);
        RightBottom = new Point(Position.X + Width, Position.X + Height);
    }

    public void Move(Point positionChange)
    {
        var newPosition = new Point(
            Position.X + positionChange.X,
            Position.Y + positionChange.Y);
            
        Position = newPosition;
        CalculateBorders();
    }

    public bool IsCollision(Point point)
        => point.X >= LeftTop.X
            && point.X <= RightBottom.X
            && point.Y >= LeftTop.Y
            && point.Y <= RightBottom.Y;
}
