{
const CLOUD=!!(window.CMB&&window.CMB.cloud),CMB=window.CMB||{};
const _n0=new Date(),D0=[_n0.getFullYear(),_n0.getMonth(),_n0.getDate()],p2=n=>String(n).padStart(2,'0');
const isoD=(o=0)=>{const x=new Date(D0[0],D0[1],D0[2]+o);return x.getFullYear()+'-'+p2(x.getMonth()+1)+'-'+p2(x.getDate())};
const DM=()=>p2(D0[2])+'/'+p2(D0[1]+1),DMY=()=>DM()+'/'+D0[0];
const rp=n=>'Rp'+Math.round(n).toLocaleString('id-ID');
const $=s=>document.querySelector(s);
const ico={check:'M4 12l5 5L20 6',home:'M3 11l9-8 9 8v10H3z',cal:'M4 5h16v16H4zM4 10h16M9 3v4M15 3v4',grid:'M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z',bag:'M5 8h14l-1 13H6zM9 8a3 3 0 0 1 6 0',star:'M12 3l2.7 6 6.3.6-4.8 4.3 1.4 6.4L12 17l-5.6 3.3 1.4-6.4L3 9.6 9.3 9z',box:'M3 7l9-4 9 4-9 4zM3 7v10l9 4 9-4V7M12 11v10',chart:'M4 20V10M10 20V4M16 20v-7M22 20H2',user:'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8M4 21a8 8 0 0 1 16 0'};
const svg=(k,s=20)=>`<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="${ico[k]}"/></svg>`;
const views=[
 {id:'beranda',t:'Beranda',s:'Harga & promo',i:'home',r:['tamu','user','spv','admin']},
 {id:'booking',t:'Booking',s:'Jadwal meja',i:'cal',r:['tamu','user','spv','admin']},
 {id:'kasir',t:'Kasir',s:'Meja & tagihan',i:'grid',r:['user','spv','admin']},
 {id:'pesan',t:'Pesan',s:'Menu F&B',i:'bag',r:['tamu','user','spv','admin']},
 {id:'dapur',t:'Pesanan dapur',s:'Antrian & bahan',i:'box',r:['dapur','spv','admin']},
 {id:'mutasi',t:'Mutasi stok harian',s:'Awal, masuk, terpakai, akhir',i:'box',r:['spv','admin']},
 {id:'rekap',t:'Rekap bahan',s:'Pemakaian dari pesanan',i:'chart',r:['spv','admin']},
 {id:'skor',t:'Skor',s:'Hitung & peringkat',i:'star',r:['tamu','spv','admin']},
 {id:'gudang',t:'Gudang',s:'Stok & resep',i:'box',r:['spv','admin']},
 {id:'hargamenu',t:'Harga menu',s:'Nama & harga jual',i:'bag',r:['spv','admin']},
 {id:'resep',t:'Resep',s:'Takaran & bahan',i:'box',r:['spv','admin']},
 {id:'keuangan',t:'Keuangan',s:'Laba & COGS',i:'chart',r:['spv','admin']},
 {id:'biaya',t:'Biaya operasional',s:'Gaji, listrik, sewa',i:'box',r:['admin']},
 {id:'pengguna',t:'Pengguna',s:'Kasir, spv & dapur',i:'user',r:['admin']},
 {id:'tarif',t:'Tarif meja',s:'Atur harga',i:'chart',r:['spv','admin']},
 {id:'verif',t:'Verifikasi DP',s:'Bukti transfer',i:'check',r:['spv','admin']},
 {id:'tenant',t:'Tenant',s:'Cafe & admin',i:'grid',r:['owner']},
 {id:'akunstaf',t:'Akun staf',s:'Username & password',i:'user',r:['owner']},
 {id:'validasi',t:'Validasi langganan',s:'Bukti transfer tenant',i:'check',r:['owner']},
 {id:'langganan',t:'Langganan',s:'Paket & tagihan',i:'chart',r:['owner','admin']},
 {id:'tampilan',t:'Tampilan',s:'Logo, warna & alamat',i:'home',r:['admin']},
 {id:'akun',t:'Akun',s:'Daftar & masuk',i:'user',r:['tamu']},
 {id:'bookingsaya',t:'Booking saya',s:'',i:'cal',r:['tamu'],hide:true},
 {id:'riwayatskor',t:'Riwayat skor',s:'',i:'star',r:['tamu'],hide:true}];

/* data contoh */
const MIN=60000,T0=Date.now();
const tables=[
 {n:'Meja 1',type:'Reguler',rate:15000,wk:18000,st:'play',el:95,plan:180,who:'Budi + 3',bk:'BK-101',dp:31500,fb:[['Es teh manis',4,12000],['Nasi goreng ayam',1,32000]]},
 {n:'Meja 2',type:'Reguler',rate:15000,wk:18000,st:'play',el:44,plan:60,who:'Walk-in (Rudi)',pl:3,dp:0,fb:[['Kopi susu aren',2,25000]]},
 {n:'Meja 3',type:'Reguler',rate:15000,wk:18000,st:'free'},
 {n:'Meja 4',type:'Reguler',rate:15000,wk:18000,st:'book',at:'19.00',plan:180,who:'Dimas Pratama',bk:'BK-104',dp:31500},
 {n:'VIP 1',type:'VIP',rate:25000,wk:30000,st:'bill',el:180,plan:180,who:'Hendra + 3',bk:'BK-099',dp:54000,fb:[['Kopi susu aren',2,25000],['Mie goreng',2,28000],['Kentang goreng',1,22000]]},
 {n:'VIP 2',type:'VIP',rate:25000,wk:30000,st:'free'},
 {n:'Private',type:'Private room',rate:35000,wk:40000,st:'book',at:'20.00',plan:240,who:'Komunitas Bambu',bk:'BK-106',dp:108000}];
tables.forEach(t=>{if(t.el!=null){t.startMs=T0-t.el*MIN;t.planMin=t.plan;t.extra=0;t.warned=false;t.fb=t.fb||[];if(t.st==='bill')t.endEl=t.el}});
const elapsed=t=>(Date.now()-t.startMs)/MIN+(t.skip||0);
const remain=t=>t.planMin-elapsed(t);
const stock={beras:{n:'Beras',u:'g',q:5200,min:3000,c:14},mie:{n:'Mie telur',u:'g',q:1450,min:1500,c:30},ayam:{n:'Daging ayam',u:'g',q:3800,min:2000,c:42},
 telur:{n:'Telur',u:'pcs',q:26,min:20,c:2200},kopi:{n:'Biji kopi',u:'g',q:900,min:500,c:220},susu:{n:'Susu UHT',u:'ml',q:2600,min:3000,c:19},
 teh:{n:'Teh celup',u:'pcs',q:80,min:40,c:350},gula:{n:'Gula aren cair',u:'ml',q:1200,min:500,c:45},kentang:{n:'Kentang beku',u:'g',q:2100,min:1500,c:38},minyak:{n:'Minyak goreng',u:'ml',q:4000,min:2000,c:18}};
const menu=[
 {id:1,n:'Nasi goreng ayam',c:'Makanan',p:32000,r:{beras:150,ayam:80,telur:1,minyak:20}},
 {id:2,n:'Mie goreng',c:'Makanan',p:28000,r:{mie:120,telur:1,ayam:40,minyak:20}},
 {id:3,n:'Kentang goreng',c:'Camilan',p:22000,r:{kentang:150,minyak:30}},
 {id:4,n:'Kopi susu aren',c:'Minuman',p:25000,r:{kopi:18,susu:150,gula:25}},
 {id:5,n:'Es teh manis',c:'Minuman',p:12000,r:{teh:1,gula:20}},
 {id:6,n:'Cafe latte',c:'Minuman',p:28000,r:{kopi:18,susu:200}},
 {id:7,n:'Paket main 4 orang',c:'Paket',p:150000,r:{kentang:300,teh:4,gula:80,minyak:60}}];
const hpp=m=>Object.entries(rOf(m)).reduce((a,[k,v])=>a+v*(stock[k]?stock[k].c:0),0);
const can=m=>Object.entries(rOf(m)).every(([k,v])=>stock[k]&&stock[k].q>=v);
const low=()=>Object.values(stock).filter(s=>s.q<=s.min);
let cart={},cat='Semua',bookSel=null,dayI=0,selTable=4;
const players=['Sinta','Budi','Rudi','Dimas'];
const RULES={
 sederhana:{n:'Sederhana (aturan rumah)',u:'Jumlah fan',d:'1 fan = 1.000 poin. Zimo: ketiga lawan bayar 1× nilai. Dari buangan: pembuang bayar 3× nilai.',start:0,
  sample:[{w:0,how:'zimo',d:null,f:3},{w:2,how:'buang',d:1,f:5},{w:1,how:'buang',d:3,f:2}]},
 hk:{n:'Hong Kong (tabel fan)',u:'Jumlah fan',d:'Fan diubah lewat tabel: 3 fan = 8, 4 = 16, 5 = 24, 6 = 32, 7 = 48, 8 = 64, 9 = 96, 10 ke atas = 128 poin. Zimo: tiap lawan bayar 1× nilai. Dari buangan: pembuang bayar 2×, dua pemain lain 1×.',start:0,
  sample:[{w:0,how:'zimo',d:null,f:4},{w:2,how:'buang',d:1,f:6},{w:1,how:'buang',d:3,f:3}]},
 tw:{n:'Taiwan (dasar + tai)',u:'Jumlah tai',d:'Nilai = 30 poin dasar + 10 poin per tai. Zimo: ketiga lawan bayar nilai. Dari buangan: hanya pembuang yang bayar.',start:0,
  sample:[{w:0,how:'zimo',d:null,f:4},{w:2,how:'buang',d:1,f:8},{w:1,how:'buang',d:3,f:3}]},
 riichi:{n:'Riichi Jepang',u:'Nilai tangan (poin)',d:'Semua mulai dari 25.000. Masukkan nilai tangan langsung (misalnya 3.900). Zimo dibagi rata ke tiga lawan, ron dibayar penuh oleh pembuang. Skor akhir = (poin − 30.000) ÷ 1.000 + uma (+15, +5, −5, −15), juara dapat oka +20.',start:25000,
  sample:[{w:0,how:'zimo',d:null,f:3900},{w:2,how:'buang',d:1,f:8000},{w:1,how:'buang',d:3,f:2000}]},
 menang:{n:'Hitung menang saja',u:'',d:'Tanpa fan. Menang dari buangan +2, zimo +3, pembuang −1. Paling mudah untuk pemula atau turnamen santai.',start:0,
  sample:[{w:0,how:'zimo',d:null,f:0},{w:2,how:'buang',d:1,f:0},{w:1,how:'buang',d:3,f:0}]}};
let rule='sederhana',rounds=RULES[rule].sample.map(r=>({...r}));

function toast(m){const t=$('#toast');t.textContent=m;t.classList.add('on');clearTimeout(t._h);t._h=setTimeout(()=>t.classList.remove('on'),2600)}
function bell(){$('#bellN').textContent=low().length}
let curRole='tamu',staff=null;const role=()=>curRole;
const RL={user:'Kasir',spv:'Supervisor',admin:'Admin tenant',tamu:'Pelanggan',owner:'Owner',dapur:'Dapur'};
const ACCS=[{u:'sinta',email:'sinta@contoh.id',pw:'sinta123',role:'tamu',nama:'Sinta Wijaya',hp:'0812 3456 7890'},{u:'budi.h',email:'budi.h@contoh.id',pw:'budi1234',role:'tamu',nama:'Budi Hartono',hp:'0813 7777 1212'},{u:'owner',email:'owner@mahjongcloud.id',pw:'owner123',role:'owner',nama:'Hendra Gunawan'},
 {u:'admin.kemang',email:'admin@cafemahjong.id',pw:'admin123',role:'admin',nama:'Andi Pratama',t:'kmg'},{u:'spv.kemang',email:'spv@cafemahjong.id',pw:'spv12345',role:'spv',nama:'Rina Susanti',t:'kmg'},{u:'kasir.kemang',email:'kasir@cafemahjong.id',pw:'kasir123',role:'user',nama:'Dewi Lestari',t:'kmg'},
 {u:'admin.gading',email:'admin.gading@cafemahjong.id',pw:'admin123',role:'admin',nama:'Maria Tan',t:'kgd'},{u:'dapur.kemang',email:'dapur@cafemahjong.id',pw:'dapur123',role:'dapur',nama:'Sari Wulandari',t:'kmg'},{u:'kasir.gading',email:'kasir.gading@cafemahjong.id',pw:'kasir123',role:'user',nama:'Joko Santoso',t:'kgd'}];
const uNorm=v=>v.trim().toLowerCase(),uOk=v=>/^[a-z0-9._]{4,20}$/.test(v),uTaken=(v,ex)=>ACCS.some(a=>a.u===v&&a!==ex),eTaken=(v,ex)=>ACCS.some(a=>a.email===v&&a!==ex);
const U_HINT='4-20 karakter: huruf kecil, angka, titik, atau garis bawah';
const HOME={user:'kasir',spv:'kasir',admin:'keuangan',owner:'tenant',dapur:'dapur'};
function nav(cur){views.forEach(x=>{if(x.id==='akun'){x.t=member?'Profil':'Akun';x.s=member?'Data & riwayat':'Daftar & masuk'}});const v=views.filter(x=>x.id!=='akun'&&!x.hide&&canSee(x));brand();
 const nP=typeof INV!=='undefined'?INV.filter(q=>q.k==='menunggu').length:0,bd=x=>x.id==='validasi'&&nP?` <b class="nbs">${nP}</b>`:'';$('#side').innerHTML=v.map(x=>`<a href="#${x.id}" class="${x.id===cur?'on':''}">${svg(x.i)}<div>${x.t}${bd(x)}<small>${x.s}</small></div></a>`).join('');
 {const many=v.length>5,B=many?v.slice(0,4):v,rest=many?v.slice(4):[],inRest=rest.some(x=>x.id===cur);$('#bot').innerHTML=B.map(x=>`<a href="#${x.id}" class="${x.id===cur?'on':''}">${svg(x.i)}${x.t}</a>`).join('')+(many?`<button type="button" class="bm ${inRest?'on':''}" data-act="botmore" aria-expanded="false" aria-controls="botMore">${svg('grid')}Lainnya</button>`:'');let bm=$('#botMore');if(!bm){bm=document.createElement('div');bm.id='botMore';bm.className='botmore';document.body.appendChild(bm)}bm.classList.remove('open');bm.innerHTML=`<div class="bmg">${rest.map(x=>`<a href="#${x.id}" class="${x.id===cur?'on':''}">${svg(x.i)}<div>${x.t}<small>${x.s}</small></div></a>`).join('')}</div>`}
 $('#bell').classList.toggle('hide',['tamu','user','owner','dapur'].includes(role()));const ts=$('#tenSel');ts.classList.add('hide');ts.innerHTML=TEN.filter(t=>t.on).map(t=>`<option value="${t.id}" ${t.id===curT?'selected':''}>${xe(t.n)}</option>`).join('');const who=staff||member,on=!!who;$('#whoW').classList.toggle('hide',!on);$('#loginBtn').classList.toggle('hide',on);$('#whoMenu').classList.add('hide');if(on){const av=$('#whoAv');if(!staff&&member.foto){av.innerHTML=`<img src="${member.foto}" alt="" style="width:100%;height:100%;object-fit:cover;border-radius:50%">`}else av.textContent=who.nama.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase();$('#whoN').textContent=who.nama.split(' ')[0]+(staff?' · '+RL[curRole]:'');const un=staff?0:(notifs[member.nama]||[]).filter(n=>!n.read).length;$('#whoB').textContent=un;$('#whoB').classList.toggle('hide',!un);
 $('#whoMenu').innerHTML=staff?`<div style="padding:10px 12px 6px"><b>${staff.nama}</b><br><small style="color:var(--mut)">@${xe(staff.u)}<br>${RL[curRole]}${staff.t?' · '+xe(tName(staff.t)):' · semua tenant'}</small></div><button data-act="logout">Keluar</button>`:`<a href="#akun">Profil saya</a><a href="#bookingsaya">Booking saya</a><a href="#riwayatskor">Riwayat skor</a><button data-act="logout">Keluar</button>`}}

const V={};
let member=null,authStep='daftar',authMode='daftar',pend={},gateTo='',posMeja='',skTab='papan',prefFan=null,scan=null,photoURL='';
const OTP='482913';
const pw=(id,label,ac,extra='')=>`<label class="f"><span>${label}</span><div class="pw"><input id="${id}" type="password" minlength="8" required autocomplete="${ac}" ${extra}><button type="button" class="eye" data-act="pw" aria-label="Tampilkan password">Lihat</button></div></label>`;
V.akun=()=>{if(member){return profHtml()}
 const gate=gateTo?`<div class="alert">${svg('user')}<div><b>Buat akun dulu.</b> Halaman ${views.find(v=>v.id===gateTo).t} hanya untuk pengunjung yang sudah terdaftar dan masuk.</div></div>`:'';
 if(authStep==='otp')return `<h1>Verifikasi email <span class="code">P-03</span></h1>${gate}<form class="card" id="otpF" style="max-width:460px"><p style="margin-top:0">Kode OTP 6 angka sudah dikirim ke <b>${pend.email}</b>. Kode berlaku 5 menit.</p>
 <label class="f"><span>Kode OTP</span><input id="otpIn" class="otp" inputmode="numeric" autocomplete="one-time-code" maxlength="6" pattern="[0-9]{6}" required placeholder="______"></label>
 <button class="btn red" style="width:100%">Verifikasi & masuk</button><div class="row" style="margin-top:10px;justify-content:space-between"><button type="button" class="btn ghost" data-act="resend">Kirim ulang kode</button><button type="button" class="btn ghost" data-auth="${authMode}">Ganti email</button></div>
 ${CLOUD?'<p class="note">Tidak menerima email? Cek folder spam, atau tekan Kirim ulang kode.</p>':`<p class="note">Prototipe: kode demo ${OTP}.</p>`}</form>`;
 const tabs=`<div class="tabs">${[['daftar','Daftar akun baru'],['masuk','Sudah punya akun']].map(([k,l])=>`<button class="cat ${authStep===k?'on':''}" data-auth="${k}">${l}</button>`).join('')}</div>`;
 return `<h1>${authStep==='daftar'?'Daftar akun':'Masuk'} <span class="code">${authStep==='daftar'?'P-02':'P-03'}</span></h1><p class="sub">Akun wajib untuk booking meja, pesan makanan, dan menyimpan skor. Akun pelanggan dikonfirmasi dengan kode OTP ke email; staf masuk dengan akun dari admin.</p>${gate}${tabs}
 ${authStep==='daftar'?`<form class="card" id="regF" style="max-width:520px">
 <label class="f"><span>Nama lengkap</span><input id="rgN" required autocomplete="name" value="${CLOUD?'':'Budi Santoso'}"></label>
 <label class="f"><span>Username</span><input id="rgU" required autocomplete="username" autocapitalize="none" spellcheck="false" value="${CLOUD?'':'budi.santoso'}"><small style="color:var(--mut);font-size:13px">Dipakai untuk masuk. ${U_HINT}.</small></label>
 <label class="f"><span>Email</span><input id="rgE" type="email" required autocomplete="email" value="${CLOUD?'':'budi@contoh.id'}"><small style="color:var(--mut);font-size:13px">Wajib. Kode OTP dan link atur ulang password dikirim ke sini.</small></label>
 <label class="f"><span>No HP</span><input id="rgH" type="tel" inputmode="tel" required pattern="[0-9 +]{9,16}" value="${CLOUD?'':'0813 2222 4545'}"></label>
 ${pw('rgP','Password (min. 8 karakter)','new-password')}${pw('rgP2','Ulangi password','new-password')}
 <label class="cbl"><input type="checkbox" required> <span>Saya setuju dengan syarat & ketentuan cafe</span></label>
 <button class="btn red" style="width:100%;margin-top:12px">Daftar & kirim OTP ke email</button></form>`
 :`<form class="card" id="loginF" style="max-width:520px"><label class="f"><span>Username</span><input id="lgE" required autocomplete="username" autocapitalize="none" spellcheck="false" placeholder="contoh: kasir.kemang"></label>
 ${pw('lgP','Password','current-password','minlength="1"')}
 <button class="btn red" style="width:100%">Masuk</button><button type="button" class="btn ghost" style="width:100%;margin-top:10px" data-act="forgot">Lupa password</button>
 <p class="note" style="margin-bottom:0">Satu halaman masuk untuk semua. Level akun (pelanggan, kasir, supervisor, admin) dibaca dari akun yang login, lalu menu menyesuaikan. Semua level masuk dengan username, bukan email. Pelanggan tetap menerima OTP di email yang didaftarkan; akun staf dibuat oleh admin.</p></form>
 ${CLOUD?'':`<div class="card scroll" style="max-width:760px;margin-top:14px"><h2 style="margin-bottom:4px">Akun contoh untuk mencoba</h2><p style="margin-top:0;color:var(--mut);font-size:14px">Hanya ada di prototipe. Tekan Pakai untuk mengisi form, lalu Masuk. Setiap cafe punya alamat sendiri: ${TEN.map(t=>`<a href="#${t.slug}">#${t.slug}</a>`).join(', ')}. Staf yang masuk dari alamat cafe lain dialihkan ke alamat cafenya.</p>
 <table class="t2" style="width:100%"><thead><tr><th>Level</th><th>Tenant</th><th>Username</th><th>Password</th><th></th></tr></thead><tbody>${ACCS.map((a,i)=>`<tr><td><b>${RL[a.role]}</b></td><td style="font-size:14px">${a.t?xe(tName(a.t).replace('Cafe Mahjong ','')):a.role==='owner'?'Semua':'-'}</td><td style="font-size:14px;overflow-wrap:anywhere">${xe(a.u)}</td><td style="font-size:14px">${xe(a.pw)}</td><td><button type="button" class="btn ghost" style="padding:6px 12px;min-height:38px" data-demo="${i}">Pakai</button></td></tr>`).join('')}</tbody></table></div>`}`}`};
const TN={E:'東',S:'南',W:'西',N:'北',C:'中',F:'發',P:'白'},SU={w:'萬',t:'筒',s:'條'};
const tile=(c,low)=>TN[c]?`<span class="tt ${c==='C'?'r':c==='F'?'g':''} ${low?'low':''}">${TN[c]}</span>`:`<span class="tt s-${c[1]} ${low?'low':''}"><b>${c[0]}</b><i>${SU[c[1]]}</i></span>`;
const hand=(str,lowAt=-1,lg)=>{let k=0;return `<div class="hand ${lg?'lg':''}">${str.split(' ').map(g=>`<span class="grp">${g.match(/\d[wts]|[ESWNCFP]/g).map(c=>tile(c,k++===lowAt)).join('')}</span>`).join('')}</div>`};
const COMBOS={
 hk:[
 {n:'Tangan campuran (chicken hand)',f:0,d:'Gabungan chow dan pung tanpa pola khusus. Sah untuk menang di aturan rumah.',h:'1w2w3w 5t5t5t 7s8s9s 3w4w5w 8t8t'},
 {n:'Semua urutan (ping hu)',f:1,d:'Empat chow (urutan) ditambah satu pasang bukan honor.',h:'1w2w3w 4t5t6t 7s8s9s 2w3w4w 5s5s'},
 {n:'Pung naga',f:1,d:'Tiga tile naga sama (中, 發, atau 白). Tambah 1 fan untuk tiap pung naga.',h:'CCC'},
 {n:'Pung angin kursi / angin ronde',f:1,d:'Pung angin sesuai kursi pemain atau angin ronde.',h:'EEE'},
 {n:'Zimo (ambil sendiri)',f:1,d:'Tile penentu diambil sendiri dari tembok.',h:''},
 {n:'Tangan tertutup',f:1,d:'Tidak ada set yang diambil dari buangan lawan.',h:''},
 {n:'Semua pung (dui dui hu)',f:3,d:'Empat pung ditambah satu pasang.',h:'2w2w2w 5t5t5t 8s8s8s EEE 9w9w'},
 {n:'Setengah warna (hun yi se)',f:3,d:'Satu jenis suit saja, dicampur tile honor.',h:'1t2t3t 5t5t5t 7t8t9t CCC WW'},
 {n:'Tujuh pasang',f:4,d:'Tujuh pasang berbeda. Biasanya aturan rumah.',h:'1w1w 4w4w 3t3t 8t8t 2s2s EE CC'},
 {n:'Tiga naga kecil',f:5,d:'Dua pung naga dan sepasang naga ketiga.',h:'CCC FFF PP 1w2w3w 5t6t7t'},
 {n:'Satu warna penuh (qing yi se)',f:7,d:'Semua 14 tile dari satu suit, tanpa honor.',h:'1s2s3s 3s4s5s 6s6s6s 7s8s9s 9s9s'},
 {n:'Tiga naga besar',f:8,d:'Pung untuk ketiga naga.',h:'CCC FFF PPP 2s3s4s 7w7w'},
 {n:'Semua honor',f:10,d:'Hanya tile angin dan naga. Nilai batas.',h:'EEE SSS CCC FFF NN'},
 {n:'Tiga belas yatim',f:13,d:'Satu dari setiap tile 1, 9, angin, dan naga, plus satu pasangan. Nilai batas.',h:'1w9w1t9t1s9s ESWN CFP 1w'}],
 tw:[
 {n:'Ping hu (semua urutan)',f:2,d:'Lima urutan dan satu pasang, tanpa honor dan bunga, menang dari buangan.',h:'1w2w3w 4w5w6w 3t4t5t 6s7s8s 7t8t9t 2s2s'},
 {n:'Zimo (ambil sendiri)',f:1,d:'Tile penentu diambil sendiri.',h:''},
 {n:'Menqing (tangan tertutup)',f:1,d:'Tidak ada set dari buangan lawan.',h:''},
 {n:'Bunga / musim sesuai kursi',f:1,d:'1 tai untuk tiap bunga atau musim yang cocok dengan kursi.',h:''},
 {n:'Pung naga',f:1,d:'1 tai untuk tiap pung naga.',h:'CCC'},
 {n:'Pung angin kursi / ronde',f:1,d:'Pung angin sesuai kursi atau angin ronde.',h:'EEE'},
 {n:'Semua pung (peng peng hu)',f:4,d:'Lima pung dan satu pasang.',h:'2w2w2w 5t5t5t 8s8s8s EEE 7w7w7w 9t9t'},
 {n:'Setengah warna (hun yi se)',f:4,d:'Satu suit dicampur honor.',h:'1t2t3t 4t5t6t 7t7t7t 8t8t8t CCC NN'},
 {n:'Tiga naga kecil',f:4,d:'Dua pung naga dan sepasang naga ketiga.',h:'CCC FFF PP 1w2w3w 4s5s6s 7t8t9t'},
 {n:'Satu warna penuh (qing yi se)',f:8,d:'Semua 17 tile dari satu suit.',h:'1s2s3s 2s3s4s 5s5s5s 6s7s8s 9s9s9s 4s4s'},
 {n:'Tiga naga besar',f:8,d:'Pung untuk ketiga naga.',h:'CCC FFF PPP 1w2w3w 6t7t8t 5s5s'},
 {n:'Empat angin kecil',f:8,d:'Tiga pung angin dan sepasang angin keempat.',h:'EEE SSS WWW NN 2w3w4w 6t6t6t'},
 {n:'Empat angin besar',f:16,d:'Pung untuk keempat angin.',h:'EEE SSS WWW NNN 3s4s5s 9w9w'},
 {n:'Semua honor',f:16,d:'Hanya tile angin dan naga.',h:'EEE SSS WWW CCC FFF NN'}],
 riichi:[
 {n:'Riichi',f:1,d:'Deklarasi siap menang dengan tangan tertutup.',h:''},
 {n:'Menzen tsumo',f:1,d:'Zimo dengan tangan tertutup.',h:''},
 {n:'Tanyao (semua tile 2 sampai 8)',f:1,d:'Tanpa tile 1, 9, dan honor.',h:'2w3w4w 5t6t7t 3s4s5s 6s6s6s 8t8t'},
 {n:'Pinfu',f:1,d:'Empat urutan, pasangan bukan yakuhai, tunggu dua sisi.',h:'1w2w3w 4t5t6t 7s8s9s 2w3w4w 5s5s'},
 {n:'Yakuhai (pung naga / angin)',f:1,d:'1 han untuk tiap pung naga atau angin yang berlaku.',h:'CCC'},
 {n:'Iipeikou (dua urutan kembar)',f:1,d:'Dua urutan identik di suit yang sama.',h:'2t3t4t 2t3t4t 6w7w8w 4s5s6s 9s9s'},
 {n:'Sanshoku (urutan sama 3 suit)',f:2,d:'Urutan angka yang sama di ketiga suit.',h:'3w4w5w 3t4t5t 3s4s5s 7w8w9w EE'},
 {n:'Ittsu (1 sampai 9 satu suit)',f:2,d:'Urutan 123, 456, 789 dari satu suit.',h:'1t2t3t 4t5t6t 7t8t9t 5s6s7s WW'},
 {n:'Chiitoitsu (tujuh pasang)',f:2,d:'Tujuh pasang berbeda.',h:'1w1w 4w4w 3t3t 8t8t 2s2s EE CC'},
 {n:'Toitoi (semua pung)',f:2,d:'Empat pung dan satu pasang.',h:'2w2w2w 5t5t5t 8s8s8s EEE 9w9w'},
 {n:'Honitsu (setengah warna)',f:3,d:'Satu suit dicampur honor.',h:'1t2t3t 5t5t5t 7t8t9t CCC WW'},
 {n:'Chinitsu (satu warna)',f:6,d:'Semua tile dari satu suit.',h:'1s2s3s 3s4s5s 6s6s6s 7s8s9s 9s9s'},
 {n:'Daisangen (tiga naga besar)',f:13,d:'Yakuman.',h:'CCC FFF PPP 2s3s4s 7w7w'},
 {n:'Kokushi musou (tiga belas yatim)',f:13,d:'Yakuman.',h:'1w9w1t9t1s9s ESWN CFP 1w'}],
 menang:[]};
const fam=()=>rule==='sederhana'||rule==='hk'?'hk':rule;
const UNIT={hk:'fan',tw:'tai',riichi:'han',menang:''};
const rP=h=>h>=13?32000:h>=11?24000:h>=8?16000:h>=6?12000:h>=5?8000:[0,1000,2000,3900,7700][h];
const toF=t=>rule==='riichi'?rP(t):t;
const ptsTxt=t=>rule==='sederhana'?(t*1000).toLocaleString('id-ID')+' poin':rule==='hk'?hkT(Math.min(t,10))+' poin':rule==='tw'?(30+10*t)+' poin':rule==='riichi'?rP(t).toLocaleString('id-ID')+' poin':'';
let calcSel=new Set(),cP=0,cHow='zimo',cD=1,scanP=0,scanN=0;
const SCANS={hk:[{h:'1t2t3t 5t5t5t 7t8t9t CCC WW',low:7,found:[['Setengah warna',3],['Pung naga 中',1]]},{h:'2w2w2w 5t5t5t 8s8s8s EEE 9w9w',low:4,found:[['Semua pung',3],['Pung angin 東',1]]},{h:'1w2w3w 4t5t6t 7s8s9s 2w3w4w 5s5s',low:10,found:[['Semua urutan',1]]}],
 tw:[{h:'1t2t3t 4t5t6t 7t7t7t 8t8t8t CCC NN',low:9,found:[['Setengah warna',4],['Pung naga 中',1]]},{h:'1w2w3w 4w5w6w 3t4t5t 6s7s8s 7t8t9t 2s2s',low:3,found:[['Ping hu',2]]}],
 riichi:[{h:'2w3w4w 5t6t7t 3s4s5s 6s6s6s 8t8t',low:5,found:[['Riichi',1],['Tanyao',1]]},{h:'1t2t3t 5t5t5t 7t8t9t CCC WW',low:7,found:[['Honitsu',3],['Yakuhai 中',1]]}],
 menang:[{h:'1w2w3w 5t5t5t 7s8s9s 3w4w5w 8t8t',low:2,found:[['Tangan sah untuk menang',0]]}]};
const curScan=()=>{const L=SCANS[fam()];return L[(scanN-1+L.length)%L.length]};
const ruleSel=()=>`<label class="f" style="max-width:420px;margin:0"><span>Aturan skor</span><select id="ruleSel">${Object.entries(RULES).map(([k,x])=>`<option value="${k}" ${k===rule?'selected':''}>${x.n}</option>`).join('')}</select></label>`;
function winPanel(total,src){const r={w:cP,how:cHow,d:cHow==='buang'?cD:null,f:toF(total)},dl=deltas(r);
 return `<h2 style="margin-top:18px">Hitung untuk pemain</h2><div class="tabs" style="margin-bottom:10px">${players.map((p,i)=>`<button class="cat ${i===cP?'on':''}" data-cp="${i}">${p}</button>`).join('')}</div>
 <div class="row" style="flex-wrap:nowrap"><label class="f" style="flex:1"><span>Cara menang</span><select id="cHow"><option value="zimo" ${cHow==='zimo'?'selected':''}>Zimo</option><option value="buang" ${cHow==='buang'?'selected':''}>Dari buangan</option></select></label>
 ${cHow==='buang'?`<label class="f" style="flex:1"><span>Pembuang</span><select id="cD">${players.map((p,i)=>i===cP?'':`<option value="${i}" ${i===cD?'selected':''}>${p}</option>`).join('')}</select></label>`:''}</div>
 <table class="t2"><thead><tr><th>Pemain</th><th class="n">Perubahan poin</th></tr></thead><tbody>${players.map((p,i)=>`<tr><td>${p}${i===cP?' <span class="pill p-ok">menang</span>':''}${cHow==='buang'&&i===cD?' <span class="pill p-bad">membuang</span>':''}</td><td class="n"><b>${nf(dl[i])}</b></td></tr>`).join('')}</tbody></table>
 <button class="btn red" style="width:100%;margin-top:12px" data-save="${src}|${total}">Simpan sebagai ronde ${rounds.length+1}</button>
 <p class="note">Setelah disimpan, pilih pemain lain untuk menghitung tangan berikutnya. Semua ronde masuk ke Papan skor.</p>`}
const skKomb=()=>{const L=COMBOS[fam()],u=UNIT[fam()];
 if(!L.length)return `<div class="card"><div class="row" style="justify-content:space-between;align-items:end">${ruleSel()}</div><p>${RULES[rule].d}</p><table class="t2"><thead><tr><th>Kejadian</th><th class="n">Poin</th></tr></thead><tbody><tr><td>Menang zimo</td><td class="n">+3</td></tr><tr><td>Menang dari buangan</td><td class="n">+2</td></tr><tr><td>Pembuang</td><td class="n">-1</td></tr></tbody></table>${winPanel(0,'k')}</div>`;
 const tot=[...calcSel].reduce((a,i)=>a+(L[i]?L[i].f:0),0);
 return `<div class="card" style="margin-bottom:16px">${ruleSel()}<p style="margin:10px 0 0;color:var(--mut)">${RULES[rule].d}${rule==='riichi'?' Poin di bawah adalah perkiraan ron pemain non-dealer dengan 30 fu.':''}</p></div>
 <div class="grid g2"><div class="card"><h2>Kombinasi tile · ${RULES[rule].n} <span class="code">S-03</span></h2>
 ${L.map(c=>`<div class="combo"><div class="ch"><b>${c.n}</b><div class="fan"><b>${c.f>=13&&rule==='riichi'?'Yakuman':c.f+' '+u}</b><small>${ptsTxt(c.f)}</small></div></div><small style="color:var(--mut)">${c.d}</small>${c.h?hand(c.h,-1,true):''}</div>`).join('')}</div>
 <div class="card" style="align-self:start"><h2>Kalkulator ${u}</h2><p style="margin-top:0;color:var(--mut)">Centang pola yang ada di tangan pemenang.</p>
 ${L.map((c,i)=>`<label class="cbl"><input type="checkbox" class="cb" value="${i}" ${calcSel.has(i)?'checked':''}> <span style="flex:1">${c.n}</span><b>${c.f}</b></label>`).join('')}
 <div class="price" style="margin-top:8px"><span>Total ${u}</span><b class="total">${tot} ${u} · ${ptsTxt(tot)}</b></div>
 ${winPanel(tot,'k')}</div></div>`};
const skFoto=()=>{const S=scan==='done'?curScan():null,u=UNIT[fam()],tot=S?S.found.reduce((a,x)=>a+x[1],0)+(cHow==='zimo'&&fam()!=='menang'?1:0):0;
 return `<div class="card" style="margin-bottom:16px">${ruleSel()}</div><div class="grid g2"><div class="card"><h2>Foto tile di meja <span class="code">S-06</span></h2>
 <div class="tabs" style="margin-bottom:10px">${players.map((p,i)=>`<button class="cat ${i===scanP?'on':''}" data-scp="${i}">Tangan ${p}</button>`).join('')}</div>
 <p style="margin-top:0">Foto tile pemenang dari atas. Susun berjajar, pastikan semua tile terlihat dan tidak silau. Setiap pemain bisa difoto bergantian.</p>
 <label class="drop"><input type="file" accept="image/*" capture="environment" id="tileImg"><span>${photoURL?`<img src="${photoURL}" alt="Foto tile">`:`<b>Foto tangan ${players[scanP]}</b><br><small style="color:var(--mut)">Kamera HP terbuka otomatis di aplikasi Android</small>`}</span></label>
 <button class="btn ghost" style="width:100%" data-act="sample">Coba dengan contoh tangan</button></div>
 <div class="card"><h2>Hasil hitung · ${players[scanP]}</h2>${!scan?'<p style="color:var(--mut)">Belum ada foto. Hasil pengenalan tile dan skornya akan muncul di sini.</p>':scan==='proc'?'<p><b>Mengenali tile...</b></p><div class="prog"><i style="width:60%"></i></div>':`
 <p style="margin:0">${S.h.replace(/ /g,'').match(/\d[wts]|[ESWNCFP]/g).length} tile terdeteksi. Tile bergaris kuning kurang yakin (71%), ketuk untuk koreksi.</p>${hand(S.h,S.low,true)}
 ${S.found.map(([n,f])=>`<div class="price"><span>${n}</span><b>${u?f+' '+u:''}</b></div>`).join('')}${cHow==='zimo'&&u?`<div class="price"><span>Zimo</span><b>1 ${u}</b></div>`:''}
 ${u?`<div class="price"><span>Total</span><b class="total">${tot} ${u} · ${ptsTxt(tot)}</b></div>`:''}
 <button class="btn ghost" data-act="fix" style="margin-top:8px">Koreksi tile</button>${winPanel(tot,'f')}`}
 <p class="note">Simulasi tampilan. Di aplikasi asli, foto dikenali oleh model pengenal gambar, lalu petugas atau pemain mengonfirmasi sebelum skor disimpan.</p></div></div>`};
V.skor=()=>`<h1>Hitung skor mahjong <span class="code">S-01 sampai S-06</span></h1><p class="sub">Sesi Meja 1 · ${players.join(', ')}. Skor berupa angka poin saja, tanpa rupiah.</p>${seatCard()}
 <div class="tabs">${[['papan','Papan skor'],['kombinasi','Kombinasi & nilai'],['foto','Foto tile']].map(([k,l])=>`<button class="cat ${skTab===k?'on':''}" data-sk="${k}">${l}</button>`).join('')}</div>
 ${skTab==='papan'?skorPapan():skTab==='kombinasi'?skKomb():skFoto()}`;


V.beranda=()=>{const t=TEN.find(x=>x.id===curT),th=thOf(t),ac=th.acc||'#c8282d',RC=[th.bg,ac,'#6b4bb7','#1f7a5a'],GL=['中','發','東','西'];
 const steps=[['Daftar akun','Isi nama, username, email, dan no HP, lalu masukkan kode OTP dari email.'],['Pilih meja dan jam','Lihat meja kosong, pilih jam main, lalu bayar DP '+dpPct+'% lewat QRIS atau transfer.'],['Datang dan main','Tunjukkan kode booking ke kasir. Pesan makanan dari HP tanpa antre.']];
 return `${heroHtml(t,th)}
 <div class="steps">${steps.map(([h,p],k)=>`<div class="step rv" style="--d:${k};--sa:${RC[k%2]}"><div class="n">${k+1}</div><h3>${h}</h3><p>${p}</p></div>`).join('')}</div>
 ${role()==='tamu'&&!member?`<div class="regline rv"><p><b>Belum punya akun?</b> Booking meja, pesan makanan, dan simpan skor butuh akun.</p><a href="#akun" class="btn red" style="text-decoration:none;flex:none">Buat akun</a></div>`:''}
 <div class="bsec"><h2 class="rv">Tarif meja <span class="code">P-01</span></h2><p class="sub rv">Per orang per jam, minimal ${minH} jam. VIP ber-AC dengan meja auto-shuffle.</p>
 <div class="rates">${typeRates().map(([a,[r,w]],k)=>{const c=RC[k%RC.length];return `<div class="rate rv" style="--d:${k};--rc:${c};--rk:${inkOn(c)}"><span class="gl">${GL[k%4]}</span><div class="ty">${xe(a)}</div><div class="pr">${rp(r)}<small> /jam</small></div><div class="wk">Akhir pekan ${rp(w)}</div></div>`}).join('')}</div></div>
 <div class="bsec bgrid"><div><h2 class="rv">Promo berlangsung <span class="code">P-07</span></h2><p class="sub rv">Potongan langsung masuk ke tagihan, tanpa kode.</p>
 ${HH.filter(r=>r.on).map((r,k)=>`<div class="ticket rv" style="--d:${k}"><span class="pct">${r.disc}%</span><b>${xe(r.n)}</b><span class="ds">${r.from}.00 sampai ${r.to}.00, ${r.days.length===7?'setiap hari':r.days.map(x=>DN[x]).join(', ')}. Diskon tarif meja.</span></div>`).join('')||'<div class="ticket rv"><b>Belum ada tarif khusus</b></div>'}
 <div class="ticket rv" style="--d:1"><span class="pct">20%</span><b>Member baru</b><span class="ds">Diskon F&B di kunjungan pertama.</span></div></div>
 <div><h2 class="rv">Meja hari ini</h2><p class="sub rv">Meja hijau bisa langsung dibooking.</p>
 <div class="mjg">${tables.map((x,k)=>{const f=x.st==='free',b=x.st==='book';const tag=f?'a':'div';return `<${tag} ${f?'href="#booking"':''} class="mj rv ${f?'free':''}" style="--d:${k%6}"><span class="dot ${f?'':b?'bk':'busy'}"></span><span><b>${xe(x.n)}</b><small>${f?'Kosong':b?'Dipesan '+x.at:'Sedang main'} · ${xe(x.type)}</small></span></${tag}>`}).join('')}</div></div></div>`};
const hours=['12','13','14','15','16','17','18','19','20','21','22','23'];
const bookings={0:[{id:'BK-101',t:'Meja 1',s:3,l:3,n:'Budi + 3',k:'main',dp:31500},{id:'W-01',t:'Meja 2',s:3.75,l:1,n:'Walk-in (Rudi)',k:'main'},{id:'BK-098',t:'Meja 3',s:0,l:2,n:'Andre K.',k:'selesai',dp:21000},
 {id:'BK-107',t:'Meja 2',s:4.75,l:3,n:'Sinta Wijaya',k:'dp',dp:31500,pl:4},{id:'BK-104',t:'Meja 4',s:7,l:3,n:'Dimas Pratama',k:'dp',dp:31500,pl:4},{id:'BK-099',t:'VIP 1',s:1.5,l:3,n:'Hendra + 3',k:'selesai',dp:54000},
 {id:'BK-105',t:'VIP 2',s:6,l:2,n:'Kevin T.',k:'dp',dp:36000,pl:4},{id:'BK-106',t:'Private',s:8,l:4,n:'Komunitas Bambu',k:'dp',dp:108000,pl:4},{id:'BK-108',t:'VIP 2',s:9,l:3,n:'Rina Andayani',k:'verif',dp:54000,kode:243,pl:4,via:'Transfer BCA',snd:'RINA ANDAYANI',made:4.3}],
 1:[{id:'BK-110',t:'Meja 2',s:2,l:2,n:'Yohan',k:'dp',dp:21000,pl:4},{id:'BK-111',t:'VIP 2',s:7,l:3,n:'Grup Arisan Melati',k:'dp',dp:54000,pl:4},{id:'BK-112',t:'Meja 1',s:1,l:3,n:'Lina S.',k:'dp',dp:31500,pl:3}]};
const isWk=d=>{const x=new Date(D0[0],D0[1],D0[2]+ +d).getDay();return x===0||x===6};
const dowOf=d=>new Date(D0[0],D0[1],D0[2]+ +d).getDay();
const rateFor=(t,d)=>isWk(d)?t.wk:t.rate;
let minH=2,dpPct=30,bookPl=4,startPl=4,tarLog=[];
const HH=[{n:'Happy hour siang',days:[1,2,3,4],from:13,to:16,disc:20,on:true},{n:'Tengah malam',days:[0,1,2,3,4,5,6],from:22,to:24,disc:10,on:false}];
const DN=['Min','Sen','Sel','Rab','Kam','Jum','Sab'];
function bkCalc(tn,hs,pl,d){const t=tables.find(x=>x.n===tn);if(!t||!hs.length)return{rate:0,sewa:0,disc:0,dp:0,hhN:''};const rate=rateFor(t,d),sewa=rate*hs.length*pl;let disc=0,hhN=[];
 HH.filter(r=>r.on&&r.days.includes(dowOf(d))).forEach(r=>{const n=hs.filter(h=>12+h>=r.from&&12+h<r.to).length;if(n){disc+=Math.round(rate*pl*n*r.disc/100);hhN.push(`${r.n} ${r.disc}% (${n} jam)`)}});
 return{rate,sewa,disc,dp:Math.round((sewa-disc)*dpPct/100/100)*100,hhN:hhN.join(', ')}}
Object.entries(bookings).forEach(([d,L])=>L.forEach(b=>{const t=tables.find(x=>x.n===b.t);b.pl=b.pl||4;b.rate=rateFor(t,d);if(b.dp)b.dp=Math.round(b.rate*b.l*b.pl*.3/100)*100}));
tables.forEach(t=>{if(t.el!=null||t.st==='book'){t.pl=t.pl||4;t.lockRate=t.rate;if(t.dp)t.dp=Math.round(t.rate*t.plan/60*t.pl*.3/100)*100}});
const typeRates=()=>{const m={};tables.forEach(t=>{if(!m[t.type])m[t.type]=[t.rate,t.wk];else{m[t.type][0]=Math.min(m[t.type][0],t.rate);m[t.type][1]=Math.min(m[t.type][1],t.wk)}});return Object.entries(m)};
let menuSel=1,recDraft=null;const MCATS=['Makanan','Minuman','Camilan','Paket'];const isPkg=m=>m&&m.c==='Paket';const rOf=m=>{const usePk=isPkg(m)&&m.pk&&m.pk.length,r=usePk?{}:{...((m&&m.r)||{})};if(usePk)m.pk.forEach(([id,q])=>{const x=menu.find(y=>y.id==id);if(x&&x!==m&&!isPkg(x))Object.entries(x.r||{}).forEach(([k,v])=>r[k]=(r[k]||0)+v*q)});return r};const mIni=m=>m.n.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase();const mThumb=(m,sz=40)=>m.img?`<img src="${xe(m.img)}" alt="" class="mth" style="width:${sz}px;height:${sz}px">`:`<span class="mth ic" style="width:${sz}px;height:${sz}px;font-size:${Math.round(sz/2.8)}px">${mIni(m)}</span>`;const pkgList=m=>{if(!isPkg(m)||!m.pk||!m.pk.length)return '';const L=m.pk.map(([id,q])=>{const x=menu.find(y=>y.id==id);return x?`<span class="pki">${mThumb(x,28)}<span>${q>1?q+'× ':''}${xe(x.n)}</span></span>`:''}).join('');return L?`<span class="pkl"><small>Isi paket:</small>${L}</span>`:''};
const readDraft=()=>{if(recDraft)recDraft.r=recDraft.r.map((x,j)=>{const b=$('#rb-'+j),q=$('#rq-'+j);return b?[b.value,+q.value||0]:x});if(recDraft&&recDraft.pk)recDraft.pk=recDraft.pk.map((x,j)=>{const b=$('#pkb-'+j),q=$('#pkq-'+j);return b?[+b.value,Math.max(1,+q.value||1)]:x})};
V.hargamenu=()=>`<h1>Harga menu <span class="code">A-05</span></h1><p class="sub">Ubah nama, kategori, dan harga jual, atau tambah menu baru. Harga baru langsung tampil di halaman pesan.</p>
 <form class="card scroll" id="menuF"><table class="t2 stack"><thead><tr><th>Nama menu</th><th>Kategori</th><th>Harga jual</th><th class="n">HPP</th><th class="n">Margin</th><th></th></tr></thead><tbody>
 ${menu.map((x,i)=>{const h=hpp(x);return `<tr><td><div class="row" style="flex-wrap:nowrap;gap:8px;align-items:center">${mThumb(x,40)}<input class="tin tl" id="mn-${i}" value="${x.n.replace(/"/g,'&quot;')}" required></div>${pkgList(x)}</td><td><select class="tin tl" id="mc-${i}">${MCATS.map(c=>`<option ${c===x.c?'selected':''}>${c}</option>`).join('')}</select></td>
 <td><input class="tin" type="number" step="500" min="0" inputmode="numeric" id="mp-${i}" value="${x.p}"></td><td class="n">${rp(h)}</td><td class="n">${x.p?Math.round((1-h/x.p)*100):0}%</td><td><button type="button" class="btn ghost" style="padding:6px 12px;min-height:38px" data-mres="${x.id}">${isPkg(x)?'Isi paket & foto':'Resep & foto'}</button></td></tr>`}).join('')}</tbody></table>
 <div class="row" style="margin-top:12px"><button type="button" class="btn ghost" data-act="addmenu">+ Tambah menu</button><button class="btn red">Simpan harga menu</button></div></form>`;
V.resep=()=>{const m=menu.find(x=>x.id===menuSel)||menu[0];if(!recDraft||recDraft.id!==m.id)recDraft={id:m.id,r:Object.entries(m.r),pk:(m.pk||[]).map(x=>[...x])};
 const h=recDraft.r.reduce((a,[k,v])=>a+v*(stock[k]?stock[k].c:0),0);
 return `<h1>Resep menu <span class="code">G-04</span></h1><p class="sub">Atur takaran bahan per porsi. Resep dipakai untuk memotong stok gudang otomatis setiap ada pesanan.</p>
 <div class="card row" style="align-items:center;gap:10px;margin-bottom:14px;padding:14px 18px"><div style="flex:1;min-width:220px"><b>Upload resep dari Excel</b><div style="font-size:13px;color:var(--mut)">Isi template, lalu upload. Data dicek dulu di pratinjau sebelum disimpan. Bisa .xlsx atau .csv.</div></div><button type="button" class="btn ghost" data-act="rtpl">Unduh template</button><label class="btn red" style="cursor:pointer;margin:0">Upload file Excel<input type="file" id="recFile" accept=".xlsx,.csv" style="display:none"></label></div>
 <div class="tabs">${menu.map(x=>`<button class="cat ${x.id===m.id?'on':''}" data-msel="${x.id}">${x.n}</button>`).join('')}<button class="cat" style="border-style:dashed;color:var(--grn,#0f3d2e);font-weight:600" data-act="newmenu">+ Menu baru</button></div>
 <div class="card" style="max-width:640px;margin-bottom:16px"><h2>Foto menu · ${xe(m.n)}</h2><div class="row" style="align-items:center;gap:14px">${mThumb(m,96)}<div><label class="btn red" style="cursor:pointer;margin:0">${m.img?'Ganti foto':'Upload foto'}<input type="file" id="mFoto" accept="image/*" style="display:none"></label> ${m.img?'<button type="button" class="btn ghost" data-act="mfotox">Hapus foto</button>':''}<div style="font-size:13px;color:var(--mut);margin-top:6px">Foto tampil di Harga menu, daftar menu pesanan, dan isi paket.</div></div></div></div>
 ${isPkg(m)?`<div class="card" style="max-width:640px;margin-bottom:16px"><h2>Isi paket · ${xe(m.n)}</h2><p style="margin-top:0;color:var(--mut)">Paket tidak memakai bahan langsung. Tambahkan menu yang sudah ada beserta jumlahnya. HPP paket dihitung dari HPP menu isinya, dan stok bahan terpotong sesuai resep masing-masing menu. Pelanggan melihat isi paket beserta foto, tanpa harga per item.</p>
 ${recDraft.pk.length?'':'<p style="color:var(--mut)">Belum ada menu di paket ini. Tekan + Tambah menu.</p>'}
 ${recDraft.pk.map(([id,q],j)=>`<div class="row" style="flex-wrap:nowrap;gap:6px;margin-bottom:8px">${mThumb(menu.find(x=>x.id==id)||{n:'?'},40)}<select class="tin tl rch" id="pkb-${j}" style="flex:2">${menu.filter(x=>!isPkg(x)).map(x=>`<option value="${x.id}" ${x.id==id?'selected':''}>${xe(x.n)}</option>`).join('')}</select><input class="tin rch" type="number" min="1" id="pkq-${j}" value="${q}" style="flex:none;width:70px" aria-label="Jumlah"><button type="button" class="btn ghost" style="padding:6px 10px;min-height:40px" data-pkdel="${j}">Hapus</button></div>`).join('')}
 ${(()=>{const hp=recDraft.pk.reduce((a,[id,q])=>{const x=menu.find(y=>y.id==id);return a+(x?hpp(x)*q:0)},0);return `<div class="price" style="margin-top:12px"><span>HPP paket (dari menu isi)</span><b>${rp(hp)}</b></div><div class="price"><span>Harga jual paket (diatur di Harga menu)</span><b>${rp(m.p)}</b></div><div class="price"><span>Margin</span><b class="total" style="color:var(--ok)">${m.p?Math.round((1-hp/m.p)*100):0}%</b></div>`})()}
 <div class="row" style="margin-top:12px"><button type="button" class="btn ghost" data-act="pkadd">+ Tambah menu</button><button type="button" class="btn red" data-act="rsave">Simpan isi paket</button></div></div>`:''}
 ${isPkg(m)?'':`<div class="card" style="max-width:640px;margin-bottom:16px"><h2>Resep · ${m.n}</h2><p style="margin-top:0;color:var(--mut)">Takaran bahan untuk 1 porsi.</p>
 ${recDraft.r.length?'':'<p style="color:var(--mut)">Belum ada bahan. Tambahkan bahan agar stok terpotong otomatis.</p>'}
 ${recDraft.r.map(([k,v],j)=>`<div class="row" style="flex-wrap:nowrap;gap:6px;margin-bottom:8px"><select class="tin tl rch" id="rb-${j}" style="flex:2">${Object.entries(stock).map(([sk,st])=>`<option value="${sk}" ${sk===k?'selected':''}>${st.n}</option>`).join('')}<option value="__new">+ Tambah bahan baru…</option></select><button type="button" class="btn ghost" style="padding:6px 10px;min-height:40px" data-bedit="rb-${j}" title="Ubah nama bahan">Ubah</button><input class="tin rch" type="number" min="0" id="rq-${j}" value="${v}" style="flex:1"><span style="width:34px;color:var(--mut)">${stock[k]?stock[k].u:''}</span><button type="button" class="btn ghost" style="padding:6px 10px;min-height:40px" data-rdel="${j}">Hapus</button></div>`).join('')}
 <button type="button" class="btn ghost" data-act="radd">+ Tambah bahan</button>
 <div class="price" style="margin-top:12px"><span>HPP per porsi</span><b>${rp(h)}</b></div><div class="price"><span>Harga jual (diatur di Harga menu)</span><b>${rp(m.p)}</b></div>
 <div class="price"><span>Margin</span><b class="total" style="color:var(--ok)">${m.p?Math.round((1-h/m.p)*100):0}%</b></div>
 <button type="button" class="btn red" style="width:100%" data-act="rsave">Simpan resep</button></div>`}
 ${bahanEditor()}`};

V.tarif=()=>`<h1>Atur tarif meja <span class="code">A-02</span></h1><p class="sub">Tarif dihitung per jam per orang. Perubahan berlaku untuk booking dan meja yang dibuka setelah disimpan. Booking yang DP-nya sudah dibayar tetap memakai tarif saat booking.</p>${mejaNote()}
 <form id="tarF"><div class="grid g2"><div class="card scroll"><h2>Meja, tipe & tarif</h2><datalist id="tipeL">${[...new Set(tables.map(t=>t.type))].map(x=>`<option value="${x}">`).join('')}</datalist><table class="t2 stack"><thead><tr><th>Nama meja</th><th>Tipe</th><th>Hari biasa /jam/orang</th><th>Akhir pekan /jam/orang</th></tr></thead><tbody>
 ${tables.map((t,i)=>`<tr><td><input class="tin tl" id="tn-${i}" value="${t.n}" required></td><td><input class="tin tl" id="tt-${i}" list="tipeL" value="${t.type}" required></td><td><input class="tin" type="number" step="500" min="0" inputmode="numeric" id="tr-${i}" value="${t.rate}"></td><td><input class="tin" type="number" step="500" min="0" inputmode="numeric" id="tw-${i}" value="${t.wk}"></td></tr>`).join('')}</tbody></table>
 <h2 style="margin-top:18px">Ubah sekaligus per tipe</h2><div class="row" style="align-items:end"><label class="f" style="flex:1;margin:0"><span>Tipe meja</span><select id="blT">${[...new Set(tables.map(t=>t.type))].map(x=>`<option>${x}</option>`).join('')}</select></label>
 <label class="f" style="flex:1;margin:0"><span>Hari biasa</span><input id="blR" type="number" step="500" inputmode="numeric" placeholder="Rp"></label><label class="f" style="flex:1;margin:0"><span>Akhir pekan</span><input id="blW" type="number" step="500" inputmode="numeric" placeholder="Rp"></label>
 <button type="button" class="btn ghost" data-act="bulk">Terapkan</button></div></div>
 <div class="grid" style="align-content:start"><div class="card"><h2>Aturan booking</h2>
 <div class="row" style="flex-wrap:nowrap"><label class="f" style="flex:1"><span>Minimal lama main</span><select id="minH">${[1,2,3].map(h=>`<option value="${h}" ${h===minH?'selected':''}>${h} jam</option>`).join('')}</select></label>
 <label class="f" style="flex:1"><span>DP booking (%)</span><input id="dpPct" type="number" min="10" max="100" step="5" value="${dpPct}" inputmode="numeric"></label></div></div>
 <div class="card"><h2>Tarif khusus jam tertentu</h2>${HH.map((r,i)=>`<div class="part"><label class="cbl" style="border:0;padding:0"><input type="checkbox" id="hon-${i}" ${r.on?'checked':''}> <b style="flex:1">${r.n}</b></label>
 <div class="row" style="flex-wrap:nowrap;margin-top:8px"><label class="f" style="flex:1;margin:0"><span>Mulai</span><input id="hfr-${i}" type="number" min="12" max="23" value="${r.from}"></label><label class="f" style="flex:1;margin:0"><span>Sampai</span><input id="hto-${i}" type="number" min="13" max="24" value="${r.to}"></label><label class="f" style="flex:1;margin:0"><span>Diskon %</span><input id="hds-${i}" type="number" min="0" max="100" value="${r.disc}"></label></div>
 <small style="color:var(--mut)">Berlaku: ${r.days.length===7?'setiap hari':r.days.map(x=>DN[x]).join(', ')}</small></div>`).join('')}</div>
 <div class="card"><h2>Contoh hitungan</h2>${typeRates().map(([ty,[r,w]])=>`<div class="price"><span>${ty} · 3 jam × 4 orang</span><b>${rp(r*12)}<br><small style="color:var(--mut)">akhir pekan ${rp(w*12)}</small></b></div>`).join('')}</div>
 <button class="btn red">Simpan tarif</button>
 ${tarLog.length?`<div class="card"><h2>Riwayat perubahan</h2>${tarLog.map(x=>`<div class="price"><span>${x.msg}</span><b>${x.at}</b></div>`).join('')}</div>`:''}</div></div></form>`;

const occ=(d,t,i)=>(bookings[d]||[]).some(b=>b.t===t&&i<b.s+b.l&&i+1>b.s);
const clock=h=>{const m=Math.round((12+h)*60);return String(Math.floor(m/60)).padStart(2,'0')+'.'+String(m%60).padStart(2,'0')};
const nowH=()=>{const d=new Date();return 4.6+(Date.now()-T0)/36e5};
const bookingPub=()=>{const d=[...Array(10)].map((_,i)=>{const x=new Date(D0[0],D0[1],D0[2]+i);return{w:x.toLocaleDateString('id-ID',{weekday:'short'}),d:x.getDate(),m:x.toLocaleDateString('id-ID',{month:'short'})}});
 const t=bookSel&&tables.find(x=>x.n===bookSel.t);const dur=bookSel?bookSel.h.length:0;
 const C=bkCalc(t?t.n:'',bookSel?bookSel.h:[],bookPl,dayI),sewa=C.sewa,dp=C.dp;
 const K={main:'Sedang main',dp:'Terkonfirmasi (DP lunas)',selesai:'Selesai'};
 return `<h1>Jadwal & booking meja <span class="code">P-04</span></h1><p class="sub">Pilih tanggal, lalu ketuk jam yang kosong. Ketuk beberapa jam berurutan untuk durasi lebih lama.</p>
 <div class="days">${d.map((x,i)=>`<button class="day ${i===dayI?'on':''}" data-day="${i}">${x.w}<b>${x.d}</b>${x.m}</button>`).join('')}</div>
 <div class="card" style="margin-bottom:16px"><h2>Jadwal pemakaian per meja</h2>
 <div class="tlax"><span></span><div>${['12.00','15.00','18.00','21.00','24.00'].map(x=>`<span>${x}</span>`).join('')}</div></div>
 ${tables.map(tb=>{const L=(bookings[dayI]||[]).filter(b=>b.t===tb.n).sort((a,b)=>a.s-b.s);return `<div class="tl"><div class="tln"><b>${tb.n}</b><small>${tb.type} · ${L.length?L.length+' sesi':'kosong seharian'}</small></div>
 <div><div class="tlt">${dayI===0?`<i class="now" style="left:${nowH()/12*100}%"></i>`:''}${L.map(b=>`<div class="blk ${b.k}" style="left:${b.s/12*100}%;width:${b.l/12*100}%" title="${clock(b.s)}-${clock(b.s+b.l)} ${b.n}"><b>${clock(b.s)}-${clock(b.s+b.l)}</b> ${b.n}</div>`).join('')}</div>
 <div class="tll">${L.length?L.map(b=>`${clock(b.s)}-${clock(b.s+b.l)} · ${b.n} · ${K[b.k]}`).join('<br>'):'Belum ada booking'}</div></div></div>`}).join('')}
 <div class="legend"><span><i style="background:var(--felt2)"></i>Sedang main</span><span><i style="background:var(--red)"></i>Booking terkonfirmasi</span><span><i style="background:#8d8676"></i>Selesai</span>${dayI===0?'<span><i style="background:#e9b949;width:4px"></i>Jam sekarang</span>':''}</div></div>
 <div class="grid g2"><div class="card sched"><h2>Pilih jam kosong</h2><table><thead><tr><th>Meja</th>${hours.map(h=>`<th>${h}.00</th>`).join('')}</tr></thead><tbody>
 ${tables.map(tb=>`<tr><th>${tb.n}<br><small style="font-weight:400">${rp(rateFor(tb,dayI))}/org</small></th>${hours.map((_,i)=>{const b=occ(dayI,tb.n,i)||(dayI===0&&i<4),s=bookSel&&bookSel.t===tb.n&&bookSel.h.includes(i);return`<td><button class="slot ${b?'bk':''} ${s?'sel':''}" ${b?'disabled aria-label="Tidak tersedia"':`aria-label="${tb.n} jam ${hours[i]}.00"`} data-slot="${tb.n}|${i}"></button></td>`}).join('')}</tr>`).join('')}
 </tbody></table><div class="legend"><span><i style="background:light-dark(#e4f1ea,#17302a)"></i>Kosong</span><span><i style="background:light-dark(#d4cbbb,#3a3a33)"></i>Terisi / sudah lewat</span><span><i style="background:var(--red)"></i>Pilihan kamu</span></div></div>
 <form class="card sum" id="bookF"><h2>Form booking</h2>
 <div class="price"><span>Meja</span><b>${t?t.n+' · '+t.type:'Belum dipilih'}</b></div>
 <div class="price"><span>Waktu</span><b>${dur?`${hours[bookSel.h[0]]}.00 sampai ${+hours[bookSel.h[dur-1]]+1}.00 (${dur} jam)`:'-'}</b></div>
 <label class="f" style="margin-top:12px"><span>Nama pemesan</span><input required value="Sinta Wijaya"></label>
 <label class="f"><span>Nomor WhatsApp</span><input required inputmode="tel" value="0812 3456 7890"></label>
 <label class="f"><span>Jumlah pemain</span><select id="bkPl">${[4,3,2].map(n=>`<option value="${n}" ${n===bookPl?'selected':''}>${n} orang</option>`).join('')}</select></label>
 <div class="price"><span>Tarif ${t?(isWk(dayI)?'akhir pekan':'hari biasa'):''}</span><b>${t?rp(C.rate)+' /jam/orang':'-'}</b></div>
 <div class="price"><span>Sewa meja${dur?` (${rp(C.rate)} × ${dur} jam × ${bookPl} orang)`:''}</span><b>${rp(sewa)}</b></div>
 <div class="price"><span>Tarif khusus${C.hhN?` · ${C.hhN}`:''}</span><b>${C.disc?'-'+rp(C.disc):rp(0)}</b></div>
 <div class="price"><span>Total sewa</span><b>${rp(sewa-C.disc)}</b></div>
 <div class="price"><span>DP wajib ${dpPct}%</span><b class="total">${rp(dp)}</b></div>
 <p class="note" style="margin-top:6px">Slot ditahan 30 menit. Kalau DP belum dibayar, booking batal otomatis. Sisa tagihan dibayar di kasir.</p>
 <button class="btn red" style="width:100%;margin-top:6px" ${dur<minH?'disabled':''}>${dur<minH?'Pilih minimal '+minH+' jam':'Lanjut bayar DP'}</button></form></div>`};

const dayLbl=d=>{const x=new Date(D0[0],D0[1],D0[2]+ +d);return x.toLocaleDateString('id-ID',{weekday:'short',day:'numeric',month:'short'})};
const KL={bayar:['Menunggu bayar DP','p-warn'],verif:['Menunggu verifikasi','p-warn'],tolak:['Bukti ditolak','p-bad'],main:['Sedang main','p-ok'],dp:['Belum datang','p-info'],hadir:['Sudah datang','p-ok'],selesai:['Selesai','p-mut'],batal:['Batal','p-bad']};
let bkF='aktif',moveId=null;
const allBk=()=>Object.entries(bookings).flatMap(([d,L])=>L.filter(b=>!/^W-/.test(b.id)).map(b=>({b,d:+d})));
const findBk=id=>allBk().find(x=>x.b.id===id);
const conflict=(d,t,b)=>(bookings[d]||[]).some(o=>o.id!==b.id&&o.t===t&&o.k!=='selesai'&&o.k!=='batal'&&b.s<o.s+o.l&&b.s+b.l>o.s);
const busyNow=(d,t,b)=>{if(d!==0)return false;const tb=tables.find(x=>x.n===t);if(!tb||!(tb.st==='play'||tb.st==='bill'))return false;const endH=tb.st==='play'?nowH()+Math.max(remain(tb),0)/60:nowH()+.25;return b.s<endH};
const userBk=nama=>allBk().filter(x=>x.b.n===nama);
const userBkHtml=nama=>{const L=userBk(nama);return (L.length?L.map(({b,d})=>`<div class="price"><span>${b.t} · ${dayLbl(d)}<br><small style="color:var(--mut)">${clock(b.s)} sampai ${clock(b.s+b.l)} · DP ${rp(b.dp||0)} lunas</small>${b.from?`<br><span class="pill p-warn">Meja dipindah dari ${b.from}</span>`:''}${b.k==='bayar'||b.k==='tolak'?`<br><button class="btn red" style="padding:6px 12px;margin-top:6px;min-height:36px" data-redp="${b.id}">${b.k==='tolak'?'Upload ulang bukti':'Bayar DP'}</button>`:''}</span><b><span class="pill ${KL[b.k][1]}">${KL[b.k][0]}</span></b></div>`).join(''):'')+`<div class="price"><span>VIP 2 · Sab 21 Nov<br><small style="color:var(--mut)">15.00 sampai 18.00</small></span><b><span class="pill p-mut">Selesai</span></b></div>`};
const staffBk=()=>{const L=allBk().filter(({b})=>bkF==='semua'||['bayar','verif','tolak','dp','hadir'].includes(b.k)).sort((a,c)=>a.d-c.d||a.b.s-c.b.s);const mv=moveId&&findBk(moveId);
 return `<div class="tabs">${[['aktif','Belum selesai'],['semua','Semua booking']].map(([k,l])=>`<button class="cat ${bkF===k?'on':''}" data-bkf="${k}">${l}</button>`).join('')}</div>
 <div class="card scroll"><table class="t2 stack"><thead><tr><th>Waktu</th><th>Pemesan</th><th>Meja</th><th class="n">DP</th><th>Status</th><th>Aksi</th></tr></thead><tbody>
 ${L.map(({b,d})=>{const busy=(b.k==='dp'||b.k==='hadir')&&busyNow(d,b.t,b);return `<tr><td><b>${dayLbl(d)}</b><br>${clock(b.s)} sampai ${clock(b.s+b.l)}</td><td>${b.n}<br><small style="color:var(--mut)">${b.id} · ${b.pl||4} pemain</small></td>
 <td><b>${b.t}</b>${b.from?`<br><small style="color:var(--mut)">dari ${b.from}</small>`:''}${busy?'<br><span class="pill p-warn">Meja masih dipakai</span>':''}</td><td class="n">${rp(b.dp||0)}</td><td><span class="pill ${KL[b.k][1]}">${KL[b.k][0]}</span></td>
 <td>${b.k==='dp'||b.k==='hadir'?`<div class="row" style="gap:6px">${b.k==='dp'&&d===0?`<button class="btn" style="padding:8px 12px" data-cf="${b.id}">Konfirmasi datang</button>`:''}<button class="btn ghost" style="padding:8px 12px" data-mvopen="${b.id}">Ubah meja</button></div>`:'-'}</td></tr>`}).join('')}</tbody></table></div>
 ${mv?`<div class="grid g2" style="margin-top:16px"><div class="card"><h2>Ubah meja · ${mv.b.n} <span class="code">K-11</span></h2><p style="margin-top:0">${mv.b.id} · ${dayLbl(mv.d)}, ${clock(mv.b.s)} sampai ${clock(mv.b.s+mv.b.l)} · sekarang di <b>${mv.b.t}</b></p>
 <label class="f"><span>Alasan pindah</span><select id="mvWhy"><option>Meja booking masih dipakai (perpanjangan waktu)</option><option>Permintaan pelanggan</option><option>Meja sedang diperbaiki</option></select></label>
 <div class="mvg">${tables.filter(t=>t.n!==mv.b.t).map(t=>{const c=conflict(mv.d,t.n,mv.b),u=busyNow(mv.d,t.n,mv.b),ok=!c&&!u;return `<button class="tb ${ok?'':'dis'}" ${ok?`data-mv="${t.n}"`:'disabled'}><strong>${t.n}</strong><small>${t.type} · ${rp(t.rate)}/jam/org</small>${ok?'<span class="pill p-ok">Tersedia</span>':`<span class="pill p-bad">${u?'Sedang dipakai':'Sudah dibooking'}</span>`}</button>`}).join('')}</div>
 <p class="note">Selisih tarif kalau pindah ke tipe meja lain dihitung otomatis di tagihan.</p><button class="btn ghost" data-act="mvclose">Batal</button></div>
 <div class="card"><h2>Yang dilihat ${mv.b.n.split(' ')[0]} di akunnya</h2><p style="margin-top:0;color:var(--mut)">Booking saya (P-06). Perubahan meja langsung tampil di sini dan notifikasi dikirim ke email.</p>${userBkHtml(mv.b.n)}</div></div>`:''}`};
let dpFor=null,dpM='Transfer',proofTmp='',notifs={},bkSeq=120,lastOk=[];
const REK=[['BCA','123 456 7890'],['Mandiri','137 000 888 9999'],['BRI','0345 01 000123 30 1']];
const dpAmt=b=>(b.dp||0)+(b.kode||0);
const pushN=(nama,t,msg)=>{(notifs[nama]=notifs[nama]||[]).unshift({t,msg,at:hhmm(Date.now()),read:false})};
const sampleProof=b=>`<svg viewBox="0 0 220 300" class="proof" role="img" aria-label="Contoh bukti transfer"><rect width="220" height="300" rx="14" fill="#fff"/><rect width="220" height="56" rx="14" fill="#1a4f9c"/><rect y="40" width="220" height="16" fill="#1a4f9c"/>
 <text x="110" y="34" text-anchor="middle" fill="#fff" font-size="15" font-weight="700" font-family="sans-serif">m-Banking</text><circle cx="110" cy="92" r="20" fill="#1f7a4d"/><path d="M100 92l7 7 13-14" stroke="#fff" stroke-width="4" fill="none"/>
 <text x="110" y="136" text-anchor="middle" font-size="14" font-weight="700" fill="#111" font-family="sans-serif">Transfer Berhasil</text><text x="110" y="164" text-anchor="middle" font-size="20" font-weight="800" fill="#111" font-family="sans-serif">${rp(dpAmt(b))}</text>
 ${[['Ke','BCA 123 456 7890'],['Nama','CAFE MAHJONG'],['Dari',b.snd||'-'],['Tanggal','26/11/2026 16.21'],['Ref','TRF2611'+b.id.slice(3)]].map(([k,v],i)=>`<text x="18" y="${196+i*20}" font-size="11" fill="#666" font-family="sans-serif">${k}</text><text x="202" y="${196+i*20}" text-anchor="end" font-size="11" fill="#111" font-family="sans-serif">${v}</text>`).join('')}</svg>`;
const steps=b=>{const S=[['Booking dibuat',1],['Bukti diunggah',['verif','dp','hadir','selesai'].includes(b.k)],['Dicek supervisor',['dp','hadir','selesai'].includes(b.k)],['Booking valid',['dp','hadir','selesai'].includes(b.k)]];return `<ol class="steps">${S.map(([l,ok])=>`<li class="${ok?'ok':''}">${l}</li>`).join('')}</ol>`};
const dpPage=()=>{const x=findBk(dpFor);if(!x){dpFor=null;return bookingPub()}const b=x.b,amt=dpAmt(b);
 const head=`<h1>Bayar DP booking <span class="code">P-05</span></h1><p class="sub">${b.id} · ${b.t} · ${dayLbl(x.d)}, ${clock(b.s)} sampai ${clock(b.s+b.l)}</p>${steps(b)}`;
 if(b.k!=='bayar'&&b.k!=='tolak')return head+`<div class="card" style="max-width:640px"><h2>${b.k==='verif'?'Bukti terkirim, menunggu verifikasi':'Booking valid'}</h2><p>${b.k==='verif'?'Supervisor sedang mencocokkan bukti dengan mutasi rekening. Kamu akan menerima notifikasi di akun dan email setelah booking dinyatakan valid.':'DP sudah diverifikasi. Tunjukkan kode booking saat datang ke kasir.'}</p><div class="row"><a href="#akun" class="btn" style="text-decoration:none">Lihat Booking saya</a><button class="btn ghost" data-act="dpclose">Kembali ke jadwal</button></div></div>`;
 return head+(b.k==='tolak'?`<div class="alert" style="background:light-dark(#fbdcdc,#3e1616)"><div><b style="color:var(--redt,var(--red))">Bukti sebelumnya ditolak:</b> ${b.why}. Silakan unggah ulang bukti yang benar.</div></div>`:'')+`<div class="grid g2"><div class="card"><h2>Total yang harus dibayar</h2><div class="total" style="font-size:clamp(30px,4vw,40px)">${rp(amt)}</div>
 <p style="margin:4px 0 14px;color:var(--mut)">DP ${rp(b.dp)} + kode unik ${b.kode}. Transfer persis sampai 3 digit terakhir agar mudah dicocokkan. Bayar sebelum ${clock(b.made+.5)} atau slot dilepas.</p>
 <div class="tabs">${['Transfer','QRIS'].map(m=>`<button class="cat ${dpM===m?'on':''}" data-dpm="${m}">${m==='Transfer'?'Transfer bank':'QRIS'}</button>`).join('')}</div>
 ${dpM==='Transfer'?REK.map(([bk,no])=>`<div class="price"><span><b>${bk}</b><br><span style="font-size:20px;font-weight:800;font-variant-numeric:tabular-nums">${no}</span><br><small style="color:var(--mut)">a.n. PT Cafe Mahjong Indonesia</small></span><button class="btn ghost" data-copy="${no.replace(/ /g,'')}">Salin</button></div>`).join('')
 :`<div class="row" style="align-items:center">${QR}<p style="flex:1;margin:0">Scan dengan m-banking atau e-wallet. Nama merchant: <b>CAFE MAHJONG</b>. Nominal ${rp(amt)} terisi otomatis. Setelah bayar, unggah tangkapan layar bukti di sebelah.</p></div>`}</div>
 <form class="card" id="upF"><h2>Upload bukti pembayaran</h2>
 <label class="drop"><input type="file" accept="image/*" id="upImg"><span>${proofTmp?(proofTmp==='demo'?'<b>Contoh bukti transfer dipilih</b><br><small style="color:var(--mut)">Tekan Kirim bukti untuk lanjut</small>':`<img src="${proofTmp}" alt="Bukti transfer">`):'<b>Pilih foto atau screenshot bukti</b><br><small style="color:var(--mut)">JPG atau PNG, maks. 5 MB</small>'}</span></label>
 <label class="f"><span>${dpM==='Transfer'?'Bank pengirim':'Aplikasi pembayaran'}</span><select id="upBank">${(dpM==='Transfer'?['BCA','Mandiri','BRI','BNI','Lainnya']:['GoPay','OVO','DANA','ShopeePay','m-banking']).map(o=>`<option>${o}</option>`).join('')}</select></label>
 <label class="f"><span>Nama pemilik rekening / akun</span><input id="upNm" required value="${b.n.toUpperCase()}"></label>
 <button class="btn red" style="width:100%">Kirim bukti untuk diverifikasi</button><button type="button" class="btn ghost" style="width:100%;margin-top:8px" data-act="demoproof">Pakai contoh bukti (demo)</button>
 <p class="note">Supervisor akan mengecek keaslian bukti dan nominal yang masuk ke rekening. Notifikasi dikirim ke akun dan email kamu setelah booking dinyatakan valid.</p></form></div>`};
V.verif=()=>{const P=allBk().filter(({b})=>b.k==='verif');
 return `<h1>Verifikasi DP <span class="code">K-12</span></h1><p class="sub">${P.length?P.length+' bukti menunggu dicek.':'Tidak ada bukti yang menunggu.'} Cocokkan bukti dengan mutasi rekening sebelum menyetujui booking.</p>
 ${P.map(({b,d})=>`<div class="card vcard"><div class="vimg">${b.proof?`<img src="${b.proof}" alt="Bukti dari ${b.n}">`:sampleProof(b)}</div>
 <div><h2>${b.n} <span class="code">${b.id}</span></h2>
 <div class="price"><span>Booking</span><b>${b.t} · ${dayLbl(d)}, ${clock(b.s)} sampai ${clock(b.s+b.l)}</b></div>
 <div class="price"><span>Tagihan DP (dengan kode unik ${b.kode})</span><b class="total">${rp(dpAmt(b))}</b></div>
 <div class="price"><span>Metode · pengirim</span><b>${b.via} · ${b.snd}</b></div>
 <label class="f" style="margin-top:12px"><span>Nominal yang masuk di mutasi rekening</span><input id="vin-${b.id}" type="number" inputmode="numeric" placeholder="Ketik sesuai mutasi"></label>
 ${['Bukti asli, tidak ada tanda edit','Nama pengirim sesuai','Dana sudah masuk di mutasi rekening'].map((l,i)=>`<label class="cbl"><input type="checkbox" class="vck-${b.id}"> <span>${l}</span></label>`).join('')}
 <div class="row" style="margin-top:12px"><button class="btn" data-vok="${b.id}">Valid, konfirmasi booking</button><select id="why-${b.id}" style="min-height:44px;border-radius:10px;border:1px solid var(--line);background:var(--bg);padding:0 10px"><option>Nominal tidak sesuai</option><option>Dana belum masuk rekening</option><option>Bukti tidak jelas atau terindikasi edit</option></select><button class="btn ghost" data-vno="${b.id}">Tolak</button></div></div></div>`).join('')}
 ${lastOk.length?`<div class="card" style="margin-top:16px"><h2>Baru saja dicek</h2>${lastOk.map(x=>`<div class="price"><span>${x.id} · ${x.n}</span><b><span class="pill ${x.ok?'p-ok':'p-bad'}">${x.ok?'Valid':'Ditolak'}</span> ${x.at}</b></div>`).join('')}</div>`:''}`};

V.booking=()=>role()==='tamu'?(dpFor?dpPage():bookingPub()):`<h1>Booking pelanggan <span class="code">K-10</span></h1><p class="sub">Semua booking dari pengguna. Konfirmasi saat pelanggan datang, atau pindahkan meja kalau meja yang dibooking masih dipakai.</p>${staffBk()}
 <h2 style="margin:28px 0 12px;font-size:22px">Jadwal & booking baru</h2>${bookingPub().replace(/^<h1>[\s\S]*?<\/p>/,'')}`;
const QR=(()=>{let r='',x=7;for(let i=0;i<21;i++)for(let j=0;j<21;j++){x=(x*1103515245+12345)&0x7fffffff;const fin=(i<7&&j<7)||(i<7&&j>13)||(i>13&&j<7);const on=fin?((i%14===0||i%14===6||j%14===0||j%14===6||(i%14>1&&i%14<5&&j%14>1&&j%14<5))):(x>>16)%2;if(on)r+=`<rect x="${j}" y="${i}" width="1" height="1"/>`}return `<svg viewBox="-1 -1 23 23" width="150" height="150" style="background:#fff;border-radius:8px"><g fill="#111">${r}</g></svg>`})();
let payM='Tunai',cashIn=0,splitN=0,parts=[];
const payBody=(m,amt,idx='')=>m==='Tunai'?`<label class="f"><span>Uang diterima</span><input id="cashIn${idx}" type="number" inputmode="numeric" value="${idx===''?cashIn||'':''}" placeholder="0"></label>
 <div class="row" style="gap:6px;margin:-4px 0 10px">${[amt,Math.ceil(amt/50000)*50000,Math.ceil(amt/100000)*100000+ (Math.ceil(amt/100000)*100000===amt?100000:0)].filter((v,i,a)=>a.indexOf(v)===i).map(v=>`<button class="cat" data-cash="${v}${idx!==''?'|'+idx:''}">${v===amt?'Uang pas':rp(v)}</button>`).join('')}</div>
 ${idx===''?`<div class="price"><span>Kembalian</span><b class="total" id="kembali">${cashIn>=amt?rp(cashIn-amt):'-'}</b></div>`:''}`
 :m==='Debit'?`<div class="row" style="flex-wrap:nowrap"><label class="f" style="flex:1"><span>Mesin EDC</span><select><option>BCA</option><option>Mandiri</option><option>BRI</option><option>BNI</option></select></label><label class="f" style="flex:1"><span>No. approval</span><input inputmode="numeric" placeholder="6 digit"></label></div>`
 :m==='QRIS'?`<div class="row" style="align-items:center">${QR}<p style="flex:1;margin:0">Tampilkan QR ke pelanggan. Status lunas masuk otomatis dari payment gateway.</p></div>`
 :`<p style="margin:0">Transfer ke BCA 123 456 7890 a.n. Cafe Mahjong. Cek mutasi sebelum menekan proses.</p>`;
function payPanel(tb,b){const n=splitN,each=n?Math.ceil(b.tot/n/100)*100:0;
 return `<h2 style="margin-top:16px">Bayar <span class="code">K-04</span></h2>
 <label class="cbl"><input type="checkbox" id="splitT" ${n?'checked':''}> <span style="flex:1"><b>Split bill</b> · bagi rata ke beberapa orang</span></label>
 ${n?`<label class="f" style="margin-top:10px"><span>Jumlah orang</span><select id="splitN">${[2,3,4,5,6].map(k=>`<option ${k===n?'selected':''}>${k}</option>`).join('')}</select></label>
 ${parts.map((p,i)=>{const amt=i===n-1?b.tot-each*(n-1):each;return `<div class="part ${p.paid?'paid':''}"><div class="row" style="justify-content:space-between"><b>Orang ${i+1}</b><b>${rp(amt)}</b></div>
 ${p.paid?`<span class="pill p-ok">Lunas · ${p.m}</span>`:`<div class="tabs" style="margin:8px 0">${['Tunai','QRIS','Debit','Transfer'].map(m=>`<button class="cat ${p.m===m?'on':''}" data-ppm="${i}|${m}">${m}</button>`).join('')}</div>${p.m==='QRIS'?'<p class="note" style="margin:0 0 8px">QR khusus untuk Rp'+amt.toLocaleString('id-ID')+' muncul di layar pelanggan.</p>':p.m==='Tunai'?'':payBody(p.m,amt,i)}<button class="btn red" data-pp="${i}">Terima ${rp(amt)}</button>`}</div>`}).join('')}
 <p class="note">Split per item (tiap orang membayar pesanannya sendiri) juga tersedia di aplikasi penuh.</p>`
 :`<div class="tabs" style="margin-top:10px">${['Tunai','QRIS','Debit','Transfer'].map(m=>`<button class="cat ${payM===m?'on':''}" data-pm="${m}">${m}</button>`).join('')}</div>
 ${payBody(payM,b.tot)}<button class="btn red" style="width:100%;margin-top:6px" data-act="paynow">Proses pembayaran ${rp(b.tot)}</button>`}`}
function freeTable(t){t.st='free';['startMs','who','endEl','skip','dp'].forEach(k=>delete t[k]);t.fb=[];payM='Tunai';cashIn=0;splitN=0;parts=[]}

const hm=m=>`${Math.floor(m/60)}:${String(Math.floor(m%60)).padStart(2,'0')}`;
const fmtT=m=>{const a=Math.abs(m),s=Math.floor(a*60);return (m<0?'+':'')+Math.floor(s/3600)+':'+String(Math.floor(s/60)%60).padStart(2,'0')+':'+String(s%60).padStart(2,'0')};
const hhmm=ms=>{const d=new Date(ms);return String(d.getHours()).padStart(2,'0')+'.'+String(d.getMinutes()).padStart(2,'0')};
function bill(tb){const e=tb.st==='bill'?tb.endEl:elapsed(tb),billed=Math.max(tb.planMin,Math.ceil(e/30)*30),sewa=billed/60*(tb.lockRate||tb.rate)*(tb.pl||4),f=tb.fb.reduce((a,x)=>a+x[1]*x[2],0),
 sv=Math.round((sewa+f)*.05),tax=Math.round((sewa+f+sv)*.1),dp=tb.dp||0;return{e,billed,sewa,f,sv,tax,dp,tot:sewa+f+sv+tax-dp}}
const PLANS=[[60,'1 jam'],[90,'1,5 jam'],[120,'2 jam'],[180,'3 jam'],[240,'4 jam'],[300,'5 jam']];
V.kasir=()=>{const tb=tables[selTable],i=selTable;let p='';
 if(tb.st==='play'){const b=bill(tb);
  p=`<h2>${tb.n} · sedang main <span class="code">K-03</span></h2><p style="margin:0;color:var(--mut)">${tb.who}</p>
  <div class="cd"><small>Sisa waktu</small><b data-rem="${i}">${fmtT(remain(tb))}</b></div><div class="prog"><i data-bar="${i}" style="width:${Math.min(100,elapsed(tb)/tb.planMin*100)}%"></i></div>
  <div class="price"><span>Mulai</span><b>${hhmm(tb.startMs-(tb.skip||0)*MIN)}</b></div>
  <div class="price"><span>Rencana lama main</span><b>${hm(tb.planMin)} jam${tb.extra?` (termasuk perpanjangan ${hm(tb.extra)})`:''}</b></div>
  <div class="price"><span>Sudah main</span><b data-el="${i}">${hm(elapsed(tb))}</b></div>
  <h2 style="margin-top:14px">Rincian tagihan otomatis</h2>${billBox(tb,i)}
  <h2 style="margin-top:14px">Perpanjang waktu</h2><div class="row">${[[30,'+30 menit'],[60,'+1 jam'],[120,'+2 jam']].map(([m,l])=>`<button class="btn ghost" data-ext="${i}|${m}">${l}</button>`).join('')}</div>
  <div class="row" style="margin-top:12px"><button class="btn ghost" data-ordfor="${i}">+ Pesan makanan</button><button class="btn red" data-end="${i}">Akhiri & buat tagihan</button></div>
  <button class="btn ghost" style="width:100%;margin-top:12px;font-size:14px" data-ff="${i}">Simulasi demo: majukan waktu 10 menit</button>
  <p class="note">Sewa dihitung minimal sesuai rencana. Kalau lewat dari rencana, kelebihannya dibulatkan per 30 menit.</p>`}
 else if(tb.st==='bill'){const b=bill(tb);
  p=`<h2>${tb.n} · tagihan <span class="code">K-03</span></h2>
  <div class="price"><span>Sewa ${hm(b.e)} main → ditagih ${b.billed/60} jam × ${tb.pl||4} orang × ${rp(tb.lockRate||tb.rate)}</span><b>${rp(b.sewa)}</b></div>
  ${tb.fb.map(x=>`<div class="price"><span>${x[1]}× ${x[0]}</span><b>${rp(x[1]*x[2])}</b></div>`).join('')}
  <div class="price"><span>Service 5%</span><b>${rp(b.sv)}</b></div><div class="price"><span>Pajak PB1 10%</span><b>${rp(b.tax)}</b></div>
  ${b.dp?`<div class="price"><span>DP terverifikasi${tb.bk?' · '+tb.bk:''}</span><b style="color:var(--ok)">-${rp(b.dp)}</b></div>`:''}
  <div class="price"><span>Total ditagih</span><b class="total">${rp(b.tot)}</b></div>
  <div class="row" style="margin-top:12px"><button class="btn ghost" data-act="pre">Cetak tagihan sementara</button></div>
  ${payPanel(tb,b)}`}
 else{const bk=tb.st==='book';
  p=`<form id="startF"><h2>${tb.n} · ${bk?'booking '+tb.at:'kosong'} <span class="code">K-02</span></h2>
  ${bk?`<p style="margin-top:0">Booking atas nama <b>${tb.who}</b>, DP ${rp(tb.dp)} sudah dibayar.</p>`:''}
  <label class="f"><span>Nama pelanggan / member</span><input id="sWho" value="${tb.who||''}" placeholder="Cari member atau ketik nama" required></label>
  <label class="f"><span>Jumlah pemain</span><select id="sPl">${[4,3,2].map(n=>`<option value="${n}" ${n===startPl?'selected':''}>${n} orang</option>`).join('')}</select></label>
  <label class="f"><span>Rencana lama bermain (wajib)</span><select id="sPlan" required><option value="">Pilih durasi</option>${PLANS.map(([m,l])=>`<option value="${m}" ${bk&&tb.plan===m?'selected':''}>${l} · ${rp(m/60*(tb.bkRate||tb.rate)*startPl)}</option>`).join('')}</select></label>
  <button class="btn red" style="width:100%">Mulai main & jalankan timer</button>
  <p class="note">Tombol mulai baru bisa dipakai setelah rencana lama bermain diisi. Popup peringatan muncul saat sisa waktu 15 menit.</p></form>`}
 return `<h1>Peta meja & tagihan <span class="code">K-01</span></h1><p class="sub">Ketuk meja untuk mulai main, perpanjang waktu, atau membuat tagihan. Angka di kartu adalah sisa waktu bermain.</p>
 <div class="grid g2"><div class="floor">${tables.map((t,k)=>{const r=t.st==='play'?remain(t):0;return`<button class="tb ${t.st} ${t.st==='play'&&r<=15?(r<=0?'over':'warn'):''} ${k===selTable?'sel':''}" data-tb="${k}" data-tbc="${k}"><strong>${t.n}</strong><small>${t.type} · ${rp(t.rate)}/jam/org${t.st==='play'||t.st==='bill'?' · '+(t.pl||4)+' orang':''}</small>
 ${t.st==='play'?`<span class="tm" data-rem="${k}">${fmtT(r)}</span><small>${t.who}</small>`:t.st==='bill'?`<span class="pill p-bad">Menunggu bayar</span><small>${t.who}</small>`:t.st==='book'?`<span class="pill p-info">Booking ${t.at}</span><small>${t.who}</small>`:'<span class="pill p-ok">Kosong</span><small>Siap walk-in</small>'}</button>`}).join('')}</div>
 <div class="card">${p}</div></div>`};
const billBox=(tb,i)=>{const b=bill(tb),r=tb.lockRate||tb.bkRate||tb.rate;return `<div class="price"><span>Sewa meja<br><small style="color:var(--mut)">${b.billed/60} jam × ${tb.pl||4} orang × ${rp(r)}${tb.st==='play'?' · berjalan':''}</small></span><b ${i!=null?`data-sewa="${i}"`:''}>${rp(b.sewa)}</b></div>
 ${tb.fb.length?tb.fb.map(x=>`<div class="price"><span>${x[1]}× ${x[0]}</span><b>${rp(x[1]*x[2])}</b></div>`).join(''):'<div class="price"><span style="color:var(--mut)">Belum ada pesanan makanan</span><b>Rp0</b></div>'}
 <div class="price"><span>Service 5% + PB1 10%</span><b ${i!=null?`data-tax="${i}"`:''}>${rp(b.sv+b.tax)}</b></div>
 ${b.dp?`<div class="price"><span>DP terverifikasi${tb.bk?' · '+tb.bk:''}</span><b style="color:var(--ok)">-${rp(b.dp)}</b></div>`:''}
 <div class="price"><span>${tb.st==='play'?'Estimasi tagihan saat ini':'Total ditagih'}</span><b class="total" ${i!=null?`data-cost="${i}"`:''}>${rp(b.tot)}</b></div>`};
V.pesan=()=>{const cats=['Semua',...new Set(menu.map(m=>m.c))],list=menu.filter(m=>cat==='Semua'||m.c===cat);
 const items=Object.entries(cart).filter(([,q])=>q>0),sub=items.reduce((a,[id,q])=>a+menu.find(m=>m.id==id).p*q,0);
 return `<h1>Pesan makanan & minuman <span class="code">P-09 · K-05</span></h1><p class="sub">Pelanggan memesan lewat QR di meja, staf bisa input dari kasir. Harga ditulis dalam ribuan (40 = Rp40.000). Menu otomatis habis kalau bahan tidak cukup.</p>
 <div class="grid g2"><div><div class="cats">${cats.map(c=>`<button class="cat ${c===cat?'on':''}" data-cat="${c}">${c}</button>`).join('')}</div>
 <div class="menu">${list.map(m=>{const ok=can(m);return`<button class="mi" data-add="${m.id}" ${ok?'':'disabled'}>${m.img?`<img class="mph" src="${xe(m.img)}" alt="">`:`<div class="ic">${mIni(m)}</div>`}<span class="mrow"><b>${xe(m.n)}</b><span class="kp">${kk(m.p)}</span></span>${isPkg(m)?'<span class="pill p-info" style="align-self:flex-start">Paket</span>':''}${pkgList(m)}${ok?'':'<span class="pill p-bad">Habis</span>'}</button>`}).join('')}</div></div>
 <div class="grid" style="align-content:start"><div class="card">${role()==='tamu'?`<h2>Pesanan${posMeja?' · '+posMeja:''}</h2><label class="f"><span>Posisi meja saat ini (wajib)</span><select id="posSel" required><option value="">Pilih meja tempat kamu bermain</option>${tables.map(t=>`<option ${posMeja===t.n?'selected':''}>${t.n}</option>`).join('')}</select></label>
 <div class="row" style="margin:-4px 0 12px;flex-wrap:nowrap"><button class="btn ghost" data-act="scanqr" style="font-size:14px;flex:none">Scan QR meja</button><small style="color:var(--mut)">Meja saat main bisa berbeda dari nomor meja booking, jadi pilih meja yang sedang dipakai.</small></div>`
 :`<h2>Pesan untuk pelanggan <span class="code">K-05</span></h2><label class="f"><span>Meja & nama booking (wajib)</span><select id="posSel" required><option value="">Pilih meja yang sedang dipakai</option>${tables.filter(t=>t.st!=='free').map(t=>`<option value="${t.n}" ${posMeja===t.n?'selected':''}>${t.n} · ${t.who}${t.bk?' · '+t.bk:''}</option>`).join('')}</select></label>
 ${(()=>{const T=tables.find(t=>t.n===posMeja);return T?`<p style="margin:-4px 0 12px;color:var(--mut);font-size:14px">Atas nama <b style="color:var(--ink)">${T.who}</b>${T.bk?' · '+T.bk:' · walk-in'} · ${T.pl||4} orang · ${T.st==='play'?'sedang main':T.st==='bill'?'menunggu bayar':'belum mulai'}</p>`:''})()}`}${items.length?items.map(([id,q])=>{const m=menu.find(x=>x.id==id);return`<div class="line"><span class="mrow" style="flex:1;margin-right:10px"><span>${m.n}</span><span class="kp">${kk(m.p)}</span></span><span class="qty"><button data-q="${id}|-1" aria-label="Kurangi">−</button><b>${q}</b><button data-q="${id}|1" aria-label="Tambah">+</button></span></div>`}).join(''):'<p style="color:var(--mut)">Ketuk menu untuk menambah pesanan.</p>'}
 <label class="f" style="margin-top:12px"><span>Catatan untuk dapur</span><input id="ordNote" placeholder="Contoh: tidak pedas, es sedikit"></label>
 <div class="price"><span>Subtotal</span><b class="total">${rp(sub)}</b></div>
 <button class="btn red" style="width:100%;margin-top:8px" data-act="order" ${items.length&&posMeja?'':'disabled'}>${posMeja?'Kirim ke dapur':'Pilih posisi meja dulu'}</button>
 <p class="note">Saat dikirim, stok bahan berkurang sesuai resep dan pesanan langsung masuk ke tagihan meja.</p></div>
 ${role()!=='tamu'&&tables.find(t=>t.n===posMeja&&t.fb)?`<div class="card"><h2>Tagihan ${posMeja} saat ini</h2>${billBox(tables.find(t=>t.n===posMeja))}<button class="btn ghost" style="width:100%;margin-top:10px" data-gokasir="${tables.findIndex(t=>t.n===posMeja)}">Buka di kasir</button></div>`:''}</div></div>`};

const hkT=f=>[1,2,4,8,16,24,32,48,64,96,128][Math.min(Math.max(f,0),10)];
const value=r=>rule==='sederhana'?r.f*1000:rule==='hk'?hkT(r.f):rule==='tw'?30+10*r.f:r.f;
function deltas(r){const s=[0,0,0,0];if(r.w==null)return s;const o=[0,1,2,3].filter(i=>i!==r.w);
 if(rule==='menang'){if(r.how==='zimo')s[r.w]+=3;else{s[r.w]+=2;s[r.d]-=1}return s}
 const v=value(r);
 if(r.how==='zimo'){const each=rule==='riichi'?Math.ceil(v/300)*100:v;o.forEach(i=>{s[i]-=each;s[r.w]+=each})}
 else if(rule==='hk')o.forEach(i=>{const p=i===r.d?2*v:v;s[i]-=p;s[r.w]+=p});
 else{const p=rule==='sederhana'?3*v:v;s[r.d]-=p;s[r.w]+=p}return s}
function score(){const st=RULES[rule].start,s=[st,st,st,st];rounds.forEach(r=>deltas(r).forEach((d,i)=>s[i]+=d));return s}

const nf=v=>(v>0?'+':'')+v.toLocaleString('id-ID');
const skorPapan=()=>{const R=RULES[rule],s=score(),ord=s.map((v,i)=>[v,i]).sort((a,b)=>b[0]-a[0]),wins=players.map((_,i)=>rounds.filter(r=>r.w===i).length),feed=players.map((_,i)=>rounds.filter(r=>r.d===i).length);
 const wind=['Timur','Selatan','Barat','Utara'],uma=[15,5,-5,-15],fin=k=>Math.round(((ord[k][0]-30000)/1000+uma[k]+(k===0?20:0))*10)/10;
 return `<div class="card" style="margin-bottom:16px"><label class="f" style="max-width:420px"><span>Aturan skor sesi ini</span><select id="ruleSel">${Object.entries(RULES).map(([k,x])=>`<option value="${k}" ${k===rule?'selected':''}>${x.n}</option>`).join('')}</select></label>
 <p style="margin:0">${R.d}</p></div>
 <div class="players">${players.map((p,i)=>`<div class="pl ${ord[0][1]===i?'lead':''}"><div class="w">${wind[i]}</div><b>${p}</b><div class="s">${rule==='riichi'?s[i].toLocaleString('id-ID'):nf(s[i])}</div></div>`).join('')}</div>
 <div class="grid g2"><div class="card"><h2>Input ronde ${rounds.length+1}</h2><form id="rF">
 <label class="f"><span>Pemenang</span><select id="rw">${players.map((p,i)=>`<option value="${i}">${p}</option>`).join('')}<option value="x">Seri (tidak ada pemenang)</option></select></label>
 <label class="f"><span>Cara menang</span><select id="rh"><option value="zimo">Zimo (ambil sendiri)</option><option value="buang">Dari buangan</option></select></label>
 <label class="f"><span>Pembuang</span><select id="rd">${players.map((p,i)=>`<option value="${i}" ${i===1?'selected':''}>${p}</option>`).join('')}</select></label>
 ${R.u?`<label class="f"><span>${R.u}</span><input id="rf" type="number" min="0" ${rule==='riichi'?'step="100" value="2000"':'max="13" value="'+(prefFan??3)+'"'} inputmode="numeric"></label>`:''}
 ${rule==='sederhana'||rule==='hk'?'<button type="button" class="btn ghost" style="width:100%;margin-bottom:12px" data-sk="kombinasi">Bantu hitung fan dari pola tangan (S-03)</button>':''}
 <div class="row"><button class="btn red">Simpan ronde</button><button type="button" class="btn ghost" data-act="undo">Batalkan ronde terakhir</button></div></form>
 <h2 style="margin-top:18px">Riwayat ronde</h2><div class="scroll"><table class="t2"><thead><tr><th>#</th><th>Pemenang</th><th>Cara</th>${R.u?`<th class="n">${R.u.replace('Jumlah ','')}</th>`:''}</tr></thead><tbody>${rounds.map((r,i)=>`<tr><td>${i+1}</td><td>${r.w==null?'Seri':players[r.w]}</td><td>${r.w==null?'-':r.how==='zimo'?'Zimo':'Buangan '+players[r.d]}</td>${R.u?`<td class="n">${r.f.toLocaleString('id-ID')}</td>`:''}</tr>`).join('')}</tbody></table></div></div>
 <div class="card"><h2>Peringkat sementara</h2>${ord.map(([v,i],k)=>`<div class="rank"><div class="no ${k===0?'g':''}">${k+1}</div><div style="flex:1"><b>${players[i]}</b><br><small style="color:var(--mut)">${wins[i]} menang · ${feed[i]}× membuang</small></div><b style="font-variant-numeric:tabular-nums;text-align:right">${v.toLocaleString('id-ID')}${rule==='riichi'?`<br><small style="color:var(--mut)">skor akhir ${nf(fin(k))}</small>`:''}</b></div>`).join('')}
 <button class="btn" style="width:100%;margin-top:14px" data-act="finish">Tutup sesi & simpan ke papan peringkat</button>
 <p class="note">Papan peringkat cafe (S-05) mengumpulkan poin member per minggu dan bulan, dipisah per aturan karena skalanya berbeda.</p></div></div>`};
const kk=p=>(p/1000).toLocaleString('id-ID',{maximumFractionDigits:1});
/* ===== Excel mini (xlsx tulis & baca, tanpa library) ===== */
const CRC=(()=>{const t=new Uint32Array(256);for(let n=0;n<256;n++){let c=n;for(let k=0;k<8;k++)c=c&1?0xEDB88320^(c>>>1):c>>>1;t[n]=c>>>0}return t})();
const crc32=b=>{let c=0xFFFFFFFF;for(let i=0;i<b.length;i++)c=CRC[(c^b[i])&255]^(c>>>8);return(c^0xFFFFFFFF)>>>0};
function zipStore(files){const enc=new TextEncoder(),parts=[],cd=[];let off=0;
 for(const f of files){const nm=enc.encode(f.n),d=typeof f.d==='string'?enc.encode(f.d):f.d,c=crc32(d);
  const h=new DataView(new ArrayBuffer(30));h.setUint32(0,0x04034b50,true);h.setUint16(4,20,true);h.setUint16(8,0,true);h.setUint32(14,c,true);h.setUint32(18,d.length,true);h.setUint32(22,d.length,true);h.setUint16(26,nm.length,true);
  parts.push(new Uint8Array(h.buffer),nm,d);
  const e=new DataView(new ArrayBuffer(46));e.setUint32(0,0x02014b50,true);e.setUint16(4,20,true);e.setUint16(6,20,true);e.setUint32(16,c,true);e.setUint32(20,d.length,true);e.setUint32(24,d.length,true);e.setUint16(28,nm.length,true);e.setUint32(42,off,true);
  cd.push(new Uint8Array(e.buffer),nm);off+=30+nm.length+d.length}
 const cdLen=cd.reduce((a,x)=>a+x.length,0),z=new DataView(new ArrayBuffer(22));z.setUint32(0,0x06054b50,true);z.setUint16(8,files.length,true);z.setUint16(10,files.length,true);z.setUint32(12,cdLen,true);z.setUint32(16,off,true);
 return new Blob([...parts,...cd,new Uint8Array(z.buffer)],{type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'})}
const xe=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const colL=i=>{let s='';i++;while(i){const m=(i-1)%26;s=String.fromCharCode(65+m)+s;i=(i-m-1)/26}return s};
function makeXlsx(sheets){const ws=sheets.map((sh,si)=>({n:`xl/worksheets/sheet${si+1}.xml`,d:`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">${sh.w?`<cols>${sh.w.map((w,i)=>`<col min="${i+1}" max="${i+1}" width="${w}" customWidth="1"/>`).join('')}</cols>`:''}<sheetData>${sh.rows.map((r,ri)=>`<row r="${ri+1}">${r.map((v,ci)=>{const ref=colL(ci)+(ri+1),st=ri===0?' s="1"':'';return typeof v==='number'?`<c r="${ref}"${st}><v>${v}</v></c>`:`<c r="${ref}" t="inlineStr"${st}><is><t xml:space="preserve">${xe(v??'')}</t></is></c>`}).join('')}</row>`).join('')}</sheetData></worksheet>`}));
 return zipStore([{n:'[Content_Types].xml',d:`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>${sheets.map((_,i)=>`<Override PartName="/xl/worksheets/sheet${i+1}.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>`).join('')}</Types>`},
  {n:'_rels/.rels',d:`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>`},
  {n:'xl/workbook.xml',d:`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets>${sheets.map((s,i)=>`<sheet name="${xe(s.name)}" sheetId="${i+1}" r:id="rId${i+1}"/>`).join('')}</sheets></workbook>`},
  {n:'xl/_rels/workbook.xml.rels',d:`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">${sheets.map((_,i)=>`<Relationship Id="rId${i+1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet${i+1}.xml"/>`).join('')}<Relationship Id="rId${sheets.length+1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>`},
  {n:'xl/styles.xml',d:`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><fonts count="2"><font><sz val="11"/><name val="Calibri"/></font><font><b/><sz val="11"/><name val="Calibri"/></font></fonts><fills count="2"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill></fills><borders count="1"><border/></borders><cellStyleXfs count="1"><xf/></cellStyleXfs><cellXfs count="2"><xf/><xf fontId="1" applyFont="1"/></cellXfs></styleSheet>`},...ws])}
let DLC=null;(async()=>{try{if(window.claude&&claude.use)DLC=await claude.use('downloads')}catch(_){}})();
function dl(blob,name){if(CMB.saveFile){CMB.saveFile(blob,name).then(m=>toast(m||('File tersimpan: '+name))).catch(e=>toast('Gagal menyimpan file: '+e.message));return}if(DLC){DLC.save({filename:name,data:blob}).then(()=>toast('File tersimpan: '+name)).catch(e=>toast(e&&e.code==='declined'?'Unduhan dibatalkan':e&&e.code==='rate_limited'?'Tunggu sebentar, lalu coba lagi':'Unduhan tidak tersedia di tampilan ini. Buka link di browser komputer.'));return}
 const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=name;document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},1500);toast('File diunduh: '+name)}
