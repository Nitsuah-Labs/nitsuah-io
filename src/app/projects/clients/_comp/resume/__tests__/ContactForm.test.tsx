import { render, screen } from "@testing-library/react";
import ContactForm from "../ContactForm";

describe("ContactForm", () => {
  it("renders contact form and contact info", () => {
    render(<ContactForm />);
    // heading
    expect(
      screen.getByRole("heading", { name: /Get In Touch/i }),
    ).toBeInTheDocument();
    // email input placeholder exists
    expect(screen.getByPlaceholderText(/your@email.com/i)).toBeInTheDocument();
    // contact info value (phone)
    expect(screen.getByText(/\+1 \(555\) 123-4567/)).toBeInTheDocument();
  });
});
