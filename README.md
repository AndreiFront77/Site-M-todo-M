# Método M — Projetos & Consultoria

Site institucional desenvolvido pela **Visível — Desenvolvimento Web**.

## Executar

```bash
npm install
npm run dev
npm run build
```

## Publicar

Importe este repositório na Vercel (framework Vite). Configure `RESEND_API_KEY`, `CONTACT_EMAIL`, `CONTACT_FROM_EMAIL` e `VITE_WHATSAPP_NUMBER` (somente dígitos com DDI 55). Para enviar e-mails, valide o domínio remetente no Resend. Sem essa configuração, o formulário retorna erro de configuração em vez de simular sucesso.

## Imagens

O projeto original usa três imagens da Floot. Elas precisam ser exportadas ou substituídas por imagens licenciadas nos caminhos `public/images/hero.jpg`, `public/images/workshop.jpg` e `public/images/design.jpg`. Até isso ocorrer, o fundo escuro e os gradientes do CSS permanecem, mas as imagens não serão exibidas.

## Observações

A assinatura da Visível está no rodapé. O número do WhatsApp está pendente de configuração.
