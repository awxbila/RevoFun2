# 🎮 RevoFun Arcade

**RevoFun Arcade** adalah website mini game berbasis **HTML, CSS, dan JavaScript** dengan tampilan home modern dan beberapa game interaktif yang bisa langsung dimainkan di browser.

---

## ✨ Fitur Utama

- Landing page `RevoFun` dengan logo custom dan tampilan arcade modern
- Section **Tentang RevoFun** terpisah seperti halaman lanjutan
- Tiga mini game yang bisa dimainkan langsung:
  - **Rock Paper Scissors**
  - **Memory Match**
  - **Car Racing**
- Desain UI dipisahkan per halaman agar lebih rapi dan mudah dikembangkan

---

## 🕹️ Daftar Game

### 1. Rock Paper Scissors

File:

- `html/rps.html`
- `css/rps.css`
- `js/rps.js`

Fitur:

- Tampilan start screen modern
- Sistem skor **first to 10**
- Result banner saat match selesai
- Tombol **Start Again**

### 2. Memory Match

File:

- `html/memory.html`
- `css/memory.css`
- `js/memory.js`

Fitur:

- Level bertahap dari **6 sampai 24 kartu**
- Preview kartu selama beberapa detik di awal level
- Sistem **3 nyawa / hearts**
- Pesan kemenangan saat game selesai

### 3. Car Racing

File:

- `html/car.html`
- `css/car.css`
- `js/car.js`

Fitur:

- Mobil player dan musuh menggunakan asset gambar
- Kontrol berbasis lane agar mobil tetap rapi di jalur
- Kecepatan game meningkat seiring waktu
- Score berhenti saat game over

---

## 📁 Struktur Folder

```text
RevoFun2/
├── README.md
├── assets/
│   ├── RFlogo.png
│   └── cars/
│       ├── playercar.png
│       ├── enemycar1.png
│       ├── enemycar2.png
│       └── enemycar3.png
├── css/
│   ├── style.css
│   ├── rps.css
│   ├── memory.css
│   └── car.css
├── html/
│   ├── rps.html
│   ├── memory.html
│   └── car.html
├── js/
│   ├── rps.js
│   ├── memory.js
│   └── car.js
└── index.html
```

---

## 🚀 Cara Menjalankan

### Opsi 1 — Langsung buka di browser

Buka file berikut:

```text
index.html
```

### Opsi 2 — Gunakan Live Server di VS Code

Jika memakai extension **Live Server**, jalankan halaman `index.html` agar navigasi antar game lebih mudah diuji.

---

## 🛠️ Teknologi yang Digunakan

- **HTML5**
- **CSS3**
- **Vanilla JavaScript**

---

## 📌 Catatan

Project ini berfokus pada latihan pembuatan:

- struktur website multi-page
- styling game UI modern
- logika interaktif dengan JavaScript murni

---

## © RevoFun

Made for fun, learning, and arcade-style experimentation.
