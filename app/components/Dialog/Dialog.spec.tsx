import Dialog from "./Dialog";
import { render, act, fireEvent, screen } from "@testing-library/react";
import { vi } from "vitest";

describe("Base test", () => {
  it("Should render a dialog", () => {
    let open = true;
    let onClose = () => {
      open = false;
    };
    let component;

    act(() => {
      component = render(
        <Dialog open={open} onClose={onClose}>
          Content
        </Dialog>
      );
    });

    expect(component).toBeDefined();
    expect(component!.getByText("Content")).toBeDefined();
  });

  it("Should close a dialog", () => {
    let open = true;
    const onClose = vi.fn();

    let component;

    act(() => {
      component = render(
        <Dialog open={open} onClose={onClose}>
          Content
        </Dialog>
      );
    });

    expect(component).toBeDefined();

    expect(component!.getByText("Content")).toBeDefined();

    act(() => {
      fireEvent.click(component!.getByLabelText("Close dialog"));
    });
    expect(onClose).toHaveBeenCalled();
  });

  it("Should close a dialog", () => {
    let open = true;
    const onClose = vi.fn();

    let component;

    act(() => {
      component = render(
        <Dialog open={open} onClose={onClose}>
          Content
        </Dialog>
      );
    });

    expect(component).toBeDefined();

    act(() => {
      open = false;
    });

    component!.rerender(
      <Dialog open={open} onClose={onClose}>
        Content
      </Dialog>
    );
  });
});
