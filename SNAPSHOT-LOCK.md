# Snapshot dan status lock repositori

## Snapshot prapenyelarasan
- Repositori: `uzieyfamily/uzieyfamily.github.io`
- Branch snapshot: `snapshot/2026-11-11-before-wordpress-sync`
- Commit snapshot: `7d42308324ff1fc1248b944a7f3486010ead4a63`
- URL snapshot: https://github.com/uzieyfamily/uzieyfamily.github.io/tree/snapshot/2026-11-11-before-wordpress-sync

Branch snapshot tersebut diwujudkan sebelum fail laman utama diganti dan halaman tambahan disalin. Ia dikekalkan sebagai salinan rujukan sebelum penyelarasan.

## Status lock teknikal
Snapshot telah disimpan, tetapi semakan GitHub menunjukkan branch snapshot masih `protected: false`. Sambungan GitHub yang digunakan untuk penyelenggaraan ini tidak menyediakan operasi untuk mengaktifkan branch protection atau ruleset. Oleh itu, jangan anggap branch telah dikunci pada peringkat kebenaran GitHub.

Untuk menguatkuasakan lock pada GitHub:
1. Buka Settings → Branches → Add branch protection rule (atau Rules → Rulesets).
2. Sasarkan branch `snapshot/2026-11-11-before-wordpress-sync`.
3. Aktifkan Restrict deletions dan Block force pushes.
4. Jangan benarkan direct pushes; gunakan ruleset/branch protection yang sesuai dengan polisi akaun.

Untuk melindungi laman aktif, sasarkan juga branch `main` dan aktifkan Require a pull request before merging serta Restrict deletions dan Block force pushes. Semak sama ada akaun pemilik boleh memintas peraturan sebelum menganggap lock berkuat kuasa.
