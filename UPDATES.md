# Rekod Kemas Kini

## 11 November 2026 — Penyelarasan dengan WordPress dan snapshot

- Menyelaraskan reka bentuk dan kandungan GitHub Pages dengan laman WordPress Uziey Family.
- Menambah amaran CASH ONLY dan keselamatan QR Code pada halaman utama serta footer.
- Menambah navigasi untuk Utama, Perkhidmatan, Cara Urusan, Hubungi, Tempahan / Permohonan Sebut Harga, Updates dan Tentang.
- Menambah halaman Dasar Privasi dan Terma Perkhidmatan.
- Menambah pautan Google Form permohonan dan WhatsApp.
- Mengekalkan anggaran harga rujukan cetakan/fotostat 2026/2027 dengan nota bahawa ia bukan harga rasmi.
- Menyimpan versi sebelum penyelarasan pada branch `snapshot/2026-11-11-before-wordpress-sync`.

Fail utama: [index.html](index.html), [assets/site.css](assets/site.css), [assets/site.js](assets/site.js).

## 11 November 2026 — Penerbitan pada domain utama GitHub Pages

- Menggunakan repositori `uzieyfamily/uzieyfamily.github.io` sebagai repositori laman pengguna.
- Mengekalkan `index.html` pada direktori utama supaya laman diterbitkan pada domain akar `https://uzieyfamily.github.io/`.
- Membetulkan pautan repositori dan laman web dalam `README.md`.

## 11 November 2026 — Kemas kini laman Uziey Family

- Menyediakan versi HTML responsif untuk GitHub Pages.
- Menambah maklumat telefon, alamat dan waktu operasi kedai.
- Menambah anggaran sebut harga 2026/2027 serta pautan WhatsApp.


## 11 November 2026 — Pop-up CASH ONLY dan keselamatan QR Code

- Menambah pop-up CASH ONLY dan amaran hack/penipuan QR Code yang dipaparkan secara automatik pada lawatan pertama setiap sesi pelayar.
- Menambah butang untuk membuka semula pop-up CASH ONLY dan amaran QR Code pada footer setiap halaman.
- Menambah butang untuk membuka semula pop-up daripada notis utama.
- Mengekalkan notis statik pada halaman utama dan footer sebagai peringatan tambahan.
- Memperjelas pautan Dasar Privasi (Privacy Policy) dan Terma Perkhidmatan (Terms of Service) pada footer.
- Menyimpan versi sebelum perubahan pada branch `snapshot/2026-11-11-before-cash-only-popup`.


## 15 November 2026 — World Watch public dashboard

- Menambah halaman awam `/world-watch/` untuk jam dunia, zon waktu, amaran bencana dan peta ancaman siber.
- Menambah jam digital Kuala Lumpur serta dua jam analog: pergerakan arah jam dan lawan arah jam dengan susunan dail songsang.
- Menambah jam digital untuk beberapa bandar dunia menggunakan pangkalan zon waktu IANA pada pelayar.
- Menambah feed gempa bumi USGS 24 jam dengan pautan GeoJSON dan peta rasmi.
- Menambah semakan feed tsunami NOAA PTWC dan NTWC serta pautan ke tsunami.gov.
- Menambah semakan notis gunung berapi USGS / GDACS jika feed tersedia.
- Menambah pautan / panel peta Check Point, Kaspersky dan FortiGuard dengan pautan terus sebagai fallback jika iframe disekat.
- Menambah pautan sokongan pencipta ke profil GitHub dan repositori.
- Menambah pautan World Watch pada menu desktop dan mudah alih halaman awam serta butang akses pada homepage.
- Menyimpan keadaan asal sebelum perubahan pada branch `snapshot/2026-11-15-before-world-dashboard`.

Nota: capaian feed pihak ketiga boleh bergantung pada CORS, rangkaian, dan ketersediaan pembekal. Dashboard bukan sumber arahan kecemasan.

- Menambah pautan rujukan MET Malaysia, myGempa dan myTide untuk konteks amaran serta pemantauan tempatan Malaysia.
- Menambah GDACS API sebagai sumber tambahan kejadian tsunami global.
- Membetulkan pembacaan medan `volcano_name`, `alert_level`, `sent_utc` dan `notice_url` daripada API notis gunung berapi USGS.

## 15 November 2026 — Kemas kini Support Creator

- Menambah pautan SociaBuzz Jay Freddy: https://sociabuzz.com/jayfreddy.
- Menambah pautan Ko-fi Jay Freddy: https://ko-fi.com/jayfreddy.
- Menambah hub pautan solo.to Jay Freddy: https://solo.to/jayfreddy.
- Menyusun semula bahagian sokongan dalam tiga kad responsif dengan penerangan ringkas dan butang tindakan yang lebih jelas.
- Mengekalkan pautan profil GitHub dan bintang repositori sebagai pilihan sokongan komuniti tambahan.

- Menambah butang khas **Support Creator** di sebelah **Hubungi** pada navigasi desktop World Watch, serta pautan yang sepadan dalam menu mudah alih.
- Menyerlahkan butang menggunakan warna aksen cyan, bentuk pill, keadaan hover dan fokus papan kekunci; pautan menuju terus ke bahagian sokongan pencipta.
