# 🎮 RevoFun Arcade

**RevoFun Arcade** adalah kumpulan mini game berbasis **HTML, CSS, dan JavaScript** yang bisa langsung dimainkan di browser tanpa instalasi tambahan. Project ini dibuat dengan gaya arcade modern dan struktur sederhana sehingga mudah dipelajari maupun dikembangkan.

---

## ✨ Highlight Project

- **Landing page** modern dengan branding `RevoFun`
- Terdiri dari **3 mini game interaktif**
- Dibuat tanpa framework, murni dengan **Vanilla JavaScript**
- Struktur file rapi dan cocok untuk **deploy di GitHub Pages**
- Ringan, responsif, dan mudah dijalankan secara lokal

---

## 🕹️ Daftar Game

### 1. Rock Paper Scissors

File terkait:

- `html/rps.html`
- `css/rps.css`
- `js/rps.js`

Fitur utama:

- Start screen dengan tampilan modern
- Sistem skor **first to 10**
- Hasil ronde ditampilkan secara realtime
- Tombol **Start Again** untuk mengulang match

### 2. Memory Match

File terkait:

- `html/memory.html`
- `css/memory.css`
- `js/memory.js`

Fitur utama:

- Level bertahap dari **6 hingga 24 kartu**
- Preview posisi kartu selama **3 detik** di awal level
- Sistem **3 nyawa**
- Progress level dan pesan kemenangan saat game selesai

### 3. Car Racing

File terkait:

- `html/car.html`
- `css/car.css`
- `js/car.js`

Fitur utama:

- Mobil player dan enemy menggunakan asset gambar
- Kontrol **arrow key** dan dukungan sentuhan untuk mobile
- Kecepatan meningkat seiring skor bertambah
- Game over muncul saat tabrakan terjadi

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

> File `index.html` berada di **root project** agar lebih aman dan mudah saat dideploy.

---

## 🚀 Cara Menjalankan Secara Lokal

### Opsi 1 — Buka langsung di browser

Cukup buka file berikut:

```text
index.html
```

### Opsi 2 — Gunakan Live Server di VS Code

Jika memakai extension **Live Server**, jalankan `index.html` agar navigasi antar halaman dan game lebih nyaman diuji.

---

## 🌐 Deploy ke GitHub Pages

Karena project ini bersifat statis, deploy paling praktis adalah dengan **GitHub Pages**.

1. Push project ke repository GitHub
2. Buka menu **Settings** pada repository
3. Masuk ke **Pages**
4. Pada bagian **Build and deployment**, pilih:
   - **Source:** `Deploy from a branch`
   - **Branch:** `main` atau `master`
   - **Folder:** `/ (root)`
5. Simpan pengaturan, lalu tunggu beberapa saat hingga link website aktif

---

## 🛠️ Teknologi yang Digunakan

- **HTML5**
- **CSS3**
- **Vanilla JavaScript**

---

## 📌 Tujuan Project

Project ini dibuat untuk latihan:

- membangun website multi-page sederhana
- membuat tampilan UI game yang menarik
- menerapkan logika interaktif dengan JavaScript murni
- menyiapkan project statis agar siap di-deploy

---

## © RevoFun

Made for fun, learning, and arcade-style experimentation.
