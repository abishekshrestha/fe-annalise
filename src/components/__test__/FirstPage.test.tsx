import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import FirstPageForm from "../FirstPage/FirstPageForm";

test("should show input error when isValid is false", () => {
  render(
    <BrowserRouter>
      <FirstPageForm isValid={false} />
    </BrowserRouter>
  );

  const inputError = screen.getByText('Please enter a name');
  expect(inputError).toBeInTheDocument();
});

test("should not show input error when isValid is true", () => {
  render(
    <BrowserRouter>
      <FirstPageForm isValid={true} />
    </BrowserRouter>
  );

  const inputError = screen.queryByText('Please enter a name');
  expect(inputError).toBeNull();
});

test("should call handleSubmit on form submit", () => {
  const mockCallBack = jest.fn();
  render(
    <BrowserRouter>
      <FirstPageForm isValid={true} handleSubmit={mockCallBack} />
    </BrowserRouter>
  );

  const formElement = screen.getByTestId('form');
  fireEvent.submit(formElement)

  expect(mockCallBack).toHaveBeenCalled();
});
