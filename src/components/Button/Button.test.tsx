import { render, screen } from "@testing-library/react";
import MockProvider from "../../mocks/MockProvider";
import Button from "./Button";
import userEvent from "@testing-library/user-event";
import { SET_READY } from "../../context/types";

describe("Button", () => {
  test("it starts the game when the button is clicked", async () => {
    const user = userEvent.setup();
    const mockDispatch = vi.fn();

    render(
      <MockProvider mockDispatch={mockDispatch}>
        <Button />
      </MockProvider>
    );

    await user.click(screen.getByRole("button"));

    expect(mockDispatch).toHaveBeenCalledWith({ type: SET_READY });
  });
});
