import { render, screen } from "@testing-library/react";
import { TradesList } from "../TradesList";

describe(`TradesList`, () => {
  it("renders a list of trades", () => {
    render(<TradesList trades={[]} />);
    const rows = screen.getByRole("row");

    console.log(rows);
  });
});