async function unzip(buf){const u=new Uint8Array(buf),v=new DataView(buf),out={};let e=u.length-22;while(e>=0&&v.getUint32(e,true)!==0x06054b50)e--;if(e<0)throw new Error('Bukan file Excel (.xlsx)');
 const n=v.getUint16(e+10,true);let p=v.getUint32(e+16,true);const dec=new TextDecoder();
 for(let i=0;i<n;i++){const m=v.getUint16(p+10,true),cs=v.getUint32(p+20,true),nl=v.getUint16(p+28,true),xl=v.getUint16(p+30,true),cl=v.getUint16(p+32,true),lo=v.getUint32(p+42,true),name=dec.decode(u.subarray(p+46,p+46+nl));
  const ds=lo+30+v.getUint16(lo+26,true)+v.getUint16(lo+28,true),raw=u.subarray(ds,ds+cs);
  if(/\.xml$|\.rels$/.test(name))out[name]=m===0?dec.decode(raw):await new Response(new Blob([raw]).stream().pipeThrough(new DecompressionStream('deflate-raw'))).text();
  p+=46+nl+xl+cl}return out}
async function readSheet(file){if(/\.csv$/i.test(file.name)){const t=await file.text(),sep=t.split('\n')[0].includes(';')?';':',';return t.trim().split(/\r?\n/).map(l=>l.split(sep).map(x=>x.replace(/^"|"$/g,'').trim()))}
 const z=await unzip(await file.arrayBuffer()),P=s=>new DOMParser().parseFromString(s,'application/xml');
 const ss=z['xl/sharedStrings.xml']?[...P(z['xl/sharedStrings.xml']).getElementsByTagName('si')].map(si=>[...si.getElementsByTagName('t')].map(t=>t.textContent).join('')):[];
 const sk=Object.keys(z).filter(k=>/^xl\/worksheets\/sheet\d+\.xml$/.test(k)).sort()[0];if(!sk)throw new Error('Sheet tidak ditemukan');
 const rows=[];for(const r of P(z[sk]).getElementsByTagName('row')){const row=[];for(const c of r.getElementsByTagName('c')){const ref=c.getAttribute('r')||'',L=ref.replace(/\d/g,'');let ci=0;for(const ch of L)ci=ci*26+ch.charCodeAt(0)-64;ci--;const t=c.getAttribute('t'),vv=c.getElementsByTagName('v')[0];let val=t==='s'?ss[+vv.textContent]:t==='inlineStr'?[...c.getElementsByTagName('t')].map(x=>x.textContent).join(''):vv?vv.textContent:'';row[ci<0?row.length:ci]=val}rows[(+r.getAttribute('r')||rows.length+1)-1]=row}
 return rows.filter(Boolean).map(r=>Array.from(r,x=>x==null?'':String(x).trim()))}
