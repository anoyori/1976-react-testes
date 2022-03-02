import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import App, { calcularNovoSaldo, novoSaldo } from "./App";

describe("Componente principal", () => {
  //teste de componentes react
  describe("Quando eu abro o app do banco", () => {
    it("o nome é exibido", () => {
      render(<App />);
      expect(screen.getByText("ByteBank")).toBeInTheDocument();
    });

    it("o saldo é exibido", () => {
      render(<App />);

      expect(screen.getByText("Saldo:")).toBeInTheDocument();
    });

    it("o botão de realizar transação é exibido", () => {
      render(<App />);

      expect(screen.getByText("Realizar operação")).toBeInTheDocument();
    });
  });

  //teste de functions
  describe("Quando eu realizo uma transação", () => {
    it("que é um saque, o valor vai diminuir", () => {
      const valores = {
        transacao: "saque",
        valor: 50,
      };
      const novoSaldo = calcularNovoSaldo(valores, 150);
      expect(novoSaldo).toBe(100);
    });

    it("que é um deposito, o valor vai aumentar", () => {
      const valores = {
        transacao: "deposito",
        valor: 100,
      };
      const novoSaldo = calcularNovoSaldo(valores, 150);
      expect(novoSaldo).toBe(250);
    });

    it("que é um saque, a transação deve ser realizada", () => {
       render(<App />);

      const saldo = screen.getByText("R$ 1000");
      const transacao = screen.getByLabelText("Saque");
      const valor = screen.getByTestId("valor");
      const botaoTransacao = screen.getByText("Realizar operação");

      expect(saldo.textContent).toBe("R$ 1000");

      fireEvent.click(transacao, { target: { value: "saque" } });
      fireEvent.change(valor, { target: { value: 10 } });
      fireEvent.click(botaoTransacao);

      expect(saldo.textContent).toBe("R$ 990");
    });

    it("que é um deposito, a transação deve ser realizada", () => {
      render(<App />);

      const saldo = screen.getByText("R$ 1000");
      const transacao = screen.getByLabelText("Depósito");
      const valor = screen.getByTestId("valor");
      const botaoTransacao = screen.getByText("Realizar operação");

      expect(saldo.textContent).toBe("R$ 1000");

      fireEvent.click(transacao, { target: { value: "deposito" } });
      fireEvent.change(valor, { target: { value: 200 } });
      fireEvent.click(botaoTransacao);

      expect(saldo.textContent).toBe("R$ 1200");
    });
  });
});
