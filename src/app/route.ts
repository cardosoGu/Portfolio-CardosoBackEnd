import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Todos os campos são obrigatórios.' },
        { status: 400 }
      );
    }

    // Configuração do transporter
    // Para Gmail: habilite "Acesso de app menos seguro" ou use uma "Senha de App"
    // Variáveis de ambiente necessárias no .env.local:
    //   SMTP_USER=seu@gmail.com
    //   SMTP_PASS=sua_senha_de_app
    //   CONTACT_EMAIL=email_que_recebe_as_mensagens
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"${name}" <${process.env.SMTP_USER}>`,
      replyTo: email,
      to: process.env.CONTACT_EMAIL ?? process.env.SMTP_USER,
      subject: `[Portfólio] Nova mensagem de ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto; color: #18181b;">
          <h2 style="margin-bottom: 4px;">Nova mensagem do portfólio</h2>
          <p style="color: #71717a; margin-top: 0; margin-bottom: 24px; font-size: 14px;">
            Recebida pelo formulário de contato
          </p>

          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e4e4e7; color: #71717a; width: 80px;">
                Nome
              </td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e4e4e7; font-weight: 600;">
                ${name}
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e4e4e7; color: #71717a;">
                Email
              </td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e4e4e7;">
                <a href="mailto:${email}" style="color: #3b82f6;">${email}</a>
              </td>
            </tr>
          </table>

          <div style="margin-top: 24px;">
            <p style="color: #71717a; font-size: 13px; margin-bottom: 8px;">MENSAGEM</p>
            <p style="background: #f4f4f5; border-radius: 8px; padding: 16px; line-height: 1.6; white-space: pre-wrap;">
              ${message}
            </p>
          </div>

          <p style="margin-top: 32px; font-size: 12px; color: #a1a1aa;">
            Responda diretamente para este email — o reply-to já está configurado.
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Erro ao enviar email:', err);
    return NextResponse.json(
      { error: 'Erro ao enviar mensagem. Tente novamente.' },
      { status: 500 }
    );
  }
}
