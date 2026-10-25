# Método M — Projetos & Consultoria

Site institucional desenvolvido pela **Visível — Desenvolvimento Web**.

## Executar

```bash
npm install
npm run dev
npm run build
```

## Publicar

Importe este repositório na Vercel (framework Vite). Funciona sem variáveis de ambiente:

- **WhatsApp:** botão flutuante e botão na seção de contato abrem conversa com (51) 99157-0759 e mensagem pré-preenchida. Para trocar, defina `VITE_WHATSAPP_NUMBER` (somente dígitos, com 55).
- **E-mail:** o formulário usa o FormSubmit e envia para `somosmetodom@gmail.com`. No primeiro envio, o FormSubmit envia uma mensagem de ativação para esse endereço; confirme-a para liberar os próximos envios. Opcionalmente, defina `CONTACT_EMAIL` na Vercel para trocar o destinatário.

## Imagens e identidade

Os ambientes ficam em `public/images/` (`metodo-m-hero.webp`, `metodo-m-projetos.webp`, `metodo-m-conceito.webp`, 1920×1080). São ilustrações próprias; para usar fotos reais licenciadas, substitua os arquivos mantendo os nomes.

## Créditos

Desenvolvido pela Visível — Desenvolvimento Web.
