const ENDERECO_API = "https://api.groq.com/openai/v1/chat/completions";

async function gerarTexto() {
  const campoTexto = document.getElementById("prompt-usuario");
  const botaoGerar = document.getElementById("btn-gerar");
  const espacoSite = document.getElementById("resultado-historia");
  
  const temaDigitado = campoTexto.value.trim();

  // Validação simples para não enviar prompt vazio
  if (!temaDigitado) {
    alert("Por favor, digite um tema para a história!");
    return;
  }

  // Ativa o estado de carregamento na interface
  botaoGerar.disabled = true;
  botaoGerar.textContent = "Gerando história...";
  espacoSite.textContent = "A IA está criando sua história, aguarde...";
  espacoSite.style.color = "#71717a";

  try {
    const resposta = await fetch(ENDERECO_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer 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"
      },
      body: JSON.stringify({
        "model": "llama-3.3-70b-versatile",
        "messages": [
          {
            "role": "system",
            "content": "Você é um contador de histórias infantis especialista. Crie uma história leve, divertida e curta com o tema sugerido pelo usuário. IMPORTANTE: Use obrigatoriamente o nome 'Ághata' se a história principal for com uma menina, e 'Gael' se for com um menino."
          },
          {
            "role": "user",
            "content": temaDigitado
          }
        ],
        "temperature": 0.7
      })
    });

    if (!resposta.ok) {
      throw new Error(`Erro na API: ${resposta.status}`);
    }

    const dados = await resposta.json();
    const resultado = dados.choices[0].message.content;
    
    // Renderiza o resultado com sucesso
    espacoSite.textContent = resultado;
    espacoSite.style.color = "#d4d4d8";

  } catch (erro) {
    console.error("Erro ao buscar a história:", erro);
    espacoSite.textContent = "Ops! Ocorreu um erro ao gerar a história. Verifique sua conexão ou a chave da API.";
    espacoSite.style.color = "#ef4444"; // Cor vermelha de erro
  } finally {
    // Restaura o botão independente de dar certo ou errado
    botaoGerar.disabled = false;
    botaoGerar.textContent = "Criar História";
  }
}


