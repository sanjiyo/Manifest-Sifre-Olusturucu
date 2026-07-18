# 🔐 Manifest şifre oluşturucusu (AREM ARMANNNNNNN)

ProPass Ultimate, Chromium tabanlı tarayıcılar (Chrome, Brave, Edge, Opera) için geliştirilmiş, modern, güvenli ve kullanıcı dostu bir şifre yönetim ve üretim uzantısıdır. Manifest V3 standartlarına tam uyumlu olarak geliştirilmiştir.

![Versiyon](https://img.shields.io/badge/version-8.0-blue.svg)
![Platform](https://img.shields.io/badge/platform-Chromium-orange.svg)


## 🚀 Öne Çıkan Özellikler

- **Akıllı Form Tespiti:** Web sitelerindeki şifre alanlarını otomatik olarak algılar ve yanlarına yüzen butonlar (🔑 & 💾) yerleştirir.
- **Site Yapısını Bozmaz:** Geleneksel uzantıların aksine, sitenin DOM yapısına müdahale etmez; butonlar koordinat tabanlı "yüzme" mantığıyla çalışır (GitHub, Facebook vb. sitelerde layout bozulmaz).
- **Güçlü Şifre Üretici:** Büyük harf, sayı ve özel karakter seçenekleriyle kriptografik olarak güvenli şifreler üretir.
- **Otomatik Doldurma (Autofill):** Kasada kayıtlı bir siteye girdiğinizde kullanıcı adı ve şifre alanlarını anında doldurur.
- **Manuel Veri Ekleme:** Sadece formlardan değil, uzantı menüsü üzerinden elle URL ve hesap bilgisi ekleyebilirsiniz.
- **Tıklanabilir Kasa Listesi:** Kasadaki site isimlerine tıklayarak ilgili siteye yeni sekmede gidebilirsiniz.
- **Sesli Geri Bildirim:** Şifre üretildiğinde sesli uyarı verir. Ses seviyesi kullanıcı tarafından ayarlanabilir.
- **Ana Şalter (On/Off):** Uzantıyı tek bir tıklamayla tamamen devre dışı bırakabilir veya aktif edebilirsiniz.
- **Modern Dark Mode:** Şık ve göz yormayan karanlık tema arayüzü.

## 🛠 Kurulum

1. Bu depoyu (repository) bilgisayarınıza indirin veya clone'layın.
2. Tarayıcınızda (Chrome/Brave/Edge) `chrome://extensions/` adresine gidin.
3. Sağ üst köşedeki **"Geliştirici Modu"** (Developer Mode) seçeneğini aktif edin.
4. Sol üstteki **"Paketlenmemiş öğe yükle"** (Load unpacked) butonuna tıklayın.
5. Proje dosyalarının bulunduğu klasörü seçin.
6. İşte bu kadar! ProPass artık aktif.

## 📖 Kullanım

- **🔑 (Anahtar İkonu):** Şifre alanında güçlü bir şifre üretir, forma yazar ve panoya kopyalar.
- **💾 (Disket İkonu):** Mevcut şifreyi ve üstündeki kullanıcı adı/email alanını tespit ederek kasaya kaydeder.
- **Uzantı Menüsü:**
    - Şifre uzunluğunu ve karakter türlerini seçebilirsiniz.
    - Ses seviyesini ayarlayabilirsiniz.
    - Kayıtlı şifrelerinizi görebilir, silebilir veya kopyalayabilirsiniz.
    - Üstteki şalter ile uzantıyı istediğiniz zaman uyku moduna alabilirsiniz.

## 🛡 Güvenlik ve Gizlilik

- **Yerel Depolama:** Tüm verileriniz tarayıcınızın `chrome.storage.local` alanında saklanır. Verileriniz hiçbir uzak sunucuya gönderilmez.
- **Dış Bağlantı Yok:** Uzantı, güvenlik (CSP) gereği dışarıdan hiçbir script (Tailwind CDN vb.) çekmez. Tüm kodlar yereldir.
- **Açık Kaynak:** Kodlar tamamen şeffaftır, incelenebilir ve geliştirilebilir.

## 💻 Teknolojiler

- **Manifest V3**
- **Pure JavaScript** (ES6+)
- **Custom CSS** (Zero Dependencies)
- **Chrome Storage API**

## 📄 Lisans

Bu proje [MIT](LICENSE) lisansı altında korunmaktadır.

---
*Geliştiren: [Senin Adın/Kullanıcı Adın]*
