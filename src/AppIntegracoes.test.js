import React from "react";
import { render, screen } from "@testing-library/react";
import api from "./api";
import App from "./App";

jest.mock("./api");

describe("Requisições para API", () => {
  it("Exibir lista de transações através da API", async () => {
    api.listaTransacoes.mockResolvedValue([
      {
        valor: "10",
        transacao: "saque",
        data: "02/03/2022",
        id: 1,
      },
      {
        transacao: "deposito",
        valor: "20",
        data: "02/03/2022",
        id: 2,
      },
    ]);

    render(<App />);

    //busca elemento que ainda irá aparecer no DOM
    expect(await screen.findByText("saque")).toBeInTheDocument();

    //busca elementos que já estão no DOM
    expect(screen.getByTestId("transacoes").children.length).toBe(2);
  });
});
