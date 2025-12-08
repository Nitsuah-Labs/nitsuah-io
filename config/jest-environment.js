const JSDOMEnvironment = require("jest-environment-jsdom").default;

class CustomJSDOMEnvironment extends JSDOMEnvironment {
  constructor(...args) {
    super(...args);

    // Fix window.location to be writable with all properties writable
    const locationProperties = {
      href: "http://localhost:3000/",
      origin: "http://localhost:3000",
      protocol: "http:",
      host: "localhost:3000",
      hostname: "localhost",
      port: "3000",
      pathname: "/",
      search: "",
      hash: "",
    };

    const locationMethods = {
      assign: jest.fn(),
      replace: jest.fn(),
      reload: jest.fn(),
      toString: () => "http://localhost:3000/",
    };

    // Create a location mock with writable properties
    const locationMock = {};

    // Make all properties writable
    Object.keys(locationProperties).forEach((key) => {
      Object.defineProperty(locationMock, key, {
        writable: true,
        configurable: true,
        value: locationProperties[key],
      });
    });

    // Add methods
    Object.keys(locationMethods).forEach((key) => {
      locationMock[key] = locationMethods[key];
    });

    // Replace window.location
    Object.defineProperty(this.global.window, "location", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: locationMock,
    });
  }
}

module.exports = CustomJSDOMEnvironment;
