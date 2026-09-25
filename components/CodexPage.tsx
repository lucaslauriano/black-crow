'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

function TitleLine({ word }: { word: string }) {
  return (
    <span className="hero__line">
      {word.split('').map((char, i) => (
        <span key={i} className="char">{char}</span>
      ))}
    </span>
  )
}

export default function CodexPage() {
  const root = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const mm = gsap.matchMedia(root)

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const intro = gsap.timeline({ defaults: { ease: 'power3.out' } })
      intro
        .from('.hero__bg', { scale: 1.18, opacity: 0, duration: 2.4, ease: 'power2.out' })
        .from('.topbar__brand, .topbar__nav a, .topbar__menu', {
          opacity: 0,
          y: -14,
          duration: 0.7,
          stagger: 0.05,
        }, '-=1.9')
        .from('.hero__eyebrow', { opacity: 0, y: 16, duration: 0.8 }, '-=1.7')
        .from('.hero__title .char', {
          yPercent: 118,
          rotateX: -75,
          opacity: 0,
          filter: 'blur(10px)',
          duration: 1.1,
          stagger: { each: 0.055, from: 'random' },
        }, '-=1.3')
        .from('.hero__char', {
          xPercent: 10,
          opacity: 0,
          filter: 'blur(12px)',
          duration: 1.8,
          ease: 'power2.out',
        }, '-=1.4')
        .to('.hero__title .char', {
          backgroundPosition: '0% 0',
          duration: 1.6,
          stagger: 0.045,
          ease: 'power2.inOut',
        }, '-=1.2')
        .from('.hero__subtitle', { opacity: 0, y: 15, duration: 0.7 }, '-=1.5')
        .from('.hero__meta, .hero__scroll', { opacity: 0, duration: 0.7 }, '-=0.9')

      gsap.to('.hero__char', {
        y: -14,
        duration: 3.6,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
        delay: 2,
      })

      gsap.to('.hero__glow', {
        opacity: 'random(0.35, 0.75)',
        duration: 'random(0.9, 2.2)',
        repeat: -1,
        repeatRefresh: true,
        ease: 'sine.inOut',
      })

      gsap.to('.hero__bg', {
        yPercent: 10,
        scale: 1.06,
        ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
      })

      gsap.to('.hero__char', {
        yPercent: 16,
        ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
      })

      gsap.to('.hero__title', {
        yPercent: -22,
        opacity: 0.65,
        ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
      })

      const navLinks = gsap.utils.toArray<HTMLAnchorElement>('.topbar__nav a')
      const setActive = (id: string) => {
        navLinks.forEach((l) => l.classList.toggle('is-active', l.getAttribute('href') === `#${id}`))
      }
      ;['inicio', 'arquivo', 'escriba', 'imperio', 'provacoes', 'jornada', 'codice'].forEach((id) => {
        ScrollTrigger.create({
          trigger: `#${id}`,
          start: 'top center',
          end: 'bottom center',
          onToggle: (st) => st.isActive && setActive(id),
        })
      })

      const charX = gsap.quickTo('.hero__char', 'x', { duration: 1, ease: 'power3.out' })
      const bgX = gsap.quickTo('.hero__bg', 'x', { duration: 1.4, ease: 'power3.out' })
      const onMove = (e: MouseEvent) => {
        const ratio = e.clientX / window.innerWidth - 0.5
        charX(ratio * -26)
        bgX(ratio * 14)
      }
      window.addEventListener('mousemove', onMove)

      gsap.utils.toArray<HTMLElement>('.reveal').forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 30,
          duration: 1,
          scrollTrigger: { trigger: el, start: 'top 82%', once: true },
        })
      })

      gsap.from('.archive-card', {
        opacity: 0,
        y: 35,
        stagger: 0.12,
        duration: 0.8,
        scrollTrigger: { trigger: '.archive-grid', start: 'top 75%', once: true },
      })

      gsap.to('.empire__bg', {
        yPercent: 14,
        ease: 'none',
        scrollTrigger: { trigger: '.empire-section', start: 'top bottom', end: 'bottom top', scrub: true },
      })

      gsap.from('.trial-row', {
        opacity: 0,
        y: 40,
        stagger: 0.16,
        duration: 0.9,
        scrollTrigger: { trigger: '.trials', start: 'top 78%', once: true },
      })

      gsap.from('.waypoint', {
        opacity: 0,
        x: -26,
        stagger: 0.18,
        duration: 0.8,
        scrollTrigger: { trigger: '.journey', start: 'top 75%', once: true },
      })

      gsap.fromTo('.journey__line', { scaleY: 0 }, {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: { trigger: '.journey', start: 'top 70%', end: 'bottom 60%', scrub: true },
      })

      return () => window.removeEventListener('mousemove', onMove)
    })
  }, { scope: root })

  return (
    <main ref={root} className="codex">
      <div className="noise" aria-hidden="true" />

      <header className="topbar">
        <a className="topbar__brand" href="#inicio">
          <svg className="topbar__mark" viewBox="0 0 64 64" aria-hidden="true">
            <path d="M2 20 C8 17 13 15 18 13 C24 10 30 13 32 18 C39 21 44 27 47 34 L63 51 C55 48 49 46 44 45 C40 48 34 49 29 48 C21 46 15 40 14 33 C14 28 15 25 17 22 C12 22 6 21 2 20 Z" fill="currentColor" />
          </svg>
          <span>CAPUZ NEGRO</span>
        </a>

        <nav className="topbar__nav" aria-label="Navegação principal">
          <a href="#inicio" className="is-active">INÍCIO</a>
          <a href="#arquivo">O ARQUIVO</a>
          <a href="#escriba">O ESCRIBA</a>
          <a href="#imperio">O IMPÉRIO</a>
          <a href="#provacoes">AS PROVAÇÕES</a>
          <a href="#jornada">A JORNADA</a>
          <a href="#codice">O CÓDICE</a>
        </nav>

        <button className="topbar__menu" aria-label="Abrir menu"><i /><i /><i /></button>
      </header>

      <aside className="book-rail" aria-label="Livros">
        <span>BOOK I / THE SEARCH</span>
        <span>BOOK II / THE ROAD</span>
        <span>BOOK III / THE PRICE</span>
      </aside>

      <section className="hero" id="inicio">
        <img className="hero__bg" src="/hero-gb.png" alt="" aria-hidden="true" />
        <div className="hero__wash" />
        <div className="hero__glow" aria-hidden="true" />
        <img className="hero__char" src="/hero-char.png" alt="" aria-hidden="true" />

        <div className="hero__content">
          <div className="hero__eyebrow">A.D. 359 <span>·</span> DANUBE VALLEY</div>
          <h1 className="hero__title" aria-label="Capuz Negro">
            <TitleLine word="CAPUZ" />
            <TitleLine word="NEGRO" />
          </h1>
          <p className="hero__subtitle">UMA TRILOGIA DE FICÇÃO HISTÓRICA</p>
        </div>

        <div className="hero__meta">ARCHIVE / 001</div>
        <div className="hero__scroll">SCROLL TO ENTER <i /></div>
      </section>

      <section className="archive-section" id="arquivo">
        <div className="section-index">ARCHIVE / 002</div>
        <div className="section-copy reveal">
          <p className="kicker">THE ARCHIVE</p>
          <h2>Antes de ser um feiticeiro, ele era apenas um menino.</h2>
          <p>O códice começa no Danúbio, em 359. O que você encontra aqui não é um resumo da história. É um conjunto de vestígios.</p>
        </div>

        <div className="archive-grid">
          <article className="archive-card">
            <span>01</span><strong>THE MAN</strong><p>Um corpo que carrega a conta.</p>
          </article>
          <article className="archive-card">
            <span>02</span><strong>THE EMPIRE</strong><p>Um mundo onde magia pode custar a vida.</p>
          </article>
          <article className="archive-card">
            <span>03</span><strong>THE SEARCH</strong><p>Uma vida procurando algo que responda.</p>
          </article>
        </div>
      </section>

      <section className="scribe-section" id="escriba">
        <div className="section-index">ARCHIVE / 003</div>
        <div className="scribe__grid">
          <div className="scribe__intro reveal">
            <p className="kicker">O ESCRIBA</p>
            <h2>Quem escreve não é quem sobreviveu. É quem lembrou.</h2>
          </div>
          <div className="scribe__body reveal">
            <p>As mãos que copiaram estes registros não eram as dele. Um escriba anônimo reuniu cartas, atas de tribunal e confissões arrancadas pela metade — e as costurou num único códice.</p>
            <p>Onde a tinta falha, ele adverte. Onde a memória falha, ele deixa a margem em branco. Numa delas, uma única nota: <em>non inveni</em> — não encontrei.</p>
            <blockquote>
              “Copiei o que sobrou. O resto, o fogo levou.”
              <cite>— Nota do escriba, fólio 12</cite>
            </blockquote>
          </div>
        </div>
      </section>

      <section className="empire-section" id="imperio">
        <img className="empire__bg" src="/hero-gb.png" alt="" aria-hidden="true" />
        <div className="empire__veil" />
        <div className="empire__inner reveal">
          <p className="kicker">ARCHIVE / 005 · O IMPÉRIO</p>
          <h2>Um império que reza a um deus novo — e queima quem sussurra aos antigos.</h2>
          <p>Sob Constâncio II, perguntar ao futuro é crime de morte. Delatores prosperam, tribunais viajam com o exército, e uma palavra dita ao vento vale uma fogueira. É nesse mundo que um menino descobre que o vento responde.</p>
        </div>
      </section>

      <section className="trials-section" id="provacoes">
        <div className="section-index">ARCHIVE / 008</div>
        <div className="section-copy reveal">
          <p className="kicker">AS PROVAÇÕES</p>
          <h2>Três vezes o mundo perguntou. Três vezes ele pagou para responder.</h2>
        </div>
        <div className="trials">
          <article className="trial-row">
            <span>I</span><strong>O SILÊNCIO</strong>
            <p>Ele fez tudo certo. O ritual, o jejum, os nomes na ordem certa. E nada respondeu.</p>
          </article>
          <article className="trial-row">
            <span>II</span><strong>A ESTRADA</strong>
            <p>Fugir do império é fácil. Difícil é fugir do que o império procura.</p>
          </article>
          <article className="trial-row">
            <span>III</span><strong>O PREÇO</strong>
            <p>Toda resposta cobra alguma coisa. Ele aprendeu a perguntar mesmo assim.</p>
          </article>
        </div>
      </section>

      <section className="nothing-section">
        <div className="nothing-section__inner reveal">
          <p className="kicker">ARCHIVE / 013</p>
          <div className="nothing-word">NOTHING</div>
          <p>There was no light. No angel. No barrier.</p>
          <p>Nothing happened.</p>
          <small>That was the problem.</small>
        </div>
      </section>

      <section className="journey-section" id="jornada">
        <div className="section-index">ARCHIVE / 017</div>
        <div className="section-copy reveal">
          <p className="kicker">A JORNADA</p>
          <h2>Doze anos, quatro cidades, um nome deixado para trás em cada uma.</h2>
        </div>
        <div className="journey">
          <i className="journey__line" aria-hidden="true" />
          <div className="waypoint">
            <span>A.D. 359</span><strong>Vale do Danúbio</strong>
            <p>Um menino vê a fronteira queimar — e ouve o que ninguém mais ouve.</p>
          </div>
          <div className="waypoint">
            <span>A.D. 362</span><strong>Sirmium</strong>
            <p>O primeiro mestre. O primeiro erro. O primeiro nome falso.</p>
          </div>
          <div className="waypoint">
            <span>A.D. 366</span><strong>Constantinopla</strong>
            <p>Bibliotecas, delatores, e um livro que não deveria existir.</p>
          </div>
          <div className="waypoint">
            <span>A.D. 371</span><strong>Roma</strong>
            <p>Onde os registros terminam. Ou onde começam.</p>
          </div>
        </div>
      </section>

      <section className="codex-section" id="codice">
        <div className="codex__inner reveal">
          <p className="kicker">ARCHIVE / 021 · O CÓDICE</p>
          <div className="codex-word">O CÓDICE</div>
          <p className="codex__sub">Três livros. Um arquivo de vestígios. Uma pergunta que atravessa fronteiras, guerras e estradas esquecidas.</p>
          <a className="codex__cta" href="#arquivo">ABRIR O ARQUIVO <em>→</em></a>
        </div>
      </section>
    </main>
  )
}
