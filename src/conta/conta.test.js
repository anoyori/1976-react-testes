import React from "react";

import { render } from "@testing-library/react";
import Conta from "./Conta";

describe("Componente de conta", () => {
  it("O snapshot do component deve permanecer o mesmo", () => {
    const { container } = render(
      <Conta saldo={20} realizarTransacao="saque" />
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
