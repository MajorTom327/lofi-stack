import Button from "./Button";
import { RemixContext } from "@remix-run/react/dist/components";
import { render, act } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import renderer from "react-test-renderer";
import { vi } from "vitest";
import { Colors } from "~/refs";

function toJson(component: renderer.ReactTestRenderer) {
  const result = component.toJSON();
  expect(result).toBeDefined();
  expect(result).not.toBeInstanceOf(Array);
  return result as renderer.ReactTestRendererJSON;
}

describe("Render as a button", () => {
  it("should render the button", () => {
    const clicked = vi.fn();
    const component = renderer.create(
      <Button onClick={clicked}>Hello Friend</Button>
    );

    const tree = toJson(component);

    expect(tree.type).toEqual("button");
    tree.props.onClick();

    expect(clicked).toHaveBeenCalled();
    expect(tree.children).toEqual(["Hello Friend"]);
  });

  (
    [
      "primary",
      "secondary",
      "accent",
      "error",
      "info",
      "success",
      "warning",
    ] as Colors[]
  ).forEach((color) => {
    it(`should render the button with the color ${color}`, () => {
      const component = renderer.create(
        <Button color={color} onClick={vi.fn()}>
          Hello Friend
        </Button>
      );

      const tree = toJson(component);

      expect(tree.type).toEqual("button");
      expect(tree.children).toEqual(["Hello Friend"]);
      const classes = tree.props.className.split(" ");
      expect(classes).toContain(`bg-${color}`);
    });
  });
});
describe("Render as a link", () => {
  let context = {
    routeModules: { idk: { default: () => null } },
    manifest: {
      routes: {
        idk: {
          hasLoader: true,
          hasAction: false,
          hasCatchBoundary: false,
          hasErrorBoundary: false,
          id: "idk",
          module: "idk.js",
        },
      },
      entry: { imports: [], module: "" },
      url: "",
      version: "",
    },
    future: { v2_meta: false },
  };

  it("Should render a link", () => {
    let router;

    act(() => {
      router = createMemoryRouter([
        {
          id: "root",
          path: "/",
          element: <Button to="/idk">Hello World</Button>,
        },
        {
          id: "idk",
          path: "idk",
          loader: () => null,
          element: <h1>idk</h1>,
        },
      ]);
    });

    let { container, unmount } = render(
      // @ts-ignore
      <RemixContext.Provider value={context}>
        {/* @ts-ignore */}
        <RouterProvider router={router} />
      </RemixContext.Provider>
    );

    const button = container.children[0];
    expect(button.tagName).toEqual("A");
    expect(button.innerHTML).toEqual("Hello World");
    expect(button.getAttribute("href")).toEqual("/idk");

    unmount();
  });
});