/* template & import resep */
const REC_HEAD=['Nama menu','Kategori','Harga jual','Nama bahan','Satuan','Takaran per porsi'];
function recipeTemplate(){const rows=[REC_HEAD];menu.slice(0,2).forEach(m=>Object.entries(m.r).forEach(([k,q])=>rows.push([m.n,m.c,m.p,stock[k].n,stock[k].u,q])));rows.push(['Roti bakar coklat','Camilan',25000,'Roti tawar','pcs',2],['Roti bakar coklat','Camilan',25000,'Mentega','g',15]);
 dl(makeXlsx([{name:'Resep',rows,w:[24,12,12,22,9,18]},{name:'Petunjuk',rows:[['Petunjuk'],['Satu baris = satu bahan dalam resep. Ulangi nama menu untuk setiap bahannya.'],['Menu yang sudah ada akan diganti resepnya. Menu baru otomatis dibuat.'],['Nama bahan yang belum ada di gudang otomatis ditambahkan dengan stok 0.'],['Kategori: Makanan, Minuman, Camilan, atau Paket. Harga jual dalam rupiah penuh.']],w:[90]}]),'template-resep-cafe-mahjong.xlsx')}
let impPrev=null;
function parseRecipeRows(rows){const h=rows[0].map(x=>x.toLowerCase()),ix=k=>h.findIndex(x=>x.includes(k));const I={m:ix('menu'),c:ix('kategori'),p:ix('harga'),b:ix('bahan'),u:ix('satuan'),q:ix('takaran')};
 if(I.m<0||I.b<0||I.q<0)throw new Error('Kolom wajib tidak ditemukan: Nama menu, Nama bahan, Takaran');
 const byName=Object.fromEntries(Object.entries(stock).map(([k,s])=>[s.n.toLowerCase(),k])),M=new Map(),err=[];
 rows.slice(1).forEach((r,i)=>{const mn=r[I.m],bn=r[I.b],q=parseFloat(String(r[I.q]).replace(',','.'));if(!mn&&!bn)return;if(!mn||!bn||!(q>0)){err.push(`Baris ${i+2}: data belum lengkap`);return}
  if(!M.has(mn.toLowerCase()))M.set(mn.toLowerCase(),{n:mn,c:I.c>=0&&MCATS.includes(r[I.c])?r[I.c]:'Makanan',p:I.p>=0?+String(r[I.p]).replace(/\D/g,'')||0:0,items:[]});
  M.get(mn.toLowerCase()).items.push({b:bn,u:(I.u>=0&&r[I.u])||'g',q,k:byName[bn.toLowerCase()]||null})});
 return{menus:[...M.values()].map(x=>({...x,ex:menu.find(m=>m.n.toLowerCase()===x.n.toLowerCase())})),err}}
function impDlg(){const P=impPrev,nb=new Set(P.menus.flatMap(m=>m.items.filter(i=>!i.k).map(i=>i.b.toLowerCase())));
 openDlg(`<h2>Pratinjau upload resep <span class="code">G-04</span></h2><p style="margin-top:0;color:var(--mut)">${xe(P.file)} · ${P.menus.length} menu · ${P.menus.reduce((a,m)=>a+m.items.length,0)} baris bahan${nb.size?` · ${nb.size} bahan baru`:''}</p>
 ${P.err.length?`<div class="alert" style="margin-bottom:10px"><b>${P.err.length} baris dilewati:</b> ${P.err.slice(0,4).map(xe).join('; ')}${P.err.length>4?' …':''}</div>`:''}
 <div style="max-height:46vh;overflow:auto;border:1px solid var(--ln,#e5e0d6);border-radius:10px"><table class="t2" style="width:100%"><thead><tr><th>Menu</th><th>Bahan</th><th style="text-align:right">Takaran</th></tr></thead><tbody>${P.menus.map(m=>m.items.map((it,j)=>`<tr>${j===0?`<td rowspan="${m.items.length}" style="vertical-align:top"><b>${xe(m.n)}</b><br><span class="pill ${m.ex?'p-info':'p-ok'}">${m.ex?'Resep diganti':'Menu baru'}</span></td>`:''}<td>${xe(it.b)}${it.k?'':' <span class="pill p-warn">bahan baru</span>'}</td><td style="text-align:right">${it.q.toLocaleString('id-ID')} ${xe(it.k?stock[it.k].u:it.u)}</td></tr>`).join('')).join('')}</tbody></table></div>
 <div class="row" style="margin-top:14px"><button type="button" class="btn red" data-act="impok">Simpan ${P.menus.length} resep</button><button type="button" class="btn ghost" data-act="dlgx">Batal</button></div>`)}
