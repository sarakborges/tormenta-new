import React from "react";

import "./style.scss";

const Error = () => {
  return (
    <div id="page-error">
      <div>
        <div className="error-title">tl;dr: página não encontrada</div>
        <div className="error-subtitle">
          <a href="#">voltar para a página inicial</a>
        </div>

        <div className="error-message">
          Você viaja por longos milissegundos (Ou até mesmo segundos. Minutos,
          com uma conexão ruim!). Porém, o destino é cruel. A página não é
          encontrada. No auge do seu desespero, os deuses sorriem para você.{" "}
          <a href="#">Um link</a> aparece em sua frente, facilitando a sua volta
          a página inicial. A aventura ainda não acabou.
        </div>
      </div>
    </div>
  );
};

export default Error;
