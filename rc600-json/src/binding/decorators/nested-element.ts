import xmlJs from "xml-js";

import {
  IntermediateJsonBase,
  IntermediateJsonBaseConstructor,
} from "../intermediate-json-base";
import {
  decoratorFactory,
  getDecoratorFields,
  getDecoratorMetadata,
} from "./metadata-decorator";

const METADATA_NAME = "nested";

export const nestedElement = <T extends IntermediateJsonBase>(
  nestedType: IntermediateJsonBaseConstructor<T>,
  nestedPropertyName: string
) => {
  return decoratorFactory(
    METADATA_NAME,
    (element: xmlJs.ElementCompact) =>
      new nestedType(element[nestedPropertyName])
  );
};

export const getNestedElementFields = (instance: object): string[] => {
  return getDecoratorFields(instance, METADATA_NAME);
};

export type NestedElementFactory = (
  e: xmlJs.ElementCompact
) => IntermediateJsonBase;

export const getNestedElementFactory = (
  instance: object,
  fieldName: string
): NestedElementFactory => {
  return getDecoratorMetadata(
    instance,
    METADATA_NAME,
    fieldName
  ) as NestedElementFactory;
};
