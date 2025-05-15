namespace Ebote.Infrastructure.Exceptions;

public class EntityNotFoundException(string entityName, string propertyName, string propertyValue)
    : Exception($"Entity {entityName} with property {propertyName} value {propertyValue} not found")
{ }
