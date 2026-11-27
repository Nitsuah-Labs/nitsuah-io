import { act, renderHook } from "@testing-library/react";
import { useScrollOpacity } from "../useScrollOpacity";
import { useScrollPosition } from "../useScrollPosition";

const scrollTo = (y: number) =>
  act(() => {
    Object.defineProperty(window, "scrollY", { value: y, configurable: true });
    window.dispatchEvent(new Event("scroll"));
  });

describe("scroll hooks", () => {
  afterEach(() => {
    Object.defineProperty(window, "scrollY", { value: 0, configurable: true });
    jest.restoreAllMocks();
  });

  it("useScrollPosition follows window.scrollY", () => {
    const { result } = renderHook(() => useScrollPosition());
    expect(result.current).toBe(0);
    scrollTo(150);
    expect(result.current).toBe(150);
  });

  it("useScrollOpacity fades over the distance and clamps at 0", () => {
    const { result } = renderHook(() => useScrollOpacity());
    expect(result.current).toBe(1);
    scrollTo(150);
    expect(result.current).toBe(0.5);
    scrollTo(600);
    expect(result.current).toBe(0);
  });

  it.each([
    ["useScrollPosition", () => useScrollPosition()],
    ["useScrollOpacity", () => useScrollOpacity()],
  ])("%s removes its scroll listener on unmount", (_name, hook) => {
    const spy = jest.spyOn(window, "removeEventListener");
    const { unmount } = renderHook(hook);
    unmount();
    expect(spy).toHaveBeenCalledWith("scroll", expect.any(Function));
  });
});
