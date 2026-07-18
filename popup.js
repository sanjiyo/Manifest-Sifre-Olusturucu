const el = (id) => document.getElementById(id);

// Ayarları Kaydet
const saveSettings = () => {
    chrome.storage.local.set({
        isEnabled: el('extStatus').checked,
        len: el('len').value,
        up: el('up').checked,
        sp: el('sp').checked,
        nm: el('nm').checked,
        vol: el('vol').value
    });
    
    // UI Güncelle
    toggleUI(el('extStatus').checked);
};

const toggleUI = (enabled) => {
    el('mainContent').style.display = enabled ? 'block' : 'none';
    el('disabledMsg').style.display = enabled ? 'none' : 'block';
    document.body.style.opacity = enabled ? '1' : '0.8';
};

// Yükleme
chrome.storage.local.get(['isEnabled', 'len', 'up', 'sp', 'nm', 'vol', 'vault'], (r) => {
    const enabled = r.isEnabled ?? true;
    el('extStatus').checked = enabled;
    el('len').value = r.len || 16;
    el('lVal').innerText = r.len || 16;
    el('up').checked = r.up ?? true;
    el('sp').checked = r.sp ?? true;
    el('nm').checked = r.nm ?? true;
    el('vol').value = r.vol ?? 0.5;
    
    toggleUI(enabled);
    renderVault(r.vault || []);
});

el('extStatus').onchange = saveSettings;
el('len').oninput = () => { el('lVal').innerText = el('len').value; saveSettings(); };
el('up').onchange = saveSettings;
el('sp').onchange = saveSettings;
el('nm').onchange = saveSettings;
el('vol').oninput = saveSettings;

el('mainGen').onclick = () => {
    const chars = "abcdefghijklmnopqrstuvwxyz" + (el('up').checked ? "ABCDEFGHIJKLMNOPQRSTUVWXYZ" : "") + (el('sp').checked ? "!@#$%^&*()_+" : "") + (el('nm').checked ? "0123456789" : "");
    let p = "";
    for (let i = 0; i < el('len').value; i++) p += chars.charAt(Math.floor(Math.random() * chars.length));
    navigator.clipboard.writeText(p);
    const a = new Audio(chrome.runtime.getURL("bildirim.mp3"));
    a.volume = parseFloat(el('vol').value);
    a.play();
    alert("Kopyalandı: " + p);
};

el('mSave').onclick = () => {
    const url = el('mUrl').value.trim();
    const user = el('mUser').value.trim();
    const pass = el('mPass').value.trim();
    if (!url || !user || !pass) return alert("Eksik alan!");
    chrome.storage.local.get(['vault'], (r) => {
        const v = r.vault || [];
        v.push({ url, user, pass });
        chrome.storage.local.set({ vault: v }, () => {
            el('mUrl').value = ""; el('mUser').value = ""; el('mPass').value = "";
            renderVault(v);
        });
    });
};

function renderVault(v) {
    const list = el('vList');
    list.innerHTML = v.length ? '' : '<center><small style="opacity:0.4">Kasa boş.</small></center>';
    v.forEach((item, i) => {
        const div = document.createElement('div');
        div.className = 'item';
        div.innerHTML = `<div class="info"><a href="https://${item.url}" target="_blank" class="site-link">${item.url}</a><small>${item.user}</small></div>
            <div class="btns"><button class="cp-btn" data-pass="${item.pass}">📋</button><button class="del-btn" data-i="${i}">🗑️</button></div>`;
        list.appendChild(div);
    });
    document.querySelectorAll('.cp-btn').forEach(b => b.onclick = () => { navigator.clipboard.writeText(b.dataset.pass); alert("Kopyalandı!"); });
    document.querySelectorAll('.del-btn').forEach(b => b.onclick = () => { v.splice(b.dataset.i, 1); chrome.storage.local.set({ vault: v }, () => renderVault(v)); });
}