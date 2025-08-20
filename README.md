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

1. Abra o arquivo `src/data/projetos.js`.
2. Adicione um novo objeto ao array:

```javascript
export const projetos = [
  { nome: "Projeto A", link: "#", sobre: "Breve descrição" },
  { nome: "Projeto B", link: "#", sobre: "Breve descrição" },
  {
    nome: "Meu Novo Projeto",
    link: "https://github.com/usuario/meu-novo-projeto",
    sobre: "O que ele faz"
  }
];
```

### Adicionando habilidades

1. Abra o arquivo `src/data/habilidades.js`.
2. Inclua novas tecnologias ou linguagens:

```javascript
export const tecnologias = ["React", "Node.js", "Tailwind", "Git", "TypeScript"];

export const linguagens = [
  { nome: "JavaScript", porcentagem: 70 },
  { nome: "Python", porcentagem: 20 },
  { nome: "Outras", porcentagem: 10 },
  { nome: "Go", porcentagem: 5 }
];
```

Após salvar as alterações, o site exibirá automaticamente os novos itens.
