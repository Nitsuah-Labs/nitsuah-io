import { act, renderHook } from "@testing-library/react";
import { useModal } from "../useModal";

describe("useModal", () => {
  it("starts closed and opens, closes and toggles", () => {
    const { result } = renderHook(() => useModal());
    expect(result.current.isOpen).toBe(false);
    act(() => result.current.open());
    expect(result.current.isOpen).toBe(true);
    act(() => result.current.close());
    expect(result.current.isOpen).toBe(false);
    act(() => result.current.toggle());
    expect(result.current.isOpen).toBe(true);
    act(() => result.current.toggle());
    expect(result.current.isOpen).toBe(false);
  });

  it("honours the initial state", () => {
    const { result } = renderHook(() => useModal(true));
    expect(result.current.isOpen).toBe(true);
  });
});
