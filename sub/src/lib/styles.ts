export const fonts = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500;600&display=swap');
`

export const cssVars = `
  :root {
    --bg:       #060607;
    --surface:  #0e0e10;
    --surface2: #15151a;
    --amber:    #f0a500;
    --amber-b:  #ffbe3d;
    --amber-d:  rgba(240,165,0,0.13);
    --amber-bd: rgba(240,165,0,0.22);
    --white:    #f4f0e8;
    --muted:    rgba(244,240,232,0.42);
    --faint:    rgba(244,240,232,0.07);
    --border:   rgba(240,165,0,0.18);
    --red:      #e05252;
    --green:    #52c47a;
  }
`

export const baseStyles = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { min-height: 100%; background: var(--bg); color: var(--white);
    font-family: 'DM Sans', sans-serif; font-weight: 300; overflow-x: hidden; }

  body::after {
    content: '';
    position: fixed; inset: -200%; width: 400%; height: 400%;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.028'/%3E%3C/svg%3E");
    pointer-events: none; z-index: 9999;
    animation: grain .5s steps(2) infinite;
  }
  @keyframes grain {
    0%,100%{ transform:translate(0,0) } 25%{ transform:translate(-1%,-1%) }
    50%{ transform:translate(1%,0) }    75%{ transform:translate(0,1%) }
  }
  @keyframes fadeUp {
    from { opacity:0; transform:translateY(16px) }
    to   { opacity:1; transform:translateY(0) }
  }
  .fade-up { animation: fadeUp .55s ease both; }
  .fade-up-1 { animation-delay: .1s; }
  .fade-up-2 { animation-delay: .22s; }
  .fade-up-3 { animation-delay: .34s; }
  .fade-up-4 { animation-delay: .46s; }
  .fade-up-5 { animation-delay: .58s; }
  .fade-up-6 { animation-delay: .7s; }

  .glow {
    position: fixed; top: -20vh; left: 50%; transform: translateX(-50%);
    width: 900px; height: 600px; pointer-events: none; z-index: 0;
    background: radial-gradient(ellipse at 50% 0%, rgba(240,165,0,0.08) 0%, transparent 65%);
  }
`
