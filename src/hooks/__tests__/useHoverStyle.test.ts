/**
 * Unit tests for useHoverStyle custom hook
 * Tests cover style application, hover state management, and event handlers
 */

import { act, renderHook } from "@testing-library/react";
import { useHoverStyle } from "../useHoverStyle";

describe("useHoverStyle", () => {
  const defaultStyle = {
    backgroundColor: "#ffffff",
    color: "#000000",
    padding: "10px",
  };

  const hoverStyle = {
    backgroundColor: "#000000",
    color: "#ffffff",
  };

  describe("initialization", () => {
    it("should return default style initially", () => {
      const { result } = renderHook(() =>
        useHoverStyle(defaultStyle, hoverStyle),
      );
      const [style] = result.current;

      expect(style).toEqual(defaultStyle);
    });

    it("should return event handlers", () => {
      const { result } = renderHook(() =>
        useHoverStyle(defaultStyle, hoverStyle),
      );
      const [, handlers] = result.current;

      expect(handlers).toHaveProperty("onMouseEnter");
      expect(handlers).toHaveProperty("onMouseLeave");
      expect(typeof handlers.onMouseEnter).toBe("function");
      expect(typeof handlers.onMouseLeave).toBe("function");
    });

    it("should return tuple with style and handlers", () => {
      const { result } = renderHook(() =>
        useHoverStyle(defaultStyle, hoverStyle),
      );

      expect(Array.isArray(result.current)).toBe(true);
      expect(result.current).toHaveLength(2);
    });
  });

  describe("hover state management", () => {
    it("should apply hover style on mouse enter", () => {
      const { result } = renderHook(() =>
        useHoverStyle(defaultStyle, hoverStyle),
      );

      act(() => {
        result.current[1].onMouseEnter();
      });

      const [style] = result.current;
      expect(style.backgroundColor).toBe("#000000");
      expect(style.color).toBe("#ffffff");
    });

    it("should revert to default style on mouse leave", () => {
      const { result } = renderHook(() =>
        useHoverStyle(defaultStyle, hoverStyle),
      );

      act(() => {
        result.current[1].onMouseEnter();
      });

      act(() => {
        result.current[1].onMouseLeave();
      });

      const [style] = result.current;
      expect(style).toEqual(defaultStyle);
    });

    it("should merge hover style with default style", () => {
      const { result } = renderHook(() =>
        useHoverStyle(defaultStyle, hoverStyle),
      );

      act(() => {
        result.current[1].onMouseEnter();
      });

      const [style] = result.current;
      expect(style.padding).toBe("10px"); // from default
      expect(style.backgroundColor).toBe("#000000"); // from hover
      expect(style.color).toBe("#ffffff"); // from hover
    });

    it("should handle multiple hover toggles", () => {
      const { result } = renderHook(() =>
        useHoverStyle(defaultStyle, hoverStyle),
      );

      // First hover
      act(() => {
        result.current[1].onMouseEnter();
      });
      expect(result.current[0].backgroundColor).toBe("#000000");

      act(() => {
        result.current[1].onMouseLeave();
      });
      expect(result.current[0].backgroundColor).toBe("#ffffff");

      // Second hover
      act(() => {
        result.current[1].onMouseEnter();
      });
      expect(result.current[0].backgroundColor).toBe("#000000");

      act(() => {
        result.current[1].onMouseLeave();
      });
      expect(result.current[0].backgroundColor).toBe("#ffffff");
    });
  });

  describe("style objects", () => {
    it("should work with empty default style", () => {
      const { result } = renderHook(() => useHoverStyle({}, hoverStyle));

      expect(result.current[0]).toEqual({});

      act(() => {
        result.current[1].onMouseEnter();
      });

      expect(result.current[0]).toEqual(hoverStyle);
    });

    it("should work with empty hover style", () => {
      const { result } = renderHook(() => useHoverStyle(defaultStyle, {}));

      act(() => {
        result.current[1].onMouseEnter();
      });

      expect(result.current[0]).toEqual(defaultStyle);
    });

    it("should handle complex style objects", () => {
      const complexDefault = {
        backgroundColor: "#fff",
        border: "1px solid #ccc",
        borderRadius: "4px",
        boxShadow: "none",
        fontSize: "14px",
      };

      const complexHover = {
        backgroundColor: "#f0f0f0",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      };

      const { result } = renderHook(() =>
        useHoverStyle(complexDefault, complexHover),
      );

      act(() => {
        result.current[1].onMouseEnter();
      });

      const [style] = result.current;
      expect(style.backgroundColor).toBe("#f0f0f0");
      expect(style.boxShadow).toBe("0 2px 4px rgba(0,0,0,0.1)");
      expect(style.border).toBe("1px solid #ccc");
      expect(style.fontSize).toBe("14px");
    });

    it("should handle numeric style values", () => {
      const numericDefault = {
        opacity: 1,
        zIndex: 10,
        width: 100,
      };

      const numericHover = {
        opacity: 0.8,
        zIndex: 20,
      };

      const { result } = renderHook(() =>
        useHoverStyle(numericDefault, numericHover),
      );

      act(() => {
        result.current[1].onMouseEnter();
      });

      const [style] = result.current;
      expect(style.opacity).toBe(0.8);
      expect(style.zIndex).toBe(20);
      expect(style.width).toBe(100);
    });
  });

  describe("edge cases", () => {
    it("should handle rapid hover events", () => {
      const { result } = renderHook(() =>
        useHoverStyle(defaultStyle, hoverStyle),
      );

      act(() => {
        result.current[1].onMouseEnter();
        result.current[1].onMouseLeave();
        result.current[1].onMouseEnter();
        result.current[1].onMouseLeave();
      });

      expect(result.current[0]).toEqual(defaultStyle);
    });

    it("should handle multiple mouse enters without leave", () => {
      const { result } = renderHook(() =>
        useHoverStyle(defaultStyle, hoverStyle),
      );

      act(() => {
        result.current[1].onMouseEnter();
        result.current[1].onMouseEnter();
        result.current[1].onMouseEnter();
      });

      expect(result.current[0].backgroundColor).toBe("#000000");
    });

    it("should handle multiple mouse leaves without enter", () => {
      const { result } = renderHook(() =>
        useHoverStyle(defaultStyle, hoverStyle),
      );

      act(() => {
        result.current[1].onMouseLeave();
        result.current[1].onMouseLeave();
      });

      expect(result.current[0]).toEqual(defaultStyle);
    });

    it("should not mutate original style objects", () => {
      const originalDefault = { ...defaultStyle };
      const originalHover = { ...hoverStyle };

      const { result } = renderHook(() =>
        useHoverStyle(defaultStyle, hoverStyle),
      );

      act(() => {
        result.current[1].onMouseEnter();
      });

      expect(defaultStyle).toEqual(originalDefault);
      expect(hoverStyle).toEqual(originalHover);
    });
  });

  describe("handler stability", () => {
    it("should return handler functions on each render", () => {
      const { result, rerender } = renderHook(() =>
        useHoverStyle(defaultStyle, hoverStyle),
      );

      const [, initialHandlers] = result.current;

      expect(typeof initialHandlers.onMouseEnter).toBe("function");
      expect(typeof initialHandlers.onMouseLeave).toBe("function");

      rerender();

      const [, rerenderHandlers] = result.current;

      // Handlers are recreated but function correctly
      expect(typeof rerenderHandlers.onMouseEnter).toBe("function");
      expect(typeof rerenderHandlers.onMouseLeave).toBe("function");
    });
  });

  describe("type safety", () => {
    it("should work with different style property types", () => {
      const mixedStyle = {
        color: "red",
        fontSize: 16,
        fontWeight: "bold" as const,
        display: "flex" as const,
      };

      const mixedHover = {
        color: "blue",
        fontWeight: "normal" as const,
      };

      const { result } = renderHook(() =>
        useHoverStyle(mixedStyle, mixedHover),
      );

      act(() => {
        result.current[1].onMouseEnter();
      });

      const [style] = result.current;
      expect(style.color).toBe("blue");
      expect(style.fontSize).toBe(16);
      expect(style.fontWeight).toBe("normal");
      expect(style.display).toBe("flex");
    });

    it("should preserve all properties from default style", () => {
      const defaultWithMany = {
        prop1: "value1",
        prop2: "value2",
        prop3: "value3",
        prop4: "value4",
      };

      const hoverWithFew = {
        prop2: "hover2",
      };

      const { result } = renderHook(() =>
        useHoverStyle(defaultWithMany, hoverWithFew),
      );

      act(() => {
        result.current[1].onMouseEnter();
      });

      const [style] = result.current;
      expect(style.prop1).toBe("value1");
      expect(style.prop2).toBe("hover2");
      expect(style.prop3).toBe("value3");
      expect(style.prop4).toBe("value4");
    });
  });

  describe("real-world usage scenarios", () => {
    it("should work for button hover effect", () => {
      const buttonDefault = {
        backgroundColor: "#007bff",
        color: "white",
        border: "none",
        cursor: "pointer",
      };

      const buttonHover = {
        backgroundColor: "#0056b3",
      };

      const { result } = renderHook(() =>
        useHoverStyle(buttonDefault, buttonHover),
      );

      act(() => {
        result.current[1].onMouseEnter();
      });

      expect(result.current[0].backgroundColor).toBe("#0056b3");
      expect(result.current[0].color).toBe("white");
    });

    it("should work for card hover effect", () => {
      const cardDefault = {
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        transform: "scale(1)",
        transition: "all 0.3s ease",
      };

      const cardHover = {
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        transform: "scale(1.02)",
      };

      const { result } = renderHook(() =>
        useHoverStyle(cardDefault, cardHover),
      );

      act(() => {
        result.current[1].onMouseEnter();
      });

      const [style] = result.current;
      expect(style.boxShadow).toBe("0 4px 12px rgba(0,0,0,0.15)");
      expect(style.transform).toBe("scale(1.02)");
      expect(style.transition).toBe("all 0.3s ease");
    });

    it("should work for link hover effect", () => {
      const linkDefault = {
        color: "#007bff",
        textDecoration: "none",
      };

      const linkHover = {
        color: "#0056b3",
        textDecoration: "underline",
      };

      const { result } = renderHook(() =>
        useHoverStyle(linkDefault, linkHover),
      );

      act(() => {
        result.current[1].onMouseEnter();
      });

      expect(result.current[0].textDecoration).toBe("underline");

      act(() => {
        result.current[1].onMouseLeave();
      });

      expect(result.current[0].textDecoration).toBe("none");
    });
  });
});
