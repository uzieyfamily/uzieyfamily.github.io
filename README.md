# Kedai Print dan Fotostat Uziey Family

Laman web satu halaman yang responsif untuk GitHub Pages. Kandungan menggunakan Bahasa Melayu dan fail HTML/CSS/JavaScript biasa — tiada framework atau proses build diperlukan.

## Repositori dan laman web

- Repositori: https://github.com/uzieyfamily/welcome
- Fail laman utama: `index.html` di direktori root.
- Alamat GitHub Pages: https://uzieyfamily.github.io/welcome/

## Sebelum diterbitkan

Buka `index.html` dan cari bahagian `const STORE` berhampiran hujung fail. Masukkan maklumat sebenar kedai:

```js
const STORE = {
  whatsapp: "60123456789", // format antarabangsa, tanpa +, ruang atau sengkang
  phone: "03-1234 5678",
  address: "Alamat penuh kedai",
  hours: "Isnin–Sabtu: 9.00 pagi–6.00 petang"
};
```

Gantikan semua contoh di atas dengan butiran sebenar. Biarkan medan kosong jika belum mahu dipaparkan. Pastikan senarai perkhidmatan menggambarkan perkhidmatan yang benar-benar ditawarkan oleh kedai.

## Terbitkan dengan GitHub Pages

1. Buka **Settings → Pages** di repositori ini.
2. Di bahagian **Build and deployment**, pilih **Deploy from a branch**.
3. Pilih branch `main` dan folder `/(root)`, kemudian tekan **Save**.
4. Tunggu GitHub Pages selesai menerbitkan laman. Status dan pautan laman akan dipaparkan dalam bahagian Pages.

## Rekod perubahan

Lihat [UPDATES.md](UPDATES.md) untuk ringkasan kemas kini. Versi sebelum kemas kini 11 November 2026 disimpan pada branch `snapshot/2026-11-11-before-refresh`.

Rujukan rasmi: https://docs.github.com/en/pages/quickstart
