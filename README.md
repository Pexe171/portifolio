# Portfólio React

Este projeto é um portfólio pessoal construído com React e Tailwind CSS.

## Requisitos

- Node.js 18+
- npm

## Como rodar

```bash
npm install
npm start
```

O site ficará disponível em `http://localhost:3000`.

## Personalização

### Adicionando projetos

1. Abra o arquivo `src/data/projetos.json`.
2. Adicione um novo objeto ao array:

```javascript
[
  { "nome": "Projeto A", "link": "#" },
  { "nome": "Projeto B", "link": "#" },
  { "nome": "Meu Novo Projeto", "link": "https://github.com/usuario/meu-novo-projeto" }
]
```

### Adicionando habilidades

1. Abra o arquivo `src/data/habilidades.json`.
2. Inclua novas tecnologias ou linguagens:

```javascript
{
  "tecnologias": ["React", "Node.js", "Tailwind", "Git", "TypeScript"],
  "linguagens": [
    { "nome": "JavaScript", "porcentagem": 70 },
    { "nome": "Python", "porcentagem": 20 },
    { "nome": "Outras", "porcentagem": 10 },
    { "nome": "Go", "porcentagem": 5 }
  ]
}

### Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com os seguintes valores:

```bash
REACT_APP_FORMSPREE_ID=mjkoqroz
REACT_APP_GITHUB_USERNAME=Pexe
```
```

Após salvar as alterações, o site exibirá automaticamente os novos itens.
