import xmlJs from "xml-js";
import {
  nestedElement,
  BooleanTextElementDecorator,
  NumberAttributeDecorator,
  EncodedTextDecorator,
  StringTextAttributeDecorator,
  NumberTextElementDecorator,
} from "./binding";
import { IntermediateJsonBase } from "./binding/intermediate-json-base";

export interface Rc600Database {
  name: string;
  revision: number;
  count: number;
}

export class Rc600Track extends IntermediateJsonBase {
  @BooleanTextElementDecorator.fn({ defaultValue: false, elementName: "A" })
  public reverse!: boolean;

  @BooleanTextElementDecorator.fn({ defaultValue: false, elementName: "B" })
  public oneShot!: boolean;

  @NumberTextElementDecorator.fn({ defaultValue: 50, elementName: "C" })
  public pan!: number;

  @NumberTextElementDecorator.fn({ defaultValue: 50, elementName: "D" })
  public playLevel!: number;
}

export class Rc600Memory extends IntermediateJsonBase {
  @NumberAttributeDecorator.fn({ defaultValue: 0 })
  public id!: number;

  @EncodedTextDecorator.fn({ elementName: "NAME", defaultValue: "Memory01" })
  public name!: string;

  @nestedElement(Rc600Track, "TRACK1")
  public track1!: Rc600Track;

  constructor(jsonElement: xmlJs.ElementCompact) {
    super(jsonElement);
  }
}

export class Rc600InternalEffects extends IntermediateJsonBase {
  constructor(jsonElement: xmlJs.ElementCompact) {
    super(jsonElement);
  }
}

export class Rc600TrackEffects extends IntermediateJsonBase {
  constructor(jsonElement: xmlJs.ElementCompact) {
    super(jsonElement);
  }
}

export class Rc600MemoryDatabase
  extends IntermediateJsonBase
  implements Rc600Database
{
  @StringTextAttributeDecorator.fn({ defaultValue: "RC-600" })
  public name!: string;

  @NumberAttributeDecorator.fn({ defaultValue: 0 })
  public revision!: number;

  @NumberTextElementDecorator.fn({ defaultValue: 0, elementName: "count" })
  count!: number;

  @nestedElement(Rc600Memory, "mem")
  memory!: Rc600Memory;

  @nestedElement(Rc600InternalEffects, "ifx")
  internalEffects!: Rc600InternalEffects;

  @nestedElement(Rc600TrackEffects, "tfx")
  trackEffects!: Rc600TrackEffects;

  constructor(jsonElement: xmlJs.ElementCompact) {
    super(jsonElement["database"]);
  }
}
