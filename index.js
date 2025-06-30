require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

app.post('/mensagem', async (req, res) => {
  const { mensagem } = req.body;

  try {
    const resposta = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: 'Você é um assistente empático que trabalha para um psicólogo. Suas respostas devem acolher, validar sentimentos, oferecer apoio emocional leve e informar sobre os serviços disponíveis. Nunca ofereça diagnósticos.'
          },
          {
            role: 'user',
            content: mensagem
          }
        ],
        temperature: 0.8
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    res.json({ resposta: resposta.data.choices[0].message.content });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao acessar o GPT' });
  }
});

app.listen(3000, () => console.log('Bot rodando na porta 3000'));
