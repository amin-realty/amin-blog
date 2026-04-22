import { getProperties, Property } from '@/lib/notion'

// 物件類型對應 data-type
function typeToDataType(type: string) {
  if (type.includes('土地') || type.includes('農地')) return 'land'
  if (type.includes('預售') || type.includes('新成屋')) return 'presale'
  return 'house'
}

function PropertyCard({ p }: { p: Property }) {
  const dataType = typeToDataType(p.type)
  const isLand = dataType === 'land'
  const waUrl = `https://wa.me/886988146299?text=${encodeURIComponent(`我想詢問：${p.title}`)}`

  return (
    <div className="prop-card" data-type={dataType}>
      {p.badge && (
        <span className={`prop-badge${p.badge === '降價' ? ' disc-badge' : ''}`}>{p.badge}</span>
      )}
      {p.imageUrl && <img src={p.imageUrl} alt={p.title} loading="lazy" />}
      <div className="prop-info">
        <span className={`prop-type${isLand ? ' land-type' : ''}`}>{p.type}</span>
        <h3>
          {p.propertyUrl
            ? <a href={p.propertyUrl} target="_blank" rel="noopener noreferrer">{p.title}</a>
            : p.title}
        </h3>
        <div className="prop-meta">
          <span>📍 {p.location}</span>
          {p.area && <span>📐 {p.area}</span>}
        </div>
        {p.rooms && <div className="prop-meta"><span>🚪 {p.rooms}</span></div>}
        <div className="prop-price">
          {p.oldPrice && <span className="old-price">{p.oldPrice}</span>}
          {p.price}
        </div>
        <a href={waUrl} target="_blank" rel="noopener noreferrer" className="prop-cta">
          💬 立即詢問
        </a>
      </div>
    </div>
  )
}

