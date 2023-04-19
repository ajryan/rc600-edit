import xmlJs from "xml-js";
import {
  getNestedElementFields,
  getNestedElementFactory,
} from "./decorators/nested-element";
import {
  NumberAttributeDecorator,
  StringTextAttributeDecorator,
} from "./decorators/attribute";
import { EncodedTextDecorator } from "./decorators/encoded-text";
import {
  BooleanTextElementDecorator,
  NumberTextElementDecorator,
  StringTextElementDecorator,
} from "./decorators/text-element";

export type IntermediateJsonBaseConstructor<T extends IntermediateJsonBase> =
  new (element: xmlJs.ElementCompact) => T;

const GENERIC_DECORATORS = [
  NumberAttributeDecorator,
  StringTextAttributeDecorator,
  BooleanTextElementDecorator,
  NumberTextElementDecorator,
  StringTextElementDecorator,
  EncodedTextDecorator,
];

export abstract class IntermediateJsonBase {
  public jsonElement: xmlJs.ElementCompact;
  [key: string]: unknown;

  constructor(jsonElement: xmlJs.ElementCompact) {
    if (!jsonElement) {
      throw new Error(
        `Missing jsonElement when binding ${this.constructor["name"]}`
      );
    }
    this.jsonElement = jsonElement;

    for (const decorator of GENERIC_DECORATORS) {
      const decoratorFieldNames = decorator.getFields(this);
      if (decoratorFieldNames) {
        for (const decoratorFieldName of decoratorFieldNames) {
          const attributeMeta = decorator.getMetadata(this, decoratorFieldName);
          if (attributeMeta) {
            this[decoratorFieldName] = decorator.getValue(
              this,
              jsonElement,
              decoratorFieldName
            );
          }
        }
      }
    }

    const nestedElementFieldNames = getNestedElementFields(this);
    if (nestedElementFieldNames) {
      for (const nestedElementFieldName of nestedElementFieldNames) {
        const nestedElementMeta = getNestedElementFactory(
          this,
          nestedElementFieldName
        );
        this[nestedElementFieldName] = nestedElementMeta(jsonElement);
      }
    }
  }
}
