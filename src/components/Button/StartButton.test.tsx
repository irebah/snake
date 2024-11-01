import { render, screen } from "@testing-library/react";
import MockProvider from "../../mocks/MockProvider";
import StartButton from "./StartButton";
import userEvent from "@testing-library/user-event";
import { SET_READY } from "../../context/types";

describe("StartButton", () => {
  test("it starts the game when the button is clicked", async () => {
    const user = userEvent.setup();
    const mockDispatch = vi.fn();

    render(
      <MockProvider mockDispatch={mockDispatch}>
        <StartButton />
      </MockProvider>
    );

    await user.click(screen.getByRole("button"));

    expect(mockDispatch).toHaveBeenCalledWith({ type: SET_READY });
  });

  test("it shows the text Start by default", async () => {
    render(
      <MockProvider>
        <StartButton />
      </MockProvider>
    );

    expect(screen.getByRole("button")).toHaveTextContent("Start");
  });

  test("it accepts a text for the button", async () => {
    const text = "dummyText";

    render(
      <MockProvider>
        <StartButton text={text} />
      </MockProvider>
    );

    expect(screen.getByRole("button")).toHaveTextContent(text);
  });
});
