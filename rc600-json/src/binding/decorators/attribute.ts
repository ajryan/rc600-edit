import { buildDecorator } from "./decorator-builder";

interface AttributeMetadata<TValue> {
  defaultValue: TValue;
}

export const NumberAttributeDecorator = buildDecorator<
  AttributeMetadata<number>,
  number
>({
  decoratorName: "number-attribute",
  valueAccessor: (element, fieldName, metadata) => {
    return (
      (element._attributes?.[fieldName] as number) || metadata.defaultValue
    );
  },
});

export const StringTextAttributeDecorator = buildDecorator<
  AttributeMetadata<string>,
  string
>({
  decoratorName: "string-attribute",
  valueAccessor: (element, fieldName, metadata) => {
    return (
      (element._attributes?.[fieldName] as string) || metadata.defaultValue
    );
  },
});
