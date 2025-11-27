// Expose jest-dom matchers to TypeScript tests
import "@testing-library/jest-dom";
declare global {
  namespace jest {
    // noop - the import above augments the matchers types
  }
}
