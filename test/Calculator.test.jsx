import React from "react"; // Add this if Jest complains
import { render, screen, fireEvent } from "@testing-library/react";
import Calculator from "../src/components/Calculator";
import userEvent from "@testing-library/user-event";

test("Renders component elements and render component with no value", () => {
    const { getByTestId } = render(<Calculator />);
    // Input
    const inputElementByHolder = screen.getByTestId("Input");
    expect(inputElementByHolder).toBeInTheDocument();

    // calculate button
    const button = getByTestId('btn-click');
    expect(button).toHaveTextContent("Calculate");

    // Output with default value
    screen.getByTestId("Input");
    expect(screen.getByText("0")).toBeInTheDocument();
});

test("Validate input as 1 and render component", async()=>{
    const { getByTestId } = render(<Calculator />);
    const inputElement = screen.getByTestId("Input");

    await userEvent.type(inputElement, "1")
    expect(inputElement).toHaveTextContent("1");

    fireEvent.click(getByTestId('btn-click'));
    const outElement = screen.getByTestId("Output");
    expect(outElement).toHaveTextContent("1");
});

test("Allow input as 1,5 and render component", async()=>{
    const { getByTestId } = render(<Calculator />);
    const inputElement = screen.getByTestId("Input");

    await userEvent.type(inputElement, "1,5")
    expect(inputElement).toHaveTextContent("1,5");

    fireEvent.click(getByTestId('btn-click'));
    const outElement = screen.getByTestId("Output");
    expect(outElement).toHaveTextContent("6");
});

test("Allow input as 1\\n2,3 and render component", async()=>{
    const { getByTestId } = render(<Calculator />);
    const inputElement = screen.getByTestId("Input");

    await userEvent.type(inputElement, "1\\n2,3")
    fireEvent.click(getByTestId('btn-click'));
    const outElement = screen.getByTestId("Output");
    expect(outElement).toHaveTextContent("6");
});

test("Allow diffrent delimiter //;\\n1;2 and render component", async()=>{
    const { getByTestId } = render(<Calculator />);
    const inputElement = screen.getByTestId("Input");

    await userEvent.type(inputElement, "//;\\n1;2")
    fireEvent.click(getByTestId('btn-click'));
    const outElement = screen.getByTestId("Output");
    expect(outElement).toHaveTextContent("3");
});

test("Negative number not allow with inout -1,2 and render component", async()=>{
    const { getByTestId } = render(<Calculator />);
    const inputElement = screen.getByTestId("Input");

    await userEvent.type(inputElement, "-1,2")
    fireEvent.click(getByTestId('btn-click'));

    const outElement = screen.getByTestId("Output");
    expect(outElement).toHaveTextContent("Error");

    const errorElement = screen.getByTestId("negative_number");
    expect(errorElement).toHaveTextContent("Negative numbers not allowed");
});

test("Now Allow special character with input 2,3,4,3+ and render component", async()=>{
    const { getByTestId } = render(<Calculator />);
    const inputElement = screen.getByTestId("Input");

    await userEvent.type(inputElement, "2,3,4,3+")
    fireEvent.click(getByTestId('btn-click'));

    const outElement = screen.getByTestId("Output");
    expect(outElement).toHaveTextContent("Error");

    const errorElement = screen.getByTestId("negative_number");
    expect(errorElement).toHaveTextContent("Specail chars not allowed:");
});