function applyImport(){const P=impPrev;let nb=0;const byName=Object.fromEntries(Object.entries(stock).map(([k,s])=>[s.n.toLowerCase(),k]));
 P.menus.forEach(m=>{const r={};m.items.forEach(it=>{let k=byName[it.b.toLowerCase()];if(!k){k='b'+Date.now()+Math.floor(Math.random()*1e4);stock[k]={n:it.b,u:it.u,q:0,min:0,c:0};byName[it.b.toLowerCase()]=k;nb++}r[k]=(r[k]||0)+it.q});
  if(m.ex){m.ex.r=r;if(m.p)m.ex.p=m.p}else{const id=Math.max(...menu.map(x=>x.id))+1;menu.push({id,n:m.n,c:m.c,p:m.p,r})}});
 const first=menu.find(x=>x.n.toLowerCase()===P.menus[0].n.toLowerCase());if(first)menuSel=first.id;recDraft=null;impPrev=null;closeDlg();toast(`${P.menus.length} resep tersimpan${nb?`, ${nb} bahan baru masuk gudang`:''}`);rerender()}
/* export stok */
function exportStock(){const st=s=>s.q<=0?'Habis':s.q<s.min?'Menipis':'Aman';
 const rows=[['Kode','Nama bahan','Satuan','Stok','Stok minimum','Harga rata-rata per satuan (Rp)','Nilai stok (Rp)','Status']].concat(Object.entries(stock).map(([k,s])=>[k,s.n,s.u,s.q,s.min,Math.round(s.c*100)/100,Math.round(s.q*s.c),st(s)]));
 rows.push(['','Total nilai stok','','','','',Object.values(stock).reduce((a,s)=>a+Math.round(s.q*s.c),0),'']);
 const log=[['Tanggal','Bahan','Jumlah','Satuan','Total harga (Rp)','Pemasok / nota']].concat(stockLog.filter(l=>!l.del).map(l=>[l.at,stock[l.k]?stock[l.k].n:l.k,l.q,stock[l.k]?stock[l.k].u:'',l.p,l.sup]));
 dl(makeXlsx([{name:'Stok gudang',rows,w:[10,22,9,10,13,26,16,10]},{name:'Riwayat stok masuk',rows:log,w:[13,22,10,9,16,32]}]),'stok-gudang-26-11-2026.xlsx')}

