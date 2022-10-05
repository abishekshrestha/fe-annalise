import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SecondPage from "../SecondPage";

test("renders header with title and name", () => {
  render(
    <MemoryRouter initialEntries={[{ pathname: "/", state: { name: "test" } }]}>
      <SecondPage />
    </MemoryRouter>
  );

  const headerElement = screen.getByRole("heading", {
    level: 1,
  }) as HTMLElement;

  expect(headerElement.innerHTML).toBe("Hello, test");
});
