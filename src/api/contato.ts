import type {VercelRequest,VercelResponse} from '@vercel/node';
const DEFAULT_TO='somosmetodom@gmail.com';
export default async function handler(req:VercelRequest,res:VercelResponse){
 if(req.method!=='POST')return res.status(405).json({message:'Método não permitido.'});
 const {nome,email,telefone,servico,mensagem}=req.body||{};
 if([nome,email,telefone,servico,mensagem].some(x=>typeof x!=='string'||!x.trim()))return res.status(400).json({message:'Preencha todos os campos obrigatórios.'});
 if(nome.length>100||email.length>200||telefone.length>35||servico.length>100||mensagem.length>3000||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))return res.status(400).json({message:'Confira os dados informados.'});
 const {RESEND_API_KEY,CONTACT_EMAIL,CONTACT_FROM_EMAIL}=process.env;
 const to=CONTACT_EMAIL||DEFAULT_TO;
 const subject='Novo contato Método M — '+servico;
 const text=['Nome: '+nome,'E-mail: '+email,'Telefone: '+telefone,'Serviço: '+servico,'Mensagem: '+mensagem].join('\n');
 try{
  // Opção 1 (recomendada em produção): Resend, com domínio remetente validado.
  if(RESEND_API_KEY&&CONTACT_FROM_EMAIL){
   const r=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:'Bearer '+RESEND_API_KEY,'Content-Type':'application/json'},body:JSON.stringify({from:CONTACT_FROM_EMAIL,to:[to],reply_to:email,subject,text})});
   if(!r.ok)return res.status(502).json({message:'Falha no envio. Tente novamente mais tarde.'});
   return res.status(200).json({ok:true});
  }
  // Opção 2 (funciona sem configuração): FormSubmit entrega no e-mail de destino.
  // No primeiro envio, o Gmail recebe um e-mail de ativação que precisa ser confirmado.
  const r=await fetch('https://formsubmit.co/ajax/'+encodeURIComponent(to),{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json',Origin:'https://'+(req.headers.host||'localhost'),Referer:'https://'+(req.headers.host||'localhost')+'/'},body:JSON.stringify({_subject:subject,_replyto:email,_template:'table',_captcha:'false',Nome:nome,'E-mail':email,Telefone:telefone,Serviço:servico,Mensagem:mensagem})});
  const j:any=await r.json().catch(()=>({}));
  if(!r.ok||String(j.success)==='false')return res.status(502).json({message:'Falha no envio. Tente novamente mais tarde.'});
  return res.status(200).json({ok:true});
 }catch{return res.status(502).json({message:'Falha no envio. Tente novamente mais tarde.'})}
}
