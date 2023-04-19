import path from "path";
import rc600Reader from "../src/index";

test("SampleMemory", async () => {
  const memoryPath = path.join(__dirname, "./MEMORY002A.RC0");
  const js = await rc600Reader.readMemory(memoryPath);
  expect(js.revision).toBe(0);
  expect(js.name).toBe("RC-600");
  expect(js.memory.id).toBe(1);
  expect(js.memory.name).toBe("Syrup");
  expect(js.memory.track1.reverse).toBe(false);
  expect(js.memory.track1.oneShot).toBe(false);
  expect(js.memory.track1.pan).toBe(50);
  expect(js.memory.track1.playLevel).toBe(100);
});
