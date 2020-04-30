import StringBuilder from '../src/StringBuilder';

describe("StringBuilder", () => {

	it("should match expected value", () => {
		const sb = new StringBuilder();
		sb.append("a", "b", "c");
		sb.append("1", "2", "3");
		expect(sb.toString()).toBe("abc123");
	});
});
