import { act, renderHook } from "@testing-library/react";
import { useDelayedVisibility } from "../useDelayedVisibility";

describe("useDelayedVisibility", () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it("becomes visible after the default 1000 ms", () => {
    const { result } = renderHook(() => useDelayedVisibility());
    act(() => jest.advanceTimersByTime(999));
    expect(result.current).toBe(false);
    act(() => jest.advanceTimersByTime(1));
    expect(result.current).toBe(true);
  });

  it("uses a custom delay", () => {
    const { result } = renderHook(() => useDelayedVisibility(200));
    act(() => jest.advanceTimersByTime(199));
    expect(result.current).toBe(false);
    act(() => jest.advanceTimersByTime(1));
    expect(result.current).toBe(true);
  });

  it("clears the timer on unmount", () => {
    const errorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    const { unmount } = renderHook(() => useDelayedVisibility());
    unmount();
    expect(jest.getTimerCount()).toBe(0);
    act(() => jest.advanceTimersByTime(1000));
    expect(errorSpy).not.toHaveBeenCalled();
    errorSpy.mockRestore();
  });
});
