import { useState } from 'react'
import { IconArrowRight, IconInstagram, IconLinkedin, IconGithub, IconMail } from '../ui/icons.jsx'
import TopoField from '../layout/TopoField'

const quickLinks = [
  { icon: IconInstagram, label: 'Instagram', hint: 'Perfil / Mensagem', href: 'https://www.instagram.com/luisgustapk/' },
  { icon: IconLinkedin, label: 'LinkedIn', hint: 'Conexão profissional', href: 'https://www.linkedin.com/in/luis-xavier-b71980356/' },
  { icon: IconGithub, label: 'GitHub', hint: 'Repositórios', href: 'https://github.com/Luisgustavopk' },
  { icon: IconMail, label: 'E-mail Direto', hint: 'Abrir cliente local', href: 'mailto:luisgustavoxavier1234@gmail.com' },
]

const FORM_ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT

const FIELD_CLASS =
  'w-full bg-white/[0.04] border rounded-lg px-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none transition-colors'

export default function Contact() {
  const [values, setValues] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')

  function handleChange(event) {
    const { name, value } = event.target
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  function validate() {
    const nextErrors = {}
    if (!values.name.trim()) nextErrors.name = 'Conta seu nome pra eu saber com quem estou falando.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) nextErrors.email = 'Digite um e-mail válido.'
    if (values.message.trim().length < 10) nextErrors.message = 'Escreve uma mensagem um pouco maior (mín. 10 caracteres).'
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

 async function handleSubmit(event) {
    event.preventDefault()
    if (!validate()) return

    setStatus('sending')
    setErrors({}) // Limpa erros anteriores

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          _replyto: values.email,
          message: values.message,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus('success')
        setValues({ name: '', email: '', message: '' })
      } else {
        setStatus('error')

        if (data.errors && Array.isArray(data.errors)) {
          const apiErrors = {}
          data.errors.forEach((err) => {
            if (err.field === 'email') {
              apiErrors.email = 'O e-mail não foi reconhecido. Use um e-mail válido (ex: seu @gmail.com).'
            } else if (err.field === 'name') {
              apiErrors.name = 'Por favor, insira um nome válido.'
            } else if (err.field === 'message') {
              apiErrors.message = 'Sua mensagem precisa de um pouco mais de conteúdo.'
            }
          })
          
          if (Object.keys(apiErrors).length > 0) {
            setErrors(apiErrors)
          }
        }
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contato" className="relative w-full py-20 border-t border-white/10 scroll-mt-28 overflow-hidden bg-transparent">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-600/10 blur-[130px] rounded-full pointer-events-none z-0" />

      <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
        <TopoField speed={0.5} density={0.9} length={1.0} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 space-y-10">
        <div className="text-center space-y-2">
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Vamos Conversar</h2>
          <p className="text-xs text-neutral-400 max-w-md mx-auto">
            Envie uma mensagem direta ou entre em contato através das redes sociais.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <form 
            onSubmit={handleSubmit} 
            noValidate 
            className="md:col-span-7 bg-[#0b0c10]/60 backdrop-blur-md border border-white/10 p-6 rounded-2xl space-y-4 shadow-xl"
          >
            <div className="space-y-1">
              <label className="text-[11px] font-mono text-neutral-400 uppercase">Seu Nome</label>
              <input
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
                placeholder="Como posso te chamar?"
                className={`${FIELD_CLASS} ${errors.name ? 'border-red-500/60' : 'border-white/10 focus:border-blue-500/80'}`}
              />
              {errors.name && <p className="text-[10px] text-red-400 font-mono">{errors.name}</p>}
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-mono text-neutral-400 uppercase">Seu E-mail</label>
              <input
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                placeholder="seuemail@dominio.com"
                className={`${FIELD_CLASS} ${errors.email ? 'border-red-500/60' : 'border-white/10 focus:border-blue-500/80'}`}
              />
              {errors.email && <p className="text-[10px] text-red-400 font-mono">{errors.email}</p>}
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-mono text-neutral-400 uppercase">Mensagem</label>
              <textarea
                name="message"
                rows="4"
                value={values.message}
                onChange={handleChange}
                placeholder="Escreva sua mensagem aqui..."
                className={`${FIELD_CLASS} resize-none ${errors.message ? 'border-red-500/60' : 'border-white/10 focus:border-blue-500/80'}`}
              ></textarea>
              {errors.message && <p className="text-[10px] text-red-400 font-mono">{errors.message}</p>}
            </div>

            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-xs py-3 px-5 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-blue-600/20"
            >
              <span>{status === 'sending' ? 'Enviando...' : 'Enviar Mensagem'}</span>
              {status !== 'sending' && <IconArrowRight />}
            </button>

            {status === 'success' && (
              <p className="text-xs font-mono text-emerald-400 text-center">Mensagem enviada — obrigado pelo contato!</p>
            )}

          </form>

          <div className="md:col-span-5 grid grid-cols-2 md:grid-cols-1 gap-3">
            {quickLinks.map(({ icon: Icon, label, hint, href }) => {
              const isExternal = href.startsWith('http')
              return (
                <a
                  key={label}
                  href={href}
                  {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="bg-[#0b0c10]/60 backdrop-blur-md border border-white/10 hover:border-blue-500/40 p-4 rounded-xl flex items-center gap-3 transition-all group shadow-md"
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
      </div>
    </section>
  )
}