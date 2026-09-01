import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { tracks } from '../../data/tracks.js'
import { ROLES, useRole } from '../../context/RoleContext.jsx'
import { usePlayer } from '../../context/PlayerContext.jsx'
import { Play, Pause, X } from 'lucide-react'

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

export default function Navbar() {
  const [isMusicOpen, setIsMusicOpen] = useState(false)
  const [isRoleOpen, setIsRoleOpen] = useState(false)
  const { role, setRole, roleInfo } = useRole()
  const { currentTrackId, isPlaying, playTrack } = usePlayer()

  const nowPlaying = tracks.find((t) => t.id === currentTrackId)

  function openMusic() {
    setIsRoleOpen(false)
    setIsMusicOpen((prev) => !prev)
  }

  function openRole() {
    setIsMusicOpen(false)
    setIsRoleOpen((prev) => !prev)
  }

  function selectRole(id) {
    setRole(id)
    setIsRoleOpen(false)
  }

  return (
    <>
      <header className="fixed top-6 inset-x-0 z-50 flex justify-center px-4">
        <nav className="inline-flex items-center gap-6 px-6 py-2.5 rounded-full bg-[#121216]/90 border border-white/10 backdrop-blur-md shadow-2xl text-xs font-medium">
          <Link to="/" className="text-white font-semibold flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> Home
          </Link>
          <Link to="/sobre" className="text-neutral-400 hover:text-white transition-colors">
            Sobre Mim
          </Link>
          <Link to="/#projetos" className="text-neutral-400 hover:text-white transition-colors">
            Projetos
          </Link>
          <Link to="/#contato" className="text-neutral-400 hover:text-white transition-colors">
            Contato
          </Link>

          <div className="h-4 w-[1px] bg-white/10 my-auto"></div>

          <button
            type="button"
            onClick={openRole}
            className={`flex items-center gap-2 pl-3 pr-3 py-1.5 rounded-full border transition-all cursor-pointer ${
              isRoleOpen ? 'bg-blue-500/10 border-blue-500/40' : 'bg-white/[0.04] hover:bg-white/[0.08] border-white/10'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
            <span className="text-[11px] font-mono text-neutral-200 font-semibold">{roleInfo.label}</span>
          </button>

          <div className="h-4 w-[1px] bg-white/10 my-auto"></div>

          <button
            type="button"
            onClick={openMusic}
            className="flex items-center gap-2.5 bg-white/[0.04] hover:bg-white/[0.08] pl-1.5 pr-3 py-1 rounded-full border border-white/10 transition-all group cursor-pointer"
          >
            <div
              className={`w-7 h-7 rounded-full bg-neutral-950 border flex items-center justify-center relative shadow-md group-hover:border-blue-400 ${
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
        </nav>
      </header>

      <AnimatePresence>
        {isRoleOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-80 bg-[#121216] border border-white/10 p-4 rounded-2xl shadow-2xl backdrop-blur-xl space-y-3"
          >
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <span className="text-[10px] font-mono text-blue-400 uppercase tracking-wider">// Quem é você?</span>
              <button type="button" onClick={() => setIsRoleOpen(false)} className="text-neutral-500 hover:text-white text-xs">
                ✕
              </button>
            </div>

            <div className="space-y-2 text-xs">
              {Object.values(ROLES).map((option) => {
                const active = role === option.id
                return (
                  <div
                    key={option.id}
                    onClick={() => selectRole(option.id)}
                    className={`p-2.5 rounded-lg flex items-start gap-3 cursor-pointer border transition-all duration-200 ${
                      active ? 'bg-white/5 border-blue-500/30' : 'border-transparent hover:bg-white/5 text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    <div className={`w-2 h-2 rounded-full mt-1 transition-colors duration-200 ${active ? 'bg-blue-500' : 'bg-neutral-700'}`}></div>
                    <div>
                      <p className={active ? 'font-semibold text-white' : 'font-medium'}>{option.label}</p>
                      <p className={`text-[10px] mt-0.5 ${active ? 'text-neutral-400' : 'text-neutral-500'}`}>{option.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isMusicOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-80 bg-[#121216] border border-white/10 p-4 rounded-2xl shadow-2xl backdrop-blur-xl space-y-3"
          >
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <span className="text-[10px] font-mono text-blue-400 uppercase tracking-wider">Select Soundtrack</span>
              <button type="button" onClick={() => setIsMusicOpen(false)} className="text-neutral-500 hover:text-white text-xs">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-2 text-xs">
              {tracks.map((track) => {
                const active = currentTrackId === track.id
                const activePlaying = active && isPlaying
                return (
                  <div
                    key={track.id}
                    onClick={() => playTrack(track)}
                    className={`p-2 rounded-lg flex items-center gap-3 cursor-pointer border transition-all duration-200 ${
                      active ? 'bg-white/5 border-blue-500/30' : 'border-transparent hover:bg-white/5 text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    {activePlaying ? (
                      <EqualizerBars />
                    ) : (
                      <div className={`w-2 h-2 rounded-full transition-colors duration-200 ${active ? 'bg-blue-500' : 'bg-neutral-700'}`}></div>
                    )}
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
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