let inSel='beras';
const UNITS=['g','kg','ml','liter','pcs','pack','botol'];
function bahanDlg(k,ctx){const s=k?stock[k]:{n:'',u:'g',min:0,c:0};openDlg(`<h2>${k?'Ubah bahan':'Tambah bahan baru'} <span class="code">G-02</span></h2><form id="bahDlgF" data-k="${k||''}" data-ctx="${ctx||''}"><label class="f"><span>Nama bahan</span><input id="dN" required value="${s.n}" placeholder="Contoh: Beras pandan wangi"></label><div class="grid g2" style="gap:10px"><label class="f"><span>Satuan</span><select id="dU">${UNITS.concat(UNITS.includes(s.u)?[]:[s.u]).map(u=>`<option ${u===s.u?'selected':''}>${u}</option>`).join('')}</select></label><label class="f"><span>Stok minimum</span><input id="dM" type="number" min="0" value="${s.min}"></label></div>${k?`<p style="color:var(--mut);font-size:13px;margin-top:0">Nama baru langsung dipakai di resep, input stok, peringatan, dan laporan.</p>`:`<label class="f"><span>Harga per satuan (Rp, opsional)</span><input id="dC" type="number" min="0" value="0"></label><p style="color:var(--mut);font-size:13px;margin-top:0">Stok awal 0. Isi stoknya lewat Input stok masuk.</p>`}<div class="row"><button class="btn red">${k?'Simpan perubahan':'Tambah bahan'}</button><button type="button" class="btn ghost" data-act="dlgx">Batal</button></div></form>`)}
function menuDlg(){openDlg(`<h2>Tambah menu baru</h2><form id="menuDlgF"><label class="f"><span>Nama menu</span><input id="nmN" required placeholder="Contoh: Roti bakar coklat"></label><div class="grid g2" style="gap:10px"><label class="f"><span>Kategori</span><select id="nmC">${MCATS.map(c=>`<option>${c}</option>`).join('')}</select></label><label class="f"><span>Harga jual (Rp)</span><input id="nmP" type="number" min="0" required value="20000"></label></div><p style="color:var(--mut);font-size:13px;margin-top:0">Setelah dibuat, tambahkan bahan dan takarannya di resep.</p><div class="row"><button class="btn red">Buat menu</button><button type="button" class="btn ghost" data-act="dlgx">Batal</button></div></form>`)}
const stCanEd=()=>role()==='admin'||role()==='owner',stWho=()=>staff?`${staff.nama} (${RL[curRole]})`:'-',stNow=()=>DM()+' '+hhmm(Date.now());let stKor=null;
let stockLog=[{id:1,k:'beras',q:5000,p:70000,sup:'Toko Sumber Rejeki · INV-0398',at:'24/11 09.10',by:'Rina Susanti (Supervisor)'},{id:2,k:'susu',q:2000,p:38000,sup:'CV Susu Segar · 1187',at:'25/11 10.32',by:'Rina Susanti (Supervisor)',kor:{q:1500,p:28500,why:'Salah ketik, yang datang 1,5 liter',by:'Rina Susanti (Supervisor)',at:'25/11 11.05'}}],stEdit=null,logSeq=3;
const bahanEditor=()=>`<form class="card scroll" id="bahF"><h2>Daftar bahan baku <span class="code">G-02</span></h2><p style="margin-top:0;color:var(--mut)">Nama, satuan, dan stok minimum bisa diubah. Perubahan nama langsung terlihat di resep dan laporan.</p>
 <table class="t2 stack"><thead><tr><th>Nama bahan</th><th>Satuan</th><th class="n">Stok</th><th>Minimum</th><th>Status</th></tr></thead><tbody>
 ${Object.entries(stock).map(([k,s])=>`<tr><td><input class="tin tl" id="bn-${k}" value="${s.n.replace(/"/g,'&quot;')}" required></td><td><input class="tin tl" id="bu-${k}" value="${s.u}" style="min-width:60px" required></td><td class="n">${s.q.toLocaleString('id-ID')}</td><td><input class="tin" type="number" min="0" id="bm-${k}" value="${s.min}" style="min-width:80px"></td><td>${s.q<=0?'<span class="pill p-bad">Habis</span>':s.q<=s.min?'<span class="pill p-warn">Menipis</span>':'<span class="pill p-ok">Aman</span>'}</td></tr>`).join('')}</tbody></table>
 <div class="row" style="margin-top:12px"><button type="button" class="btn ghost" data-act="addbahan">+ Tambah bahan</button><button class="btn red">Simpan daftar bahan</button></div></form>`;
V.gudang=()=>{const L=low();return `<div class="row" style="justify-content:space-between;align-items:flex-start;gap:10px"><h1 style="margin-bottom:0">Stok gudang bahan <span class="code">G-01 · G-07</span></h1><div class="row" style="margin-top:6px"><a class="btn ghost" href="#mutasi" style="text-decoration:none">Mutasi stok harian</a><button type="button" class="btn ghost" data-act="xstock">Export stok ke Excel</button></div></div><p class="sub">Stok berkurang otomatis dari resep setiap pesanan. Bahan di bawah batas minimum ditandai dan masuk ke lonceng peringatan.</p>
 ${L.length?`<div class="alert">${svg('box')}<div><b>${L.length} bahan di bawah stok minimum:</b> ${L.map(s=>s.n).join(', ')}. Segera buat pembelian.</div></div>`:''}
 <div class="grid g2">${bahanEditor()}
 <div class="grid" style="align-content:start"><form class="card" id="inF"><h2>Input stok masuk <span class="code">G-03</span></h2>
 <label class="f"><span>Bahan</span><span class="row" style="flex-wrap:nowrap;gap:6px"><select id="inB" style="flex:1">${Object.entries(stock).map(([k,s])=>`<option value="${k}" ${k===inSel?'selected':''}>${s.n} (${s.u})</option>`).join('')}<option value="__new">+ Tambah bahan baru…</option></select><button type="button" class="btn ghost" style="padding:6px 12px;min-height:44px" data-bedit="inB">Ubah nama</button></span></label><p style="margin:-4px 0 10px;font-size:13px;color:var(--mut)">Bahan belum ada? Pilih <b>+ Tambah bahan baru</b> di daftar.</p>
 <div class="row" style="flex-wrap:nowrap"><label class="f" style="flex:1"><span>Jumlah</span><input id="inQ" type="number" value="2000" inputmode="numeric"></label><label class="f" style="flex:1"><span>Total harga</span><input id="inP" type="number" value="60000" inputmode="numeric"></label></div>
 <label class="f"><span>Pemasok / no. nota</span><input id="inS" placeholder="Toko Sumber Rejeki · INV-0412"></label><button class="btn" style="width:100%">Tambah stok</button></form>
 <div class="card"><h2>Riwayat stok masuk</h2><p style="margin-top:0;color:var(--mut)">${stCanEd()?'Salah input? Ubah atau hapus, stok ikut disesuaikan. Setiap perubahan tercatat di bawah entri.':'Hanya admin tenant yang bisa mengubah atau menghapus. Kalau ada salah input, tekan Ajukan koreksi dan admin yang memutuskan.'}</p>
 ${stockLog.length?stockLog.map(e=>{const s=stock[e.k];return e.id===stEdit&&stCanEd()?`<div class="part"><b>${s.n}</b> · ${e.at}
  <div class="row" style="flex-wrap:nowrap;margin-top:8px"><label class="f" style="flex:1;margin:0"><span>Jumlah (${s.u})</span><input class="tin" type="number" id="eq" value="${e.q}"></label><label class="f" style="flex:1;margin:0"><span>Total harga</span><input class="tin" type="number" id="ep" value="${e.p}"></label></div>
  <label class="f" style="margin-top:8px"><span>Pemasok / nota</span><input id="es" value="${e.sup.replace(/"/g,'&quot;')}"></label><div class="row"><button class="btn" data-lsave="${e.id}">Simpan</button><button class="btn ghost" data-act="lcancel">Batal</button></div></div>`
  :stRow(e,s)}).join(''):'<p style="color:var(--mut)">Belum ada stok masuk.</p>'}</div></div></div>`};

const week=[['Jum',2.1,1.4],['Sab',3.6,2.3],['Min',3.2,2.0],['Sen',1.2,0.8],['Sel',1.4,0.9],['Rab',1.6,1.1],['Kam',1.9,1.2]];
V.keuangan=()=>{if(week.every(x=>!x[1]&&!x[2]))return `<h1>Keuangan ${xe(tName(curT))} <span class="code">F-01</span></h1><p class="sub">Laporan laba rugi, COGS, dan pendapatan harian per tenant.</p><div class="card" style="max-width:640px"><h2>Belum ada transaksi</h2><p style="color:var(--mut);margin:0">Tenant ini baru dibuat. Laporan terisi otomatis setelah kasir menutup tagihan pertama. Isi dulu stok bahan di Gudang dan atur tarif meja.</p><div class="row" style="margin-top:14px"><a class="btn red" style="text-decoration:none" href="#gudang">Isi stok gudang</a><a class="btn ghost" style="text-decoration:none" href="#tarif">Atur tarif meja</a></div></div>`;const sewa=week.reduce((a,x)=>a+x[1],0)*1e6,fb=week.reduce((a,x)=>a+x[2],0)*1e6,cogs=fb*.34,OB=opxWeek(curT),opex=OB.total,gross=sewa+fb-cogs,net=gross-opex,mx=Math.max(0.1,...week.map(x=>x[1]+x[2]));
 return `<h1>Laba bersih minggu ini ${rp(net)} <span class="code">F-01</span></h1><p class="sub">20 sampai 26 November 2026. Sewa meja menyumbang ${Math.round(sewa/(sewa+fb)*100)}% pendapatan. Pendapatan masih angka contoh; biaya operasional diambil dari input admin tenant.</p>
 <div class="kpis">${[['Pendapatan sewa meja',sewa,'+8% dari minggu lalu','ok'],['Pendapatan F&B',fb,'+3%','ok'],['COGS (bahan terpakai)',cogs,`${Math.round(cogs/fb*100)}% dari F&B`,'amber'],['Laba kotor',gross,`${Math.round(gross/(sewa+fb)*100)}% dari pendapatan`,'ok'],['Biaya operasional',opex,role()==='admin'?'<a href="#biaya">Dari input admin · lihat rincian</a>':'Dari input admin tenant','amber'],['Laba bersih',net,`${Math.round(net/(sewa+fb)*100)}% dari pendapatan`,net<0?'redt':'ok']].map(([l,v,d,c])=>`<div class="card kpi"><div class="l">${l}</div><div class="v">${v<0?'-':''}<small>Rp</small>${Math.round(Math.abs(v)).toLocaleString('id-ID')}</div><div class="d" style="color:var(--${c})">${d}</div></div>`).join('')}</div>
 <div class="grid g2" style="margin-top:16px"><div class="card"><h2>Pendapatan harian (juta rupiah)</h2><div class="bars">${week.map(([d,a,b])=>`<div class="bar"><span>${d}</span><div class="tr"><div class="a" style="width:${a/mx*100}%"></div><div class="b" style="width:${b/mx*100}%"></div></div><b class="n" style="text-align:right">${(a+b).toFixed(1).replace('.',',')} jt</b></div>`).join('')}</div>
 <div class="legend"><span><i style="background:var(--felt2)"></i>Sewa meja</span><span><i style="background:var(--red)"></i>F&B</span></div></div>
 <div class="card"><h2>Laba rugi ringkas <span class="code">F-05</span></h2>${[['Pendapatan',sewa+fb],['COGS',-cogs],['Laba kotor',gross],['Biaya operasional',-opex],['Laba bersih',net]].map(([a,b],i)=>`<div class="price"><span>${i%2?'&nbsp;&nbsp;':''}${a}</span><b ${i===4?'class="total"':''}>${b<0?'-':''}${rp(Math.abs(b))}</b></div>${i===3?OB.cats.map(([k,v])=>`<div class="price" style="font-size:14px;color:var(--mut)"><span>&nbsp;&nbsp;&nbsp;&nbsp;${xe(k)}</span><span>-${rp(v)}</span></div>`).join(''):''}`).join('')}
 <h2 style="margin-top:16px">Menu terlaris</h2>${[['Kopi susu aren',182],['Es teh manis',164],['Mie goreng',97]].map(([a,b])=>`<div class="price"><span>${a}</span><b>${b} porsi</b></div>`).join('')}</div></div>`};


const gated=id=>role()==='tamu'&&!member&&['booking','pesan','skor','bookingsaya','riwayatskor'].includes(id);
function pick(){const h=location.hash.slice(1),Rt=parseRoute(h);
 if(Rt.t){if(role()==='owner'){if(!ownerIn||Rt.t!==curT){ownerIn=true;switchT(Rt.t)}}else if(!(staff&&staff.t&&staff.t!==Rt.t)&&Rt.t!==curT)switchT(Rt.t)}
 let id=Rt.v;const ok=views.filter(canSee);if(!ok.find(x=>x.id===id))id=ok[0].id;
 const b=ctxSlug(),want=b?(id==='beranda'?b:b+'-'+id):id;if(h!==want)history.replaceState(null,'','#'+want);return id}
function draw(){if(CLOUD&&!TEN.length&&role()!=='owner'){nav('akun');$('#view').innerHTML=gated('akun')?'':(location.hash==='#akun'?V.akun():`<div class="card" style="max-width:640px;margin-top:20px"><h1>Belum ada cafe</h1><p style="color:var(--mut)">Aplikasi sudah tersambung, tetapi belum ada cafe yang dibuat. Owner bisa masuk dan menambahkan cafe pertama.</p><button class="btn red" data-act="gologin">Masuk</button></div>`);return}if(CLOUD&&TEN.length&&!TEN.some(t=>t.id===curT)&&window.CMApp)window.CMApp.pickFirstTenant();const id=pick();const tt=tOf(curT);if(role()==='tamu'&&tt&&!tt.on){nav(id);$('#view').innerHTML=`<div class="card" style="max-width:640px;margin-top:20px"><h1>${xe(tt.n)} sedang tidak aktif</h1><p style="color:var(--mut)">Halaman cafe ini sementara ditutup. Silakan hubungi cafe langsung.</p></div>`;return}if(gated(id)){gateTo=id;if(authStep==='otp'&&!pend.email)authStep='daftar'}else if(id!=='akun')gateTo='';nav(id);$('#view').innerHTML=topBanner()+(gated(id)?V.akun():V[id]());bell()}
function render(){draw();window.scrollTo(0,0);const v=$('#view');v.classList.remove('enter');void v.offsetWidth;v.classList.add('enter');fxInit()}
function rerender(){const y=scrollY;draw();scrollTo(0,y);fxInit()}
function fxInit(){const v=$('#view');if(!v)return;const rm=matchMedia('(prefers-reduced-motion:reduce)').matches,R=v.querySelectorAll('.rv:not(.in)');
 if(rm||!('IntersectionObserver' in window))R.forEach(e=>e.classList.add('in'));else{const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12,rootMargin:'0px 0px -30px 0px'});R.forEach(e=>io.observe(e));setTimeout(()=>R.forEach(e=>{if(!e.classList.contains('in')&&e.getBoundingClientRect().top<innerHeight)e.classList.add('in')}),1200)}
 if(!rm)v.querySelectorAll('[data-cnt]:not([data-done])').forEach(e=>{e.dataset.done=1;const to=+e.dataset.cnt,n=e.dataset.f==='n',t0=performance.now(),D=1200;const st=now=>{const k=Math.min(1,(now-t0)/D),q=1-Math.pow(1-k,3),x=Math.round(to*q);e.textContent=n?x.toLocaleString('id-ID'):x;if(k<1)requestAnimationFrame(st)};requestAnimationFrame(st)});
 const hx=v.querySelector('.hx');if(hx&&!rm&&matchMedia('(pointer:fine)').matches){hx.onpointermove=ev=>{const r=hx.getBoundingClientRect();hx.style.setProperty('--mx',((ev.clientX-r.left)/r.width-.5).toFixed(3));hx.style.setProperty('--my',((ev.clientY-r.top)/r.height-.5).toFixed(3))};hx.onpointerleave=()=>{hx.style.setProperty('--mx',0);hx.style.setProperty('--my',0)}}}


let dlgOpen=false;
function openDlg(h){$('#dlg').innerHTML=h;$('#ov').classList.remove('hide');dlgOpen=true;const f=$('#dlg button');f&&f.focus()}
function closeDlg(){$('#ov').classList.add('hide');dlgOpen=false}
function warnDlg(i,over){const t=tables[i];openDlg(`<h2 class="${over?'r':''}">${over?'Waktu bermain sudah habis':'Waktu bermain hampir habis'}</h2><p style="margin:0"><b>${t.n}</b> · ${t.who}</p>
 <div class="big ${over?'r':''}" data-rem="${i}">${fmtT(remain(t))}</div><p>Informasikan ke pemain: apakah ingin menambah waktu bermain atau mengakhiri permainan.</p>
 <div class="row"><button class="btn" data-ext="${i}|30">+30 menit</button><button class="btn" data-ext="${i}|60">+1 jam</button><button class="btn red" data-end="${i}">Akhiri permainan</button></div>
 <button class="btn ghost" style="width:100%;margin-top:10px" data-act="close">Tutup, nanti saya tanyakan</button>`)}
function receipt(t,method,pre){const b=bill(t),L=(a,v)=>`<div class="rl"><span>${a}</span><span>${v}</span></div>`,hr='<div class="hr"></div>';
 openDlg(`<h2>${pre?'Tagihan sementara':'Struk pembayaran'} <span class="code">K-04</span></h2><div class="rcpt"><div style="text-align:center"><b>CAFE MAHJONG</b><br>Jl. Contoh Raya No. 8<br>26/11/2026 ${hhmm(Date.now())}</div>${hr}
 ${L('No',pre?'-':'INV-261126-0042')}${L('Meja',t.n)}${L('Kasir','Dewi')}${L('Lama main',hm(b.e)+' jam')}${hr}
 ${L('Sewa '+b.billed/60+' jam x '+(t.pl||4)+' org',rp(b.sewa))}${t.fb.map(x=>L(x[1]+'x '+x[0],rp(x[1]*x[2]))).join('')}${L('Service 5%',rp(b.sv))}${L('PB1 10%',rp(b.tax))}${b.dp?L('DP booking','-'+rp(b.dp)):''}${hr}
 ${L('<b>TOTAL</b>','<b>'+rp(b.tot)+'</b>')}${pre?'':L('Bayar',method)}<div style="text-align:center;margin-top:8px">Terima kasih, sampai main lagi</div></div>
 <div class="row" style="margin-top:14px"><button class="btn" data-act="print">Cetak ke printer thermal 58 mm</button><button class="btn ghost" data-act="close">Tutup</button></div>`)}
function ext(i,m){const t=tables[i];t.planMin+=m;const tl=(bookings[0]||[]).find(b=>b.t===t.n&&b.k==='main');if(tl)tl.l=t.planMin/60;t.extra=(t.extra||0)+m;if(remain(t)>15)t.warned=false;if(remain(t)>0)t.warned0=false;closeDlg();toast(`${t.n} diperpanjang ${hm(m)} jam`);rerender()}
function endT(i){const t=tables[i];t.endEl=elapsed(t);t.st='bill';closeDlg();selTable=i;toast(t.n+' selesai. Tagihan siap dibayar.');if(location.hash!=='#kasir')location.hash='kasir';else rerender()}
document.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;const d=b.dataset;
 if(d.day){dayI=+d.day;bookSel=null;rerender()}
 else if(d.slot){const[t,h]=d.slot.split('|');const i=+h;if(!bookSel||bookSel.t!==t)bookSel={t,h:[i]};else{const hs=bookSel.h;if(hs.includes(i))bookSel.h=hs.filter(x=>x<i);else{const lo=Math.min(...hs,i),hi=Math.max(...hs,i);const r=[];for(let k=lo;k<=hi;k++){if(occ(dayI,t,k)){toast('Ada jam yang sudah dipesan di rentang itu');return}r.push(k)}bookSel.h=r}}rerender()}
 else if(d.tb){selTable=+d.tb;startPl=tables[+d.tb].pl||4;payM='Tunai';cashIn=0;splitN=0;parts=[];rerender()}
 else if(d.ext){const[i,m]=d.ext.split('|');ext(+i,+m)}
 else if(d.end){endT(+d.end)}
 else if(d.ff){const t=tables[+d.ff];t.skip=(t.skip||0)+10;rerender()}
 else if(d.cat){cat=d.cat;rerender()}
 else if(d.add){cart[d.add]=(cart[d.add]||0)+1;rerender()}
 else if(d.q){const[id,n]=d.q.split('|');cart[id]=Math.max(0,(cart[id]||0)+ +n);rerender()}
 else if(d.act==='bulk'){const ty=$('#blT').value,r=+$('#blR').value,w=+$('#blW').value;tables.forEach((t,i)=>{if(t.type===ty){if(r)$('#tr-'+i).value=r;if(w)$('#tw-'+i).value=w}});toast('Tarif '+ty+' diisi. Tekan Simpan tarif.')}
 else if(d.ordfor){posMeja=tables[+d.ordfor].n;cart={};location.hash='pesan'}
 else if(d.msel){readDraft();menuSel=+d.msel;recDraft=null;rerender()}
 else if(d.mres){menuSel=+d.mres;recDraft=null;location.hash='resep'}
 else if(d.act==='addbahan'){bahanDlg(null,'')}
 else if(d.act==='rtpl'){recipeTemplate()}
 else if(d.act==='impok'){applyImport()}
 else if(d.act==='xstock'){exportStock()}
 else if(d.act==='newmenu'){readDraft();menuDlg()}
 else if(d.act==='dlgx'){closeDlg();rerender()}
 else if(d.bedit){const el=$('#'+d.bedit);if(d.bedit!=='inB')readDraft();if(el&&stock[el.value])bahanDlg(el.value,d.bedit)}
 else if(d.ledit){if(!stCanEd()){toast('Hanya admin tenant yang bisa mengubah');return}stEdit=+d.ledit;rerender()}
 else if(d.act==='lcancel'){stEdit=null;rerender()}
 else if(d.ldel){if(!stCanEd()){toast('Hanya admin tenant yang bisa menghapus');return}const e=stockLog.find(x=>x.id==d.ldel),s2=stock[e.k];stAdj(e.k,-e.q,'Hapus input stok masuk '+e.at);s2.q=Math.max(0,s2.q-e.q);e.del=true;delete e.kor;(e.hist=e.hist||[]).push(`${stNow()} · ${stWho()} menghapus entri ini`);toast('Input stok dihapus, stok '+s2.n+' dikurangi '+e.q.toLocaleString('id-ID')+' '+s2.u);rerender()}
 else if(d.lsave){if(!stCanEd())return;const e=stockLog.find(x=>x.id==d.lsave),s2=stock[e.k],nq=Math.max(0,+$('#eq').value||0),np=Math.max(0,+$('#ep').value||0),ns=$('#es').value,ch=[];if(nq!==e.q)ch.push(`jumlah ${e.q.toLocaleString('id-ID')} → ${nq.toLocaleString('id-ID')} ${s2.u}`);if(np!==e.p)ch.push(`harga ${rp(e.p)} → ${rp(np)}`);if(ns!==e.sup)ch.push('pemasok/nota');if(ch.length)(e.hist=e.hist||[]).push(`${stNow()} · ${stWho()} mengubah ${ch.join(', ')}`);if(nq!==e.q)stAdj(e.k,nq-e.q,'Ubah input stok masuk '+e.at);s2.q=Math.max(0,s2.q+nq-e.q);e.q=nq;e.p=np;e.sup=ns;stEdit=null;toast('Input stok diperbarui, stok '+s2.n+' disesuaikan');rerender()}
 else if(d.act==='addmenu'){const id=Math.max(...menu.map(x=>x.id))+1;menu.push({id,n:'Menu baru',c:'Makanan',p:20000,r:{}});menuSel=id;recDraft=null;toast('Menu baru ditambahkan. Isi nama, harga, dan resepnya.');rerender()}
 else if(d.act==='pkadd'){readDraft();const f=menu.find(x=>!isPkg(x));if(!f){toast('Buat menu non-paket dulu');return}recDraft.pk.push([f.id,1]);rerender()}
 else if(d.pkdel){readDraft();recDraft.pk.splice(+d.pkdel,1);rerender()}
 else if(d.act==='mfotox'){const m=menu.find(x=>x.id===menuSel);if(m){delete m.img;toast('Foto '+m.n+' dihapus');rerender()}}
 else if(d.act==='radd'){readDraft();recDraft.r.push(['telur',1]);rerender()}
 else if(d.rdel){readDraft();recDraft.r.splice(+d.rdel,1);rerender()}
 else if(d.act==='rsave'){readDraft();const m=menu.find(x=>x.id===menuSel);m.r={};recDraft.r.forEach(([k,v])=>{if(v>0)m.r[k]=(m.r[k]||0)+v});if(isPkg(m)){m.pk=recDraft.pk.filter(([id])=>menu.some(x=>x.id==id&&!isPkg(x)));if(m.pk.length)m.r={}}recDraft=null;toast('Resep '+m.n+' tersimpan. Stok akan dipotong sesuai resep baru.');rerender()}
 else if(d.dpm){dpM=d.dpm;rerender()}
 else if(d.copy){try{navigator.clipboard.writeText(d.copy).then(()=>toast('Nomor rekening disalin'),()=>toast('Nomor rekening: '+d.copy))}catch(_){toast('Nomor rekening: '+d.copy)}}
 else if(d.act==='demoproof'){proofTmp='demo';rerender();toast('Contoh bukti dipakai. Tekan Kirim bukti.')}
 else if(d.act==='dpclose'){dpFor=null;rerender()}
 else if(d.redp){dpFor=d.redp;proofTmp='';if(location.hash!=='#booking')location.hash='booking';else render()}
 else if(d.vok){const b=findBk(d.vok).b,v=+($('#vin-'+b.id).value||0);if(v!==dpAmt(b)){toast('Nominal mutasi '+rp(v)+' tidak sama dengan tagihan '+rp(dpAmt(b)));return}if([...document.querySelectorAll('.vck-'+b.id)].some(c=>!c.checked)){toast('Centang semua pemeriksaan dulu');return}
  b.k='dp';pushN(b.n,'ok',`Booking ${b.id} valid. DP ${rp(dpAmt(b))} sudah diterima. Sampai jumpa di ${b.t}, ${clock(b.s)}.`);lastOk.unshift({id:b.id,n:b.n,ok:true,at:hhmm(Date.now())});toast('Booking valid. Notifikasi terkirim ke akun dan email '+b.n);rerender()}
 else if(d.vno){const b=findBk(d.vno).b;b.k='tolak';b.why=$('#why-'+b.id).value.toLowerCase();pushN(b.n,'no',`Bukti DP untuk ${b.id} ditolak: ${b.why}. Silakan unggah ulang.`);lastOk.unshift({id:b.id,n:b.n,ok:false,at:hhmm(Date.now())});toast('Bukti ditolak. Pengguna diminta unggah ulang.');rerender()}
 else if(d.pm){payM=d.pm;rerender()}
 else if(d.cash){cashIn=+d.cash;rerender()}
 else if(d.act==='paynow'){const t=tables[selTable],b=bill(t);if(payM==='Tunai'){const v=+($('#cashIn').value||0);if(v<b.tot){toast('Uang diterima kurang dari total tagihan');return}receipt(t,`Tunai ${rp(v)}, kembali ${rp(v-b.tot)}`)}else receipt(t,payM);freeTable(t);rerender()}
 else if(d.ppm){const[i,m]=d.ppm.split('|');parts[+i].m=m;rerender()}
 else if(d.pp){const i=+d.pp;parts[i].paid=true;if(parts.every(p=>p.paid)){const t=tables[selTable];receipt(t,'Split '+parts.length+' orang ('+parts.map(p=>p.m).join(', ')+')');freeTable(t)}else toast('Orang '+(i+1)+' lunas');rerender()}
 else if(d.bkf){bkF=d.bkf;rerender()}
 else if(d.mvopen){moveId=d.mvopen;rerender()}
 else if(d.gokasir){selTable=+d.gokasir;location.hash='kasir'}
 else if(d.act==='mvclose'){moveId=null;rerender()}
 else if(d.mv){const x=findBk(moveId),b=x.b,old=b.t;b.from=b.from||old;b.t=d.mv;b.why=$('#mvWhy').value;const ot=tables.find(t=>t.n===old);if(ot&&ot.st==='book'&&ot.who===b.n){ot.st='free';delete ot.who}toast(`${b.n} dipindah dari ${old} ke ${d.mv}. Akun pengguna sudah ter-update dan email notifikasi terkirim.`);rerender()}
 else if(d.cf){const x=findBk(d.cf),b=x.b,i=tables.findIndex(t=>t.n===b.t),tb=tables[i];if(busyNow(x.d,b.t,b)){moveId=b.id;toast(b.t+' masih dipakai. Pilih meja lain untuk '+b.n);rerender();return}b.k='hadir';Object.assign(tb,{st:'book',at:clock(b.s),who:b.n,plan:b.l*60,dp:b.dp||0,pl:b.pl,bkRate:b.rate,bk:b.id});startPl=b.pl;selTable=i;toast(b.n+' sudah datang. Isi rencana lama main lalu tekan Mulai.');location.hash='kasir'}
 else if(d.act==='pre'){receipt(tables[selTable],'',true)}
 else if(d.act==='print'){closeDlg();toast('Struk dikirim ke printer thermal kasir')}
 else if(d.act==='close'){closeDlg()}
 else if(d.act==='order'&&CLOUD&&role()==='tamu'){const oi=Object.entries(cart).filter(([,q])=>q>0).map(([id,q])=>[menu.find(x=>x.id==id).n,q]);if(!posMeja){toast('Pilih posisi meja dulu');return}if(!oi.length)return;CMB.orderAdd(curT,{t:posMeja,items:oi,note:(($('#ordNote')||{}).value||'').trim()}).then(()=>{cart={};toast(`Pesanan ${posMeja} terkirim ke dapur.`);rerender()}).catch(err=>toast(err.message))}
 else if(d.act==='order'){const need={};for(const[id,q]of Object.entries(cart)){const m=menu.find(x=>x.id==id);for(const[k,v]of Object.entries(rOf(m)))need[k]=(need[k]||0)+v*q}
  const short=Object.entries(need).filter(([k,v])=>stock[k].q<v);if(short.length){toast('Bahan tidak cukup: '+short.map(([k])=>stock[k].n).join(', '));return}
  const before=low().length;for(const[k,v]of Object.entries(need))stock[k].q-=v;const T=tables.find(t=>t.n===posMeja);if(!T){toast('Pilih posisi meja dulu');return}T.fb=T.fb||[];if(T.st!=='free')for(const[id,q]of Object.entries(cart))if(q>0){const m=menu.find(x=>x.id==id),ex=T.fb.find(x=>x[0]===m.n);ex?ex[1]+=q:T.fb.push([m.n,q,m.p])}
  const oi=Object.entries(cart).filter(([,q])=>q>0).map(([id,q])=>[menu.find(x=>x.id==id).n,q]),nt=($('#ordNote')||{}).value||'';ordAdd({t:posMeja,who:role()==='tamu'&&member?member.nama:(T.who||'Walk-in'),items:oi,note:nt.trim(),src:role()==='tamu'?'Pelanggan':RL[role()]+' '+(staff?staff.nama.split(' ')[0]:'')});
  cart={};const nl=low().length;toast(nl>before?`Pesanan terkirim. ${nl-before} bahan baru masuk stok minimum!`:`Pesanan ${posMeja}${T.who?' atas nama '+T.who:''} terkirim ke dapur dan masuk tagihan.`);rerender()}
 else if(d.act==='undo'){rounds.pop();rerender()}
 else if(d.act==='finish'){toast('Sesi disimpan. Poin masuk papan peringkat member.')}
 else if(d.act==='fanhelp'){toast('S-03: centang pola tangan (all pungs, half flush, dragon pungs...), fan terisi otomatis')}
 else if(d.auth){authStep=d.auth;authMode=d.auth;rerender()}
 else if(d.act==='resend'){if(CLOUD)CMB.resend(pend.email).then(()=>toast('Kode OTP baru dikirim ke '+pend.email)).catch(err=>toast(err.message));else toast('Kode OTP baru dikirim ke '+pend.email)}
 else if(d.act==='forgot'){if(CLOUD)CMB.forgotDlg();else toast('Link atur ulang password dikirim ke email')}
 else if(d.ttog){const t=TEN.find(x=>x.id===d.ttog);t.on=!t.on;if(t.on)t.susp=false;toast(`${t.n} ${t.on?'diaktifkan':'dinonaktifkan'}`);rerender()}
 else if(d.utog&&CLOUD){const a=ACCS[+d.utog];CMB.staff('toggle',{id:a.id}).then(r=>toast(`${a.nama} ${r.active?'diaktifkan':'dinonaktifkan'}`)).catch(err=>toast(err.message))}
 else if(d.utog){const a=ACCS[+d.utog];a.off=!a.off;toast(`${a.nama} ${a.off?'dinonaktifkan':'diaktifkan'}`);rerender()}
 else if(d.topen){ownerIn=true;switchT(d.topen);location.hash='keuangan';render()}
 else if(d.act==='ownback'){ownerIn=false;location.hash='tenant';render()}
 else if(d.tedit){tEditDlg(d.tedit)}
 else if(d.act==='tlclear'){tLogoTmp=null;$('#tlPrev').innerHTML=tLogo({n:$('#teN').value},64)}
 else if(d.udel){const a=ACCS[+d.udel];openDlg(`<h2>Hapus akun ${xe(a.nama)}?</h2><p>Akun @${xe(a.u)} (${RL[a.role]}) akan dihapus dan tidak bisa login lagi. Riwayat transaksi dan shift yang pernah dibuat tetap tersimpan atas namanya. Tindakan ini tidak bisa dibatalkan.</p><p style="color:var(--mut);font-size:14px">Kalau mungkin dipakai lagi, pilih Nonaktifkan saja.</p><div class="row"><button type="button" class="btn red" data-udelok="${d.udel}">Ya, hapus akun</button><button type="button" class="btn ghost" data-act="dlgx">Batal</button></div>`)}
 else if(d.ucred){const a=ACCS[+d.ucred],me=a===staff,ip='style="width:100%"';openDlg(`<h2>Ubah login ${xe(a.nama)}</h2><p style="margin-top:0;color:var(--mut);font-size:14px">${RL[a.role]} · ${xe(a.email)}. ${me?'Ini akun kamu sendiri.':'Beri tahu pengguna username dan password barunya. Sesi yang sedang aktif tetap jalan sampai keluar.'}</p><form id="ucF" data-i="${d.ucred}"><label class="f"><span>Username</span><input id="ucU" required autocapitalize="none" spellcheck="false" value="${xe(a.u)}"><small style="color:var(--mut);font-size:13px">${U_HINT}.</small></label>${me?pw('ucP0','Password saat ini','current-password','minlength="1"'):''}<label class="f"><span>Password baru</span><div class="pw"><input id="ucP" type="password" autocomplete="new-password" placeholder="Kosongkan jika tidak diganti"><button type="button" class="eye" data-act="pw" aria-label="Tampilkan password">Lihat</button></div></label><label class="f"><span>Ulangi password baru</span><div class="pw"><input id="ucP2" type="password" autocomplete="new-password"><button type="button" class="eye" data-act="pw" aria-label="Tampilkan password">Lihat</button></div></label><div class="row"><button class="btn red">Simpan</button><button type="button" class="btn ghost" data-act="dlgx">Batal</button></div></form>`)}
 else if(d.udelok&&CLOUD){const a=ACCS[+d.udelok];CMB.staff('delete',{id:a.id}).then(()=>{closeDlg();toast(`Akun ${a.nama} dihapus`)}).catch(err=>toast(err.message))}
 else if(d.udelok){const a=ACCS[+d.udelok];ACCS.splice(+d.udelok,1);closeDlg();toast(`Akun ${a.nama} dihapus`);rerender()}
 else if(d.ivok){const v=INV.find(x=>x.id===d.ivok),t=TEN.find(x=>x.id===v.t);v.k='lunas';t.plan=v.plan;t.due=addMonth(t.due,v.mo||1);const mj=syncMeja(t.id);if(mj)setTimeout(()=>toast(t.n+': '+mj),1600);if(t.susp){t.susp=false;t.on=true}pushTN(t.id,'ok',`Pembayaran ${v.id} ${rp(v.paid)} divalidasi. Langganan ${pk(t.plan).n} aktif sampai ${fmtD(t.due)}.`);toast(`${t.n}: pembayaran disetujui`);rerender()}
 else if(d.ivno){const v=INV.find(x=>x.id===d.ivno);v.k='tolak';v.why=$('#ivw-'+v.id).value;pushTN(v.t,'bad',`Bukti ${v.id} ditolak: ${v.why}. Silakan kirim ulang.`);toast('Bukti ditolak, admin tenant diberi tahu');rerender()}
 else if(d.trem){const t=TEN.find(x=>x.id===d.trem);pushTN(t.id,'bad',`Pengingat: tagihan ${pk(t.plan).n} ${rp(pk(t.plan).p)} jatuh tempo ${fmtD(t.due)}.`);toast('Pengingat dikirim ke admin '+t.n)}
 else if(d.act==='duecheck'){const n=checkDue();toast(n?`${n} tenant ditangguhkan karena lewat masa tenggang`:'Tidak ada tenant yang melewati masa tenggang');rerender()}
 else if(d.ivf){ivF=d.ivf;rerender()}
 else if(d.smo){subMo=+d.smo;rerender()}
 else if(d.tpick){switchT(d.tpick);toast('Cafe dipilih: '+tName(d.tpick));rerender()}
 else if(d.tha){thDraft.acc=d.tha;document.querySelectorAll('[data-tha]').forEach(b=>b.classList.toggle('on',b.dataset.tha===d.tha));thPrev()}
 else if(d.thc){thDraft.bg=d.thc;$('#thBg').value=d.thc;document.querySelectorAll('[data-thc]').forEach(b=>b.classList.toggle('on',b.dataset.thc===d.thc));thPrev()}
 else if(d.act==='thimgx'){thDraft.img=null;rerender()}
 else if(d.act==='thlogox'){thDraft.logo=null;thPrev()}
 else if(d.act==='threset'){const lg=thDraft.logo;thDraft={id:curT,...TH0,acc:'#c8282d',logo:lg};rerender()}
 else if(d.act==='gologin'){authStep='masuk';authMode='masuk';if(location.hash!=='#akun')location.hash='akun';else rerender()}
 else if(d.act==='logout'){if(CLOUD)CMB.logout();member=null;staff=null;ownerIn=false;curRole='tamu';authStep='masuk';authMode='masuk';location.hash='beranda';toast('Kamu sudah keluar');rerender()}
 else if(d.demo){authStep='masuk';authMode='masuk';rerender();const a=ACCS[+d.demo];$('#lgE').value=a.u;$('#lgP').value=a.pw}
 else if(d.act==='scanqr'){posMeja='Meja 2';toast('QR terbaca: Meja 2');rerender()}
 else if(d.sk){skTab=d.sk;scrollTo(0,0);rerender()}
 else if(d.act==='pw'){const inp=b.previousElementSibling,sh=inp.type==='password';inp.type=sh?'text':'password';b.textContent=sh?'Sembunyikan':'Lihat';b.setAttribute('aria-label',sh?'Sembunyikan password':'Tampilkan password')}
 else if(d.cp){cP=+d.cp;if(cD===cP)cD=(cP+1)%4;rerender()}
 else if(d.scp){scanP=+d.scp;cP=scanP;if(cD===cP)cD=(cP+1)%4;scan=null;photoURL='';rerender()}
 else if(d.save){const[src,t]=d.save.split('|');rounds.push({w:cP,how:cHow,d:cHow==='buang'?cD:null,f:toF(+t)});toast(`Ronde ${rounds.length} disimpan untuk ${players[cP]}. Pilih pemain berikutnya.`);calcSel=new Set();if(src==='f'){scan=null;photoURL=''}const n=(cP+1)%4;cP=n;scanP=n;if(cD===cP)cD=(cP+1)%4;rerender()}
 else if(d.act==='chpw'){toast('Password diganti. Kode OTP konfirmasi dikirim ke email.')}
 else if(d.act==='who'){$('#whoMenu').classList.toggle('hide')}
 else if(d.act==='sample'){scanN++;scan='proc';rerender();setTimeout(()=>{scan='done';rerender()},1200)}
 else if(d.act==='fix'){toast('Ketuk tile yang salah, lalu pilih tile yang benar dari daftar')}
 else if(b.id==='bell'){const L=low();toast(L.length?'Stok minimum: '+L.map(s=>s.n).join(', '):'Semua stok aman')}
});
document.addEventListener('change',e=>{const g=e.target;
 if((g.id==='inB'||(g.id||'').startsWith('rb-'))&&g.value==='__new'){if(g.id==='inB')g.value=inSel;else{const j=+g.id.slice(3);g.value=recDraft.r[j][0];readDraft()}bahanDlg(null,g.id);return}
 if(g.id==='inB'){inSel=g.value;return}
 if(g.id==='tlLogo'&&g.files[0]){readImg(g.files[0],u=>{tLogoTmp=u;$('#tlPrev').innerHTML=tLogo({logo:tLogoTmp},64)},512);return}
 if(g.id==='subProof'&&g.files[0]){const sn=$('#subSnd').value,am=$('#subAmt').value;readImg(g.files[0],u=>{subProofTmp=u;rerender();$('#subSnd').value=sn;$('#subAmt').value=am});return}
 if(g.id==='subPk'){subPlanSel=g.value;rerender();return}
 if(g.id==='thLogo'&&g.files[0]){readImg(g.files[0],u=>{thDraft.logo=u;thPrev()},512);return}
 if(g.id==='thImg'&&g.files[0]){readImg(g.files[0],u=>{thDraft.img=u;rerender()});return}
 if(g.id==='thBg'){thDraft.bg=g.value;thPrev();return}
 if(g.dataset&&g.dataset.spk){const t=TEN.find(x=>x.id===g.dataset.spk);t.plan=g.value;const mj=syncMeja(t.id);toast(`${t.n} pindah ke paket ${pk(g.value).n}${mj?'. '+mj:''}`);rerender();return}
 if(g.id==='tenSel'){switchT(g.value);toast('Cafe dipilih: '+tName(g.value));render();return}
 if(g.id==='recFile'&&g.files[0]){const f=g.files[0];readSheet(f).then(rows=>{if(!rows.length)throw new Error('File kosong');const r=parseRecipeRows(rows);if(!r.menus.length)throw new Error('Tidak ada baris resep yang valid');impPrev={...r,file:f.name};impDlg()}).catch(err=>toast('Gagal membaca file: '+err.message));g.value='';return}
 if(g.id==='splitT'||g.id==='splitN'){splitN=g.id==='splitT'?(g.checked?2:0):+g.value;parts=Array.from({length:splitN},()=>({m:'QRIS',paid:false}));rerender();return}
 if(g.id==='upImg'&&g.files[0]){readImg(g.files[0],u=>{proofTmp=u;rerender()});return}
 if(g.id==='mFoto'&&g.files[0]){const m=menu.find(x=>x.id===menuSel);if(!m)return;toast('Mengunggah foto...');readImg(g.files[0],u=>{(CMB.uploadImg?CMB.uploadImg(curT,u):Promise.resolve(u)).then(url=>{m.img=url;toast('Foto '+m.n+' tersimpan');rerender()}).catch(err=>toast('Gagal mengunggah foto: '+err.message))},640);return}
 if(g.id==='bkPl'){bookPl=+g.value;rerender();return}
 if(g.id==='sPl'){startPl=+g.value;rerender();return}
 if(g.classList.contains('rch')){readDraft();rerender();return}
 if(g.id==='posSel'){posMeja=g.value;rerender();return}
 if(g.classList.contains('cb')){g.checked?calcSel.add(+g.value):calcSel.delete(+g.value);rerender();return}
 if(g.id==='cHow'){cHow=g.value;if(cD===cP)cD=(cP+1)%4;rerender();return}
 if(g.id==='cD'){cD=+g.value;rerender();return}
 if(g.id==='tileImg'&&g.files[0]){try{photoURL=URL.createObjectURL(g.files[0])}catch(_){photoURL=''}scanN++;scan='proc';rerender();setTimeout(()=>{scan='done';rerender()},1500);return}
 if(e.target.id==='ruleSel'){rule=e.target.value;rounds=RULES[rule].sample.map(r=>({...r}));calcSel=new Set();scan=null;rerender()}});
document.addEventListener('click',e=>{if(!e.target.closest('.whoW'))$('#whoMenu').classList.add('hide')});
document.addEventListener('input',e=>{if(thDraft&&(e.target.id==='thT'||e.target.id==='thS')){thDraft[e.target.id==='thT'?'title':'sub']=e.target.value;thPrev();return}if(e.target.id==='cashIn'){cashIn=+e.target.value||0;const b=bill(tables[selTable]),k=$('#kembali');if(k)k.textContent=cashIn>=b.tot?rp(cashIn-b.tot):'-'}});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&dlgOpen)closeDlg()});
document.addEventListener('submit',e=>{e.preventDefault();const f=e.target;
 if(f.id==='rF'){const w=$('#rw').value;if(w==='x')rounds.push({w:null,f:0});else{const how=$('#rh').value,dd=+$('#rd').value;if(how==='buang'&&dd==+w){toast('Pembuang tidak boleh sama dengan pemenang');return}const fi=$('#rf');rounds.push({w:+w,how,d:how==='buang'?dd:null,f:fi?Math.max(0,+fi.value||0):0})}rerender()}
 else if(f.id==='startF'){const pl=+$('#sPlan').value;if(!pl){toast('Isi rencana lama bermain dulu');return}const t=tables[selTable];Object.assign(t,{st:'play',startMs:Date.now(),planMin:pl,extra:0,skip:0,warned:pl<=15,warned0:false,pl:+$('#sPl').value,lockRate:t.bkRate||t.rate,who:$('#sWho').value||'Walk-in',fb:t.fb||[],dp:t.dp||0});toast(`${t.n} mulai, rencana ${hm(pl)} jam`);rerender()}
 else if(f.id==='regF'){if($('#rgP').value!==$('#rgP2').value){toast('Password tidak sama');return}const ru=uNorm($('#rgU').value),re=$('#rgE').value.trim().toLowerCase();if(!uOk(ru)){toast('Username: '+U_HINT);return}if(CLOUD){const P={nama:$('#rgN').value.trim(),u:ru,email:re,hp:$('#rgH').value,pw:$('#rgP').value};const bt=f.querySelector('button.red');bt.disabled=true;CMB.register(P).then(()=>{pend={nama:P.nama,u:P.u,email:P.email,hp:P.hp,neu:true};authStep='otp';authMode='daftar';toast('Kode OTP dikirim ke '+P.email);rerender()}).catch(err=>{bt.disabled=false;toast(err.message)});return}if(uTaken(ru)){toast('Username '+ru+' sudah dipakai. Pilih yang lain.');return}if(eTaken(re)){toast('Email ini sudah terdaftar. Silakan masuk.');return}pend={nama:$('#rgN').value.trim(),u:ru,email:re,hp:$('#rgH').value,pw:$('#rgP').value,neu:true};authStep='otp';authMode='daftar';toast('Kode OTP dikirim ke '+pend.email);rerender()}
 else if(f.id==='loginF'&&CLOUD){const bt=f.querySelector('button.red');bt.disabled=true;CMB.login($('#lgE').value,$('#lgP').value).catch(err=>toast(err.message)).finally(()=>{bt.disabled=false})}
 else if(f.id==='loginF'){const un=uNorm($('#lgE').value),a=ACCS.find(x=>x.u===un);if(!a||a.pw!==$('#lgP').value){toast('Username atau password salah');return}
  if(a.off){toast('Akun ini dinonaktifkan admin');return}if(a.t&&!TEN.find(t=>t.id===a.t).on){toast('Tenant cafe ini sedang nonaktif');return}
  if(a.role!=='tamu'){if(a.t&&a.t!==curT)toast('Akun ini milik '+tName(a.t)+', dialihkan ke alamatnya');if(a.t)switchT(a.t);staff=a;curRole=a.role;member=null;toast(`Masuk sebagai ${RL[a.role]}: ${a.nama}${a.t?' · '+tName(a.t):''}`);location.hash=HOME[a.role];render();return}
  pend={nama:a.nama,u:a.u,email:a.email,hp:a.hp};authStep='otp';authMode='masuk';toast('Kode OTP dikirim ke '+pend.email);rerender()}
 else if(f.id==='otpF'&&CLOUD){CMB.verifySignup(pend.email,$('#otpIn').value.trim()).then(()=>{authStep='daftar';gateTo=''}).catch(err=>toast(err.message))}
 else if(f.id==='otpF'){if($('#otpIn').value!==OTP){toast('Kode OTP salah. Coba lagi.');return}if(pend.neu&&!uTaken(pend.u))ACCS.push({u:pend.u,email:pend.email,pw:pend.pw,role:'tamu',nama:pend.nama,hp:pend.hp});member={nama:pend.nama,u:pend.u,email:pend.email,hp:pend.hp};authStep='daftar';toast('Selamat datang, '+member.nama.split(' ')[0]);gateTo='';if(location.hash!=='#akun')location.hash='akun';else render()}
 else if(f.id==='profF'){member.nama=$('#pfN').value.trim();member.email=$('#pfE').value.trim();member.hp=$('#pfH').value.trim();if(CLOUD){CMB.updateProfile({nama:member.nama,hp:member.hp,email:member.email}).then(m=>toast(m||'Profil tersimpan')).catch(err=>toast(err.message));render();return}const a=ACCS.find(x=>x.u===member.u);if(a){a.nama=member.nama;a.email=member.email;a.hp=member.hp}toast('Profil tersimpan');render()}
 else if(f.id==='tarF'){const names=tables.map((t,i)=>$('#tn-'+i).value.trim());if(new Set(names).size!==names.length||names.some(n=>!n)){toast('Nama meja tidak boleh kosong atau sama');return}
  tables.forEach((t,i)=>{const nn=names[i],old=t.n;if(nn!==old){Object.values(bookings).forEach(L=>L.forEach(b=>{if(b.t===old)b.t=nn;if(b.from===old)b.from=nn}));if(posMeja===old)posMeja=nn;t.n=nn}t.type=$('#tt-'+i).value.trim()||t.type});let ch=0;tables.forEach((t,i)=>{const r=+$('#tr-'+i).value,w=+$('#tw-'+i).value;if(r>0&&r!==t.rate){t.rate=r;ch++}if(w>0&&w!==t.wk){t.wk=w;ch++}});minH=+$('#minH').value;dpPct=Math.min(100,Math.max(10,+$('#dpPct').value||30));
  HH.forEach((h,i)=>{h.on=$('#hon-'+i).checked;h.from=+$('#hfr-'+i).value;h.to=+$('#hto-'+i).value;h.disc=+$('#hds-'+i).value});tarLog.unshift({msg:`${ch} tarif diubah, minimal ${minH} jam, DP ${dpPct}% oleh ${role()==='admin'?'Admin':'Supervisor'}`,at:hhmm(Date.now())});toast('Tarif tersimpan dan langsung dipakai di booking dan kasir');rerender()}
 else if(f.id==='menuF'){menu.forEach((m,i)=>{m.n=$('#mn-'+i).value.trim()||m.n;m.c=$('#mc-'+i).value;m.p=Math.max(0,+$('#mp-'+i).value||0)});toast('Menu dan harga tersimpan, langsung tampil di menu pesan');rerender()}
 else if(f.id==='bahF'){Object.entries(stock).forEach(([k,st])=>{st.n=$('#bn-'+k).value.trim()||st.n;st.u=$('#bu-'+k).value.trim()||st.u;st.min=Math.max(0,+$('#bm-'+k).value||0)});toast('Daftar bahan tersimpan');rerender()}
 else if(f.id==='bahDlgF'){const k=f.dataset.k,ctx=f.dataset.ctx,n=$('#dN').value.trim(),u=$('#dU').value,mn=+$('#dM').value||0;if(!n){toast('Isi nama bahan');return}
  if(k){Object.assign(stock[k],{n,u,min:mn});toast('Bahan diubah menjadi '+n)}
  else{const nk='b'+Date.now();stock[nk]={n,u,q:0,min:mn,c:+(($('#dC')||{}).value)||0};if(ctx==='inB')inSel=nk;else if(ctx.startsWith('rb-')&&recDraft){recDraft.r[+ctx.slice(3)][0]=nk}toast(n+' ditambahkan ke daftar bahan')}
  closeDlg();rerender()}
 else if(f.id==='menuDlgF'){const n=$('#nmN').value.trim();if(!n)return;const id=Math.max(...menu.map(x=>x.id))+1;menu.push({id,n,c:$('#nmC').value,p:+$('#nmP').value||0,r:{}});menuSel=id;recDraft=null;closeDlg();toast(n+' dibuat. Tambahkan bahannya di resep.');rerender()}
 else if(f.id==='inF'){const k=$('#inB').value,q=+$('#inQ').value||0,p=+$('#inP').value||0;const s=stock[k];if(q>0){s.c=(s.q*s.c+p)/(s.q+q);s.q+=q;stockLog.unshift({id:logSeq++,k,q,q0:q,p,sup:$('#inS').value,at:DM()+' '+hhmm(Date.now()),by:stWho()});toast(`${s.n} +${q.toLocaleString('id-ID')} ${s.u}, harga rata-rata diperbarui`);rerender()}}
 else if(f.id==='bookF'){const t=tables.find(x=>x.n===bookSel.t),dur=bookSel.h.length,C=bkCalc(t.n,bookSel.h,bookPl,dayI),dp=C.dp;
  if(role()!=='tamu'){(bookings[dayI]=bookings[dayI]||[]).push({id:'BK-'+(++bkSeq),t:t.n,s:bookSel.h[0],l:dur,n:f.querySelector('input').value,k:'dp',dp,pl:bookPl,rate:C.rate});bookSel=null;toast('Booking telepon dibuat dan dicatat DP-nya.');rerender();return}
  if(CLOUD){const bt=f.querySelector('button.red');if(bt)bt.disabled=true;CMB.bookAdd(curT,isoD(dayI),{t:t.n,s:bookSel.h[0],l:dur,dp,pl:bookPl,rate:C.rate,made:dayI===0?nowH():2}).then(b=>{dpFor=b.id;dpM='Transfer';proofTmp='';bookSel=null;toast('Slot ditahan 30 menit. Silakan bayar DP.');render()}).catch(err=>{if(bt)bt.disabled=false;toast(err.message)});return}
  const b={id:'BK-'+(++bkSeq),t:t.n,s:bookSel.h[0],l:dur,n:member.nama,k:'bayar',dp,kode:100+Math.floor(Math.random()*900),pl:bookPl,rate:C.rate,made:dayI===0?nowH():2};(bookings[dayI]=bookings[dayI]||[]).push(b);dpFor=b.id;dpM='Transfer';proofTmp='';bookSel=null;toast('Slot ditahan 30 menit. Silakan bayar DP.');render()}
 else if(f.id==='upF'){const x=findBk(dpFor),b=x.b;if(!proofTmp){toast('Unggah foto bukti pembayaran dulu');return}if(CLOUD){CMB.bookProof(curT,b.id,proofTmp==='demo'?'':proofTmp,(dpM==='Transfer'?'Transfer ':'QRIS ')+$('#upBank').value,$('#upNm').value).then(()=>{proofTmp='';toast('Bukti terkirim ke supervisor untuk dicek');render()}).catch(err=>toast(err.message));return}Object.assign(b,{k:'verif',proof:proofTmp==='demo'?'':proofTmp,via:(dpM==='Transfer'?'Transfer ':'QRIS ')+$('#upBank').value,snd:$('#upNm').value});proofTmp='';toast('Bukti terkirim ke supervisor untuk dicek');render()}
 else if(f.id==='uF'){const un=uNorm($('#uU').value),em=$('#uE').value.trim().toLowerCase();if(!uOk(un)){toast('Username: '+U_HINT);return}if(CLOUD){if($('#uP').value.length<8){toast('Password minimal 8 karakter');return}const R=$('#uR').value,N=$('#uN').value.trim();CMB.staff('create',{username:un,email:em,password:$('#uP').value,role:R,nama:N,tenant_id:curT}).then(()=>{f.reset();toast(`${RL[R]} ${N} ditambahkan. Login dengan username ${un}.`)}).catch(err=>toast(err.message));return}if(uTaken(un)){toast('Username '+un+' sudah dipakai');return}if(eTaken(em)){toast('Email sudah dipakai akun lain');return}if($('#uP').value.length<8){toast('Password minimal 8 karakter');return}ACCS.push({u:un,email:em,pw:$('#uP').value,role:$('#uR').value,nama:$('#uN').value.trim(),t:curT});toast(`${RL[$('#uR').value]} ${$('#uN').value.trim()} ditambahkan. Login dengan username ${un}.`);rerender()}
 else if(f.id==='thF'){const t=TEN.find(x=>x.id===curT);thDraft.title=$('#thT').value.trim()||TH0.title;thDraft.sub=$('#thS').value.trim();t.theme={bg:thDraft.bg,acc:thDraft.acc,title:thDraft.title,sub:thDraft.sub,img:thDraft.img};if(thDraft.logo!==undefined)t.logo=thDraft.logo;thDraft=null;toast('Tampilan beranda tersimpan, langsung terlihat pelanggan');rerender()}
 else if(f.id==='ucF'&&CLOUD){const a=ACCS[+f.dataset.i],un=uNorm($('#ucU').value),p=$('#ucP').value,me=staff&&a.id===staff.id;if(p&&p.length<8){toast('Password baru minimal 8 karakter');return}if(p!==$('#ucP2').value){toast('Ulangi password baru belum sama');return}(me?CMB.changeOwn(un,$('#ucP0').value,p):CMB.staff('update',{id:a.id,username:un,password:p||undefined})).then(()=>{closeDlg();toast(me?'Akun kamu diperbarui':a.nama+': login diperbarui. Pengguna wajib ganti password saat masuk.')}).catch(err=>toast(err.message))}
 else if(f.id==='ucF'){const a=ACCS[+f.dataset.i],un=uNorm($('#ucU').value),p=$('#ucP').value,me=a===staff;if(!uOk(un)){toast('Username: '+U_HINT);return}if(uTaken(un,a)){toast('Username '+un+' sudah dipakai akun lain');return}if(me&&$('#ucP0').value!==a.pw){toast('Password saat ini salah');return}if(p&&p.length<8){toast('Password baru minimal 8 karakter');return}if(p!==$('#ucP2').value){toast('Ulangi password baru belum sama');return}const ch=[];if(un!==a.u){ch.push('username jadi '+un);a.u=un}if(p){a.pw=p;ch.push('password diganti')}closeDlg();toast(ch.length?`${me?'Akun kamu':a.nama}: ${ch.join(', ')}.${me?' Pakai data baru saat login berikutnya.':''}`:'Tidak ada perubahan');render()}
 else if(f.id==='tenEdF'){const t=TEN.find(x=>x.id===f.dataset.id),sl=$('#teS').value.trim().toLowerCase();if(sl!==t.slug){if(!slugOk(sl,t.id)){toast('Alamat sudah dipakai atau tidak valid');return}t.slug=sl}t.n=$('#teN').value.trim()||t.n;t.kota=$('#teK').value.trim()||t.kota;if(tLogoTmp!==undefined)t.logo=tLogoTmp;closeDlg();toast('Data tenant tersimpan');rerender()}
 else if(f.id==='subSetF'){PAKET.forEach((p,i)=>{p.p=Math.max(0,+$('#pkp-'+i).value||0);p.meja=Math.max(1,+$('#pkm-'+i).value||1)});SUBSET.remind=+$('#ssR').value||7;SUBSET.grace=Math.max(0,+$('#ssG').value||0);SUBSET.autoOff=$('#ssA').checked;TEN.forEach(t=>syncMeja(t.id));toast('Pengaturan langganan tersimpan');rerender()}
 else if(f.id==='subPayF'){if(!subProofTmp){toast('Unggah bukti transfer dulu');return}const t=TEN.find(x=>x.id===curT),np=pk(subPlanSel||t.plan);INV.push({id:'INV-2026-00'+(invSeq++),t:t.id,per:perOf(t.due),plan:np.id,mo:subMo,amt:np.p*subMo,paid:+$('#subAmt').value||0,k:'menunggu',via:'Transfer bank',snd:$('#subSnd').value,at:DM()+' '+hhmm(Date.now()),proof:subProofTmp==='demo'?'':subProofTmp});subProofTmp='';subMo=1;toast('Bukti terkirim ke owner untuk divalidasi');rerender()}
 else if(f.id==='tenF'){const un=uNorm($('#tnU').value),em=$('#tnE').value.trim().toLowerCase();if(!uOk(un)){toast('Username: '+U_HINT);return}if(CLOUD){const nm=$('#tnN').value.trim(),id='t'+Date.now().toString(36),slug=uniqSlug(nm),meta={n:nm,kota:$('#tnK').value.trim(),on:true,since:DMY(),plan:$('#tnPk').value,due:isoD(14),logo:null,theme:{...TH0,acc:'#c8282d'}};const bt=f.querySelector('button.red,button:not([type])');if(bt)bt.disabled=true;CMB.createTenant({tenant:{id,slug,meta},username:un,email:em,password:$('#tnP').value,nama:$('#tnA').value.trim()}).then(()=>{tStore[id]=seedT('new');toast(`Tenant ${nm} dibuat. Admin login dengan username ${un}`)}).catch(err=>{if(bt)bt.disabled=false;toast(err.message)});return}if(uTaken(un)){toast('Username '+un+' sudah dipakai');return}if(eTaken(em)){toast('Email admin sudah dipakai');return}const id='t'+Date.now();TEN.push({id,n:$('#tnN').value.trim(),kota:$('#tnK').value.trim(),on:true,since:DMY(),plan:$('#tnPk').value,due:isoD(14),logo:null,slug:uniqSlug($('#tnN').value.trim()),theme:{...TH0,acc:'#c8282d'}});tStore[id]=seedT('new');ACCS.push({u:un,email:em,pw:$('#tnP').value,role:'admin',nama:$('#tnA').value.trim(),t:id});syncMeja(id,true);toast(`Tenant ${$('#tnN').value.trim()} dibuat. Admin login dengan username ${un}`);rerender()}});

addEventListener('hashchange',render);
setInterval(()=>{const q=(a,fn)=>document.querySelectorAll(`[data-${a}]`).forEach(e=>{const t=tables[+e.dataset[a]];if(t&&t.st==='play')fn(e,t)});
 q('rem',(e,t)=>e.textContent=fmtT(remain(t)));q('el',(e,t)=>e.textContent=hm(elapsed(t)));q('cost',(e,t)=>e.textContent=rp(bill(t).tot));q('sewa',(e,t)=>e.textContent=rp(bill(t).sewa));q('tax',(e,t)=>{const b=bill(t);e.textContent=rp(b.sv+b.tax)});
 q('bar',(e,t)=>e.style.width=Math.min(100,elapsed(t)/t.planMin*100)+'%');q('tbc',(e,t)=>{const r=remain(t);e.classList.toggle('warn',r<=15&&r>0);e.classList.toggle('over',r<=0)});
 if(role()==='user'&&!dlgOpen)tables.some((t,i)=>{if(t.st!=='play')return false;const r=remain(t);if(r<=0&&!t.warned0){t.warned0=t.warned=true;warnDlg(i,true);return true}if(r<=15&&!t.warned){t.warned=true;warnDlg(i,false);return true}return false})},1000);
/* ===== Multi-tenant ===== */
const TEN=[{id:'kmg',n:'Cafe Mahjong Kemang',kota:'Jakarta Selatan',on:true,since:'01/03/2025'},{id:'kgd',n:'Cafe Mahjong Kelapa Gading',kota:'Jakarta Utara',on:true,since:'15/08/2026'}];
let curT='kmg';const tStore={};
const tName=id=>(TEN.find(t=>t.id===id)||{}).n||'';
const SEED=structuredClone({tables,menu,HH,week,stock,bookings,stockLog});
const putA=(a,b)=>a.splice(0,a.length,...b),putO=(o,b)=>{Object.keys(o).forEach(k=>delete o[k]);Object.assign(o,b)};
function saveT(){tStore[curT]={tables:tables.slice(),menu:menu.slice(),HH:HH.slice(),week:week.slice(),stock:{...stock},bookings:{...bookings},stockLog,tarLog,cfg:{minH,dpPct}}}
function loadT(id){const d=tStore[id];putA(tables,d.tables);putA(menu,d.menu);putA(HH,d.HH);putA(week,d.week);putO(stock,d.stock);putO(bookings,d.bookings);stockLog=d.stockLog;tarLog=d.tarLog;if(d.cfg){minH=d.cfg.minH??minH;dpPct=d.cfg.dpPct??dpPct}curT=id;
 subPlanSel='';selTable=Math.max(0,tables.findIndex(t=>t.st!=='free'));menuSel=menu[0]?menu[0].id:1;recDraft=null;cart={};bookSel=null;dpFor=null;moveId=null;inSel=Object.keys(stock)[0]||'';posMeja='';splitN=0;parts=[]}
function switchT(id){if(id===curT)return;saveT();loadT(id)}
function seedT(kind){const c=structuredClone(SEED);const free=(n,type,rate,wk)=>({n,type,rate,wk,st:'free'});c.stockLog=[];c.tarLog=[];
 if(kind==='kgd'){const p=c.tables[0];c.tables=[{...p,lockRate:14000,bkRate:14000,rate:14000,wk:17000,n:'Meja A',who:'Yohanes + 3',bk:'BK-201',dp:31500,fb:[['Kopi susu aren',3,25000]]},free('Meja B','Reguler',14000,17000),free('Meja C','Reguler',14000,17000),free('VIP Gading','VIP',24000,28000),free('Private Gading','Private room',32000,38000)];
  c.bookings={0:[{id:'BK-201',t:'Meja A',s:3,l:3,n:'Yohanes + 3',k:'main',dp:31500},{id:'BK-205',t:'VIP Gading',s:7,l:3,n:'Sinta Wijaya',k:'dp',dp:50400,pl:4}],1:[{id:'BK-207',t:'Meja B',s:2,l:2,n:'Felix + 3',k:'bayar',dp:16800,pl:4,kode:317}]};
  Object.values(c.stock).forEach(s=>s.q=Math.round(s.q*.6));c.week=c.week.map(([d,a,b])=>[d,+(a*.6).toFixed(1),+(b*.55).toFixed(1)])}
 else{c.tables=[free('Meja 1','Reguler',15000,18000),free('Meja 2','Reguler',15000,18000),free('Meja 3','Reguler',15000,18000),free('VIP 1','VIP',25000,30000)];c.bookings={};Object.values(c.stock).forEach(s=>s.q=0);c.week=c.week.map(([d])=>[d,0,0])}
 return c}
tStore.kgd=seedT('kgd');
const tData=id=>id===curT?{tables,bookings}:tStore[id];
const staffOf=id=>ACCS.filter(a=>a.t===id);
V.pengguna=()=>{const L=staffOf(curT);return `<h1>Pengguna ${xe(tName(curT))} <span class="code">A-01</span></h1><p class="sub">Admin tenant membuat akun kasir dan supervisor untuk cafe ini. Akun hanya bisa login ke tenant ini, dan level menentukan menu yang terbuka. Semua akun masuk dengan username. Tekan Ubah login untuk mengganti username atau password, termasuk akun kamu sendiri.</p>${role()==='owner'?'<div class="ownbar" style="background:#2b4a80"><div class="ob-t" style="white-space:normal">'+(CLOUD?'Owner bisa membuat password sementara untuk staf. Setiap reset tercatat di log.':'Kolom Password hanya tampil untuk owner. Setiap kali Lihat ditekan, tercatat di log akses.')+' Semua tenant: menu <b>Akun staf</b>.</div></div>':''}
 <div class="card scroll" style="margin-bottom:16px"><table class="t2 stack"><thead><tr><th>Nama</th><th>Username</th>${role()==='owner'?'':'<th>Email</th>'}<th>Level</th>${role()==='owner'?'<th>Password</th>':''}<th>Status</th><th></th></tr></thead><tbody>
 ${L.map(a=>{const i=ACCS.indexOf(a);return `<tr><td><b>${xe(a.nama)}</b>${role()==='owner'?`<br><small style="color:var(--mut);overflow-wrap:anywhere">${xe(a.email)}</small>`:''}</td><td><b>${xe(a.u)}</b>${a===staff?' <small style="color:var(--mut)">(kamu)</small>':''}</td>${role()==='owner'?'':`<td style="overflow-wrap:anywhere">${xe(a.email)}</td>`}<td>${RL[a.role]}</td>${role()==='owner'?`<td style="white-space:nowrap">${CLOUD?`<button type="button" class="btn ghost sm" data-pwrst="${i}">Reset password</button>`:`<code class="pwv">${pwShow.has(i)?xe(a.pw):'••••••••'}</code> <button type="button" class="btn ghost sm" data-pwsee="${i}">${pwShow.has(i)?'Sembunyikan':'Lihat'}</button>`}</td>`:''}<td><span class="pill ${a.off?'p-bad':'p-ok'}">${a.off?'Nonaktif':'Aktif'}</span></td><td>${a.role==='admin'?(a===staff||curRole==='owner'?`<button type="button" class="btn ghost" style="padding:6px 12px;min-height:38px;white-space:nowrap" data-ucred="${i}">Ubah login</button>`:'<small style="color:var(--mut)">dibuat owner</small>'):`<div class="row" style="gap:6px;flex-wrap:nowrap"><button type="button" class="btn ghost" style="padding:6px 12px;min-height:38px;white-space:nowrap" data-ucred="${i}">Ubah login</button><button type="button" class="btn ghost" style="padding:6px 12px;min-height:38px" data-utog="${i}">${a.off?'Aktifkan':'Nonaktifkan'}</button><button type="button" class="btn ghost" style="padding:6px 12px;min-height:38px;color:var(--redt,var(--red))" data-udel="${i}">Hapus</button></div>`}</td></tr>`}).join('')}</tbody></table></div>
 <form class="card" id="uF" style="max-width:640px"><h2>Tambah user</h2><label class="f"><span>Nama lengkap</span><input id="uN" required></label><label class="f"><span>Username</span><input id="uU" required autocapitalize="none" spellcheck="false" placeholder="contoh: kasir2.kemang"><small style="color:var(--mut);font-size:13px">Dipakai untuk login. ${U_HINT}.</small></label><label class="f"><span>Email</span><input id="uE" type="email" required placeholder="nama@cafemahjong.id"><small style="color:var(--mut);font-size:13px">Untuk notifikasi dan atur ulang password.</small></label>
 ${pw('uP','Password awal (min. 8 karakter)','new-password')}<label class="f"><span>Level</span><select id="uR"><option value="user">Kasir</option><option value="spv">Supervisor</option><option value="dapur">Dapur</option></select></label>
 <p style="font-size:13px;color:var(--mut);margin-top:0">User baru otomatis masuk ke tenant ${xe(tName(curT))}.</p><button class="btn red" style="width:100%">Simpan user</button></form>`};
/* ===== Owner: lihat isi tenant, logo, langganan ===== */
let ownerIn=false,tLogoTmp=undefined,subProofTmp='',subPlanSel='';
const PAKET=[{id:'basic',n:'Basic',p:299000,meja:6,staf:4},{id:'pro',n:'Pro',p:599000,meja:15,staf:12},{id:'bisnis',n:'Bisnis',p:999000,meja:40,staf:40}];
const SUBSET={grace:7,autoOff:true,remind:7};
const REK_PF=[['BCA','888 123 4567'],['Mandiri','133 00 7788 9900']];
Object.assign(TEN[0],{plan:'pro',due:'2026-12-01',logo:null});Object.assign(TEN[1],{plan:'basic',due:isoD(-6),logo:null});
let invSeq=31;
const INV=[{id:'INV-2026-0028',t:'kmg',per:'November 2026',plan:'pro',amt:599000,k:'lunas',via:'Transfer BCA',at:'01/11 09.12'},
 {id:'INV-2026-0029',t:'kgd',per:'Oktober 2026',plan:'basic',amt:299000,k:'lunas',via:'Transfer Mandiri',at:'20/10 13.40'},
 {id:'INV-2026-0030',t:'kgd',per:'November 2026',plan:'basic',amt:299000,k:'menunggu',via:'Transfer BCA',snd:'Maria Tan',paid:299000,at:'26/11 10.05',proof:''}];
const tNotif={};const pushTN=(id,t,msg)=>{(tNotif[id]=tNotif[id]||[]).unshift({t,msg,at:hhmm(Date.now())})};
const TODAY=new Date(D0[0],D0[1],D0[2]),DAYMS=864e5;
const pk=id=>PAKET.find(p=>p.id===id)||PAKET[0];
const fmtD=s=>new Date(s+'T00:00:00').toLocaleDateString('id-ID',{day:'numeric',month:'short',year:'numeric'});
const dLeft=t=>Math.round((new Date(t.due+'T00:00:00')-TODAY)/DAYMS);
const pendInv=id=>INV.find(v=>v.t===id&&v.k==='menunggu');
const addMonth=(s,n=1)=>{const d=new Date(s+'T00:00:00');const b=d<TODAY?new Date(TODAY):d;b.setMonth(b.getMonth()+n);return b.getFullYear()+'-'+String(b.getMonth()+1).padStart(2,'0')+'-'+String(b.getDate()).padStart(2,'0')};
const perOf=s=>new Date(s+'T00:00:00').toLocaleDateString('id-ID',{month:'long',year:'numeric'});
function subSt(t){const d=dLeft(t);if(t.susp)return['Ditangguhkan','p-bad'];if(pendInv(t.id))return['Menunggu validasi','p-info'];if(d<0)return[`Lewat ${-d} hari`,'p-bad'];if(d<=SUBSET.remind)return[`Jatuh tempo ${d} hari lagi`,'p-warn'];return['Aktif','p-ok']}
function checkDue(){let n=0;TEN.forEach(t=>{if(SUBSET.autoOff&&!t.susp&&dLeft(t)<-SUBSET.grace&&!pendInv(t.id)){t.susp=true;t.on=false;n++;pushTN(t.id,'bad','Langganan ditangguhkan karena lewat masa tenggang. Bayar tagihan untuk mengaktifkan lagi.')}});return n}
const tLogo=(t,sz=30)=>t&&t.logo?`<img src="${t.logo}" alt="" width="${sz}" height="${sz}" style="border-radius:8px;object-fit:cover;background:#fff">`:`<span style="display:inline-grid;place-items:center;width:${sz}px;height:${sz}px;border-radius:8px;background:#f6f1e4;color:#c8282d;font-weight:800;font-size:${Math.round(sz*.45)}px">${xe((()=>{const w=(t&&t.n?t.n.replace(/^Cafe Mahjong\s*/i,''):'M').split(/\s+/).filter(Boolean);return w.length>1?w[0][0]+w[1][0]:(w[0]||'M').slice(0,2)})().toUpperCase())}</span>`;
const LOGO0=$('.logo').innerHTML;
function brand(){const L=$('.logo'),rs=document.documentElement.style;if(role()==='owner'&&!ownerIn){['--felt','--felt2','--red','--onf','--onf2','--onf3','--onr','--fink','--redt'].forEach(v=>rs.removeProperty(v));L.innerHTML=LOGO0.replace('Cafe Mahjong','Mahjong Cloud');return}const t=TEN.find(x=>x.id===curT),th=thOf(t);rs.setProperty('--felt',th.bg);rs.setProperty('--felt2',felt2Of(th.bg));rs.setProperty('--red',th.acc||'#c8282d');rs.setProperty('--onf',inkOn(th.bg));rs.setProperty('--onf2',muteOn(th.bg));rs.setProperty('--onf3',lineOn(th.bg));rs.setProperty('--onr',inkOn(th.acc||'#c8282d'));rs.setProperty('--redt',cRatio(th.acc||'#c8282d','#fffdf7')>=4.5?(th.acc||'#c8282d'):`color-mix(in srgb, ${th.acc} 55%, #161616)`);rs.setProperty('--fink',cRatio(th.bg,'#fffdf7')>=4.5?th.bg:`color-mix(in srgb, ${th.bg} 30%, #161616)`);L.innerHTML=t&&t.logo?`${tLogo(t,34)}<span>${xe(t.n)}</span>`:LOGO0.replace('<span>Cafe Mahjong</span>',`<span>${xe(t?t.n:'Cafe Mahjong')}</span>`)}
const canSee=x=>x.r.includes(role())||(role()==='owner'&&ownerIn&&x.r.includes('admin'));
function topBanner(){if(role()==='owner'&&ownerIn)return `<div class="ownbar" role="status"><span class="ob-dot" aria-hidden="true"></span><div class="ob-t"><b>Mode owner</b> · <span class="ob-n">${xe(tName(curT).replace(/^Cafe Mahjong /,''))}</span><span class="ob-h"> · semua menu terbuka, perubahan tercatat atas nama owner</span></div><button type="button" class="ob-b" data-act="ownback">Kembali<span class="ob-h"> ke daftar tenant</span></button></div>`;
 if(staff&&staff.t){const t=TEN.find(x=>x.id===staff.t),d=dLeft(t);if(!pendInv(t.id)&&d<=SUBSET.remind)return `<div class="alert"><div><b>${d<0?`Langganan lewat jatuh tempo ${-d} hari.`:`Langganan jatuh tempo ${d} hari lagi.`}</b> ${role()==='admin'?`Bayar tagihan ${rp(pk(t.plan).p)} di menu <a href="#langganan">Langganan</a>`:'Hubungi admin cafe'}${d<0?` sebelum ${SUBSET.grace+d} hari lagi agar akun tidak ditangguhkan`:''}.</div></div>`}return ''}
const proofSvg=v=>`<svg viewBox="0 0 220 260" class="proof" role="img" aria-label="Bukti transfer langganan"><rect width="220" height="260" rx="14" fill="#fff"/><rect width="220" height="50" rx="14" fill="#1a4f9c"/><rect y="36" width="220" height="14" fill="#1a4f9c"/><text x="110" y="31" text-anchor="middle" fill="#fff" font-size="14" font-weight="700" font-family="sans-serif">m-Banking</text><text x="110" y="86" text-anchor="middle" font-size="13" font-weight="700" fill="#111" font-family="sans-serif">Transfer Berhasil</text><text x="110" y="114" text-anchor="middle" font-size="19" font-weight="800" fill="#111" font-family="sans-serif">${rp(v.paid||v.amt)}</text>${[['Ke','BCA 888 123 4567'],['Nama','MAHJONG CLOUD'],['Dari',v.snd||'-'],['Berita',v.id]].map(([k,x],i)=>`<text x="16" y="${146+i*22}" font-size="11" fill="#666" font-family="sans-serif">${k}</text><text x="204" y="${146+i*22}" text-anchor="end" font-size="11" fill="#111" font-family="sans-serif">${xe(x)}</text>`).join('')}</svg>`;
V.tenant=()=>{const act=TEN.filter(t=>t.on).length,pend=INV.filter(v=>v.k==='menunggu').length;return `<h1>Kelola tenant <span class="code">O-01</span></h1><p class="sub">Setiap tenant adalah satu cafe dengan data meja, menu, stok, booking, keuangan, dan staf yang terpisah. Buka isi tenant untuk melihat semua halamannya.</p>
 <div class="grid g3" style="margin-bottom:16px"><div class="card"><small style="color:var(--mut)">Tenant aktif</small><div class="total">${act} dari ${TEN.length}</div></div><div class="card"><small style="color:var(--mut)">Pendapatan langganan / bulan</small><div class="total">${rp(TEN.filter(t=>!t.susp).reduce((a,t)=>a+pk(t.plan).p,0))}</div></div><div class="card"><small style="color:var(--mut)">Bukti bayar menunggu</small><div class="total">${pend}</div>${pend?'<a href="#validasi" style="font-size:14px">Validasi sekarang</a>':''}</div></div>
 <div class="card scroll" style="margin-bottom:16px"><h2>Daftar tenant</h2><table class="t2 stack"><thead><tr><th>Cafe</th><th>Admin</th><th class="n">Meja</th><th class="n">Staf</th><th>Paket</th><th>Langganan</th><th></th></tr></thead><tbody>
 ${TEN.map(t=>{const ad=staffOf(t.id).filter(a=>a.role==='admin'),S=subSt(t);return `<tr><td><div class="row" style="flex-wrap:nowrap;gap:10px;align-items:center">${tLogo(t,36)}<div><b>${xe(t.n)}</b><br><small style="color:var(--mut)">${xe(t.kota)}</small><br><a href="#${t.slug}" style="font-size:13px">${prodUrl(t)}</a></div></div></td><td>${ad.map(a=>`${xe(a.nama)}<br><small style="color:var(--mut)">@${xe(a.u)} · ${xe(a.email)}</small>`).join('<br>')||'-'}</td><td class="n">${tData(t.id).tables.length}</td><td class="n">${staffOf(t.id).length}</td><td>${pk(t.plan).n}<br><small style="color:var(--mut)">s.d. ${fmtD(t.due)}</small></td><td><span class="pill ${t.on?S[1]:'p-bad'}">${t.on?S[0]:t.susp?'Ditangguhkan':'Nonaktif'}</span><br>${t.launch?`<span class="pill p-info" style="margin-top:4px">Sudah launching ${fmtD(t.launch.at)}</span>`:'<span class="pill p-mut" style="margin-top:4px">Belum launching</span>'}</td>
 <td><div class="row" style="gap:6px;flex-wrap:wrap"><button type="button" class="btn red" style="padding:6px 12px;min-height:38px" data-topen="${t.id}">Buka isi</button><button type="button" class="btn" style="padding:6px 12px;min-height:38px" data-tlaunch="${t.id}">${t.launch?'Paket launching':'Launching'}</button><button type="button" class="btn ghost" style="padding:6px 12px;min-height:38px" data-tedit="${t.id}">Ubah nama & logo</button><button type="button" class="btn ghost" style="padding:6px 12px;min-height:38px" data-ttog="${t.id}">${t.on?'Nonaktifkan':'Aktifkan'}</button></div></td></tr>`}).join('')}</tbody></table>
 <p class="note">Tenant nonaktif tidak muncul di pilihan cafe pelanggan dan stafnya tidak bisa login. Datanya tetap tersimpan.</p></div>
 <form class="card" id="tenF" style="max-width:640px"><h2>Tambah tenant</h2><label class="f"><span>Nama cafe</span><input id="tnN" required placeholder="Contoh: Cafe Mahjong BSD"></label><label class="f"><span>Kota / alamat</span><input id="tnK" required placeholder="Tangerang Selatan"></label>
 <label class="f"><span>Paket langganan</span><select id="tnPk">${PAKET.map(p=>`<option value="${p.id}">${p.n} · ${rp(p.p)}/bulan · maks ${p.meja} meja</option>`).join('')}</select></label>
 <h3 style="margin:14px 0 6px">Akun admin tenant</h3><label class="f"><span>Nama admin</span><input id="tnA" required></label><label class="f"><span>Username admin</span><input id="tnU" required autocapitalize="none" spellcheck="false" placeholder="admin.bsd"></label><label class="f"><span>Email admin</span><input id="tnE" type="email" required placeholder="admin.bsd@cafemahjong.id"></label>${pw('tnP','Password awal (min. 8 karakter)','new-password')}
 <p style="font-size:13px;color:var(--mut);margin-top:0">Tenant baru mendapat masa coba 14 hari, 4 meja contoh, daftar menu, resep, dan bahan dari template dengan stok 0.</p><button class="btn red" style="width:100%">Buat tenant & akun admin</button></form>`};
function tEditDlg(id){const t=TEN.find(x=>x.id===id);tLogoTmp=t.logo;openDlg(`<h2>Ubah tenant</h2><form id="tenEdF" data-id="${id}"><div class="row" style="align-items:center;gap:14px;margin-bottom:12px"><span id="tlPrev">${tLogo(t,64)}</span><div><label class="btn ghost" style="cursor:pointer;margin:0">Unggah logo<input type="file" id="tlLogo" accept="image/*" style="display:none"></label> <button type="button" class="btn ghost" data-act="tlclear">Hapus logo</button><div style="font-size:13px;color:var(--mut);margin-top:6px">PNG atau JPG persegi, tampil di header aplikasi tenant dan struk.</div></div></div>
 <label class="f"><span>Nama tenant</span><input id="teN" required value="${xe(t.n)}"></label><label class="f"><span>Kota / alamat</span><input id="teK" required value="${xe(t.kota)}"></label><label class="f"><span>Alamat web</span><div class="row" style="flex-wrap:nowrap;gap:6px;align-items:center"><input id="teS" required value="${t.slug}" pattern="[a-z0-9]+(-[a-z0-9]+)*" style="flex:1"><span style="color:var(--mut);white-space:nowrap">(akhir link web: …/#nama)</span></div></label>
 <div class="row"><button class="btn red">Simpan</button><button type="button" class="btn ghost" data-act="dlgx">Batal</button></div></form>`)}
V.langganan=()=>role()==='owner'&&!ownerIn?ownerSub():tenantSub();
function ownerSub(){const P=INV.filter(v=>v.k==='menunggu');return `<h1>Paket & status langganan <span class="code">O-02</span></h1><p class="sub">Atur harga paket bulanan, pantau jatuh tempo, dan tangguhkan tenant yang lewat masa tenggang.</p>
 ${P.length?`<div class="alert" style="align-items:center"><div style="flex:1"><b>${P.length} bukti bayar menunggu validasi.</b> Periksa di menu Validasi langganan.</div><a class="btn red" style="text-decoration:none" href="#validasi">Buka validasi</a></div>`:''}
 <div class="card scroll" style="margin-bottom:16px"><h2>Status langganan</h2><table class="t2 stack"><thead><tr><th>Tenant</th><th>Paket</th><th>Jatuh tempo</th><th>Status</th><th></th></tr></thead><tbody>
 ${TEN.map(t=>{const S=subSt(t);return `<tr><td><b>${xe(t.n)}</b></td><td><select class="tin tl" id="spk-${t.id}" data-spk="${t.id}">${PAKET.map(p=>`<option value="${p.id}" ${p.id===t.plan?'selected':''}>${p.n}</option>`).join('')}</select></td><td>${fmtD(t.due)}</td><td><span class="pill ${S[1]}">${S[0]}</span></td><td><button type="button" class="btn ghost" style="padding:6px 12px;min-height:38px" data-trem="${t.id}">Kirim pengingat</button></td></tr>`}).join('')}</tbody></table>
 <button type="button" class="btn" style="margin-top:12px" data-act="duecheck">Cek jatuh tempo sekarang</button><p class="note">Pengecekan juga berjalan otomatis setiap hari pukul 00.00.</p></div>
 <form class="card" id="subSetF" style="max-width:640px"><h2>Pengaturan paket</h2>${PAKET.map((p,i)=>`<div class="row" style="flex-wrap:nowrap;gap:8px;align-items:end"><label class="f" style="flex:1"><span>${p.n} · harga per bulan (Rp)</span><input id="pkp-${i}" type="number" min="0" value="${p.p}"></label><label class="f" style="width:110px"><span>Maks meja</span><input id="pkm-${i}" type="number" min="1" value="${p.meja}"></label></div>`).join('')}
 <label class="f"><span>Pengingat sebelum jatuh tempo (hari)</span><input id="ssR" type="number" min="1" value="${SUBSET.remind}"></label><label class="f"><span>Masa tenggang setelah jatuh tempo (hari)</span><input id="ssG" type="number" min="0" value="${SUBSET.grace}"></label>
 <label class="cbl"><input type="checkbox" id="ssA" ${SUBSET.autoOff?'checked':''}> <span>Tangguhkan otomatis tenant yang lewat masa tenggang</span></label><button class="btn red" style="width:100%;margin-top:12px">Simpan pengaturan</button></form>`}
function tenantSub(){const t=TEN.find(x=>x.id===curT),p=pk(t.plan),S=subSt(t),pd=pendInv(t.id),H=INV.filter(v=>v.t===t.id),N=tNotif[t.id]||[];if(!subPlanSel)subPlanSel=t.plan;const np=pk(subPlanSel);
 return `<h1>Langganan ${xe(t.n)} <span class="code">A-08</span></h1><p class="sub">Biaya pemakaian aplikasi dibayar per bulan ke pemilik platform. Bukti bayar divalidasi owner.</p>
 <div class="grid g2"><div class="card" style="align-self:start"><h2>Paket saat ini</h2><div class="price"><span>Paket</span><b>${p.n} · ${rp(p.p)}/bulan</b></div><div class="price"><span>Batas</span><b>${p.meja} meja · ${p.staf} akun staf</b></div><div class="price"><span>Jatuh tempo</span><b>${fmtD(t.due)}</b></div><div class="price"><span>Status</span><b><span class="pill ${S[1]}">${S[0]}</span></b></div>
 ${N.map(n=>`<div class="ntf ${n.t==='ok'?'ok':'no'}"><b>${n.t==='ok'?'Pembayaran divalidasi':'Perlu tindakan'}</b> <small>${n.at}</small><br>${xe(n.msg)}</div>`).join('')}
 <h2 style="margin-top:16px">Riwayat tagihan</h2>${H.map(v=>`<div class="price"><span>${v.id} · ${v.per}<br><small style="color:var(--mut)">${pk(v.plan).n} · ${xe(v.via||'')}${v.why?' · '+xe(v.why):''}</small></span><span style="text-align:right"><b>${rp(v.amt)}</b><br><span class="pill ${v.k==='lunas'?'p-ok':v.k==='tolak'?'p-bad':'p-info'}">${v.k==='lunas'?'Lunas':v.k==='tolak'?'Ditolak':'Menunggu validasi'}</span></span></div>`).join('')||'<p style="color:var(--mut)">Belum ada tagihan.</p>'}</div>
 ${pd?`<div class="card" style="align-self:start"><h2>Bukti terkirim</h2><p>Bukti pembayaran ${pd.id} sebesar ${rp(pd.paid)} sedang dicek owner. Status berubah otomatis setelah divalidasi.</p></div>`:
 `<form class="card" id="subPayF" style="align-self:start"><h2>Perpanjang langganan</h2>
 <label class="f"><span>Paket</span><select id="subPk">${PAKET.map(x=>`<option value="${x.id}" ${x.id===subPlanSel?'selected':''}>${x.n} · ${rp(x.p)}/bulan · maks ${x.meja} meja${x.id===t.plan?' (paket saat ini)':''}</option>`).join('')}</select></label>${(()=>{const n=pk(subPlanSel).meja,cur=tables.length+(t.parked||[]).length;return n<tables.length?`<p class="note" style="margin-top:-4px">Paket ${pk(subPlanSel).n} hanya ${n} meja. Setelah pembayaran disetujui, ${tables.length-n} meja akan dinonaktifkan (meja kosong tanpa booking lebih dulu). Datanya tetap disimpan.</p>`:n>tables.length?`<p style="margin:-4px 0 12px;font-size:14px;color:var(--mut)">Setelah disetujui, jumlah meja menjadi ${n}${(t.parked||[]).length?`, termasuk ${Math.min((t.parked||[]).length,n-tables.length)} meja nonaktif yang aktif lagi`:''}.</p>`:''})()}
 <label class="f"><span>Lama perpanjangan</span></label><div class="tabs" style="margin-top:-6px">${[1,3,6,12].map(m=>`<button type="button" class="cat ${subMo===m?'on':''}" data-smo="${m}">${m} bulan</button>`).join('')}</div>
 <div class="price"><span>Periode baru</span><b>${fmtD(t.due)} sampai ${fmtD(addMonth(t.due,subMo))}</b></div><div class="price"><span>${np.n} × ${subMo} bulan</span><b class="total">${rp(np.p*subMo)}</b></div>
 <h3 style="margin:14px 0 6px">Bayar dengan transfer</h3><p style="font-size:14px;color:var(--mut);margin-top:0">Transfer persis sesuai total ke salah satu rekening di bawah, lalu tulis <b>INV-2026-00${invSeq}</b> di berita transfer.</p>
 ${REK_PF.map(([b,n])=>`<div class="price"><span><b>${b}</b> ${n}<br><small style="color:var(--mut)">a.n. PT Mahjong Cloud Indonesia</small></span></div>`).join('')}
 <label class="f"><span>Nama pengirim</span><input id="subSnd" required value="${xe(staff?staff.nama:'')}"></label><label class="f"><span>Nominal ditransfer (Rp)</span><input id="subAmt" type="number" required value="${np.p*subMo}"></label>
 <label class="f"><span>Bukti transfer</span><input type="file" id="subProof" accept="image/*"></label>${subProofTmp?'<p style="color:var(--ok);margin-top:0">Bukti siap dikirim.</p>':''}
 <button class="btn red" style="width:100%">Kirim bukti pembayaran</button><p class="note">Owner mencocokkan bukti dengan mutasi rekening. Setelah disetujui, jatuh tempo maju otomatis.</p></form>`}</div>`}
/* ===== Tampilan beranda per tenant ===== */
const HPRE=[['#0f3d2e','Hijau meja'],['#7a1f24','Merah marun'],['#1d3557','Biru malam'],['#3b2a1a','Coklat kayu'],['#4a1d5c','Ungu tua'],['#1f1f1f','Hitam']];
const TH0={bg:'#0f3d2e',title:'Main mahjong santai, meja siap dalam satu klik',sub:'Cek meja kosong hari ini, lihat tarif dan promo, lalu booking dari HP. Bayar DP lewat QRIS, tinggal datang dan main.',img:null};
TEN.forEach(t=>{t.theme=t.theme||{...TH0}});TEN[1].theme={bg:'#1d3557',title:'Meja mahjong ber-AC di Kelapa Gading',sub:'Lima meja, satu private room, parkir luas. Booking dari HP dan bayar DP lewat transfer.',img:null};
let thDraft=null,subMo=1;
const thOf=t=>(t&&t.theme)||TH0;
const heroHtml=(t,th,cta=true)=>{const ink=inkOn(th.bg),mu=muteOn(th.bg),ac=th.acc||'#c8282d',aink=inkOn(ac);
 const fr=tables.filter(x=>x.st==='free').length,minR=Math.min(...tables.map(x=>x.rate)),wds=xe(th.title).split(/\s+/).map((w,k)=>`<span class="w" style="--i:${k}">${w}</span>`).join(' ');
 const TL=[['中','r',8,8,-12,1.2],['發','g',34,0,6,.6],['東','',62,14,-4,1],['九','r',18,48,10,.8],['白','dk',48,52,-8,1.4],['北','',74,58,14,.5]];
 const art=th.img?`<img src="${th.img}" alt="">`:TL.map(([c,k,x,y,r,z],n)=>`<div class="ft ${k}" style="--x:${x}%;--y:${y}%;--r:${r}deg;--z:${z*14};--i:${n}">${k==='dk'?'':c}</div>`).join('');
 return `<section class="hx" style="--hb:${th.bg};--ha:${ac};color:${ink};--fink:${cRatio(th.bg,'#fffdf7')>=4.5?th.bg:`color-mix(in srgb, ${th.bg} 30%, #161616)`}"><div class="hx-bg" aria-hidden="true"><i class="b1"></i><i class="b2"></i><i class="b3"></i></div>
 <div class="hx-in"><div><div class="row" style="flex-wrap:nowrap;gap:12px;align-items:center">${tLogo({n:t.n,logo:thDraft&&thDraft.id===t.id&&thDraft.logo!==undefined?thDraft.logo:t.logo},44)}<div><b style="font-size:17px">${xe(t.n)}</b><br><small style="color:${mu}">${xe(t.kota)}</small></div></div>
 <div style="margin-top:16px"><span class="live"><span class="dot"></span>${fr?`${fr} meja kosong sekarang`:'Semua meja sedang terpakai'}</span></div>
 <h1>${wds}</h1><p style="color:${mu}">${xe(th.sub)}</p>
 ${cta?`<div class="cta"><a href="#booking" class="btn go" style="background:${ac};color:${aink}">Booking meja</a><a href="#akun" class="btn ghost" style="color:${ink};border-color:${lineOn(th.bg)}">${member?"Halo, "+xe(member.nama.split(" ")[0]):"Daftar / Masuk"}</a></div>`:`<div class="cta"><span class="btn go" style="background:${ac};color:${aink}">Booking meja</span></div>`}</div>
 <div class="hx-art" aria-hidden="true">${art}</div></div>
 ${cta?`<div class="hx-stats"><div><b><span class="dot"></span><span data-cnt="${fr}">${fr}</span></b><small>meja kosong dari ${tables.length}</small></div><div><b>Rp<span data-cnt="${minR}" data-f="n">${minR.toLocaleString('id-ID')}</span></b><small>tarif mulai, per orang per jam</small></div><div><b>12 jam</b><small>buka 12.00 sampai 24.00 tiap hari</small></div><div><b><span data-cnt="${dpPct}">${dpPct}</span>% DP</b><small>bayar lewat QRIS atau transfer</small></div></div>`:''}</section>`};
const cafePick=()=>{const L=TEN.filter(x=>x.on);if(role()!=='tamu'||L.length<2)return '';return `<div class="card" style="margin-bottom:14px;padding:14px 18px"><div style="font-weight:700;margin-bottom:10px">Pilih cafe</div><div class="row" style="gap:10px">${L.map(x=>`<button type="button" class="cafe ${x.id===curT?'on':''}" data-tpick="${x.id}">${tLogo(x,36)}<span style="text-align:left"><b>${xe(x.n)}</b><br><small>${xe(x.kota)}</small></span></button>`).join('')}</div></div>`};
V.tampilan=()=>{const t=TEN.find(x=>x.id===curT);if(!thDraft||thDraft.id!==t.id)thDraft={id:t.id,...thOf(t),logo:undefined};const th=thDraft;
 return `<h1>Tampilan cafe <span class="code">A-09</span></h1><p class="sub">Atur logo, warna, gambar, dan kalimat sambutan yang dilihat pelanggan di alamat ${xe(t.n)}. Warna berlaku di header, menu, tombol, dan beranda.</p>
 <div class="card row" style="margin-bottom:16px;align-items:center;gap:10px"><div style="flex:1;min-width:220px"><b>Alamat cafe ini</b><br><a style="font-size:16px;overflow-wrap:anywhere" href="https://${prodUrl(t)}" target="_blank" rel="noopener">https://${prodUrl(t)}</a><br><small style="color:var(--mut)">Bagikan link ini ke pelanggan. Bisa dibuka dari HP mana saja.</small></div><a class="btn ghost" style="text-decoration:none" href="#${t.slug}">Buka beranda</a></div>
 <div class="card" style="margin-bottom:16px"><h2>Pratinjau</h2><div id="thPrev">${heroHtml(t,th,false)}${cInfo(th)}</div></div>
 <form class="card" id="thF" style="max-width:760px"><h2>Pengaturan</h2>
 <div class="row" style="align-items:center;gap:14px;margin-bottom:12px"><span id="thLogoP">${tLogo({n:t.n,logo:th.logo!==undefined?th.logo:t.logo},56)}</span><label class="btn ghost" style="cursor:pointer;margin:0">Ganti logo<input type="file" id="thLogo" accept="image/*" style="display:none"></label><button type="button" class="btn ghost" data-act="thlogox">Hapus logo</button></div>
 <label class="f"><span>Warna latar beranda</span></label><div class="row" style="gap:8px;margin:-6px 0 12px;align-items:center">${HPRE.map(([c,n])=>`<button type="button" class="sw ${th.bg===c?'on':''}" data-thc="${c}" title="${n}" aria-label="${n}" style="background:${c}"></button>`).join('')}<label style="display:flex;align-items:center;gap:6px;font-size:14px">Warna lain <input type="color" id="thBg" value="${th.bg}" style="width:44px;height:40px;border:0;background:none;padding:0"></label></div>
 <label class="f"><span>Warna aksen (tombol utama)</span></label><div class="row" style="gap:8px;margin:-6px 0 12px;align-items:center">${['#c8282d','#e0a019','#e2672b','#2a7de1','#1f9d6b','#d6336c'].map(c=>`<button type="button" class="sw ${(th.acc||'#c8282d')===c?'on':''}" data-tha="${c}" aria-label="Aksen ${c}" style="background:${c}"></button>`).join('')}</div>
 <label class="f"><span>Gambar di sisi kanan</span></label><div class="row" style="gap:8px;margin:-6px 0 12px;align-items:center"><label class="btn ghost" style="cursor:pointer;margin:0">${th.img?'Ganti gambar':'Unggah gambar'}<input type="file" id="thImg" accept="image/*" style="display:none"></label>${th.img?'<button type="button" class="btn ghost" data-act="thimgx">Pakai ubin mahjong lagi</button>':'<span style="font-size:14px;color:var(--mut)">Kosong = ubin mahjong bawaan. Foto ruangan atau meja lebih menarik.</span>'}</div>
 <label class="f"><span>Judul sambutan</span><input id="thT" maxlength="70" value="${xe(th.title)}"></label><label class="f"><span>Teks pendek</span><textarea id="thS" maxlength="180" rows="3">${xe(th.sub)}</textarea></label>
 <div class="row"><button class="btn red">Simpan tampilan</button><button type="button" class="btn ghost" data-act="threset">Kembalikan bawaan</button></div></form>`};
const thPrev=()=>{const t=TEN.find(x=>x.id===curT);$('#thPrev').innerHTML=heroHtml(t,thDraft,false)+cInfo(thDraft);$('#thLogoP').innerHTML=tLogo({n:t.n,logo:thDraft.logo!==undefined?thDraft.logo:t.logo},56)};
const readImg=(f,cb,max=1280)=>{const r=new FileReader();r.onload=()=>{const im=new Image();im.onload=()=>{const k=Math.min(1,max/Math.max(im.width,im.height)),c=document.createElement('canvas');c.width=Math.round(im.width*k);c.height=Math.round(im.height*k);c.getContext('2d').drawImage(im,0,0,c.width,c.height);const png=/png|svg/.test(f.type)&&max<=512;cb(c.toDataURL(png?'image/png':'image/jpeg',.82))};im.onerror=()=>cb(r.result);im.src=r.result};r.readAsDataURL(f)};
/* ===== Alamat per tenant ===== */
TEN[0].slug='kemang';TEN[1].slug='kelapa-gading';TEN[0].theme.acc='#c8282d';TEN[1].theme.acc='#e0a019';
const RESV=['settings','sidebar','customize','upgrade','downloads'];
const slugify=n=>n.toLowerCase().replace(/^cafe\s+mahjong\s*/,'').normalize('NFD').replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'').slice(0,30)||'cafe';
const slugOk=(sl,id)=>/^[a-z0-9]+(-[a-z0-9]+)*$/.test(sl)&&!RESV.includes(sl)&&!sl.startsWith('comment')&&!views.some(v=>v.id===sl)&&!TEN.some(t=>t.slug===sl&&t.id!==id);
const uniqSlug=n=>{let b=slugify(n),s=b,i=2;while(!slugOk(s))s=b+'-'+i++;return s};
const tOf=id=>TEN.find(t=>t.id===id);
const WEBU='https://kalamtukiman3.github.io/cafecafe-mahjong-web/';const prodUrl=t=>`${WEBU.replace('https://','')}#${t.slug}`;
function parseRoute(h){for(const t of [...TEN].sort((a,b)=>b.slug.length-a.slug.length)){if(h===t.slug)return{t:t.id,v:'beranda'};if(h.startsWith(t.slug+'-')){const v=h.slice(t.slug.length+1);if(views.some(x=>x.id===v))return{t:t.id,v}}}return{t:null,v:h}}
const ctxSlug=()=>role()==='owner'&&!ownerIn?'':(tOf(curT)||{}).slug||'';
const addrOf=(t,v)=>v&&v!=='beranda'?t.slug+'-'+v:t.slug;
/* ===== Kontras otomatis ===== */
const hexRgb=h=>{h=h.replace('#','');if(h.length===3)h=h.split('').map(c=>c+c).join('');const n=parseInt(h,16);return[n>>16&255,n>>8&255,n&255]};
const lumOf=h=>{const [r,g,b]=hexRgb(h).map(v=>{v/=255;return v<=.03928?v/12.92:((v+.055)/1.055)**2.4});return .2126*r+.7152*g+.0722*b};
const cRatio=(a,b)=>{const x=lumOf(a),y=lumOf(b);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05)};
const INK_L='#fbf8f1',INK_D='#161616';
const inkOn=bg=>cRatio(bg,INK_L)>=cRatio(bg,INK_D)?INK_L:INK_D;
const isLightBg=bg=>inkOn(bg)===INK_D;
const muteOn=bg=>isLightBg(bg)?'#161616b8':'#fbf8f1c4';
const lineOn=bg=>isLightBg(bg)?'#16161633':'#fbf8f140';
const felt2Of=bg=>isLightBg(bg)?`color-mix(in srgb, ${bg} 86%, black)`:`color-mix(in srgb, ${bg} 78%, white)`;
const cInfo=th=>{const r=cRatio(th.bg,inkOn(th.bg)),ac=th.acc||'#c8282d',r2=cRatio(ac,inkOn(ac)),q=x=>x>=7?'sangat jelas':x>=4.5?'jelas':'kurang jelas, pilih warna lain';return `<p style="margin:10px 0 0;font-size:14px;color:var(--mut)">Warna tulisan dipilih otomatis: <b>${isLightBg(th.bg)?'gelap':'terang'}</b> di atas latar ini. Kontras teks ${r.toFixed(1).replace('.',',')}:1 (${q(r)}) · tombol ${r2.toFixed(1).replace('.',',')}:1 (${q(r2)}).</p>`};
/* ===== Validasi langganan (owner) ===== */
INV.push({id:'INV-2026-0031',t:'kmg',per:'Desember 2026',plan:'pro',mo:3,amt:1797000,paid:1797000,k:'menunggu',via:'Transfer Mandiri',snd:'Andi Pratama',at:'26/11 15.20',proof:''});
INV.unshift({id:'INV-2026-0027',t:'kgd',per:'Oktober 2026',plan:'basic',mo:1,amt:299000,paid:290000,k:'tolak',why:'Nominal tidak sesuai',via:'Transfer BCA',snd:'Maria Tan',at:'19/10 20.11'});
invSeq=32;
let ivF='menunggu';
V.validasi=()=>{const P=INV.filter(v=>v.k==='menunggu'),cnt=k=>k==='semua'?INV.length:INV.filter(v=>v.k===k).length,H=INV.filter(v=>ivF==='semua'||v.k===ivF).slice().reverse();
 return `<h1>Validasi langganan <span class="code">O-03</span></h1><p class="sub">Bukti transfer perpanjangan dari admin tenant. Cocokkan dengan mutasi rekening platform, lalu setujui atau tolak. Admin tenant langsung mendapat notifikasi.</p>
 <div class="tabs">${[['menunggu','Menunggu'],['lunas','Disetujui'],['tolak','Ditolak'],['semua','Semua']].map(([k,l])=>`<button class="cat ${ivF===k?'on':''}" data-ivf="${k}">${l} (${cnt(k)})</button>`).join('')}</div>
 ${ivF==='menunggu'?`${P.length?P.map(v=>{const t=TEN.find(x=>x.id===v.t),diff=(v.paid||0)-v.amt;return `<div class="card vcard"><div class="vimg">${v.proof?`<img src="${v.proof}" alt="Bukti transfer">`:proofSvg(v)}</div><div><h2 style="margin-bottom:4px">${xe(t.n)} · ${v.id}</h2><p style="margin-top:0;color:var(--mut)">Perpanjang ${v.mo||1} bulan mulai ${v.per} · paket ${pk(v.plan).n} · diunggah ${v.at}</p>
 <div class="price"><span>Tagihan</span><b>${rp(v.amt)}</b></div><div class="price"><span>Dibayar (${xe(v.via)} · a.n. ${xe(v.snd||'-')})</span><b>${rp(v.paid||0)}</b></div><div class="price"><span>Hasil cek nominal</span><b style="color:${diff===0?'var(--ok)':'var(--red)'}">${diff===0?'Sesuai tagihan':diff<0?'Kurang '+rp(-diff):'Lebih '+rp(diff)}</b></div>
 <p style="font-size:14px;color:var(--mut)">Cocokkan dengan mutasi rekening platform sebelum menyetujui. Setelah disetujui, jatuh tempo maju ${v.mo||1} bulan ke ${fmtD(addMonth(t.due,v.mo||1))}${t.susp?' dan tenant aktif kembali':''}.</p>
 <label class="f"><span>Alasan jika ditolak</span><select id="ivw-${v.id}"><option>Nominal tidak sesuai</option><option>Dana belum masuk ke rekening</option><option>Bukti tidak terbaca</option></select></label>
 <div class="row"><button type="button" class="btn red" data-ivok="${v.id}">Setujui pembayaran</button><button type="button" class="btn ghost" data-ivno="${v.id}">Tolak</button></div></div></div>`}).join(''):'<div class="card" style="margin-bottom:16px"><p style="margin:0;color:var(--mut)">Tidak ada bukti yang menunggu.</p></div>'}`:`<div class="card scroll"><table class="t2 stack"><thead><tr><th>Tagihan</th><th>Tenant</th><th>Paket</th><th class="n">Nominal</th><th>Status</th></tr></thead><tbody>${H.map(v=>`<tr><td><b>${v.id}</b><br><small style="color:var(--mut)">${v.at} · ${xe(v.via||'')}</small></td><td>${xe(tName(v.t))}</td><td>${pk(v.plan).n} · ${v.mo||1} bulan</td><td class="n">${rp(v.paid||v.amt)}</td><td><span class="pill ${v.k==='lunas'?'p-ok':v.k==='tolak'?'p-bad':'p-info'}">${v.k==='lunas'?'Disetujui':v.k==='tolak'?'Ditolak':'Menunggu'}</span>${v.why?`<br><small style="color:var(--mut)">${xe(v.why)}</small>`:''}</td></tr>`).join('')||'<tr><td colspan="5">Belum ada data.</td></tr>'}</tbody></table></div>`}`};

/* jumlah meja mengikuti paket */
const tBusy=(tb,bk)=>tb.st!=='free'||Object.values(bk||{}).some(L=>L.some(b=>b.t===tb.n&&b.k!=='tolak'&&b.k!=='batal'));
function syncMeja(tid,quiet){const t=TEN.find(x=>x.id===tid);if(!t)return '';const D=tData(tid),T=D.tables,lim=pk(t.plan).meja;t.parked=t.parked||[];let on=0,off=0;
 while(T.length>lim){let k=-1;for(let i=T.length-1;i>=0;i--)if(!tBusy(T[i],D.bookings)){k=i;break}if(k<0){for(let i=T.length-1;i>=0;i--)if(T[i].st==='free'){k=i;break}}if(k<0)k=T.length-1;t.parked.unshift(T.splice(k,1)[0]);off++}
 while(T.length<lim&&t.parked.length){T.push(t.parked.shift());on++}
 const base=T.find(x=>x.type==='Reguler')||T[0]||{rate:15000,wk:18000};let add=0;
 while(T.length<lim){let n=T.length+1;const all=[...T,...t.parked].map(x=>x.n);while(all.includes('Meja '+n))n++;T.push({n:'Meja '+n,type:'Reguler',rate:base.rate,wk:base.wk,st:'free',fb:[]});add++}
 const msg=[add?add+' meja baru ditambahkan':'',on?on+' meja diaktifkan lagi':'',off?off+' meja dinonaktifkan':''].filter(Boolean).join(', ');
 if(msg&&!quiet)pushTN(tid,'ok',`Jumlah meja disesuaikan dengan paket ${pk(t.plan).n} (${lim} meja): ${msg}.`);return msg}
TEN.forEach(t=>syncMeja(t.id,true));
const mejaNote=()=>{const t=tOf(curT);if(!t)return '';const p=pk(t.plan),P=t.parked||[];return `<div class="card" style="margin-bottom:16px"><div class="row" style="justify-content:space-between;align-items:center"><div><h2 style="margin:0 0 4px">Jumlah meja: ${tables.length} dari paket ${p.n}</h2><p style="margin:0;color:var(--mut);font-size:14px">Jumlah meja otomatis mengikuti paket langganan (maks ${p.meja} meja). Nama, tipe, dan tarif tetap bisa diubah di sini.${role()==='admin'?' Untuk menambah meja, naikkan paket di Langganan.':' Untuk menambah meja, minta admin menaikkan paket.'}</p></div>${role()==='admin'?'<a href="#langganan" class="btn ghost" style="text-decoration:none;flex:none">Lihat paket</a>':''}</div>
 ${P.length?`<div style="margin-top:12px"><b style="font-size:14px">Nonaktif karena melebihi paket (${P.length})</b><div class="row" style="gap:6px;margin-top:6px">${P.map(x=>`<span class="pill p-bad">${xe(x.n)} · ${xe(x.type)}</span>`).join('')}</div><p style="margin:6px 0 0;color:var(--mut);font-size:13px">Tidak tampil di kasir dan booking. Data dan tarifnya disimpan, dan meja ini aktif lagi otomatis kalau paket dinaikkan.</p></div>`:''}</div>`};

/* biaya operasional (admin tenant) */
const WK0=isoD(-6),WK1=isoD();
const OPX={kmg:{cats:['Gaji karyawan','Sewa tempat','Listrik & air','Internet','Perawatan','Kebersihan','Lain-lain'],items:[
 {id:1,d:'2026-11-01',c:'Gaji karyawan',a:24000000,n:'5 staf (kasir, pelayan, dapur)',rut:true},{id:2,d:'2026-11-01',c:'Sewa tempat',a:12000000,n:'Ruko Kemang Raya',rut:true},{id:3,d:'2026-11-01',c:'Internet',a:450000,n:'Indihome 100 Mbps',rut:true},
 {id:4,d:isoD(-1),c:'Listrik & air',a:1100000,n:'Tagihan PLN November'},{id:5,d:isoD(-3),c:'Perawatan',a:350000,n:'Servis AC ruang VIP'},{id:6,d:isoD(-4),c:'Kebersihan',a:180000,n:'Sabun, tisu, plastik sampah'},{id:7,d:'2026-11-12',c:'Perawatan',a:420000,n:'Ganti kain meja 2'}]},
 kgd:{cats:['Gaji karyawan','Sewa tempat','Listrik & air','Internet','Lain-lain'],items:[
 {id:1,d:'2026-11-01',c:'Gaji karyawan',a:14000000,n:'3 staf',rut:true},{id:2,d:'2026-11-01',c:'Sewa tempat',a:8000000,n:'Kios Boulevard',rut:true},{id:3,d:'2026-11-01',c:'Internet',a:350000,n:'Biznet',rut:true},{id:4,d:isoD(-2),c:'Listrik & air',a:700000,n:'Tagihan PLN November'}]}};
const opxOf=id=>OPX[id]=OPX[id]||{cats:['Gaji karyawan','Sewa tempat','Listrik & air','Internet','Perawatan','Kebersihan','Lain-lain'],items:[]};
const opxShare=it=>it.rut?(it.d<=WK1?Math.round(it.a*7/30/1000)*1000:0):(it.d>=WK0&&it.d<=WK1?it.a:0);
function opxWeek(id){const O=opxOf(id),m={};O.items.forEach(it=>{const v=opxShare(it);if(v)m[it.c]=(m[it.c]||0)+v});const cats=Object.entries(m).sort((a,b)=>b[1]-a[1]);return{total:cats.reduce((a,x)=>a+x[1],0),cats}}
let opxEd=null,opxQ='semua';
V.biaya=()=>{const O=opxOf(curT),W=opxWeek(curT),mon=O.items.filter(i=>i.rut).reduce((a,i)=>a+i.a,0),nov=O.items.filter(i=>!i.rut&&i.d.slice(0,7)==='2026-11').reduce((a,i)=>a+i.a,0),E=opxEd!=null?O.items.find(i=>i.id===opxEd):null;
 const L=O.items.filter(i=>opxQ==='semua'||(opxQ==='rutin'?i.rut:!i.rut)).slice().sort((a,b)=>b.d.localeCompare(a.d));
 const cv=v=>`<small>Rp</small>${Math.round(v).toLocaleString('id-ID')}`;
 return `<h1>Biaya operasional ${xe(tName(curT))} <span class="code">F-06</span></h1><p class="sub">Hanya admin tenant yang bisa membuka dan mengisi halaman ini. Total di sini dipakai untuk menghitung laba bersih di Keuangan (F-01). Biaya rutin bulanan dibagi rata per hari, jadi laporan mingguan menanggung 7/30 bagiannya.</p>
 <div class="kpis" style="margin-bottom:16px"><div class="card kpi"><div class="l">Masuk laba bersih minggu ini</div><div class="v">${cv(W.total)}</div><div class="d" style="color:var(--mut)">20 sampai 26 Nov 2026</div></div><div class="card kpi"><div class="l">Biaya rutin per bulan</div><div class="v">${cv(mon)}</div><div class="d" style="color:var(--mut)">${O.items.filter(i=>i.rut).length} pos rutin</div></div><div class="card kpi"><div class="l">Biaya sekali bayar November</div><div class="v">${cv(nov)}</div><div class="d" style="color:var(--mut)">${O.items.filter(i=>!i.rut&&i.d.slice(0,7)==='2026-11').length} catatan</div></div></div>
 <div class="grid g2"><div class="card scroll"><div class="row" style="justify-content:space-between"><h2 style="margin:0">Daftar biaya</h2><div class="tabs" style="margin:0">${[['semua','Semua'],['rutin','Rutin bulanan'],['sekali','Sekali bayar']].map(([k,l])=>`<button type="button" class="cat ${opxQ===k?'on':''}" data-opq="${k}">${l}</button>`).join('')}</div></div>
 <table class="t2 stack" style="margin-top:10px"><thead><tr><th>Tanggal</th><th>Kategori</th><th>Catatan</th><th class="n">Nominal</th><th></th></tr></thead><tbody>${L.length?L.map(i=>`<tr><td style="white-space:nowrap;font-size:14px">${i.rut?'Mulai<br>':''}${new Date(i.d+'T00:00:00').toLocaleDateString('id-ID',{day:'numeric',month:'short'})}</td><td><b>${xe(i.c)}</b><br><span class="pill ${i.rut?'p-info':'p-ok'}" style="font-size:12px">${i.rut?'Rutin bulanan':'Sekali bayar'}</span></td><td style="font-size:13px;color:var(--mut)">${xe(i.n||'-')}</td><td class="n"><b>${rp(i.a)}</b>${i.rut?'<br><small style="color:var(--mut)">per bulan</small>':''}</td><td><div class="row" style="gap:6px;flex-wrap:nowrap"><button type="button" class="btn ghost" style="padding:6px 12px;min-height:38px" data-ope="${i.id}">Ubah</button><button type="button" class="btn ghost" style="padding:6px 12px;min-height:38px;color:var(--redt,var(--red))" data-opd="${i.id}">Hapus</button></div></td></tr>`).join(''):'<tr><td colspan="5" style="color:var(--mut)">Belum ada biaya di daftar ini.</td></tr>'}</tbody></table></div>
 <div class="grid" style="align-content:start"><form class="card" id="opxF"><h2>${E?'Ubah biaya':'Catat biaya'}</h2>
 <label class="f"><span>Kategori</span><select id="oxC" required>${O.cats.map(c=>`<option ${E&&E.c===c?'selected':''}>${xe(c)}</option>`).join('')}</select></label>
 <div class="row" style="flex-wrap:nowrap;align-items:start"><label class="f" style="flex:1"><span>Tanggal</span><input id="oxD" type="date" required value="${E?E.d:WK1}"></label><label class="f" style="flex:1"><span>Nominal (Rp)</span><input id="oxA" type="number" min="1000" step="1000" inputmode="numeric" required value="${E?E.a:''}" placeholder="Contoh: 1100000"></label></div>
 <label class="f"><span>Catatan</span><input id="oxN" value="${E?xe(E.n||''):''}" placeholder="Contoh: tagihan PLN November"></label>
 <label class="cbl"><input type="checkbox" id="oxR" ${E&&E.rut?'checked':''}> <span>Biaya rutin bulanan. Dihitung otomatis setiap bulan mulai tanggal di atas, tidak perlu dicatat ulang.</span></label>
 <div class="row" style="margin-top:12px"><button class="btn red" style="flex:1">${E?'Simpan perubahan':'Simpan biaya'}</button>${E?'<button type="button" class="btn ghost" data-act="opxx">Batal</button>':''}</div></form>
 <div class="card"><h2>Kategori biaya</h2><p style="margin-top:0;color:var(--mut);font-size:14px">Ubah nama langsung di kotaknya. Kategori yang masih dipakai tidak bisa dihapus.</p>${O.cats.map((c,k)=>{const u=O.items.filter(i=>i.c===c).length;return `<div class="row" style="flex-wrap:nowrap;margin-bottom:8px"><input class="tin tl" style="flex:1" data-opcn="${k}" value="${xe(c)}"><small style="color:var(--mut);white-space:nowrap">${u} biaya</small>${u?'':`<button type="button" class="btn ghost" style="padding:6px 10px;min-height:38px" data-opcd="${k}">Hapus</button>`}</div>`}).join('')}
 <form id="opcF" class="row" style="flex-wrap:nowrap;margin-top:12px"><input id="opcN" class="tin tl" style="flex:1" required placeholder="Kategori baru, mis. Promosi"><button class="btn ghost">Tambah</button></form></div></div></div>`};
document.addEventListener('click',e=>{const b=e.target.closest('[data-opq],[data-ope],[data-opd],[data-opdok],[data-opcd],[data-act="opxx"]');if(!b)return;const d=b.dataset,O=opxOf(curT);
 if(d.opq){opxQ=d.opq;rerender()}
 else if(d.ope){opxEd=+d.ope;rerender();setTimeout(()=>{const f=$('#opxF');f&&f.scrollIntoView({behavior:'smooth',block:'start'})},50)}
 else if(d.act==='opxx'){opxEd=null;rerender()}
 else if(d.opd){const i=O.items.find(x=>x.id===+d.opd);openDlg(`<h2>Hapus biaya ini?</h2><p>${xe(i.c)} · ${xe(i.n||'-')} · ${rp(i.a)}${i.rut?' per bulan':''}. Laba bersih di Keuangan langsung dihitung ulang.</p><div class="row"><button type="button" class="btn red" data-opdok="${i.id}">Ya, hapus</button><button type="button" class="btn ghost" data-act="dlgx">Batal</button></div>`)}
 else if(d.opdok){O.items=O.items.filter(x=>x.id!==+d.opdok);if(opxEd===+d.opdok)opxEd=null;closeDlg();toast('Biaya dihapus');rerender()}
 else if(d.opcd){const c=O.cats[+d.opcd];O.cats.splice(+d.opcd,1);toast('Kategori '+c+' dihapus');rerender()}});
document.addEventListener('change',e=>{const g=e.target;if(!g.dataset||g.dataset.opcn==null)return;const O=opxOf(curT),k=+g.dataset.opcn,old=O.cats[k],nn=g.value.trim();if(!nn||nn===old){g.value=old;return}if(O.cats.some((c,j)=>j!==k&&c.toLowerCase()===nn.toLowerCase())){toast('Kategori '+nn+' sudah ada');g.value=old;return}O.cats[k]=nn;O.items.forEach(i=>{if(i.c===old)i.c=nn});toast(`Kategori ${old} diganti jadi ${nn}`);rerender()});
document.addEventListener('submit',e=>{const f=e.target;if(f.id!=='opxF'&&f.id!=='opcF')return;e.preventDefault();e.stopImmediatePropagation();const O=opxOf(curT);
 if(f.id==='opcF'){const n=$('#opcN').value.trim();if(!n)return;if(O.cats.some(c=>c.toLowerCase()===n.toLowerCase())){toast('Kategori '+n+' sudah ada');return}O.cats.push(n);toast('Kategori '+n+' ditambahkan');rerender();return}
 const a=+$('#oxA').value;if(!(a>0)){toast('Isi nominal biaya');return}const it={d:$('#oxD').value,c:$('#oxC').value,a,n:$('#oxN').value.trim(),rut:$('#oxR').checked};
 if(opxEd!=null){Object.assign(O.items.find(x=>x.id===opxEd),it);opxEd=null;toast('Biaya diperbarui. Laba bersih dihitung ulang.')}else{O.items.push({id:Math.max(0,...O.items.map(x=>x.id))+1,...it});toast(`${it.c} ${rp(a)}${it.rut?' per bulan':''} dicatat. Laba bersih dihitung ulang.`)}rerender()},true);

/* halaman pelanggan: profil, booking saya, riwayat skor */
const ini=n=>n.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase();
const avBig=()=>`<div class="av lg" style="overflow:hidden">${member.foto?`<img src="${member.foto}" alt="Foto profil" style="width:100%;height:100%;object-fit:cover">`:ini(member.nama)}</div>`;
const custHead=(t,code,sub)=>`<div class="prof">${avBig()}<div><h1 style="margin-bottom:2px">${t} <span class="code">${code}</span></h1><p class="sub" style="margin:0">${sub}</p></div></div>
 <div class="tabs" style="margin-top:18px">${[['akun','Profil saya'],['bookingsaya','Booking saya'],['riwayatskor','Riwayat skor']].map(([h,l])=>`<a class="cat ${location.hash.endsWith(h)?'on':''}" href="#${h}" style="text-decoration:none;display:inline-flex;align-items:center;${location.hash.endsWith(h)?'':'color:var(--ink)'}">${l}</a>`).join('')}</div>`;
function profHtml(){const m=member;return custHead('Profil saya','P-10',`${xe(m.nama)} · @${xe(m.u||'-')} · member sejak 26 November 2026 <span class="pill p-ok">Akun aktif</span>`)+`
 <div class="grid g2"><form class="card" id="profF"><h2>Data akun</h2>
 <div class="row" style="gap:14px;margin-bottom:14px">${avBig()}<div><label class="btn ghost" style="cursor:pointer;margin:0">Ganti foto<input type="file" id="pfFoto" accept="image/*" style="display:none"></label>${m.foto?' <button type="button" class="btn ghost" data-act="pffx">Hapus foto</button>':''}<div style="font-size:13px;color:var(--mut);margin-top:6px">JPG atau PNG, tampil di menu nama kanan atas.</div></div></div>
 <label class="f"><span>Nama lengkap</span><input id="pfN" value="${xe(m.nama)}" required></label>
 <label class="f"><span>Username</span><input value="${xe(m.u||'')}" readonly style="background:#f3f1ec"><small style="color:var(--mut);font-size:13px">Dipakai untuk masuk dan tidak bisa diganti sendiri.</small></label>
 <label class="f"><span>Email</span><input id="pfE" type="email" value="${xe(m.email)}" required><small style="color:var(--mut);font-size:13px">Tujuan kode OTP dan notifikasi booking.</small></label>
 <label class="f"><span>No HP</span><input id="pfH" type="tel" value="${xe(m.hp||'')}" required></label>
 <button class="btn" style="width:100%">Simpan perubahan</button></form>
 <div class="grid" style="align-content:start"><form class="card" id="pwF" onsubmit="return false"><h2>Ganti password</h2>${pw('pfP0','Password lama','current-password','minlength="1"')}${pw('pfP1','Password baru (min. 8 karakter)','new-password')}${pw('pfP2','Ulangi password baru','new-password')}
 <button type="button" class="btn ghost" style="width:100%" data-act="chpw2">Ganti password</button></form>
 <div class="card"><h2>Pintasan</h2><div class="price"><span>Booking aktif</span><b><a href="#bookingsaya">${userBk(m.nama).filter(x=>!['selesai','batal'].includes(x.b.k)).length} booking</a></b></div><div class="price"><span>Sesi skor tersimpan</span><b><a href="#riwayatskor">${SKH.length} sesi</a></b></div>
 <button type="button" class="btn ghost" style="width:100%;margin-top:12px" data-act="logout">Keluar dari akun</button></div></div></div>`}
V.bookingsaya=()=>{if(!member)return V.akun();const L=userBk(member.nama),up=L.filter(x=>!['selesai','batal'].includes(x.b.k)),N=notifs[member.nama]||[];
 const row=({b,d})=>`<div class="price"><span><b>${b.t}</b> · ${dayLbl(d)} · ${b.id}<br><small style="color:var(--mut)">${clock(b.s)} sampai ${clock(b.s+b.l)} · ${b.pl||4} orang · DP ${rp(b.dp||0)} ${b.k==='bayar'?'belum dibayar':b.k==='verif'?'sedang dicek':b.k==='tolak'?'ditolak':'lunas'}</small>${b.from?`<br><span class="pill p-warn">Meja dipindah dari ${b.from}</span>`:''}${b.k==='bayar'||b.k==='tolak'?`<br><button class="btn red" style="padding:6px 12px;margin-top:6px;min-height:36px" data-redp="${b.id}">${b.k==='tolak'?'Upload ulang bukti':'Bayar DP'}</button>`:''}</span><b><span class="pill ${KL[b.k][1]}">${KL[b.k][0]}</span></b></div>`;
 const hist=[...L.filter(x=>['selesai','batal'].includes(x.b.k)).map(row),`<div class="price"><span><b>VIP 2</b> · Sab 21 Nov · BK-087<br><small style="color:var(--mut)">15.00 sampai 18.00 · 4 orang · total ${rp(336000)}</small></span><b><span class="pill p-mut">Selesai</span></b></div>`,`<div class="price"><span><b>Meja 3</b> · Sab 14 Nov · BK-061<br><small style="color:var(--mut)">19.00 sampai 22.00 · 4 orang · total ${rp(212000)}</small></span><b><span class="pill p-mut">Selesai</span></b></div>`];
 const nh=`<div class="card"><h2>Notifikasi</h2>${N.length?N.map(n=>`<div class="ntf ${n.t} ${n.read?'':'new'}"><b>${n.t==='ok'?'Booking valid':'Bukti ditolak'}</b> <small>${n.at}</small><br>${n.msg}</div>`).join(''):'<p style="color:var(--mut);margin:0">Belum ada notifikasi. Info DP valid, bukti ditolak, dan pindah meja muncul di sini dan dikirim ke email.</p>'}</div>`;N.forEach(n=>n.read=true);
 return custHead('Booking saya','P-06',`${up.length} booking akan datang. Tunjukkan kode booking saat datang ke kasir.`)+`<div class="grid g2"><div class="grid" style="align-content:start"><div class="card"><h2>Akan datang</h2>${up.length?up.map(row).join(''):'<p style="color:var(--mut)">Belum ada booking aktif.</p>'}<a href="#booking" class="btn red" style="text-decoration:none;display:block;text-align:center;margin-top:12px">Booking meja baru</a></div>
 <div class="card"><h2>Riwayat</h2>${hist.join('')}</div></div><div class="grid" style="align-content:start">${nh}<div class="card"><h2>Kebijakan</h2><p style="margin:0;color:var(--mut);font-size:14px">Pembatalan lebih dari 24 jam sebelum jadwal: DP kembali penuh. Kurang dari 24 jam: DP hangus. Kalau meja dipindah oleh kasir, nomor meja di sini langsung berganti.</p></div></div></div>`};
const SKH=CLOUD?[]:[{d:'21 Nov 2026',m:'Sederhana',r:3,p:[['Sinta Wijaya',12000,'akun','sinta'],['Budi Hartono',4000,'akun','budi.h'],['Rudi',-6000,'undang'],['Dimas',-10000,'tamu']]},{d:'14 Nov 2026',m:'Hong Kong',r:8,p:[['Hendra',96,'akun','hendra.g'],['Felix',24,'tamu'],['Sinta Wijaya',-40,'akun','sinta'],['Yohanes',-80,'tamu']]},{d:'7 Nov 2026',m:'Sederhana',r:4,p:[['Rudi',8000,'undang'],['Sinta Wijaya',6000,'akun','sinta'],['Budi Hartono',-4000,'akun','budi.h'],['Dimas',-10000,'tamu']]}];
V.riwayatskor=()=>{if(!member)return V.akun();const me=member.nama,isMe=p=>p[3]?p[3]===member.u:p[0]===me;
 return custHead('Riwayat skor','P-11',`${SKH.length} sesi tersimpan dari kalkulator skor. Peringkat dihitung dari total poin di akhir sesi.`)+`<div class="grid g2"><div class="grid" style="align-content:start">${SKH.map(x=>{const P=x.p.slice().sort((a,b)=>b[1]-a[1]),rk=P.findIndex(isMe)+1;return `<div class="card"><div class="row" style="justify-content:space-between"><div><h2 style="margin:0">${x.d}</h2><small style="color:var(--mut)">${x.m} · ${x.r} ronde · ${P.length} pemain</small></div><span class="pill ${rk===1?'p-ok':'p-info'}">Peringkat ${rk||'-'}</span></div>
 ${P.map((p,i)=>`<div class="rank"><div class="no ${i===0?'g':''}">${i+1}</div><div style="flex:1">${isMe(p)?'<b>'+xe(p[0])+' (kamu)</b>':xe(p[0])} ${stPill(p[2],p[3])}${p[2]==='tamu'?` <button type="button" class="btn ghost" style="padding:2px 10px;min-height:30px;font-size:13px" data-hinv="${xe(p[0])}">Undang & hubungkan</button>`:''}</div><b class="n" style="color:${p[1]<0?'var(--redt,var(--red))':'var(--ok)'}">${p[1]>0?'+':''}${p[1].toLocaleString('id-ID')}</b></div>`).join('')}</div>`}).join('')}</div>
 <div class="grid" style="align-content:start"><div class="card"><h2>Ringkasan</h2><div class="price"><span>Sesi dimainkan</span><b>${SKH.length}</b></div><div class="price"><span>Juara 1</span><b>${SKH.filter(x=>isMe(x.p.slice().sort((a,b)=>b[1]-a[1])[0])).length} kali</b></div><div class="price"><span>Mode favorit</span><b>Sederhana</b></div>
 <a href="#skor" class="btn red" style="text-decoration:none;display:block;text-align:center;margin-top:12px">Hitung skor baru</a></div><div class="card"><h2>Status pemain</h2><div class="price"><span>${stPill('akun','-')}</span><small style="max-width:60%;text-align:right;color:var(--mut)">Punya akun. Sesi ini juga tampil di Riwayat skor miliknya.</small></div><div class="price"><span>${stPill('undang')}</span><small style="max-width:60%;text-align:right;color:var(--mut)">Skor terhubung otomatis begitu dia daftar atau masuk dari undangan.</small></div><div class="price"><span>${stPill('tamu')}</span><small style="max-width:60%;text-align:right;color:var(--mut)">Nama saja, tanpa aplikasi. Bisa diundang kapan saja untuk dihubungkan.</small></div></div></div></div>`};
document.addEventListener('change',e=>{const g=e.target;if(g.id!=='pfFoto'||!g.files[0])return;const r=new FileReader();r.onload=()=>{readImg(g.files[0],u=>{member.foto=u;if(CLOUD)CMB.updateProfile({foto:u}).catch(e=>toast(e.message));toast('Foto profil diganti');render()},400)};r.readAsDataURL(g.files[0])});
document.addEventListener('click',e=>{const b=e.target.closest('[data-act="pffx"],[data-act="chpw2"]');if(!b)return;
 if(b.dataset.act==='pffx'){delete member.foto;toast('Foto profil dihapus');render();return}
 const a=ACCS.find(x=>x.u===member.u),p0=$('#pfP0').value,p1=$('#pfP1').value;if(CLOUD){if(p1.length<8){toast('Password baru minimal 8 karakter');return}if(p1!==$('#pfP2').value){toast('Ulangi password baru belum sama');return}CMB.changePassword(p0,p1).then(()=>{['pfP0','pfP1','pfP2'].forEach(i=>$('#'+i).value='');toast('Password diganti')}).catch(err=>toast(err.message));return}if(a&&p0!==a.pw){toast('Password lama salah');return}if(p1.length<8){toast('Password baru minimal 8 karakter');return}if(p1!==$('#pfP2').value){toast('Ulangi password baru belum sama');return}if(a)a.pw=p1;['pfP0','pfP1','pfP2'].forEach(i=>$('#'+i).value='');toast('Password diganti. Konfirmasi dikirim ke '+member.email)});

/* pemain sesi: undang teman atau tambah tamu */
const SEATS=CLOUD?[{n:'Pemain 1',st:'tamu'},{n:'Pemain 2',st:'tamu'},{n:'Pemain 3',st:'tamu'},{n:'Pemain 4',st:'tamu'}]:[{n:'Sinta',st:'akun',u:'sinta'},{n:'Budi',st:'akun',u:'budi.h'},{n:'Rudi',st:'undang',code:'R7K2Q'},{n:'Dimas',st:'tamu'}];
const stPill=(st,u)=>st==='akun'?`<span class="pill p-ok" style="font-size:12px">Terhubung${u&&u!=='-'?' · @'+xe(u):''}</span>`:st==='undang'?'<span class="pill p-warn" style="font-size:12px">Undangan terkirim</span>':'<span class="pill p-mut" style="font-size:12px">Tamu</span>';
const invCode=()=>Math.random().toString(36).slice(2,7).toUpperCase();
const invUrl=c=>`https://${prodUrl(tOf(curT))}`;
function qrSvg(txt,sz=168){let h=2166136261;for(const ch of txt){h^=ch.charCodeAt(0);h=Math.imul(h,16777619)>>>0}const N=25,c=sz/N;let r='';const fin=(x,y)=>x<7&&y<7||x>=N-7&&y<7||x<7&&y>=N-7;
 for(let y=0;y<N;y++)for(let x=0;x<N;x++){let on;if(fin(x,y)){const fx=x<7?x:x-(N-7),fy=y<7?y:y-(N-7);on=fx===0||fx===6||fy===0||fy===6||(fx>=2&&fx<=4&&fy>=2&&fy<=4)}else{h^=h<<13;h>>>=0;h^=h>>>17;h^=h<<5;h>>>=0;on=(h&3)===0||(h&7)===5}if(on)r+=`<rect x="${(x*c).toFixed(2)}" y="${(y*c).toFixed(2)}" width="${c.toFixed(2)}" height="${c.toFixed(2)}"/>`}
 return `<svg width="${sz}" height="${sz}" viewBox="0 0 ${sz} ${sz}" style="background:#fff;padding:8px;border-radius:10px;box-sizing:content-box" role="img" aria-label="Kode QR undangan"><g fill="#111">${r}</g></svg>`}
let seatSel=null,seatMode='undang';
const syncSeats=()=>{SEATS.forEach((x,i)=>players[i]=x.n)};
function seatCard(){return `<div class="card" style="margin-bottom:16px"><div class="row" style="justify-content:space-between"><div><h2 style="margin:0">Pemain sesi <span class="code">S-07</span></h2><p style="margin:4px 0 0;color:var(--mut);font-size:14px">Undang teman supaya skor sesi ini ikut tersimpan di akunnya, atau cukup tulis namanya sebagai tamu.</p></div></div>
 <div class="seats">${SEATS.map((x,i)=>`<div class="seat"><div class="row" style="gap:8px;flex-wrap:nowrap"><div class="av">${xe(x.n.slice(0,2).toUpperCase())}</div><div style="min-width:0"><b>${xe(x.n)}</b>${x.u===(member&&member.u)?' <small style="color:var(--mut)">(kamu)</small>':''}<br>${stPill(x.st,x.u)}</div></div>
 <div class="row" style="gap:6px;margin-top:10px">${x.st==='undang'?`<button type="button" class="btn ghost sm" data-sinv="${i}">Lihat undangan</button><button type="button" class="btn ghost sm" data-sacc="${i}" title="Prototipe">Simulasi: teman daftar</button>`:x.st==='tamu'?`<button type="button" class="btn ghost sm" data-sinv="${i}">Undang & hubungkan</button>`:''}${x.u===(member&&member.u)?'':`<button type="button" class="btn ghost sm" data-sedit="${i}">Ganti</button>`}</div></div>`).join('')}</div>
 ${seatSel!=null?`<form class="card" id="seatF" style="margin-top:14px;background:var(--bg)"><h3 style="margin:0 0 10px">Ganti pemain kursi ${['Timur','Selatan','Barat','Utara'][seatSel]}</h3><div class="tabs" style="margin-bottom:12px">${[['undang','Undang teman'],['tamu','Tambah nama tamu']].map(([k,l])=>`<button type="button" class="cat ${seatMode===k?'on':''}" data-smode="${k}">${l}</button>`).join('')}</div>
 ${seatMode==='undang'?`<label class="f"><span>Nama teman</span><input id="seN" required placeholder="Contoh: Rudi"></label><label class="f"><span>Username (opsional)</span><input id="seU" autocapitalize="none" spellcheck="false" placeholder="Kalau sudah punya akun, contoh: budi.h"><small style="color:var(--mut);font-size:13px">Kalau username ditemukan, pemain langsung terhubung. Kalau kosong, dibuatkan link dan kode QR undangan.</small></label>`
 :`<label class="f"><span>Nama tamu</span><input id="seN" required placeholder="Contoh: Dimas"><small style="color:var(--mut);font-size:13px">Tidak perlu aplikasi atau akun. Skor tetap dihitung, dan nama ini bisa diundang untuk dihubungkan nanti.</small></label>`}
 <div class="row"><button class="btn red">${seatMode==='undang'?'Buat undangan':'Tambah tamu'}</button><button type="button" class="btn ghost" data-act="seatx">Batal</button></div></form>`:''}
 <p style="margin:12px 0 0;font-size:13px;color:var(--mut)">Skor tersimpan ke Riwayat skor semua pemain yang terhubung. Pemain undangan dan tamu ikut terhubung begitu mereka daftar atau masuk lewat link undangan.</p></div>`}
function invDlg(name,code,i){openDlg(`<h2>Undang ${xe(name)}</h2><p style="margin-top:0;color:var(--mut)">Kirim link ini atau minta ${xe(name)} memindai kode QR dari HP-nya. Setelah dia daftar atau masuk, skornya otomatis terhubung ke akunnya.</p>
 <div style="display:grid;place-items:center;margin:8px 0 14px">${qrSvg(invUrl(code))}<small style="color:var(--mut);margin-top:6px">Kode undangan ${code} · berlaku 7 hari</small></div>
 <label class="f"><span>Link undangan</span><input id="invL" readonly value="${invUrl(code)}"></label>
 <div class="row"><button type="button" class="btn red" data-act="invcopy">Salin link</button><a class="btn ghost" style="text-decoration:none" target="_blank" rel="noopener" href="https://wa.me/?text=${encodeURIComponent('Gabung sesi mahjong di '+tName(curT)+': '+invUrl(code))}">Bagikan ke WhatsApp</a>${i!=null?`<button type="button" class="btn ghost" data-scancel="${i}">Batalkan undangan</button>`:''}<button type="button" class="btn ghost" data-act="dlgx">Tutup</button></div>`)}
document.addEventListener('click',e=>{const b=e.target.closest('[data-sinv],[data-sacc],[data-sedit],[data-smode],[data-act="seatx"],[data-act="invcopy"],[data-scancel],[data-hinv]');if(!b)return;const d=b.dataset;
 if(d.sinv!=null){const x=SEATS[+d.sinv];if(x.st==='tamu'){x.st='undang';x.code=invCode();toast('Undangan dibuat untuk '+x.n);render()}invDlg(x.n,x.code,+d.sinv)}
 else if(d.sacc!=null){const x=SEATS[+d.sacc];x.st='akun';x.u=x.n.toLowerCase().replace(/[^a-z0-9]/g,'')+'.'+x.code.slice(0,2).toLowerCase();delete x.code;toast(`${x.n} sudah daftar lewat undangan. Skor sesi ini terhubung ke akun @${x.u}`);render()}
 else if(d.sedit!=null){seatSel=+d.sedit;seatMode='undang';render()}
 else if(d.smode){seatMode=d.smode;render()}
 else if(d.act==='seatx'){seatSel=null;render()}
 else if(d.act==='invcopy'){const v=$('#invL').value;(navigator.clipboard?navigator.clipboard.writeText(v):Promise.reject()).then(()=>toast('Link undangan disalin'),()=>{$('#invL').select();toast('Tekan Ctrl+C untuk menyalin')})}
 else if(d.scancel!=null){const x=SEATS[+d.scancel];x.st='tamu';delete x.code;closeDlg();toast(`Undangan ${x.n} dibatalkan. ${x.n} tetap ikut sebagai tamu.`);render()}
 else if(d.hinv){invDlg(d.hinv,invCode(),null)}});
document.addEventListener('submit',e=>{const f=e.target;if(f.id!=='seatF')return;e.preventDefault();e.stopImmediatePropagation();const n=$('#seN').value.trim();if(!n)return;const i=seatSel,x={n:n.split(' ')[0]};
 if(seatMode==='undang'){const u=$('#seU').value.trim().toLowerCase(),a=u&&ACCS.find(q=>q.u===u&&q.role==='tamu');if(u&&!a){toast('Username '+u+' tidak ditemukan. Kirim link undangan saja.');return}
  if(a){x.st='akun';x.u=a.u;SEATS[i]=x;toast(`${n} terhubung ke akun @${a.u}`)}else{x.st='undang';x.code=invCode();SEATS[i]=x;setTimeout(()=>invDlg(x.n,x.code,i),60);toast('Undangan dibuat untuk '+n)}}
 else{x.st='tamu';SEATS[i]=x;toast(n+' ditambahkan sebagai tamu')}
 seatSel=null;syncSeats();render()},true);

/* riwayat stok: spv hanya baca + ajukan koreksi, admin ubah/hapus/setujui */
const stRow=(e,s)=>{const ed=stCanEd(),K=e.kor,H=(e.hist||[]).map(h=>`<div style="font-size:12px;color:var(--mut)">${xe(h)}</div>`).join('');
 if(e.del)return `<div class="price" style="opacity:.6"><span><s><b>${s.n}</b> +${e.q.toLocaleString('id-ID')} ${s.u} · ${rp(e.p)}</s><br><small style="color:var(--mut)">${e.at} · input ${xe(e.by||'-')}</small>${H}</span><b><span class="pill p-bad">Dihapus</span></b></div>`;
 const btn=ed?`<button class="btn ghost" style="padding:4px 10px;min-height:36px" data-ledit="${e.id}">Ubah</button> <button class="btn ghost" style="padding:4px 10px;min-height:36px" data-ldel="${e.id}">Hapus</button>`:K?'<span class="pill p-warn">Koreksi menunggu admin</span>':`<button class="btn ghost" style="padding:4px 10px;min-height:36px" data-lkor="${e.id}">Ajukan koreksi</button>`;
 const kf=stKor===e.id&&!ed?`<div class="part" style="margin-top:8px"><b>Ajukan koreksi</b><div class="row" style="flex-wrap:nowrap;margin-top:8px"><label class="f" style="flex:1;margin:0"><span>Jumlah benar (${s.u})</span><input class="tin" type="number" id="kq" value="${e.q}"></label><label class="f" style="flex:1;margin:0"><span>Total harga benar</span><input class="tin" type="number" id="kp" value="${e.p}"></label></div><label class="f" style="margin-top:8px"><span>Alasan (wajib)</span><input id="kw" placeholder="Contoh: salah ketik, yang datang 4 kg"></label><div class="row"><button class="btn" data-lksend="${e.id}">Kirim ke admin</button><button class="btn ghost" data-act="lkx">Batal</button></div></div>`:'';
 const kb=K?`<div class="part" style="margin-top:8px;border-color:var(--amber)"><small><b>Pengajuan koreksi</b> dari ${xe(K.by)} · ${K.at}<br>Jumlah ${e.q.toLocaleString('id-ID')} → <b>${K.q.toLocaleString('id-ID')} ${s.u}</b>, harga ${rp(e.p)} → <b>${rp(K.p)}</b><br>Alasan: ${xe(K.why)}</small>${ed?`<div class="row" style="margin-top:8px"><button class="btn red" style="padding:6px 12px;min-height:36px" data-lkok="${e.id}">Setujui koreksi</button><button class="btn ghost" style="padding:6px 12px;min-height:36px" data-lkno="${e.id}">Tolak</button></div>`:''}</div>`:'';
 return `<div style="border-bottom:1px solid var(--line);padding:10px 0"><div class="price" style="border:0;padding:0"><span><b>${s.n}</b> +${e.q.toLocaleString('id-ID')} ${s.u} · ${rp(e.p)}<br><small style="color:var(--mut)">${e.at} · ${e.sup||'-'} · input ${xe(e.by||'-')}</small></span><b style="white-space:nowrap">${btn}</b></div>${H}${kb}${kf}</div>`};
document.addEventListener('click',e=>{const b=e.target.closest('[data-lkor],[data-lksend],[data-act="lkx"],[data-lkok],[data-lkno]');if(!b)return;const d=b.dataset;
 if(d.lkor){stKor=+d.lkor;rerender()}
 else if(d.act==='lkx'){stKor=null;rerender()}
 else if(d.lksend){const x=stockLog.find(q=>q.id==d.lksend),w=$('#kw').value.trim();if(!w){toast('Isi alasan koreksi');return}x.kor={q:Math.max(0,+$('#kq').value||0),p:Math.max(0,+$('#kp').value||0),why:w,by:stWho(),at:stNow()};(x.hist=x.hist||[]).push(`${stNow()} · ${stWho()} mengajukan koreksi`);stKor=null;toast('Pengajuan koreksi dikirim ke admin tenant');rerender()}
 else if(d.lkok){if(!stCanEd())return;const x=stockLog.find(q=>q.id==d.lkok),s2=stock[x.k],K=x.kor;stAdj(x.k,K.q-x.q,'Koreksi disetujui: '+K.why);s2.q=Math.max(0,s2.q+K.q-x.q);(x.hist=x.hist||[]).push(`${stNow()} · ${stWho()} menyetujui koreksi ${K.by.split(' (')[0]}: jumlah ${x.q.toLocaleString('id-ID')} → ${K.q.toLocaleString('id-ID')} ${s2.u}, harga ${rp(x.p)} → ${rp(K.p)}`);x.q=K.q;x.p=K.p;delete x.kor;toast('Koreksi disetujui, stok '+s2.n+' disesuaikan');rerender()}
 else if(d.lkno){if(!stCanEd())return;const x=stockLog.find(q=>q.id==d.lkno);(x.hist=x.hist||[]).push(`${stNow()} · ${stWho()} menolak koreksi ${x.kor.by.split(' (')[0]}`);delete x.kor;toast('Pengajuan koreksi ditolak');rerender()}});

/* level dapur: kitchen display */
const OST={baru:['Baru','p-bad'],proses:['Diproses','p-warn'],siap:['Siap diantar','p-info'],antar:['Diantar','p-ok']};
const ORDS={kmg:[{id:'OR-0409',t:'Meja 2',who:'Walk-in (Rudi)',items:[['Kopi susu aren',2]],note:'',src:'Kasir Dewi',ago:52,st:'antar',log:['Diantar oleh Sari']},
 {id:'OR-0410',t:'VIP 1',who:'Hendra + 3',items:[['Mie goreng',2],['Kentang goreng',1]],note:'Mie satu tidak pedas',src:'Kasir Dewi',ago:14,st:'siap',log:[]},
 {id:'OR-0411',t:'Meja 1',who:'Budi + 3',items:[['Nasi goreng ayam',1],['Es teh manis',4]],note:'Es teh gula sedikit',src:'Pelanggan',ago:8,st:'proses',log:[]},
 {id:'OR-0412',t:'Meja 3',who:'Sinta Wijaya',items:[['Kopi susu aren',1],['Kentang goreng',1]],note:'',src:'Pelanggan',ago:3,st:'baru',log:[]},
 {id:'OR-0413',t:'Private',who:'Komunitas Bambu',items:[['Es teh manis',6],['Mie goreng',3]],note:'Diantar setelah 20.00',src:'Kasir Dewi',ago:1,st:'baru',log:[]}],kgd:[]};
ORDS.kmg.unshift({id:'OR-0388',d:isoD(-1),t:'Meja 1',who:'Felix + 3',items:[['Nasi goreng ayam',3],['Es teh manis',4]],note:'',src:'Kasir Dewi',ago:1500,st:'antar',log:[]},{id:'OR-0391',d:isoD(-1),t:'VIP 2',who:'Yohanes + 3',items:[['Kopi susu aren',4],['Kentang goreng',2]],note:'',src:'Pelanggan',ago:1440,st:'antar',log:[]},{id:'OR-0395',d:isoD(-1),t:'Meja 3',who:'Walk-in (Agus)',items:[['Mie goreng',2],['Cafe latte',2]],note:'',src:'Kasir Dewi',ago:1400,st:'antar',log:[]},{id:'OR-0372',d:isoD(-2),t:'Private',who:'Komunitas Bambu',items:[['Paket main 4 orang',2],['Nasi goreng ayam',4]],note:'',src:'Kasir Dewi',ago:2900,st:'antar',log:[]},{id:'OR-0375',d:isoD(-2),t:'Meja 2',who:'Rudi + 3',items:[['Es teh manis',4],['Mie goreng',1]],note:'',src:'Pelanggan',ago:2860,st:'antar',log:[]});
Object.values(ORDS).forEach(L=>L.forEach(o=>{o.ts=Date.now()-o.ago*60000;o.d=o.d||isoD();delete o.ago}));let ordSeq=414;
const ordsOf=id=>ORDS[id]=ORDS[id]||[];
function ordAdd(o){ordsOf(curT).push({id:'OR-0'+(ordSeq++),ts:Date.now(),d:isoD(),st:'baru',log:[],...o})}
const agoTxt=ts=>{const m=Math.max(0,Math.round((Date.now()-ts)/60000));return m<1?'baru saja':m+' menit lalu'};
const ordCanAct=()=>role()==='dapur';
const ordCard=o=>{const nx={baru:['proses','Mulai proses'],proses:['siap','Tandai siap'],siap:['antar','Sudah diantar ke '+o.t]}[o.st],late=o.st!=='antar'&&(Date.now()-o.ts)/60000>15;
 return `<div class="card kds ${late?'late':''}"><div class="row" style="justify-content:space-between;flex-wrap:nowrap"><div><div class="kt">${xe(o.t)}</div><small style="color:var(--mut)">${o.id} · ${xe(o.who)}</small></div><span class="pill ${OST[o.st][1]}">${OST[o.st][0]}</span></div>
 <ul class="kit">${o.items.map(([n,q])=>`<li><b>${q}×</b> ${xe(n)}<div class="kbah">${recLine(n,q)}</div></li>`).join('')}</ul>${o.note?`<div class="knote">${xe(o.note)}</div>`:''}
 <small style="color:${late?'var(--redt,var(--red))':'var(--mut)'};display:block;margin-top:8px">Masuk ${agoTxt(o.ts)} · dari ${xe(o.src)}${late?' · lebih dari 15 menit':''}</small>
 ${nx&&ordCanAct()?`<button type="button" class="btn ${o.st==='siap'?'red':''}" style="width:100%;margin-top:10px" data-ost="${o.id}|${nx[0]}">${nx[1]}</button>`:''}${o.log.length?`<small style="display:block;margin-top:6px;color:var(--mut)">${o.log.map(xe).join(' · ')}</small>`:''}</div>`};
V.dapur=()=>{const L=ordsOf(curT),col=k=>L.filter(o=>o.st===k).sort((a,b)=>a.ts-b.ts),done=L.filter(o=>o.st==='antar'&&o.d===isoD()).sort((a,b)=>b.ts-a.ts),act=L.filter(o=>o.st==='baru'||o.st==='proses'),need=needOf(act);
 return `<h1>Pesanan dapur <span class="code">D-01</span></h1><p class="sub">${ordCanAct()?'Semua pesanan F&B dari kasir dan pelanggan masuk ke sini, urut dari yang paling lama. Tekan tombol di kartu untuk memajukan status. Status langsung terlihat di kasir dan di akun pelanggan.':'Tampilan baca saja. Hanya akun Dapur yang bisa mengubah status pesanan.'}</p>
 <div class="card" style="margin-bottom:16px"><div class="row" style="justify-content:space-between"><h2 style="margin:0">Bahan untuk pesanan aktif <span class="code">D-02</span></h2><small style="color:var(--mut)">${act.length} pesanan Baru dan Diproses, dihitung dari resep</small></div>${Object.keys(need).length?`<div class="bchips">${Object.entries(need).map(([k,v])=>{const st=stock[k],kurang=st&&st.q<v;return `<div class="bchip ${kurang?'bad':''}"><b>${xe(st?st.n:k)}</b><span>${fmtQ(v,st)}</span><small>stok ${st?fmtQ(st.q,st):'-'}${kurang?' · kurang':''}</small></div>`}).join('')}</div>`:'<p style="color:var(--mut);margin:8px 0 0">Tidak ada pesanan aktif.</p>'}</div>
 <div class="kcols">${[['baru','Baru'],['proses','Diproses'],['siap','Siap diantar']].map(([k,l])=>`<div><h2 class="kh">${l} <span class="pill ${OST[k][1]}">${col(k).length}</span></h2>${col(k).map(ordCard).join('')||'<p style="color:var(--mut)">Kosong</p>'}</div>`).join('')}</div>
 <div class="card" style="margin-top:16px"><h2>Sudah diantar hari ini (${done.length})</h2>${done.map(o=>`<div class="price"><span><b>${xe(o.t)}</b> · ${o.id} · ${xe(o.who)}<br><small style="color:var(--mut)">${o.items.map(([n,q])=>q+'× '+xe(n)).join(', ')}</small></span><b><span class="pill p-ok">Diantar</span></b></div>`).join('')||'<p style="color:var(--mut);margin:0">Belum ada.</p>'}</div>`};
const ordStatusCard=(title,L,empty)=>`<div class="card" style="margin-top:16px"><h2>${title}</h2>${L.length?L.slice().sort((a,b)=>b.ts-a.ts).map(o=>`<div class="price"><span><b>${xe(o.t)}</b> · ${o.id} · ${xe(o.who)}<br><small style="color:var(--mut)">${o.items.map(([n,q])=>q+'× '+xe(n)).join(', ')} · ${agoTxt(o.ts)}</small></span><b><span class="pill ${OST[o.st][1]}">${OST[o.st][0]}</span></b></div>`).join(''):`<p style="color:var(--mut);margin:0">${empty}</p>`}</div>`;
const _vk=V.kasir;V.kasir=()=>_vk()+ordStatusCard('Status pesanan dapur <span class="code">D-01</span>',ordsOf(curT).filter(o=>o.st!=='antar'),'Tidak ada pesanan yang sedang diproses.');
const _vp=V.pesan;V.pesan=()=>{const h=_vp();if(role()==='tamu'&&member)return h+ordStatusCard('Pesanan saya',ordsOf(curT).filter(o=>o.who===member.nama),'Belum ada pesanan. Status Baru, Diproses, Siap, lalu Diantar akan muncul di sini.');if(posMeja)return h+ordStatusCard('Status pesanan '+xe(posMeja),ordsOf(curT).filter(o=>o.t===posMeja),'Belum ada pesanan untuk meja ini.');return h};
document.addEventListener('click',e=>{const b=e.target.closest('[data-ost]');if(!b||!ordCanAct())return;const[id,st]=b.dataset.ost.split('|'),o=ordsOf(curT).find(x=>x.id===id);if(!o)return;o.st=st;const nm=staff?staff.nama.split(' ')[0]:'';o.log.push(`${OST[st][0]} ${hhmm(Date.now())}${nm?' oleh '+nm:''}`);toast(st==='antar'?`${o.id} sudah diantar ke ${o.t}`:`${o.id} ${o.t}: ${OST[st][0]}`);rerender()});

/* bahan per resep + rekap pemakaian */
const fmtQ=(v,st)=>`${Math.round(v).toLocaleString('id-ID')} ${st?st.u:''}`;
const recLine=(n,q)=>{const m=menu.find(x=>x.n===n);if(!m||!Object.keys(m.r||{}).length)return '<span style="color:var(--mut)">Resep belum diisi</span>';return Object.entries(m.r).map(([k,v])=>`${xe(stock[k]?stock[k].n:k)} ${fmtQ(v*q,stock[k])}`).join(' · ')};
function needOf(L){const m={};L.forEach(o=>o.items.forEach(([n,q])=>{const r=rOf(menu.find(x=>x.n===n)||{});for(const[k,v]of Object.entries(r))m[k]=(m[k]||0)+v*q}));return m}
let rkR='hari';
const RKR={hari:['Hari ini',d=>d===isoD()],kemarin:['Kemarin',d=>d===isoD(-1)],minggu:['7 hari terakhir',d=>d>=isoD(-6)&&d<=isoD()],tgl:['Pilih tanggal',d=>d===rkD]};let rkD=isoD(-2);
V.rekap=()=>{const L=ordsOf(curT).filter(o=>o.st!=='baru'&&RKR[rkR][1](o.d)),need=needOf(L),tot=Object.entries(need).reduce((a,[k,v])=>a+v*(stock[k]?stock[k].c:0),0);
 const pm={};L.forEach(o=>o.items.forEach(([n,q])=>pm[n]=(pm[n]||0)+q));const cnt=k=>L.filter(o=>o.items.some(([n])=>((menu.find(x=>x.n===n)||{}).r||{})[k])).length;
 return `<h1>Rekap pemakaian bahan <span class="code">G-09</span></h1><p class="sub">Total bahan yang terpakai dari pesanan yang sudah diproses dapur (Diproses, Siap, dan Diantar), dihitung dari resep tiap menu. Pesanan yang masih Baru belum dihitung.${role()==='owner'?' Owner melihat dalam mode baca.':''}</p>
 <div class="card" style="margin-bottom:16px"><div class="row" style="align-items:end"><div class="tabs" style="margin:0">${Object.entries(RKR).map(([k,[l]])=>`<button type="button" class="cat ${rkR===k?'on':''}" data-rkr="${k}">${l}</button>`).join('')}</div>${rkR==='tgl'?`<label class="f" style="margin:0"><span>Tanggal</span><input type="date" id="rkD" value="${rkD}" min="${isoD(-90)}" max="${isoD()}"></label>`:''}</div></div>
 <div class="kpis" style="margin-bottom:16px"><div class="card kpi"><div class="l">Pesanan dihitung</div><div class="v">${L.length}</div><div class="d" style="color:var(--mut)">${Object.values(pm).reduce((a,b)=>a+b,0)} porsi</div></div><div class="card kpi"><div class="l">Jenis bahan terpakai</div><div class="v">${Object.keys(need).length}</div><div class="d" style="color:var(--mut)">dari ${Object.keys(stock).length} bahan gudang</div></div><div class="card kpi"><div class="l">Nilai bahan (HPP)</div><div class="v"><small>Rp</small>${Math.round(tot).toLocaleString('id-ID')}</div><div class="d" style="color:var(--mut)">harga rata-rata gudang</div></div></div>
 <div class="grid g2"><div class="card scroll"><h2>Per bahan</h2>${Object.keys(need).length?`<table class="t2"><thead><tr><th>Bahan</th><th class="n">Terpakai</th><th class="n">Nilai</th><th class="n">Stok sekarang</th></tr></thead><tbody>${Object.entries(need).sort((a,b)=>b[1]*(stock[b[0]]?stock[b[0]].c:0)-a[1]*(stock[a[0]]?stock[a[0]].c:0)).map(([k,v])=>{const st=stock[k];return `<tr><td><b>${xe(st?st.n:k)}</b><br><small style="color:var(--mut)">${cnt(k)} pesanan</small></td><td class="n">${fmtQ(v,st)}</td><td class="n">${rp(v*(st?st.c:0))}</td><td class="n">${st?fmtQ(st.q,st):'-'}</td></tr>`}).join('')}<tr><td><b>Total</b></td><td></td><td class="n"><b>${rp(tot)}</b></td><td></td></tr></tbody></table>`:'<p style="color:var(--mut)">Belum ada pesanan yang diproses di periode ini.</p>'}</div>
 <div class="card"><h2>Per menu</h2>${Object.entries(pm).sort((a,b)=>b[1]-a[1]).map(([n,q])=>`<div class="price" style="display:block"><div class="row" style="justify-content:space-between"><b>${xe(n)}</b><b>${q} porsi</b></div><small style="color:var(--mut)">${recLine(n,q)}</small></div>`).join('')||'<p style="color:var(--mut)">-</p>'}</div></div>`};
document.addEventListener('click',e=>{const b=e.target.closest('[data-rkr]');if(!b)return;rkR=b.dataset.rkr;rerender()});
document.addEventListener('change',e=>{if(e.target.id!=='rkD')return;rkD=e.target.value;rerender()});

/* launching tenant (owner) */
TEN[0].launch={at:'2026-11-02',by:'Hendra Gunawan'};
const apkUrl=t=>`${WEBU}cafe-mahjong.apk`,pwaUrl=t=>`https://${prodUrl(t)}`;
const lMsg=t=>{const ad=staffOf(t.id).find(a=>a.role==='admin');return `Halo ${ad?ad.nama.split(' ')[0]:'Admin'}, aplikasi ${t.n} sudah siap dipakai.\n\nWebsite (bisa dibuka di HP, tablet, dan laptop): ${pwaUrl(t)}\nAndroid (APK): ${apkUrl(t)}\niPhone: buka link website di Safari, tekan tombol Bagikan, lalu pilih "Tambahkan ke Layar Utama".\n\nMasuk dengan username: ${ad?ad.u:'-'}\nPassword awal sudah dikirim saat akun dibuat. Kalau lupa, tekan "Lupa password" di halaman masuk.\n\nSalam, ${staff?staff.nama:'Owner'} · Mahjong Cloud`};
function launchDlg(id){const t=TEN.find(x=>x.id===id),ad=staffOf(t.id).find(a=>a.role==='admin');
 openDlg(`<h2>Launching ${xe(t.n)} <span class="code">O-04</span></h2><p style="margin-top:0;color:var(--mut)">${t.launch?`Sudah launching ${fmtD(t.launch.at)} oleh ${xe(t.launch.by)}. Paket ini bisa dikirim ulang kapan saja.`:'Kirim paket ini ke admin tenant supaya aplikasi bisa diinstal di HP dan tablet cafe.'}</p>
 <div class="row" style="align-items:flex-start;gap:16px;flex-wrap:wrap"><div style="text-align:center">${qrSvg(pwaUrl(t),150)}<br><small style="color:var(--mut)">Pindai untuk instal</small></div>
 <div style="flex:1;min-width:220px"><div class="price"><span>Android (APK)</span><b style="font-size:13px;overflow-wrap:anywhere;text-align:right">${apkUrl(t)}</b></div><div class="price"><span>Website (semua HP & laptop)</span><b style="font-size:13px;overflow-wrap:anywhere;text-align:right">${pwaUrl(t)}</b></div><div class="price"><span>Admin awal</span><b style="font-size:13px;text-align:right">${ad?`${xe(ad.nama)}<br>@${xe(ad.u)} · ${xe(ad.email)}`:'Belum ada'}</b></div></div></div>
 <label class="f" style="margin-top:12px"><span>Pesan yang dikirim</span><textarea id="lMsg" rows="7" style="border:1px solid var(--line);background:var(--bg);border-radius:10px;padding:10px 12px;width:100%;font:inherit;font-size:14px">${xe(lMsg(t))}</textarea></label>
 <div class="row"><button type="button" class="btn ghost" data-lcopy="${id}">Salin link & pesan</button><a class="btn ghost" style="text-decoration:none" target="_blank" rel="noopener" data-lwa="${id}" href="https://wa.me/?text=${encodeURIComponent(lMsg(t))}">Bagikan ke WhatsApp</a><button type="button" class="btn red" data-lmail="${id}" ${ad?'':'disabled'}>Kirim ke email admin</button>${t.launch?'':`<button type="button" class="btn" data-ldone="${id}">Tandai sudah launching</button>`}</div>
 <p class="note">Satu APK yang sama dipakai semua cafe. Setelah admin masuk, akunnya langsung terhubung ke cafe ini. Kode QR membuka website cafe.</p><div class="row" style="justify-content:flex-end"><button type="button" class="btn ghost" data-act="dlgx">Tutup</button></div>`)}
const markLaunch=(t,how)=>{if(!t.launch){t.launch={at:isoD(),by:staff?staff.nama:'Owner'};pushTN(t.id,'ok','Aplikasi sudah di-launching oleh owner. Link instal dikirim '+how+'.')}};
document.addEventListener('click',e=>{const b=e.target.closest('[data-tlaunch],[data-lcopy],[data-lwa],[data-lmail],[data-ldone]');if(!b)return;const d=b.dataset;
 if(d.tlaunch){launchDlg(d.tlaunch);return}
 const t=TEN.find(x=>x.id===(d.lcopy||d.lwa||d.lmail||d.ldone)),ad=staffOf(t.id).find(a=>a.role==='admin'),msg=($('#lMsg')||{}).value||lMsg(t);
 if(d.lcopy){(navigator.clipboard?navigator.clipboard.writeText(msg):Promise.reject()).then(()=>toast('Link dan pesan launching disalin'),()=>{$('#lMsg').select();toast('Tekan Ctrl+C untuk menyalin')})}
 else if(d.lwa){b.href='https://wa.me/?text='+encodeURIComponent(msg);markLaunch(t,'lewat WhatsApp');setTimeout(()=>{closeDlg();toast(t.n+' ditandai sudah launching');rerender()},200)}
 else if(d.lmail){markLaunch(t,'ke email '+ad.email);closeDlg();toast(`Paket launching dikirim ke ${ad.email}. ${t.n} ditandai sudah launching.`);rerender()}
 else if(d.ldone){markLaunch(t,'oleh owner');closeDlg();toast(t.n+' ditandai sudah launching');rerender()}});

/* owner: akun staf semua tenant */
const pwShow=new Set(),PWLOG=[];let pwTen='semua';
const pwLog=(a,act)=>PWLOG.unshift({at:DM()+' '+hhmm(Date.now()),by:staff?staff.nama:'Owner',acc:a.u,nama:a.nama,t:a.t,act});
V.akunstaf=()=>{const L=ACCS.filter(a=>a.t&&a.role!=='tamu'&&(pwTen==='semua'||a.t===pwTen)),ord=['admin','spv','user','dapur'];
 return `<h1>Akun staf semua tenant <span class="code">O-05</span></h1><p class="sub">Daftar akun admin, supervisor, kasir, dan dapur di setiap tenant. Akun pelanggan tidak ditampilkan. Setiap kali password dibuka atau di-reset, kejadiannya dicatat di log akses di bawah.</p>
 <div class="tabs">${[['semua','Semua tenant'],...TEN.map(t=>[t.id,t.n.replace(/^Cafe Mahjong /,'')])].map(([k,l])=>`<button type="button" class="cat ${pwTen===k?'on':''}" data-pwten="${k}">${xe(l)}</button>`).join('')}</div>
 ${TEN.filter(t=>pwTen==='semua'||t.id===pwTen).map(t=>{const A=L.filter(a=>a.t===t.id).sort((a,b)=>ord.indexOf(a.role)-ord.indexOf(b.role));return `<div class="card scroll" style="margin-bottom:16px"><h2>${xe(t.n)} <small style="color:var(--mut);font-weight:400;font-size:14px">${A.length} akun</small></h2><table class="t2 stack"><thead><tr><th>Nama</th><th>Username</th><th>Level</th><th>Status</th><th>Password</th><th></th></tr></thead><tbody>${A.map(a=>{const i=ACCS.indexOf(a),on=pwShow.has(i);return `<tr><td><b>${xe(a.nama)}</b><br><small style="color:var(--mut)">${xe(a.email||'-')}</small></td><td>${xe(a.u)}</td><td>${RL[a.role]}</td><td><span class="pill ${a.off?'p-bad':'p-ok'}">${a.off?'Nonaktif':'Aktif'}</span></td><td><code class="pwv">${on&&!CLOUD?xe(a.pw):'••••••••'}</code>${a.tmp?'<br><small style="color:var(--amber)">password sementara</small>':''}</td><td><div class="row" style="gap:6px;flex-wrap:nowrap">${CLOUD?'':`<button type="button" class="btn ghost sm" data-pwsee="${i}">${on?'Sembunyikan':'Lihat'}</button>`}<button type="button" class="btn ghost sm" data-pwrst="${i}">Reset password</button></div></td></tr>`}).join('')||'<tr><td colspan="6" style="color:var(--mut)">Belum ada akun staf.</td></tr>'}</tbody></table></div>`}).join('')}
 <div class="card"><h2>Log akses password</h2>${PWLOG.length?PWLOG.map(l=>`<div class="price"><span>${l.act==='lihat'?'Melihat password':'Reset password'} <b>@${xe(l.acc)}</b> · ${xe(l.nama)}<br><small style="color:var(--mut)">${xe(tName(l.t))}</small></span><small style="text-align:right;color:var(--mut)">${l.at}<br>${xe(l.by)}</small></div>`).join(''):'<p style="color:var(--mut);margin:0">Belum ada akses.</p>'}</div>
 <p class="note">${CLOUD?'Password disimpan ter-hash dan tidak bisa dibaca siapa pun, termasuk owner. Gunakan Reset password untuk membuat password sementara; pengguna wajib menggantinya saat masuk.':'Prototipe: password ditampilkan apa adanya. Di aplikasi asli password disimpan ter-hash dan tidak bisa dibaca siapa pun, jadi fitur Lihat diganti dengan Reset password sementara.'}</p>`};
document.addEventListener('click',e=>{const b=e.target.closest('[data-pwten],[data-pwsee],[data-pwrst],[data-pwrok]');if(!b||role()!=='owner')return;const d=b.dataset;
 if(d.pwten){pwTen=d.pwten;rerender()}
 else if(d.pwsee&&CLOUD){toast('Password tersimpan terenkripsi dan tidak bisa dilihat. Pakai Reset password.')}
 else if(d.pwsee){const i=+d.pwsee,a=ACCS[i];if(pwShow.has(i))pwShow.delete(i);else{pwShow.add(i);pwLog(a,'lihat')}rerender()}
 else if(d.pwrst){const a=ACCS[+d.pwrst];openDlg(`<h2>Reset password @${xe(a.u)}?</h2><p>${xe(a.nama)} · ${RL[a.role]} · ${xe(tName(a.t))}. Sistem membuat password sementara. Pengguna wajib menggantinya saat login berikutnya, dan password lama langsung tidak berlaku.</p><div class="row"><button type="button" class="btn red" data-pwrok="${d.pwrst}">Buat password sementara</button><button type="button" class="btn ghost" data-act="dlgx">Batal</button></div>`)}
 else if(d.pwrok){const i=+d.pwrok,a=ACCS[i];(CLOUD?CMB.staff('reset',{id:a.id}).then(r=>r.password):Promise.resolve('MC-'+Math.random().toString(36).slice(2,8))).then(np=>{if(!CLOUD){a.pw=np;pwShow.add(i)}a.tmp=true;pwLog(a,'reset');openDlg(`<h2>Password sementara dibuat</h2><p>Berikan ke ${xe(a.nama)} lewat jalur yang aman:</p><p style="font-size:22px;font-weight:800;text-align:center"><code>${np}</code></p><p style="color:var(--mut);font-size:14px">Username: ${xe(a.u)}. Notifikasi juga dikirim ke ${xe(a.email||'-')}.</p><div class="row"><button type="button" class="btn" data-act="dlgx">Selesai</button></div>`)}).catch(err=>toast(err.message))}});

/* mutasi stok harian (G-08) */
const STADJ={kmg:[{d:isoD(-1),k:'telur',q:-4,why:'Opname: 4 telur pecah',by:'Rina Susanti (Supervisor)'},{d:isoD(-2),k:'susu',q:-500,why:'Opname: 1 kotak susu kedaluwarsa',by:'Rina Susanti (Supervisor)'}]};
const adjOf=id=>STADJ[id]=STADJ[id]||[];
function stAdj(k,q,why){adjOf(curT).push({d:isoD(),k,q,why,by:stWho()})}
const logDate=e=>'2026-11-'+e.at.slice(0,2);
const MDAYS=[isoD(-6),isoD(-5),isoD(-4),isoD(-3),isoD(-2),isoD(-1),isoD()];let mtD=isoD();
function mutasi(d){const ks=Object.keys(stock),rows={};let akhir={};ks.forEach(k=>akhir[k]=stock[k].q);
 for(let i=MDAYS.length-1;i>=0;i--){const day=MDAYS[i],ms={},ks2={},kr={};stockLog.filter(e=>logDate(e)===day).forEach(e=>ms[e.k]=(ms[e.k]||0)+(e.q0!=null?e.q0:e.q));
  const use=needOf(ordsOf(curT).filter(o=>o.d===day));adjOf(curT).filter(a=>a.d===day).forEach(a=>kr[a.k]=(kr[a.k]||0)+a.q);
  const R={};ks.forEach(k=>{const m=ms[k]||0,u=use[k]||0,c=kr[k]||0,ak=akhir[k];R[k]={awal:ak-m+u-c,m,u,c,ak}});
  if(day===d)return R;ks.forEach(k=>akhir[k]=R[k].awal)}return{}}
V.mutasi=()=>{const M=mutasi(mtD),ks=Object.keys(stock),lg=stockLog.filter(e=>logDate(e)===mtD),od=ordsOf(curT).filter(o=>o.d===mtD),aj=adjOf(curT).filter(a=>a.d===mtD),dl2=d=>new Date(d+'T00:00:00').toLocaleDateString('id-ID',{weekday:'short',day:'numeric',month:'short'}),f=(v,k)=>v?(v>0?'':'-')+Math.abs(Math.round(v)).toLocaleString('id-ID'):'<span style="color:var(--mut)">-</span>';
 return `<div class="row" style="justify-content:space-between;align-items:flex-start;gap:10px"><h1 style="margin-bottom:0">Mutasi stok harian <span class="code">G-08</span></h1><div class="row" style="margin-top:6px"><a class="btn ghost" href="#gudang" style="text-decoration:none">Kembali ke Gudang</a><button type="button" class="btn ghost" data-act="xmut">Export ke Excel</button></div></div><p class="sub">Pergerakan stok per bahan dalam satu hari: stok awal, masuk dari pembelian, terpakai dari pesanan sesuai resep, koreksi (opname, ubah, atau hapus input), lalu stok akhir. Hanya supervisor, admin tenant, dan owner yang bisa membuka halaman ini.</p>
 <div class="tabs">${MDAYS.map(d=>`<button type="button" class="cat ${mtD===d?'on':''}" data-mtd="${d}">${dl2(d)}</button>`).join('')}</div>
 <div class="card scroll" style="margin-bottom:16px"><table class="t2"><thead><tr><th>Bahan</th><th class="n">Stok awal</th><th class="n">Masuk</th><th class="n">Terpakai</th><th class="n">Harga / satuan</th><th class="n">COGS terpakai</th><th class="n">Koreksi</th><th class="n">Stok akhir</th><th>Status</th></tr></thead><tbody>${ks.map(k=>{const s=stock[k],r=M[k];return `<tr><td><b>${xe(s.n)}</b><br><small style="color:var(--mut)">${s.u} · min ${s.min.toLocaleString('id-ID')}</small></td><td class="n">${Math.round(r.awal).toLocaleString('id-ID')}</td><td class="n" style="color:var(--ok)">${r.m?'+'+r.m.toLocaleString('id-ID'):'<span style="color:var(--mut)">-</span>'}</td><td class="n">${r.u?'-'+Math.round(r.u).toLocaleString('id-ID'):'<span style="color:var(--mut)">-</span>'}</td><td class="n" style="white-space:nowrap">${rp(s.c)}<small style="color:var(--mut)">/${s.u}</small></td><td class="n">${r.u?'<b>'+rp(r.u*s.c)+'</b>':'<span style="color:var(--mut)">-</span>'}</td><td class="n" style="color:var(--amber)">${r.c?(r.c>0?'+':'')+r.c.toLocaleString('id-ID'):'<span style="color:var(--mut)">-</span>'}</td><td class="n"><b>${Math.round(r.ak).toLocaleString('id-ID')}</b></td><td><span class="pill ${r.ak<s.min?'p-warn':'p-ok'}">${r.ak<s.min?'Di bawah minimum':'Aman'}</span></td></tr>`}).join('')}<tr style="border-top:2px solid var(--line)"><td colspan="5"><b>Total COGS bahan terpakai</b><br><small style="color:var(--mut)">terpakai × harga rata-rata beli per satuan</small></td><td class="n"><b class="total" style="font-size:20px">${rp(ks.reduce((a,k)=>a+M[k].u*stock[k].c,0))}</b></td><td colspan="3"></td></tr></tbody></table></div>
 <div class="grid g3"><div class="card"><h2>Stok masuk</h2>${lg.map(e=>`<div class="price"><span>${xe(stock[e.k].n)} +${(e.q0!=null?e.q0:e.q).toLocaleString('id-ID')} ${stock[e.k].u}<br><small style="color:var(--mut)">${e.at} · ${xe(e.sup||'-')}${e.del?' · kemudian dihapus':''}</small></span></div>`).join('')||'<p style="color:var(--mut);margin:0">Tidak ada.</p>'}</div>
 <div class="card"><h2>Pesanan (${od.length})</h2>${od.map(o=>`<div class="price"><span>${o.id} · ${xe(o.t)}<br><small style="color:var(--mut)">${o.items.map(([n,q])=>q+'× '+xe(n)).join(', ')}</small></span><b><span class="pill ${OST[o.st][1]}">${OST[o.st][0]}</span></b></div>`).join('')||'<p style="color:var(--mut);margin:0">Tidak ada.</p>'}</div>
 <div class="card"><h2>Koreksi</h2>${aj.map(a=>`<div class="price"><span>${xe(stock[a.k]?stock[a.k].n:a.k)} ${a.q>0?'+':''}${a.q.toLocaleString('id-ID')} ${stock[a.k]?stock[a.k].u:''}<br><small style="color:var(--mut)">${xe(a.why)} · ${xe(a.by)}</small></span></div>`).join('')||'<p style="color:var(--mut);margin:0">Tidak ada.</p>'}</div></div>`};
document.addEventListener('click',e=>{const b=e.target.closest('[data-mtd],[data-act="xmut"]');if(!b)return;if(b.dataset.mtd){mtD=b.dataset.mtd;rerender();return}
 const M=mutasi(mtD),K=Object.keys(stock),rows=[['Tanggal','Bahan','Satuan','Stok awal','Masuk','Terpakai','Harga per satuan (Rp)','COGS terpakai (Rp)','Koreksi','Stok akhir','Status']].concat(K.map(k=>{const s=stock[k],r=M[k];return[mtD,s.n,s.u,Math.round(r.awal),r.m,-Math.round(r.u),Math.round(s.c*100)/100,Math.round(r.u*s.c),r.c,Math.round(r.ak),r.ak<s.min?'Di bawah minimum':'Aman']}),[['','Total COGS','','','','','',Math.round(K.reduce((a,k)=>a+M[k].u*stock[k].c,0)),'','','']]);
 dl(makeXlsx([{name:'Mutasi '+mtD.slice(8)+' Nov',rows,w:[12,22,9,11,10,11,18,18,10,11,18]}]),`mutasi-stok-${mtD}.xlsx`)});

document.addEventListener('click',e=>{const b=e.target.closest('[data-act="botmore"]'),bm=document.getElementById('botMore');if(b){const o=bm.classList.toggle('open');b.setAttribute('aria-expanded',o);return}if(bm&&bm.classList.contains('open')&&!e.target.closest('#botMore'))bm.classList.remove('open')});
/* ===== Jembatan ke modul cloud (src/cloud.js) ===== */
const BK_DAY=864e5;
const bkToDates=B=>{const o={};Object.entries(B||{}).forEach(([d,L])=>{if(L&&L.length)o[isoD(+d)]=L});return o};
const bkFromDates=B=>{const o={},t0=new Date(D0[0],D0[1],D0[2]).getTime();Object.entries(B||{}).forEach(([d,L])=>{const [y,m,dd]=d.split('-').map(Number);const off=Math.round((new Date(y,m-1,dd).getTime()-t0)/BK_DAY);o[off]=L});return o};
const T_KEYS=['tables','menu','HH','week','stock','bookings','stockLog','tarLog','cfg','orders','adj','opx','notif'];
const blankT=()=>{const c=seedT('new');c.cfg={minH:2,dpPct:30};return c};
const ensureT=id=>{if(!tStore[id]&&id!==curT)tStore[id]=blankT();return id===curT?null:tStore[id]};
const BR={
 T_KEYS,
 get role(){return curRole},get curT(){return curT},get staff(){return staff},get member(){return member},get ownerIn(){return ownerIn},
 get dlgOpen(){return dlgOpen},TEN,INV,ACCS,PAKET,SUBSET,REK_PF,RL,HOME,
 toast,render,rerender,openDlg,closeDlg,xe,isoD,
 exportTenant(id){if(id===curT)saveT();const d=tStore[id];if(!d)return null;
  return {tables:d.tables,menu:d.menu,HH:d.HH,week:d.week,stock:d.stock,bookings:bkToDates(d.bookings),stockLog:d.stockLog||[],tarLog:d.tarLog||[],cfg:d.cfg||{minH:2,dpPct:30},
   orders:ORDS[id]||[],adj:STADJ[id]||[],opx:OPX[id]||null,notif:tNotif[id]||[]}},
 importTenant(id,key,v){if(v==null)return;
  if(['orders','adj','opx','notif'].includes(key)){({orders:ORDS,adj:STADJ,opx:OPX,notif:tNotif})[key][id]=v;return}
  if(key==='bookings')v=bkFromDates(v);
  if(id!==curT){ensureT(id)[key]=v;return}
  if(key==='tables')putA(tables,v);else if(key==='menu')putA(menu,v);else if(key==='HH')putA(HH,v);else if(key==='week')putA(week,v);
  else if(key==='stock')putO(stock,v);else if(key==='bookings')putO(bookings,v);else if(key==='stockLog')stockLog=v;else if(key==='tarLog')tarLog=v;
  else if(key==='cfg'){minH=v.minH??minH;dpPct=v.dpPct??dpPct}
  saveT()},
 /* tenant baru dari server: siapkan wadah kosong */
 ensureTenant(id){ensureT(id)},
 dropTenant(id){delete tStore[id]},
 useTenant(id){if(!id)return;if(id!==curT){if(!tStore[id])tStore[id]=blankT();if(tStore[curT]||TEN.some(t=>t.id===curT))saveT();loadT(id)}},
 setTenants(L){putA(TEN,L);L.forEach(t=>ensureT(t.id))},
 setInvoices(L){putA(INV,L);invSeq=Math.max(1,...L.map(v=>+(String(v.id).match(/(\d+)$/)||[0,0])[1]||0))+1},
 setAccounts(L){const keep=staff?ACCS.find(a=>a.id===staff.id):null;putA(ACCS,L);if(staff){const me=ACCS.find(a=>a.id===staff.id);if(me)staff=me}},
 setPlatform(k,v){if(v==null)return;if(k==='paket')putA(PAKET,v);else if(k==='subset')Object.assign(SUBSET,v);else if(k==='rek')putA(REK_PF,v)},
 exportPlatform(){return {paket:PAKET,subset:SUBSET,rek:REK_PF}},
 /* data publik untuk pelanggan (tanpa nama, bukti, dan harga pokok) */
 exportPublic(id){const d=this.exportTenant(id);if(!d)return null;
  return {tables:d.tables.map(t=>({n:t.n,type:t.type,rate:t.rate,wk:t.wk,st:t.st,at:t.at,bkRate:t.bkRate,startMs:t.startMs,planMin:t.planMin,plan:t.plan})),
   menu:d.menu,HH:d.HH,cfg:d.cfg,stock:Object.fromEntries(Object.entries(d.stock).map(([k,s])=>[k,{n:s.n,u:s.u,q:s.q,min:s.min,c:0}])),
   bookings:Object.fromEntries(Object.entries(d.bookings).map(([day,L])=>[day,L.map(b=>({id:b.id,t:b.t,s:b.s,l:b.l,k:b.k,pl:b.pl}))]))}},
 importPublic(id,p,mine){if(!p)return;const set=(k,v)=>v!=null&&this.importTenant(id,k,v);
  set('tables',(p.tables||[]).map(t=>({...t,fb:[]})));set('menu',p.menu);set('HH',p.HH);set('cfg',p.cfg);set('stock',p.stock);
  const B=structuredClone(p.bookings||{});(mine||[]).filter(b=>b.tenant===id).forEach(b=>{const L=B[b.date]=B[b.date]||[];const i=L.findIndex(x=>x.id===b.id);const v={...b};delete v.tenant;delete v.date;if(i>=0)L[i]=v;else L.push(v)});
  set('bookings',B)},
 setSession(p){
  if(!p){member=null;staff=null;ownerIn=false;curRole='tamu';return}
  if(p.role==='tamu'){staff=null;curRole='tamu';member={id:p.id,nama:p.nama,u:p.username,email:p.email,hp:p.hp,foto:p.foto||undefined};return}
  member=null;curRole=p.role;staff=ACCS.find(a=>a.id===p.id)||{id:p.id,u:p.username,email:p.email,role:p.role,nama:p.nama,t:p.tenant_id};
  if(p.tenant_id)this.useTenant(p.tenant_id)},
 goHome(){const h=HOME[curRole];if(h&&location.hash!=='#'+h)location.hash=h;else render()},
 applyCustomerOrder(o){const T=tables.find(t=>t.n===o.t);(o.items||[]).forEach(([n,q])=>{const m=menu.find(x=>x.n===n);if(!m)return;Object.entries(rOf(m)).forEach(([k,v])=>{if(stock[k])stock[k].q-=v*q});if(T&&T.st!=='free'){T.fb=T.fb||[];const ex=T.fb.find(x=>x[0]===m.n);ex?ex[1]+=q:T.fb.push([m.n,q,m.p])}});saveT()},
 resetCloud(){putA(TEN,[]);putA(ACCS,[]);putA(INV,[]);Object.keys(tStore).forEach(k=>delete tStore[k]);[ORDS,OPX,STADJ,tNotif].forEach(o=>Object.keys(o).forEach(k=>delete o[k]));curT=''},
 pickFirstTenant(){if(!TEN.some(t=>t.id===curT)&&TEN.length){const t=TEN.find(x=>x.on)||TEN[0];this.useTenant(t.id)}}
};
window.CMApp=BR;
if(window.CMB&&window.CMB.attach)window.CMB.attach(BR);else render();

}
