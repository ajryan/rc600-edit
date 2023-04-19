import { Rc600MemoryDatabase } from "./types";
export { Rc600MemoryDatabase };

import { xmlToIntermediate } from "./rc0-reader";

const rc600Reader = {
  readMemory: async (filePath: string): Promise<Rc600MemoryDatabase> => {
    const intermediateJson = await xmlToIntermediate(filePath);
    return new Rc600MemoryDatabase(intermediateJson);
  },
};

export default rc600Reader;
