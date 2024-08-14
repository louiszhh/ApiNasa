import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API = () => {
  const [dadosApod, setDadosApod] = useState(null);
  const [erro, setErro] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const buscarDadosApod = async () => {
      try {
        const resposta = await axios.get(
          `https://api.nasa.gov/planetary/apod?api_key=jNM4u5U4iZtq480iAnbpxMrX14eJq1mdjSNgKDBT`
        );
        if (resposta.status === 200) {
          setDadosApod(resposta.data);
        } else {
          setErro(`Erro na resposta da API: ${resposta.status}`);
        }
      } catch (err) {
        console.error('Erro ao buscar dados:', err);
        setErro('Erro ao buscar dados. Verifique a chave da API ou sua conexão.');
      } finally {
        setCarregando(false);
      }
    };

    buscarDadosApod();
  }, []);

  if (carregando) return <p className="carregando">Carregando...</p>;
  if (erro) return <p className="erro">{erro}</p>;

  return (
    <div className="container-apod">
      <h1 className="titulo-apod">Imagem do Dia da Astronomia</h1>
      {dadosApod && (
        <div className="conteudo-apod">
          <h2 className="titulo-apod-conteudo">{dadosApod.title}</h2>
          <p className="data-apod">{dadosApod.date}</p>
          {dadosApod.media_type === 'image' ? (
            <img src={dadosApod.url} alt={dadosApod.title} className="imagem-apod" />
          ) : (
            <iframe
              title={dadosApod.title}
              src={dadosApod.url}
              frameBorder="0"
              allowFullScreen
              className="video-apod"
            />
          )}
          <p className="descricao-apod">{dadosApod.explanation}</p>
        </div>
      )}
    </div>
  );
};

export default API;
