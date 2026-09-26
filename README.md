# Gita Lidia Oktavia — Digital Space
Portofolio HTML, CSS, JavaScript. Kelas X RPL 3, absen 23, SMK Krian 1.

## Jalankan
Ekstrak ZIP lalu buka index.html. Font dan ilustrasi tersedia lokal, tanpa npm install. Galeri dapat dibangun dengan Node.js untuk deployment.

## Konsep
Panel kaca transparan, navigasi samping, latar biru bercahaya, susunan dashboard terinspirasi gambar referensi. Tema terang/gelap berlaku di kedua halaman dan pilihan disimpan di browser. Foto orang, kontak, hobi, proyek, serta nilai dalam gambar referensi tidak disalin sebagai fakta Gita.
Kemampuan ditampilkan pada skala 5 bintang: HTML & CSS 3, JavaScript 4, Python 4, Java 3. Tidak diubah menjadi persentase.

## Foto profil & kontak
Edit config.js:
- PORTFOLIO_PROFILE.imageUrl: URL HTTPS langsung menuju gambar atau path seperti assets/fotoprofil.jpg.
- imageAlt: deskripsi foto; objectPosition: posisi pemotongan visual, misalnya center top.
- Jika kosong, website mencoba assets/fotoprofil.png, .jpg, .jpeg, lalu memakai inisial GL.
- Foto pribadi belum diberikan; gambar referensi tidak digunakan sebagai foto Gita.
- PORTFOLIO_CONTACT.email dan instagram: isi data asli. Instagram cukup username tanpa @. Kosong akan menampilkan Belum dicantumkan.

## Tiga demo baru
1. Spektrum Studio: pencampur RGB dan kode HEX, kanal 0–255, reset.
2. Binary Bridge: konversi desimal 0–255 menjadi 8 bit, uraian nilai tempat, validasi input.
3. Key Sprint: latihan mengetik tiga potongan kode, waktu mulai saat input pertama, WPM saat selesai, kecocokan teks saat ini. Kecocokan bukan akurasi historis penekanan tombol. Tempel teks dinonaktifkan; reset mengulang timer.
Ketiganya dibuat untuk portofolio ini dan diberi label demo, bukan klaim proyek atau prestasi terdahulu.

## Galeri prestasi
Masukkan sertifikat/foto ke folder asset dengan nama prestasi1.png, prestasi2.jpg, prestasi3.jpeg, dst.
Tanpa build: gunakan nomor urut dari 1; pencarian berhenti pada nomor pertama yang tidak ada.
Dengan build: semua nomor yang sesuai pola nama akan ditemukan, boleh memiliki celah nomor.
Build: node scripts/build-prestasi.mjs
Hasil: dist, sudah berisi daftar galeri yang dibangkitkan otomatis.

## GitHub / Vercel
Unggah isi hasil ekstrak ZIP ke root repository, termasuk index.html dan vercel.json. Import repo di Vercel. vercel.json sudah mengatur build node scripts/build-prestasi.mjs dan output dist, tanpa framework. Deploy ulang setelah menambahkan prestasi agar daftar diperbarui.
Untuk hosting statis lain, unggah isi dist. GitHub Pages tanpa build tetap mendukung penomoran prestasi berurutan.

## Animasi & aksesibilitas
Orbit profil, cahaya latar, bintang, scan panel, animasi masuk saat scroll, hover kartu, dan ilustrasi demo. Semua dekorasi tidak menangkap klik. Tombol jeda menghentikan animasi CSS. Preferensi reduced motion perangkat dihormati. Menu HP, navigasi keyboard, label bintang untuk pembaca layar, serta dialog yang dapat ditutup dengan Escape disertakan.

Tidak ada formulir kirim pesan palsu atau tombol CV tanpa file. Email & Instagram ditampilkan setelah diisi. Font lokal dan lisensi ada di assets/fonts.

## Interactive Demo

Buka `index.html`, lalu pilih **Coba Demo ↗** pada Experiment Lab. Tidak memerlukan instalasi atau backend. File tambahan: `demos.js` dan `demos.css`; stylesheet utama tidak diubah.

- `config.js`: setiap item `window.experimentLab` memiliki `demoType`: `calculator`, `quiz`, atau `daily-list`.
- Quiz: ubah `window.PORTFOLIO_QUIZ` (minimal 3 soal). `answer` adalah indeks jawaban 0–3; `options` berisi 4 jawaban. Isi `imageUrl` dengan URL/path foto sesuai pertanyaan. `visual` dan `imageAlt` menjadi fallback jika foto kosong/gagal. Untuk soal per project, gunakan properti `questions` pada item tersebut dengan format sama.
- Calculator adalah demo visual JavaScript dari project Python, menggunakan prioritas kali/bagi sebelum tambah/kurang. Mendukung keyboard dan menangani pembagian nol.
- Daily List menyimpan tugas di localStorage browser yang sama. Daftar contoh hanya dibuat saat belum ada data; daftar yang sengaja dikosongkan tetap kosong setelah refresh. Jika penyimpanan tidak tersedia, demo tetap dapat dipakai dan menampilkan pemberitahuan.
- Tutup modal dengan X, Escape, atau klik overlay. Fokus kembali ke tombol pembuka. Modal menghormati pengaturan reduced motion.
- Untuk tipe demo baru, tambahkan renderer yang sesuai dalam `demos.js`, lalu daftarkan pada `renderers`. Tidak ada tautan kosong atau halaman demo terpisah.
