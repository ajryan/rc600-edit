import { buildDecorator } from "./decorator-builder";

export interface TextElementMetadata<TValue> {
  elementName: string;
  defaultValue: TValue;
}

export const StringTextElementDecorator = buildDecorator<
  TextElementMetadata<string>,
  string
>({
  decoratorName: "string-text-element",
  valueAccessor: (element, _fieldName, metadata) => {
    return element[metadata.elementName]._text?.trim() || metadata.defaultValue;
  },
});

export const NumberTextElementDecorator = buildDecorator<
  TextElementMetadata<number>,
  number
>({
  decoratorName: "number-text-element",
  valueAccessor: (element, _fieldName, metadata) => {
    const text = element[metadata.elementName]._text;
    return text === null || typeof text === "undefined"
      ? metadata.defaultValue
      : (text as number);
  },
});

export const BooleanTextElementDecorator = buildDecorator<
  TextElementMetadata<boolean>,
  boolean
>({
  decoratorName: "boolean-text-element",
  valueAccessor: (element, _fieldName, metadata) => {
    const text = element[metadata.elementName]._text;
    return text === null || typeof text === "undefined"
      ? metadata.defaultValue
      : (text as number) == 1;
  },
});
