import fs from "fs/promises";
import xmlJs from "xml-js";

export const xmlToIntermediate = async (
  filePath: string
): Promise<xmlJs.ElementCompact> => {
  const memoryXmlContent = await fs.readFile(filePath, "utf-8");
  const normalizedMemoryXmlContent = normalizeMemoryXml(memoryXmlContent);

  const memoryJs = xmlJs.xml2js(normalizedMemoryXmlContent, {
    compact: true,
    nativeType: true,
    attributeValueFn: parseAttribute,
  }) as xmlJs.ElementCompact;
  return memoryJs;
};

const normalizeMemoryXml = (memoryXmlContent: string): string => {
  // flip <#> to <hash>
  memoryXmlContent = memoryXmlContent.replaceAll("#>", "hash>");

  // prepend "numprefix" to <digit> elements
  memoryXmlContent = memoryXmlContent.replaceAll(
    /<(\/?)(\d)>/g,
    "<$1numprefix$2>"
  );

  // move the final "count" orphan inside the <database> element.
  const memoryXmlContentLines = memoryXmlContent.split("\n");
  const countElement = memoryXmlContentLines.pop() || "<count>0000</count>";
  const databaseClosingTag = memoryXmlContentLines.pop() || "</database>";
  memoryXmlContentLines.push(countElement);
  memoryXmlContentLines.push(databaseClosingTag);

  return memoryXmlContentLines.join("\n");
};

const parseAttribute = (attributeValue: string) => {
  // coerce numeric attributes to number
  if (attributeValue.match(/^\d+$/)) {
    return Number(attributeValue);
  }
  return attributeValue;
};
