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

    public RectangleObjectAbstract(Point position, float width, float height)
    {
        Position = position;
        Width = width;
        Height = height;
        CalculateBorders();
    }

    private void CalculateBorders()
    {
        LeftTop = Position;
        LeftBottom = new Point { X = Position.X, Y = Position.Y + Height };
        RightTop = new Point { X = Position.X + Width, Y = Position.Y };
        RightBottom = new Point { X = Position.X + Width, Y = Position.X + Height };
    }

    public void Move(Point positionChange)
    {
        var newPosition = new Point 
        {
            X = Position.X + positionChange.X,
            Y = Position.Y + positionChange.Y
        };
        Position = newPosition;
        CalculateBorders();
    }

    public bool IsCollision(Point point)
        => point.X >= LeftTop.X
            && point.X <= RightBottom.X
            && point.Y >= LeftTop.Y
            && point.Y <= RightBottom.Y;
}
