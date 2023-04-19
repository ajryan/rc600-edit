import xmlJs from "xml-js";
import {
  decoratorFactory,
  getDecoratorFields,
  getDecoratorMetadata,
} from "./metadata-decorator";

export type ValueAccessorFunction<TMetadata, TValue> = (
  element: xmlJs.ElementCompact,
  fieldName: string,
  metadata: TMetadata
) => TValue;

export interface IntermediateJsonDecorator<TMetadata, TValue> {
  fn: (
    metadataValue: TMetadata
  ) => (target: object, propertyKey: string) => void;
  getFields: (instance: object) => string[];
  getMetadata: (instance: object, fieldName: string) => TMetadata;
  getValue: (
    instance: object,
    element: xmlJs.ElementCompact,
    fieldName: string
  ) => TValue;
}

export const buildDecorator = <TMetadata, TValue>({
  decoratorName,
  valueAccessor,
}: {
  decoratorName: string;
  valueAccessor: ValueAccessorFunction<TMetadata, TValue>;
}): IntermediateJsonDecorator<TMetadata, TValue> => {
  return {
    fn: (metadataValue: TMetadata) =>
      decoratorFactory(decoratorName, metadataValue),
    getFields: (instance: object): string[] => {
      return getDecoratorFields(instance, decoratorName);
    },
    getMetadata: (instance: object, fieldName: string) => {
      return getDecoratorMetadata(instance, decoratorName, fieldName);
    },
    getValue: (
      instance: object,
      element: xmlJs.ElementCompact,
      fieldName: string
    ) => {
      const metadata = getDecoratorMetadata(instance, decoratorName, fieldName);
      return valueAccessor(element, fieldName, metadata as TMetadata);
    },
  };
};
