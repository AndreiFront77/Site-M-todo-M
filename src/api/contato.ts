import type {VercelRequest,VercelResponse} from '@vercel/node';
const DEFAULT_TO='somosmetodom@gmail.com';
type ContactPayload={nome?:unknown;email?:unknown;telefone?:unknown;servico?:unknown;mensagem?:unknown};
export default async function handler(req:VercelRequest,res:VercelResponse){
 if(req.method!=='POST')return res.status(405).json({message:'Método não permitido.'});
 let body:ContactPayload=req.body||{};
 if(typeof body==='string'){
  try{body=JSON.parse(body) as ContactPayload}catch{return res.status(400).json({message:'Dados inválidos.'})}
 }
 const nome=typeof body.nome==='string'?body.nome.trim():'';
 const email=typeof body.email==='string'?body.email.trim():'';
 const telefone=typeof body.telefone==='string'?body.telefone.trim():'';
 const servico=typeof body.servico==='string'?body.servico.trim():'';
 const mensagem=typeof body.mensagem==='string'?body.mensagem.trim():'';
 if([nome,email,telefone,servico,mensagem].some(x=>!x))return res.status(400).json({message:'Preencha todos os campos obrigatórios.'});
 if(nome.length>100||email.length>200||telefone.length>35||servico.length>100||mensagem.length>3000||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))return res.status(400).json({message:'Confira os dados informados.'});
 const to=process.env.CONTACT_EMAIL||DEFAULT_TO;
 const subject='Novo contato Método M — '+servico;
 try{
  const r=await fetch('https://formsubmit.co/ajax/'+encodeURIComponent(to),{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify({_subject:subject,_replyto:email,_template:'table',_captcha:'false',Nome:nome,'E-mail':email,Telefone:telefone,Serviço:servico,Mensagem:mensagem})});
  const result=await r.json().catch(()=>({})) as {success?:boolean;message?:string};
  if(!r.ok){
   console.error('FormSubmit rejected contact email',{status:r.status});
   return res.status(502).json({message:'O FormSubmit recusou o envio. Confira se o e-mail de destino foi ativado.'});
  }
  if(result.success===false)return res.status(502).json({message:'Ative o envio pelo e-mail recebido do FormSubmit e tente novamente.'});
  return res.status(200).json({ok:true});
 }catch(error){
  console.error('FormSubmit request failed',error);
  return res.status(502).json({message:'Não foi possível conectar ao FormSubmit. Tente novamente mais tarde.'});
 }
}
