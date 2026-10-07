# Landing page: acessórios importados

Site estático (HTML, CSS e JS puro). Sem build, sem dependências. Abre direto no navegador.

## Estrutura

```
index.html              página única
assets/css/style.css    estilos (cores e fontes nas variáveis do :root)
assets/js/config.js     marca, WhatsApp, Instagram, analytics
assets/js/produtos.js   catálogo de produtos
assets/js/app.js        renderiza a vitrine, links de WhatsApp, SEO
assets/img/             fotos dos produtos (use .webp, até ~100 KB cada)
robots.txt, sitemap.xml SEO
.github/workflows/      deploy automático no GitHub Pages
```

## Rodar local

Abra `index.html` no navegador, ou rode `python3 -m http.server 8000` na pasta.

## Personalizar

1. `config.js`: troque marca, número de WhatsApp e Instagram.
2. `produtos.js`: adicione produtos e fotos.
3. `style.css`: ajuste as cores em `:root`.
4. Troque `SEU-DOMINIO.com.br` em `index.html`, `robots.txt` e `sitemap.xml`.

## Publicar (GitHub Pages)

1. Crie um repositório no GitHub e envie o projeto na branch `main`.
2. Em Settings > Pages, escolha "GitHub Actions" como source.
3. Cada push na `main` publica o site automaticamente.
4. Domínio próprio: configure em Settings > Pages e aponte o DNS.

## Checklist antes de divulgar

- [ ] Fotos reais dos produtos em .webp
- [ ] Preços e disponibilidade revisados
- [ ] Imagem `og-image.jpg` (1200x630) em `assets/img/`
- [ ] Testar o botão de WhatsApp no celular
- [ ] Lighthouse com nota alta em performance e acessibilidade
