import { useEffect, useRef } from "react"

function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -9999, y: -9999 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const particleColor = "129, 140, 248"
    const connectColor = "129, 140, 248"
    const particles: {
      x: number; y: number; vx: number; vy: number; size: number
    }[] = []
    let animId: number
    const PARTICLE_COUNT = 150

    function resize() {
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    function init() {
      if (!canvas) return
      particles.length = 0
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          size: Math.random() * 2.5 + 0.8,
        })
      }
    }

    function draw() {
      if (!canvas || !ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1
      }

      const mouse = mouseRef.current
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i]
        const dxm = p1.x - mouse.x
        const dym = p1.y - mouse.y
        const distm = Math.sqrt(dxm * dxm + dym * dym)
        if (distm < 220) {
          ctx.beginPath()
          ctx.moveTo(p1.x, p1.y)
          ctx.lineTo(mouse.x, mouse.y)
          ctx.strokeStyle = `rgba(${connectColor}, ${0.35 * (1 - distm / 220)})`
          ctx.lineWidth = 1
          ctx.stroke()
        }
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 150) {
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(${connectColor}, ${0.15 * (1 - dist / 150)})`
            ctx.lineWidth = 0.6
            ctx.stroke()
          }
        }
      }

      for (const p of particles) {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${particleColor}, 0.65)`
        ctx.fill()
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${particleColor}, 0.08)`
        ctx.fill()
      }

      animId = requestAnimationFrame(draw)
    }

    resize()
    init()
    draw()

    function onResize() { resize(); init() }
    function onMouseMove(e: MouseEvent) { mouseRef.current = { x: e.clientX, y: e.clientY } }
    function onMouseLeave() { mouseRef.current = { x: -9999, y: -9999 } }

    window.addEventListener("resize", onResize)
    document.addEventListener("mousemove", onMouseMove)
    document.addEventListener("mouseleave", onMouseLeave)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener("resize", onResize)
      document.removeEventListener("mousemove", onMouseMove)
      document.removeEventListener("mouseleave", onMouseLeave)
    }
  }, [])

  return <canvas id="particle-canvas" ref={canvasRef} />
}

function GitHubIcon() {
  return (
    <svg className="size-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg className="size-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
    </svg>
  )
}

function App() {
  const tags = [
    "Java", "Spring Boot", "Python", "FastAPI",
    "MySQL", "Docker", "Nginx", "Linux",
    "LangChain", "React", "TypeScript", "Git",
  ]

  return (
    <>
      <ParticleBackground />
      <div className="scan-effect" />

      <main className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-16">
        {/* 背景大号渐变文字 */}
        <div
          className="absolute top-0 right-0 text-[10rem] md:text-[18rem] font-black leading-none select-none pointer-events-none"
          style={{
            background: "linear-gradient(135deg, rgba(129,140,248,0.05) 0%, rgba(34,211,238,0.03) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          HUB
        </div>

        <div className="w-full max-w-lg flex flex-col items-center stagger-enter">
          {/* Logo */}
          <header className="text-center mb-10 stagger-enter">
            <div className="flex items-center gap-2 text-xs text-[#8888b0] font-mono mb-6 justify-center">
              <span className="text-[#22d3ee]">$</span>
              <span>~/anlums-hub</span>
              <span className="text-[#818cf8]">───</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">
              <span className="text-[#818cf8]">&lt;</span>
              <span className="gradient-text">Anlums</span>
              <span className="text-[#22d3ee]">/&gt;</span>
            </h1>

            <p className="text-[#8888b0] font-mono text-sm">
              全栈开发者 · AI 探索者 · 开源爱好者
            </p>
          </header>

          {/* 导航卡片 */}
          <section className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 stagger-enter">
            <a
              href="http://blog.anlums.cn"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-xl p-6 text-center transition-all duration-300 hover:-translate-y-1 neon-border"
              style={{
                background: "rgba(129, 140, 248, 0.04)",
                border: "0.5px solid rgba(129, 140, 248, 0.2)",
              }}
            >
              <div className="text-3xl mb-3">📝</div>
              <h3 className="text-[#818cf8] font-semibold mb-2 font-mono">
                技术博客
              </h3>
              <p className="text-sm text-[#8888b0] mb-4 leading-relaxed">
                记录技术思考、项目心得与前沿探索
              </p>
              <span className="font-mono text-xs text-[#22d3ee] opacity-60 group-hover:opacity-100 transition-opacity">
                blog.anlums.cn →
              </span>
            </a>

            <a
              href="http://hotel.anlums.cn"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-xl p-6 text-center transition-all duration-300 hover:-translate-y-1 neon-border"
              style={{
                background: "rgba(168, 85, 247, 0.04)",
                border: "0.5px solid rgba(168, 85, 247, 0.2)",
              }}
            >
              <div className="text-3xl mb-3">🏨</div>
              <h3 className="text-[#a855f7] font-semibold mb-2 font-mono">
                智慧酒店
              </h3>
              <p className="text-sm text-[#8888b0] mb-4 leading-relaxed">
                AI 驱动的酒店管理系统 · Agent 智能对话
              </p>
              <span className="font-mono text-xs text-[#22d3ee] opacity-60 group-hover:opacity-100 transition-opacity">
                hotel.anlums.cn →
              </span>
            </a>
          </section>

          {/* 技术栈 */}
          <section className="w-full mb-8 stagger-enter">
            <h4 className="font-mono text-xs text-[#8888b0] uppercase tracking-[0.15em] text-center mb-4">
              技术栈
            </h4>
            <div className="flex flex-wrap justify-center gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-xs px-3 py-1.5 rounded-full transition-all duration-200 hover:text-[#818cf8] hover:border-[#818cf8]/30 hover:bg-[#818cf8]/5"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "0.5px solid rgba(255,255,255,0.08)",
                    color: "#8888b0",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </section>

          {/* 终端装饰框 */}
          <div
            className="w-full max-w-sm rounded-lg p-4 font-mono text-xs mb-8 stagger-enter"
            style={{
              border: "0.5px solid rgba(255,255,255,0.06)",
              background: "rgba(12, 12, 30, 0.6)",
              backdropFilter: "blur(12px)",
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="size-2 rounded-full bg-red-400" />
              <span className="size-2 rounded-full bg-yellow-400" />
              <span className="size-2 rounded-full bg-green-400" />
              <span className="ml-2 text-[10px] text-[#8888b0]">终端 — anlums@hub</span>
            </div>
            <div className="space-y-1 text-[#8888b0]">
              <p><span className="text-green-400">$</span> <span className="text-[#22d3ee]">whoami</span></p>
              <p className="text-[#e0e0f0]/80">Anlums · 全栈开发者</p>
              <p><span className="text-green-400">$</span> <span className="text-[#22d3ee]">status</span></p>
              <p className="text-[#818cf8]">在线 · 正在构建中...</p>
            </div>
          </div>

          {/* 社交链接 */}
          <footer className="flex items-center gap-6 mb-6 stagger-enter">
            <a
              href="https://github.com/Anlums"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[#8888b0] hover:text-[#e0e0f0] transition-colors text-sm"
            >
              <GitHubIcon />
              <span>GitHub</span>
            </a>
            <a
              href="mailto:anlums712@gmail.com"
              className="flex items-center gap-1.5 text-[#8888b0] hover:text-[#e0e0f0] transition-colors text-sm"
            >
              <MailIcon />
              <span>邮箱</span>
            </a>
          </footer>

          <p className="text-xs text-[#8888b0]/50 stagger-enter">
            © 2026 Anlums Hub · 用热爱构建
          </p>
        </div>
      </main>
    </>
  )
}

export default App