export default async function HomePage() {
  const properties = await getProperties()

  return (
    <>
      {/* ── NAV ── */}
      <nav>
        <div className="nav-logo">🏠 敏姊房產通</div>
        <ul className="nav-links">
          <li><a href="#properties">最新物件</a></li>
          <li><a href="#services">服務項目</a></li>
          <li><a href="#why">為何選我</a></li>
          <li><a href="#areas">服務區域</a></li>
          <li><a href="#contact">立即諮詢</a></li>
        </ul>
        <a className="nav-cta" href="https://wa.me/886988146299" target="_blank" rel="noopener noreferrer">💬 WhatsApp 諮詢</a>
      </nav>

      {/* ── 浮動按讚面板 ── */}
      <div id="socialFloat" style={{position:'fixed',right:0,top:'50%',transform:'translateY(-50%)',zIndex:999,display:'flex',flexDirection:'column',borderRadius:'12px 0 0 12px',overflow:'hidden',boxShadow:'-4px 0 20px rgba(0,0,0,0.15)'}}>
        <button id="likeBtn" onClick={undefined} style={{display:'flex',flexDirection:'column',alignItems:'center',gap:3,background:'#fff',border:'none',borderBottom:'1px solid #f0e0e0',padding:'14px 16px',cursor:'pointer',fontFamily:'inherit',minWidth:72}}>
          <span id="likeIcon" style={{fontSize:'1.5rem'}}>👍</span>
          <span id="likeLabel" style={{fontSize:'0.72rem',fontWeight:700,color:'#b91c1c'}}>按讚</span>
          <span id="likeCount" style={{fontSize:'0.85rem',fontWeight:900,color:'#b91c1c'}}>386</span>
        </button>
      </div>

      {/* ── QR Widget ── */}
      <div className="qr-wrap">
        <div className="qr-label">🏠 聯絡我們</div>
        <div className="qr-company">紅火房屋仲介有限公司</div>
        <a className="qr-address" href="https://maps.google.com/?q=雲林縣斗六市中正路312號" target="_blank" rel="noopener noreferrer">
          📍 雲林縣斗六市中正路312號
        </a>
        <a href="/blog" style={{display:'block',marginTop:8,color:'#6ee7b7',fontSize:'0.85rem',textDecoration:'none',fontWeight:700}}>
          📚 房產知識部落格 →
        </a>
      </div>

      {/* ── HERO ── */}
      <div className="hero">
        <div className="agent-photo-wrap">
          <img src="/agent.jpg" alt="敏姊 專業顧問" />
          <div className="agent-name-tag">敏姊 專業顧問</div>
        </div>
        <div className="hero-content">
          <div className="hero-badge">⭐ 雲林在地房仲・值得信賴</div>
          <h1>雲林找房，就找 <span>敏姊房產通</span></h1>
          <p>雲林房仲推薦首選｜住宅・建地・農地・商辦<br />首購族・換屋・投資置產，全程免費諮詢</p>
          <div className="hero-btns">
            <a href="https://wa.me/886988146299" target="_blank" rel="noopener noreferrer" className="btn-primary">💬 WhatsApp 免費諮詢</a>
            <a href="https://www.facebook.com/fantasichouse" target="_blank" rel="noopener noreferrer" className="btn-secondary">📘 粉絲專頁 追蹤</a>
          </div>
        </div>
      </div>

      {/* ── STATS ── */}
      <div className="stats">
        <div className="stat-item"><div className="stat-num">274+</div><div className="stat-label">粉絲追蹤</div></div>
        <div className="stat-item"><div className="stat-num">0988</div><div className="stat-label">146 299 直撥</div></div>
        <div className="stat-item"><div className="stat-num">雲林</div><div className="stat-label">在地深耕</div></div>
        <div className="stat-item"><div className="stat-num">免費</div><div className="stat-label">看屋諮詢</div></div>
      </div>

      {/* ── PROPERTIES ── */}
      <section id="properties" className="properties">
        <div className="container">
          <h2 className="section-title">最新物件</h2>
          <p className="section-sub">雲林・台南・桃園優質房產・農地・建地・透天・廠房，全台物件歡迎諮詢</p>
          <div className="prop-tabs">
            <button className="tab active" onClick={undefined} data-filter="all">全部</button>
            <button className="tab" onClick={undefined} data-filter="land">土地/農地</button>
            <button className="tab" onClick={undefined} data-filter="house">透天/住宅</button>
            <button className="tab" onClick={undefined} data-filter="presale">預售/新成屋</button>
          </div>
          <div className="props-grid" id="propsGrid">
            {properties.map(p => <PropertyCard key={p.id} p={p} />)}
          </div>
          <div style={{textAlign:'center',marginTop:40}}>
            <a href="https://wa.me/886988146299" className="btn-more" target="_blank" rel="noopener noreferrer">查看更多物件 →</a>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="services">
        <div className="container">
          <h2 className="section-title">服務項目</h2>
          <p className="section-sub">雲林房仲推薦・專業服務全面覆蓋<br />無論買屋、賣屋、租屋，阿敏都能幫您搞定</p>
          <div className="services-grid">
            {[
              {icon:'🏡',title:'雲林找房・住宅買賣',desc:'首購、換屋、投資，全程陪伴，找到最適合的家。'},
              {icon:'🌾',title:'雲林建地・農地',desc:'農地投資、建地開發，專業把關每一筆土地交易。'},
              {icon:'🏢',title:'商辦・店面租售',desc:'商業空間租售，協助企業找到理想的落腳點。'},
              {icon:'💰',title:'投資置產顧問',desc:'市場分析、投報率評估，讓您的資產穩健增值。'},
              {icon:'📋',title:'首購補貼申辦協助',desc:'政府補貼申請，讓首購族輕鬆踏出買房第一步。'},
              {icon:'🤝',title:'委託銷售・快速成交',desc:'專業行銷、精準媒合，協助屋主快速找到買家。'},
            ].map(s => (
              <div key={s.title} className="service-card">
                <div className="service-icon">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY ── */}
      <section id="why" className="why">
        <div className="container">
          <h2 className="section-title">為何選敏姊房產通</h2>
          <p className="section-sub">雲林在地房仲，值得信賴的五大理由</p>
          <div className="why-grid">
            {[
              {n:'01',t:'在地深耕，熟悉每條巷弄',d:'多年深耕雲林，每個區域的行情與特色都瞭若指掌。'},
              {n:'02',t:'即時 WhatsApp 回覆',d:'不讓您等待，隨時傳訊詢問，快速給您專業回覆。'},
              {n:'03',t:'透明誠信，不藏資訊',d:'優缺點都告訴您，讓您做出最適合自己的決定。'},
              {n:'04',t:'全程陪伴，售後不消失',d:'從看屋到過戶，每個環節都有阿敏在您身旁。'},
              {n:'05',t:'建地農地專業把關',d:'土地交易眉角多，讓專業的人幫您避開地雷。'},
              {n:'06',t:'免費諮詢，零壓力',d:'不管買不買，歡迎先來聊聊，沒有任何壓力。'},
            ].map(w => (
              <div key={w.n} className="why-card">
                <div className="why-num">{w.n}</div>
                <h3>{w.t}</h3>
                <p>{w.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AREAS ── */}
      <section id="areas" style={{padding:'80px 24px',background:'#f9fafb'}}>
        <div className="container">
          <h2 className="section-title">服務區域</h2>
          <p className="section-sub">以雲林為根據地，全台物件皆可代尋・代售</p>
          <div className="area-grid">
            <div className="area-card area-main">
              <div className="area-icon">⭐</div>
              <h3>雲林縣・主力深耕</h3>
              <div className="area-tags-inner">
                <span>雲林市｜透天・農地・建地・廠房</span>
                <span>古坑鄉｜景觀農地・農保地</span>
                <span>斗南鎮｜農地・土地投資</span>
                <span>二崙鄉｜新成屋・透天</span>
                <span>虎尾鎮・西螺鎮・林內鄉</span>
              </div>
              <span className="area-badge">現有物件 10+ 筆</span>
            </div>
            <div className="area-card">
              <div className="area-icon">🏙️</div>
              <h3>台南市・拓展中</h3>
              <div className="area-tags-inner">
                <span>新市區｜南科周邊住宅</span>
                <span>3房格局・首購優選</span>
              </div>
              <span className="area-badge">現有物件 1 筆</span>
            </div>
            <div className="area-card area-inquiry">
              <div className="area-icon">🔍</div>
              <h3>其他地區・代尋代售</h3>
              <div className="area-tags-inner">
                <span>全台各縣市物件皆可洽詢</span>
                <span>有需求就找阿敏，免費諮詢</span>
              </div>
              <a href="https://wa.me/886988146299" className="area-cta" target="_blank" rel="noopener noreferrer">💬 告訴我您的需求</a>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section id="contact" className="cta-section">
        <div className="container">
          <div className="cta-box">
            <h2>立即免費諮詢</h2>
            <p>不管是雲林找房、雲林建地，<br />還是委託銷售，阿敏都能幫您！</p>
            <span className="cta-phone">📞 0988-146-299</span>
            <div className="hero-btns">
              <a href="https://wa.me/886988146299" target="_blank" rel="noopener noreferrer" className="btn-primary">💬 WhatsApp 傳訊</a>
              <a href="https://www.facebook.com/fantasichouse" target="_blank" rel="noopener noreferrer" className="btn-secondary">📘 Facebook 粉專</a>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer>
        <strong>敏姊房產通</strong> — 雲林房仲推薦<br />
        雲林縣斗六市 ｜ 📞 0988-146-299 ｜{' '}
        <a href="https://wa.me/886988146299">WhatsApp</a> ｜{' '}
        <a href="https://www.facebook.com/fantasichouse">Facebook</a><br />
        © 2025 敏姊房產通・雲林找房・雲林建地・雲林房仲推薦
      </footer>

      {/* ── 浮動 WhatsApp ── */}
      <a href="https://wa.me/886988146299" className="wa-float" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
        <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </a>

      {/* ── CSS + JS ── */}
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { font-family: 'Noto Sans TC', sans-serif; color: #1a1a1a; background: #fff; }
        nav { position: fixed; top: 0; width: 100%; z-index: 100; background: rgba(255,255,255,0.96); backdrop-filter: blur(8px); border-bottom: 1px solid #e5e7eb; padding: 0 24px; display: flex; align-items: center; justify-content: space-between; height: 64px; }
        .nav-logo { font-size: 1.2rem; font-weight: 900; color: #166534; letter-spacing: 1px; }
        .nav-links { display: flex; gap: 28px; list-style: none; }
        .nav-links a { text-decoration: none; color: #374151; font-weight: 500; font-size: 0.95rem; transition: color .2s; }
        .nav-links a:hover { color: #166534; }
        .nav-cta { background: #25D366; color: #fff; border: none; padding: 10px 20px; border-radius: 8px; font-weight: 700; font-size: 0.9rem; cursor: pointer; text-decoration: none; transition: background .2s; }
        .nav-cta:hover { background: #128C7E; }
        .hero { min-height: 100vh; background: linear-gradient(135deg, #064e3b 0%, #065f46 50%, #047857 100%); display: flex; align-items: center; justify-content: center; text-align: center; padding: 80px 24px 40px; position: relative; overflow: hidden; }
        .hero-content { position: relative; z-index: 1; max-width: 800px; }
        .agent-photo-wrap { position: absolute; left: 40px; bottom: 0; z-index: 2; display: flex; flex-direction: column; align-items: center; }
        .agent-photo-wrap img { width: 190px; height: 230px; object-fit: cover; object-position: top; border-radius: 16px 16px 0 0; border: 3px solid rgba(110,231,183,0.5); box-shadow: 0 8px 32px rgba(0,0,0,0.4); }
        .agent-name-tag { background: rgba(6,78,59,0.9); border: 1px solid #6ee7b7; color: #d1fae5; font-size: 1rem; font-weight: 800; padding: 8px 16px; border-radius: 0 0 10px 10px; letter-spacing: 1px; }
        .qr-wrap { position: fixed; bottom: 80px; right: 24px; z-index: 200; background: linear-gradient(135deg, #064e3b, #065f46); border: 2px solid #6ee7b7; border-radius: 16px; padding: 14px 20px; box-shadow: 0 6px 28px rgba(6,78,59,0.45); min-width: 220px; }
        .qr-label { font-size: 0.85rem; color: #6ee7b7; font-weight: 800; letter-spacing: 1px; }
        .qr-company { font-size: 1rem; font-weight: 900; color: #fff; line-height: 1.6; }
        .qr-address { font-size: 0.82rem; color: #a7f3d0; line-height: 1.6; display: block; }
        .hero-badge { display: inline-block; background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.3); color: #d1fae5; font-size: 0.85rem; font-weight: 500; padding: 6px 16px; border-radius: 999px; margin-bottom: 24px; }
        .hero h1 { font-size: clamp(2.2rem, 6vw, 4rem); font-weight: 900; color: #fff; line-height: 1.2; margin-bottom: 16px; }
        .hero h1 span { color: #6ee7b7; }
        .hero p { font-size: 1.15rem; color: #a7f3d0; line-height: 1.8; margin-bottom: 40px; }
        .hero-btns { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }
        .btn-primary { background: #25D366; color: #fff; padding: 16px 32px; border-radius: 12px; font-size: 1.05rem; font-weight: 700; text-decoration: none; transition: all .2s; display: flex; align-items: center; gap: 8px; }
        .btn-primary:hover { background: #128C7E; transform: translateY(-2px); }
        .btn-secondary { background: rgba(255,255,255,0.1); border: 2px solid rgba(255,255,255,0.4); color: #fff; padding: 16px 32px; border-radius: 12px; font-size: 1.05rem; font-weight: 700; text-decoration: none; transition: all .2s; }
        .btn-secondary:hover { background: rgba(255,255,255,0.2); transform: translateY(-2px); }
        .stats { background: #f0fdf4; padding: 48px 24px; display: flex; justify-content: center; flex-wrap: wrap; }
        .stat-item { text-align: center; padding: 24px 48px; border-right: 1px solid #bbf7d0; }
        .stat-item:last-child { border-right: none; }
        .stat-num { font-size: 2.5rem; font-weight: 900; color: #166534; }
        .stat-label { font-size: 0.9rem; color: #4b5563; margin-top: 4px; }
        section { padding: 80px 24px; }
        .section-title { text-align: center; font-size: 2rem; font-weight: 900; color: #166534; margin-bottom: 12px; }
        .section-sub { text-align: center; color: #6b7280; font-size: 1rem; margin-bottom: 48px; line-height: 1.7; }
        .container { max-width: 1100px; margin: 0 auto; }
        .services { background: #fff; }
        .services-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 24px; }
        .service-card { background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 16px; padding: 32px 24px; transition: all .3s; }
        .service-card:hover { border-color: #6ee7b7; box-shadow: 0 8px 32px rgba(22,101,52,0.1); transform: translateY(-4px); }
        .service-icon { font-size: 2.5rem; margin-bottom: 16px; }
        .service-card h3 { font-size: 1.15rem; font-weight: 700; color: #166534; margin-bottom: 8px; }
        .service-card p { font-size: 0.9rem; color: #6b7280; line-height: 1.7; }
        .why { background: linear-gradient(135deg, #064e3b, #065f46); }
        .why .section-title { color: #6ee7b7; }
        .why .section-sub { color: #a7f3d0; }
        .why-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; }
        .why-card { background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15); border-radius: 16px; padding: 28px 24px; }
        .why-card h3 { color: #fff; font-size: 1.05rem; font-weight: 700; margin-bottom: 8px; }
        .why-card p { color: #a7f3d0; font-size: 0.9rem; line-height: 1.7; }
        .why-num { font-size: 2rem; font-weight: 900; color: #6ee7b7; margin-bottom: 12px; }
        .area-grid { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 20px; }
        @media (max-width: 900px) { .area-grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 600px) { .area-grid { grid-template-columns: 1fr; } }
        .area-card { background: #fff; border: 2px solid #d1fae5; border-radius: 16px; padding: 24px; transition: all .3s; }
        .area-card:hover { border-color: #166534; box-shadow: 0 6px 24px rgba(22,101,52,0.12); transform: translateY(-3px); }
        .area-main { border-color: #166534; background: linear-gradient(135deg, #f0fdf4, #fff); }
        .area-inquiry { border-color: #6ee7b7; background: #f9fafb; }
        .area-icon { font-size: 2rem; margin-bottom: 10px; }
        .area-card h3 { font-size: 1.05rem; font-weight: 800; color: #166534; margin-bottom: 12px; }
        .area-tags-inner { display: flex; flex-direction: column; gap: 6px; margin-bottom: 14px; }
        .area-tags-inner span { font-size: 0.88rem; color: #374151; padding: 4px 0; border-bottom: 1px solid #f3f4f6; }
        .area-tags-inner span:last-child { border-bottom: none; }
        .area-badge { display: inline-block; background: #dcfce7; color: #166534; font-size: 0.78rem; font-weight: 700; padding: 4px 12px; border-radius: 999px; }
        .area-cta { display: block; text-align: center; background: #25D366; color: #fff; padding: 10px 16px; border-radius: 8px; font-weight: 700; font-size: 0.88rem; text-decoration: none; margin-top: 8px; transition: background .2s; }
        .area-cta:hover { background: #128C7E; }
        .cta-section { background: #fff; text-align: center; }
        .cta-box { background: linear-gradient(135deg, #064e3b, #047857); border-radius: 24px; padding: 64px 40px; max-width: 700px; margin: 0 auto; }
        .cta-box h2 { font-size: 2rem; font-weight: 900; color: #fff; margin-bottom: 16px; }
        .cta-box p { color: #a7f3d0; font-size: 1.05rem; margin-bottom: 32px; line-height: 1.7; }
        .cta-phone { font-size: 2rem; font-weight: 900; color: #6ee7b7; margin-bottom: 24px; display: block; }
        footer { background: #111827; color: #9ca3af; text-align: center; padding: 40px 24px; font-size: 0.88rem; line-height: 2; }
        footer strong { color: #d1fae5; }
        footer a { color: #6ee7b7; text-decoration: none; }
        .wa-float { position: fixed; bottom: 28px; right: 28px; z-index: 999; background: #25D366; width: 60px; height: 60px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 20px rgba(37,211,102,0.5); text-decoration: none; transition: all .2s; animation: pulse 2.5s infinite; }
        .wa-float:hover { transform: scale(1.1); }
        .wa-float svg { width: 32px; height: 32px; fill: #fff; }
        @keyframes pulse { 0%, 100% { box-shadow: 0 4px 20px rgba(37,211,102,0.5); } 50% { box-shadow: 0 4px 32px rgba(37,211,102,0.8); } }
        .properties { background: #f0fdf4; }
        .prop-tabs { display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; margin-bottom: 36px; }
        .tab { background: #fff; border: 2px solid #d1fae5; color: #166534; padding: 8px 20px; border-radius: 999px; font-weight: 700; font-size: 0.9rem; cursor: pointer; transition: all .2s; }
        .tab.active, .tab:hover { background: #166534; color: #fff; border-color: #166534; }
        .props-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 24px; }
        .prop-card { background: #fff; border-radius: 16px; overflow: hidden; border: 1px solid #e5e7eb; transition: all .3s; position: relative; }
        .prop-card:hover { box-shadow: 0 8px 32px rgba(22,101,52,0.15); transform: translateY(-4px); }
        .prop-card img { width: 100%; height: 200px; object-fit: cover; display: block; }
        .prop-badge { position: absolute; top: 12px; left: 12px; background: #166534; color: #fff; font-size: 0.75rem; font-weight: 700; padding: 4px 12px; border-radius: 999px; z-index: 2; }
        .disc-badge { background: #dc2626; }
        .prop-info { padding: 16px; }
        .prop-type { display: inline-block; background: #d1fae5; color: #065f46; font-size: 0.75rem; font-weight: 700; padding: 3px 10px; border-radius: 4px; margin-bottom: 8px; }
        .land-type { background: #fef3c7; color: #92400e; }
        .prop-info h3 { font-size: 1rem; font-weight: 700; margin-bottom: 8px; }
        .prop-info h3 a { color: #1a1a1a; text-decoration: none; }
        .prop-info h3 a:hover { color: #166534; }
        .prop-meta { font-size: 0.82rem; color: #6b7280; margin-bottom: 4px; display: flex; gap: 12px; flex-wrap: wrap; }
        .prop-price { font-size: 1.4rem; font-weight: 900; color: #dc2626; margin: 10px 0; }
        .old-price { font-size: 0.85rem; color: #9ca3af; text-decoration: line-through; margin-right: 6px; }
        .prop-cta { display: block; text-align: center; background: #25D366; color: #fff; padding: 10px; border-radius: 8px; font-weight: 700; font-size: 0.9rem; text-decoration: none; transition: background .2s; }
        .prop-cta:hover { background: #128C7E; }
        .btn-more { display: inline-block; border: 2px solid #166534; color: #166534; padding: 12px 32px; border-radius: 999px; font-weight: 700; text-decoration: none; transition: all .2s; }
        .btn-more:hover { background: #166534; color: #fff; }
        @media (max-width: 768px) { .agent-photo-wrap { display: none; } .qr-wrap { bottom: 80px; right: 12px; } }
        @media (max-width: 600px) { .nav-links { display: none; } .stat-item { padding: 20px 28px; border-right: none; border-bottom: 1px solid #bbf7d0; } .stat-item:last-child { border-bottom: none; } .cta-box { padding: 40px 24px; } }
      `}</style>

      <script dangerouslySetInnerHTML={{ __html: `
        // 物件篩選
        document.addEventListener('click', function(e) {
          var tab = e.target.closest('.tab');
          if (!tab) return;
          var filter = tab.dataset.filter;
          document.querySelectorAll('.tab').forEach(function(t) { t.classList.remove('active'); });
          tab.classList.add('active');
          document.querySelectorAll('.prop-card').forEach(function(card) {
            card.style.display = (filter === 'all' || card.dataset.type === filter) ? '' : 'none';
          });
        });
        // 按讚
        (function() {
          var BASE = 386;
          var count = parseInt(localStorage.getItem('amin_likes') || '0') + BASE;
          var liked = localStorage.getItem('amin_liked') === '1';
          var countEl = document.getElementById('likeCount');
          var label = document.getElementById('likeLabel');
          var btn = document.getElementById('likeBtn');
          if (countEl) countEl.textContent = count;
          if (liked && label) { label.textContent = '已按讚'; if(btn) btn.style.background='#fff1f2'; }
          if (btn) btn.onclick = function() {
            liked = !liked;
            count += liked ? 1 : -1;
            localStorage.setItem('amin_liked', liked ? '1' : '0');
            localStorage.setItem('amin_likes', String(count - BASE));
            if (countEl) countEl.textContent = count;
            if (label) label.textContent = liked ? '已按讚' : '按讚';
            if (btn) btn.style.background = liked ? '#fff1f2' : '#fff';
          };
        })();
      ` }} />
    </>
  )
}
