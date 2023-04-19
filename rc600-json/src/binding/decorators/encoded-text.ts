import xmlJs from "xml-js";

import { buildDecorator } from "./decorator-builder";

export interface EncodedTextMetadata {
  elementName: string;
  defaultValue: string;
}

export const EncodedTextDecorator = buildDecorator<EncodedTextMetadata, string>(
  {
    decoratorName: "encoded-text",
    valueAccessor: (element, _fieldName, metadata) => {
      const childElementKeys = Object.keys(element[metadata.elementName])
        .filter((k) => !k.startsWith("_"))
        .sort();
      if (!childElementKeys.length) {
        return metadata.defaultValue;
      }

      const decoded = childElementKeys
        .map((childElementKey) => {
          const childElement = element[metadata.elementName][
            childElementKey
          ] as xmlJs.ElementCompact;
          const childAsciiCode = childElement._text as number;
          const char = String.fromCharCode(childAsciiCode);
          return char;
        })
        .join("");

      return decoded.trim() || metadata.defaultValue;
    },
  }
);
