
import { Calculate } from "./manage-user.component";

describe("Calculate", () => {

    it("should return 0 if value is negetive", () => {
        expect(Calculate(-1)).toBe(0);
    })

    it("should return value + 1 if value is positive", () => {
        expect(Calculate(5)).toBe(6);
    })

});