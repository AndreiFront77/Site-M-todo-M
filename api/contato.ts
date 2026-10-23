import type {VercelRequest,VercelResponse} from '@vercel/node';
export default async function handler(req:VercelRequest,res:VercelResponse){
 if(req.method!=='POST')return res.status(405).json({message:'Método não permitido.'});
 const {nome,email,telefone,servico,mensagem}=req.body||{};
 if([nome,email,telefone,servico,mensagem].some(x=>typeof x!=='string'||!x.trim()))return res.status(400).json({message:'Preencha todos os campos obrigatórios.'});
 if(nome.length>100||email.length>200||telefone.length>35||servico.length>100||mensagem.length>3000||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))return res.status(400).json({message:'Confira os dados informados.'});
 const {RESEND_API_KEY,CONTACT_EMAIL,CONTACT_FROM_EMAIL}=process.env;
 if(!RESEND_API_KEY||!CONTACT_EMAIL||!CONTACT_FROM_EMAIL)return res.status(503).json({message:'O envio por e-mail ainda não foi configurado.'});
 try{
 const result=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:'Bearer '+RESEND_API_KEY,'Content-Type':'application/json'},body:JSON.stringify({from:CONTACT_FROM_EMAIL,to:[CONTACT_EMAIL],reply_to:email,subject:'Novo contato Método M — '+servico,text:['Nome: '+nome,'E-mail: '+email,'Telefone: '+telefone,'Serviço: '+servico,'Mensagem: '+mensagem].join('\n')})});
 if(!result.ok)return res.status(502).json({message:'Falha no envio. Tente novamente mais tarde.'});
 return res.status(200).json({ok:true});
 }catch{return res.status(502).json({message:'Falha no envio. Tente novamente mais tarde.'})}
}