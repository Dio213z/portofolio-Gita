// Foto profil: isi URL langsung menuju gambar, atau path seperti assets/fotoprofil.jpg.
// Foto orang di referensi tidak dipakai sebagai identitas Gita.
window.PORTFOLIO_PROFILE = { imageUrl: "https://files.catbox.moe/o0qg3i.jpg", imageAlt: "Foto Gita Lidia Oktavia", objectPosition: "center" };
// Kontak belum diberikan. Username Instagram tanpa @.
window.PORTFOLIO_CONTACT = { email: "gitalidia25@gmail.com", instagram: "lidiaaoktv" };

// Data Experiment Lab (04 / EXPERIMENT LAB)
window.experimentLab = [
  {
    imageUrl: "https://files.catbox.moe/7gsupi.jpg",
    caption: "Kalkulator",
    label: "01 / Project",
    title: "🧮 Simple Calculator",
    description: "Program Python untuk melakukan operasi hitung dasar seperti tambah, kurang, kali, dan bagi.",
    linkText: "Coba Demo ↗",
    demoType: "calculator"
  },
  {
    imageUrl: "https://files.catbox.moe/43l6eo.jpg",
    caption: "Mini Quiz",
    label: "02 / Project",
    title: "📸 Mini Quiz",
    description: "Quiz interaktif berbasis HTML, CSS, dan JavaScript dengan foto sebagai soal.",
    linkText: "Coba Demo ↗",
    demoType: "quiz"
  },
  {
    imageUrl: "https://files.catbox.moe/s6ifhb.jpg",
    caption: "Daily List",
    label: "03 / Project",
    title: "🌷Daily List",
    description: "Daftar kegiatan harian untuk mencatat dan menandai tugas yang sudah selesai.",
    linkText: "Coba Demo ↗",
    demoType: "daily-list"
  }
];

// Gambar soal opsional: isi URL/path gambar yang sesuai soal.
// Kosong atau gagal dimuat akan memakai visual bawaan, bukan gambar card.
window.PORTFOLIO_QUIZ = [
  { question: "Buah apakah pada gambar ini?", imageUrl: "", visual: "🍎", imageAlt: "Buah merah dengan tangkai", options: ["Apel", "Jeruk", "Pisang", "Anggur"], answer: 0 },
  { question: "Hewan apakah pada gambar ini?", imageUrl: "", visual: "🐈", imageAlt: "Hewan berkumis dan berekor", options: ["Kelinci", "Anjing", "Kucing", "Kuda"], answer: 2 },
  { question: "Benda langit apakah pada gambar ini?", imageUrl: "", visual: "🌙", imageAlt: "Benda langit berbentuk sabit", options: ["Matahari", "Bulan", "Bumi", "Saturnus"], answer: 1 }
];
