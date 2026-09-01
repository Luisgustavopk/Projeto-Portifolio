import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { AlignRight, X, ChevronRight } from 'lucide-react'
import { tracks } from '../../data/tracks.js'
import { ROLES, useRole } from '../../context/RoleContext.jsx'
import { usePlayer } from '../../context/PlayerContext.jsx'

function EqualizerBars() {
  return (
    <span className="flex items-end gap-[2px] h-3">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-[2px] bg-blue-400 rounded-full animate-pulse"
          style={{ height: '100%', animationDuration: '0.9s', animationDelay: `${i * 0.15}s` }}
        ></span>
      ))}
    </span>
  )
}

function TargetIcon({ active, isPlaying }) {
  return (
    <div
      className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
        active ? 'border-blue-400' : 'border-neutral-700'
      } ${active && isPlaying ? 'animate-vinyl-spin' : ''}`}
    >
      <div className={`w-1 h-1 rounded-full ${active ? 'bg-blue-400' : 'bg-neutral-600'}`}></div>
    </div>
  )
}

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMusicOpen, setIsMusicOpen] = useState(false)
  const [isRoleOpen, setIsRoleOpen] = useState(false)

  const { role, setRole, roleInfo } = useRole()
  const { currentTrackId, isPlaying, playTrack } = usePlayer()

  const nowPlaying = tracks.find((t) => t.id === currentTrackId)

  const navLinks = [
    { label: 'Sobre Mim', path: '/sobre' },
    { label: 'Projetos', path: '/#projetos' },
    { label: 'Contato', path: '/#contato' },
  ]

  function selectRole(id) {
    setRole(id)
    setIsRoleOpen(false)
  }

  const renderTrackList = () => (
    <>
      <div className="space-y-2 text-xs">
        {tracks.map((track) => {
          const active = currentTrackId === track.id
          return (
            <div
              key={track.id}
              onClick={() => playTrack(track)}
              className={`p-2 rounded-lg flex items-center gap-3 cursor-pointer border transition-all duration-200 ${
                active ? 'bg-white/5 border-blue-500/30' : 'border-transparent hover:bg-white/5 text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <TargetIcon active={active} isPlaying={isPlaying} />

              <div className="truncate flex-1">
                <p className={`truncate ${active ? 'font-semibold text-white' : 'font-medium'}`}>{track.title}</p>
                <p className={`text-[10px] ${active ? 'text-neutral-400' : 'text-neutral-500'}`}>{track.source}</p>
              </div>

              {active && (
                <div className="shrink-0 p-1 text-blue-400">
                  {isPlaying ? (
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <rect x="6" y="4" width="4" height="16" rx="1" />
                      <rect x="14" y="4" width="4" height="16" rx="1" />
                    </svg>
                  ) : (
                    <svg className="w-3.5 h-3.5 fill-current ml-0.5" viewBox="0 0 24 24">
                      <polygon points="6 3 20 12 6 21 6 3" />
                    </svg>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
      <p className="text-[9px] font-mono text-neutral-600 pt-1 border-t border-white/5">
        volume baixo, só um clima de fundo
      </p>
    </>
  )

  return (
    <>
      <header className="fixed top-4 sm:top-6 inset-x-0 z-50 flex justify-center px-4">
        <nav className="inline-flex items-center gap-3 md:gap-6 px-4 py-2.5 rounded-full bg-[#121216]/90 border border-white/10 backdrop-blur-md shadow-2xl text-xs font-medium w-full max-w-sm sm:max-w-md md:max-w-max justify-between md:justify-start">
          
          {/* Logo / Link Home */}
          <Link to="/" className="text-white font-semibold flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> Home
          </Link>
          {/* Links Desktop */}
          <div className="hidden md:flex items-center gap-5">
            <div className="h-4 w-[1px] bg-white/10"></div>
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path} className="text-neutral-400 hover:text-white transition-colors">
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:block h-4 w-[1px] bg-white/10"></div>

          {/* Seletor de Role (Desktop) */}
          <button
            type="button"
            onClick={() => { setIsMusicOpen(false); setIsRoleOpen((prev) => !prev); }}
            className={`hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
              isRoleOpen ? 'bg-blue-500/10 border-blue-500/40' : 'bg-white/[0.04] hover:bg-white/[0.08] border-white/10'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
            <span className="text-[11px] font-mono text-neutral-200 font-semibold">{roleInfo.label}</span>
          </button>

          {/* Player de Música (Desktop) */}
          <button
            type="button"
            onClick={() => { setIsRoleOpen(false); setIsMusicOpen((prev) => !prev); }}
            className="hidden md:flex items-center gap-2 bg-white/[0.04] hover:bg-white/[0.08] pl-1.5 pr-3 py-1 rounded-full border border-white/10 transition-all group cursor-pointer"
          >
            <div
              className={`w-7 h-7 rounded-full bg-neutral-950 border flex items-center justify-center relative shadow-md group-hover:border-blue-400 shrink-0 ${
                isPlaying ? 'border-blue-500/70 animate-vinyl-spin' : 'border-neutral-700'
              }`}
            >
              <div className="absolute inset-1 rounded-full border border-neutral-800"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-blue-500 flex items-center justify-center">
                <div className="w-0.5 h-0.5 rounded-full bg-black"></div>
              </div>
            </div>
            <div className="text-left">
              <span className="block text-[8px] font-mono text-neutral-500 uppercase leading-none">
                {isPlaying ? 'Now Playing' : 'Favorite Track'}
              </span>
              <span className="text-[11px] font-mono text-neutral-200 font-semibold group-hover:text-blue-400 transition-colors flex items-center gap-1.5">
                {nowPlaying ? nowPlaying.title : 'Vinyl OST'}
                {isPlaying && <EqualizerBars />}
              </span>
            </div>
          </button>

          {/* Botão Hambúrguer Mobile */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="md:hidden flex items-center justify-center p-2 rounded-full bg-white/5 border border-white/10 text-neutral-300 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
            aria-label="Abrir Menu"
          >
            {isMobileMenuOpen ? <X className="w-4 h-4 text-white" /> : <AlignRight className="w-4 h-4 text-white" />}
          </button>
        </nav>
      </header>

      {/* Menu Expansível Mobile */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed top-20 left-4 right-4 z-50 md:hidden bg-[#121216]/95 border border-white/10 p-5 rounded-3xl shadow-2xl backdrop-blur-2xl space-y-5 max-w-sm mx-auto max-h-[80vh] overflow-y-auto"
          >
            {/* Navegação */}
            <div className="space-y-1 border-b border-white/10 pb-4">
              <span className="text-[10px] font-mono text-blue-400 uppercase tracking-wider block mb-2 px-1">NAVEGAÇÃO</span>
              <Link
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between p-2.5 rounded-xl text-sm font-medium text-white hover:bg-white/5 transition-colors"
              >
                <span>Home</span>
                <ChevronRight className="w-4 h-4 text-neutral-600" />
              </Link>
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between p-2.5 rounded-xl text-sm font-medium text-neutral-300 hover:text-white hover:bg-white/5 transition-colors"
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-4 h-4 text-neutral-600" />
                </Link>
              ))}
            </div>

            {/* MODO DE VISUALIZAÇÃO */}
            <div className="space-y-3 border-b border-white/10 pb-4">
              <div className="text-[10px] font-mono text-blue-400 tracking-wider uppercase">
                MODO DE VISUALIZAÇÃO
              </div>
              <div className="grid grid-cols-3 gap-2">
                {Object.values(ROLES).map((option) => {
                  const active = role === option.id
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => selectRole(option.id)}
                      className={`py-2 px-2 text-center rounded-2xl text-[11px] font-mono transition-all border cursor-pointer ${
                        active
                          ? 'bg-blue-950/40 border-blue-500/80 text-blue-300 font-bold shadow-[0_0_12px_rgba(59,130,246,0.15)]'
                          : 'bg-white/[0.04] border-transparent text-neutral-400 hover:text-neutral-200'
                      }`}
                    >
                      {option.label}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* TRILHA SONORA */}
            <div className="space-y-3">
              <div className="text-[10px] font-mono text-blue-400 tracking-wider uppercase flex items-center justify-between">
                <span>TRILHA SONORA</span>
                {isPlaying && <EqualizerBars />}
              </div>
              {renderTrackList()}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal QUEM É VOCÊ? (Desktop) */}
      <AnimatePresence>
        {isRoleOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            className="hidden md:block fixed top-20 left-1/2 -translate-x-1/2 z-50 w-72 bg-[#121216] border border-white/10 p-4 rounded-2xl shadow-2xl backdrop-blur-xl space-y-2"
          >
             <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <span className="text-[10px] font-mono text-blue-400 uppercase tracking-wider">Quem é você?</span>
            <button type="button" onClick={() => setIsRoleOpen(false)} className="text-neutral-500 hover:text-white text-xs">
               <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            {Object.values(ROLES).map((option) => (
              <div
                key={option.id}
                onClick={() => selectRole(option.id)}
                className={`p-2.5 rounded-lg flex items-start gap-3 cursor-pointer border transition-all ${
                  role === option.id ? 'bg-white/5 border-blue-500/30' : 'border-transparent hover:bg-white/5 text-neutral-400'
                }`}
              >
                <div className={`w-2 h-2 rounded-full mt-1 ${role === option.id ? 'bg-blue-500' : 'bg-neutral-700'}`}></div>
                <div>
                  <p className={role === option.id ? 'font-semibold text-white text-xs' : 'font-medium text-xs'}>{option.label}</p>
                  <p className="text-[10px] text-neutral-500 mt-0.5">{option.description}</p>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal SELECT SOUNDTRACK (Desktop) */}
      <AnimatePresence>
        {isMusicOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            className="hidden md:block fixed top-20 left-1/2 -translate-x-1/2 z-50 w-72 bg-[#121216] border border-white/10 p-4 rounded-2xl shadow-2xl backdrop-blur-xl space-y-3"
          >
            <div className="text-[10px] font-mono text-blue-400 tracking-wider uppercase pb-2 border-b border-white/10 flex items-center justify-between">
              <span>SELECT SOUNDTRACK</span>
              <button type="button" onClick={() => setIsMusicOpen(false)} className="text-neutral-500 hover:text-white text-xs">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            {renderTrackList()}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}