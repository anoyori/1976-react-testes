import React from "react";

import { fireEvent, render, screen } from "@testing-library/react";
import Conta from "./Conta";

describe("Componente de conta", () => {
  it("O snapshot do component deve permanecer o mesmo", () => {
    const { container } = render(
      <Conta saldo={20} realizarTransacao="saque" />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it("Exibir o saldo da conta com formatação monetária", () => {
    render(<Conta saldo={1000} />);
    const saldo = screen.getByTestId("saldo-conta");

    expect(saldo.textContent).toBe("R$ 1000");
  });

  it("Chama a função de realizar transação, quando o botão é clicado", () => {
    //simula uma function
    const funcaoRealizarTransacao = jest.fn();

    render(<Conta saldo={1000} realizarTransacao={funcaoRealizarTransacao} />);

    //FireEvent simula eventos de comportamento
    fireEvent.click(screen.getByText("Realizar operação"));
    expect(funcaoRealizarTransacao).toHaveBeenCalled();
  });
});
