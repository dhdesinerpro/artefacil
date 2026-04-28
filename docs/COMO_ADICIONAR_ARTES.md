# Como adicionar novas artes ao catálogo

Fluxo padrão definido com o Douglas:

## Regras

- Categoria: identificar pela imagem. Se houver dúvida, confirmar antes.
- Número: usar sempre o próximo disponível, seguindo a sequência `arte103`, `arte104`, `arte105`...
- Imagem: usar a imagem enviada como referência e salvar como `preview.jpg`, `preview.jpeg` ou extensão equivalente.
- Campos especiais: criar conforme a arte, mas manter apenas os campos principais, no mesmo padrão das páginas atuais.
- Página: criar página pronta para uso, com formulário, confirmação, prompt gerado, botão copiar, download da referência, links ChatGPT/Gemini e tutorial.
- Catálogo: adicionar a nova arte no `index.html`, na categoria correta, e atualizar o contador.

## Estrutura esperada

```text
arte103/
  index.html
  preview.jpg
```

## Padrão visual

Todas as páginas internas devem usar:

```html
<link rel="stylesheet" href="../style-art.css">
```

O catálogo principal deve usar:

```html
<link rel="stylesheet" href="style.css">
```

## Observação

Quando uma categoria nova aparecer, adicionar também o filtro correspondente no topo do catálogo.
