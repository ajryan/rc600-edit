import "reflect-metadata";

const decoratorToFieldListSymbol: Record<string, Symbol> = {};
const decoratorToFieldMetadataSymbol: Record<string, Symbol> = {};

export const decoratorFactory = function (
  decoratorName: string,
  metadataValue: unknown
) {
  const fieldListSymbol =
    decoratorToFieldListSymbol[decoratorName] ??
    (decoratorToFieldListSymbol[decoratorName] = Symbol(
      `${decoratorName}-fields`
    ));
  return (target: object, propertyKey: string) => {
    // collect this property as another decorated field on this target class
    const existingFields = Reflect.getMetadata(fieldListSymbol, target) ?? [];
    Reflect.defineMetadata(
      fieldListSymbol,
      [...existingFields, propertyKey],
      target
    );

    // collect the metadata associated with this specific field on this target
    const fieldMetadataKey = `${decoratorName}-${propertyKey}`;
    const fieldMetadataSymbol =
      decoratorToFieldMetadataSymbol[fieldMetadataKey] ??
      (decoratorToFieldMetadataSymbol[fieldMetadataKey] =
        Symbol(fieldMetadataKey));
    Reflect.defineMetadata(fieldMetadataSymbol, metadataValue, target);
  };
};

export const getDecoratorFields = (
  instance: object,
  decoratorName: string
): string[] => {
  const fieldListSymbol = decoratorToFieldListSymbol[decoratorName];
  return fieldListSymbol
    ? (Reflect.getMetadata(fieldListSymbol, instance) as string[])
    : [];
};

export const getDecoratorMetadata = <T>(
  instance: object,
  decoratorName: string,
  fieldName: string
): T => {
  const metadataSymbol =
    decoratorToFieldMetadataSymbol[`${decoratorName}-${fieldName}`];
  return Reflect.getMetadata(metadataSymbol, instance) as T;
};
