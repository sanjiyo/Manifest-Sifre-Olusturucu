function findUserField(p) {
    const form = p.closest('form') || document;
    const all = Array.from(form.querySelectorAll('input'));
    const idx = all.indexOf(p);
    for (let i = idx - 1; i >= 0; i--) {
        const type = all[i].type.toLowerCase();
        if (type === 'text' || type === 'email' || all[i].name.includes('user')) return all[i];
    }
    return null;
}

function inject() {
    chrome.storage.local.get(['isEnabled', 'len', 'up', 'sp', 'nm', 'vol', 'vault'], (r) => {
        const enabled = r.isEnabled ?? true;
        
        // Eğer kapalıysa butonları kaldır ve çık
        if (!enabled) {
            document.querySelectorAll('.pro-float-group').forEach(el => el.remove());
            document.querySelectorAll('.pro-ready').forEach(el => el.classList.remove('pro-ready'));
            return;
        }

        // Otomatik Doldurma (Sadece aktifken)
        const v = r.vault || [];
        const entry = v.find(item => window.location.hostname.includes(item.url));
        const passFields = document.querySelectorAll('input[type="password"]');
        
        passFields.forEach(input => {
            // Butonları ekle
            if (!input.classList.contains('pro-ready')) {
                input.classList.add('pro-ready');
                const group = document.createElement('div');
                group.className = 'pro-float-group';
                group.innerHTML = `<button class="f-btn gen">🔑</button><button class="f-btn save">💾</button>`;
                document.body.appendChild(group);

                const pos = () => {
                    const rect = input.getBoundingClientRect();
                    if (rect.width === 0) return;
                    group.style.top = (rect.top + window.scrollY + (rect.height / 2) - 14) + 'px';
                    group.style.left = (rect.left + window.scrollX + rect.width - 65) + 'px';
                };
                window.addEventListener('scroll', pos); window.addEventListener('resize', pos);
                pos();

                group.querySelector('.gen').onclick = (e) => {
                    e.preventDefault();
                    const chars = "abcdefghijklmnopqrstuvwxyz" + (r.up?"ABCDEFGHIJKLMNOPQRSTUVWXYZ":"") + (r.sp?"!@#$%^&*":"") + (r.nm?"0123456789":"");
                    let p = "";
                    for(let i=0; i<(r.len||16); i++) p += chars.charAt(Math.floor(Math.random()*chars.length));
                    input.value = p;
                    input.dispatchEvent(new Event('input', { bubbles: true }));
                    navigator.clipboard.writeText(p);
                    const a = new Audio(chrome.runtime.getURL("bildirim.mp3"));
                    a.volume = parseFloat(r.vol || 0.5); a.play().catch(()=>{});
                };

                group.querySelector('.save').onclick = (e) => {
                    e.preventDefault();
                    const u = findUserField(input);
                    const data = { url: window.location.hostname, user: u?u.value:'Bilinmiyor', pass: input.value };
                    const vault = r.vault || [];
                    const idx = vault.findIndex(x => x.url === data.url);
                    if(idx > -1) vault[idx] = data; else vault.push(data);
                    chrome.storage.local.set({ vault }, () => alert("Kaydedildi!"));
                };
            }

            // Autofill (Sadece değer boşsa yap ki kullanıcıyı rahatsız etmesin)
            if (entry && input.value === "") {
                input.value = entry.pass;
                const u = findUserField(input);
                if (u && u.value === "") u.value = entry.user;
                input.dispatchEvent(new Event('input', { bubbles: true }));
            }
        });
    });
}

setInterval(inject, 2000);