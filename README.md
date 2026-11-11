# Kedai Print dan Fotostat Uziey Family

Laman web satu halaman yang responsif untuk GitHub Pages. Kandungan menggunakan Bahasa Melayu dan fail HTML/CSS/JavaScript biasa — tiada framework atau proses build diperlukan.

## Repositori dan laman web

- Repositori: https://github.com/uzieyfamily/welcome
- Fail laman utama: `index.html` di direktori root.
- Alamat GitHub Pages: https://uzieyfamily.github.io/welcome/

## Maklumat kedai semasa

- Telefon: **+6011-58769834**
- Waktu operasi: **Isnin hingga Sabtu, 9.00 pagi–6.00 petang**
- Ahad dan cuti umum: **Tutup**
- WhatsApp dan alamat: belum diberikan.

## Kemas kini butiran kedai

Buka `index.html` dan cari bahagian `const STORE` berhampiran hujung fail:

```js
const STORE = {
  whatsapp: "",
  phone: "+6011-58769834",
  address: "",
  hours: "Isnin hingga Sabtu: 9.00 pagi–6.00 petang · Ahad dan cuti umum: Tutup"
};
```

WhatsApp dan alamat dibiarkan kosong sehingga maklumat tersebut disahkan.

## Terbitkan dengan GitHub Pages

1. Buka **Settings → Pages** di repositori ini.
2. Di bahagian **Build and deployment**, pilih **Deploy from a branch**.
3. Pilih branch `main` dan folder `/(root)`, kemudian tekan **Save**.
4. Tunggu GitHub Pages selesai menerbitkan laman. Status dan pautan laman akan dipaparkan dalam bahagian Pages.

Lihat [UPDATES.md](UPDATES.md) untuk rekod perubahan.

Rujukan rasmi: https://docs.github.com/en/pages/quickstart
