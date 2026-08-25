import { IconArrowRight, IconWhatsapp, IconLinkedin, IconGithub, IconMail } from '../ui/icons.jsx'

const quickLinks = [
  { icon: IconWhatsapp, label: 'WhatsApp', hint: 'Conversa direta', href: 'https://wa.me/' },
  { icon: IconLinkedin, label: 'LinkedIn', hint: 'Conexão profissional', href: 'https://linkedin.com' },
  { icon: IconGithub, label: 'GitHub', hint: 'Repositórios', href: 'https://github.com' },
  { icon: IconMail, label: 'E-mail Direto', hint: 'Abrir cliente local', href: 'mailto:seu-email@pucminas.br' },
]

export default function Contact() {
  return (
    <section id="contato" className="max-w-4xl mx-auto px-6 py-20 space-y-10 border-t border-white/10">
      <div className="text-center space-y-2">
        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Vamos Conversar</h2>
        <p className="text-xs text-neutral-400 max-w-md mx-auto">
          Envie uma mensagem direta ou entre em contato através das redes sociais.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        <form
          action="https://formspree.io/f/seu-id-aqui"
          method="POST"
          className="md:col-span-7 bg-darkCard border border-white/10 p-6 rounded-2xl space-y-4 shadow-xl"
        >
          <div className="space-y-1">
            <label className="text-[11px] font-mono text-neutral-400 uppercase">Seu Nome</label>
            <input
              type="text"
              name="name"
              required
              placeholder="Como posso te chamar?"
              className="w-full bg-[#18181B] border border-white/10 rounded-lg px-4 py-2.5 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-blue-500/80 transition-colors"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-mono text-neutral-400 uppercase">Seu E-mail</label>
            <input
              type="email"
              name="email"
              required
              placeholder="seuemail@dominio.com"
              className="w-full bg-[#18181B] border border-white/10 rounded-lg px-4 py-2.5 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-blue-500/80 transition-colors"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-mono text-neutral-400 uppercase">Mensagem</label>
            <textarea
              name="message"
              rows="4"
              required
              placeholder="Escreva sua mensagem aqui..."
              className="w-full bg-[#18181B] border border-white/10 rounded-lg px-4 py-2.5 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-blue-500/80 transition-colors resize-none"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs py-3 px-5 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-blue-600/20"
          >
            <span>Enviar Mensagem</span>
            <IconArrowRight />
          </button>
        </form>

        <div className="md:col-span-5 grid grid-cols-2 md:grid-cols-1 gap-3">
          {quickLinks.map(({ icon: Icon, label, hint, href }) => {
            const isExternal = href.startsWith('http')
            return (
              <a
                key={label}
                href={href}
                {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="bg-darkCard border border-white/10 hover:border-blue-500/40 p-4 rounded-xl flex items-center gap-3 transition-all group"
              >
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-neutral-400 group-hover:text-blue-400 transition-colors">
                  <Icon />
                </div>
                <div>
                  <span className="block text-xs font-semibold text-white">{label}</span>
                  <span className="text-[10px] text-neutral-500">{hint}</span>
                </div>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
