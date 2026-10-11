# Taxta

React'da yozilgan vazifalar boshqaruvi ilovasi: Kanban taxta, loyihalar, statistika paneli va zaxira nusxa.

## Imkoniyatlar

- **Kanban taxta** — vazifalarni sichqoncha bilan ustunlar orasida sudrab o'tkazish
- **Ko'p loyihali** — har bir loyihaning o'z taxtasi
- **Umumiy ko'rinish** — hisoblagichlar, haftalik diagramma (SVG), loyiha jarayoni, yaqin muddatlar
- **Qidiruv va filtr** — nom/tavsif bo'yicha qidirish, muhimlik bo'yicha filtr
- **Ma'lumotlar brauzerda saqlanadi** (`localStorage`), JSON orqali eksport/import
- Yorug' va qorong'i rejim (tizim sozlamasiga qarab), mobil qurilmalarga moslashgan

## Texnologiyalar

React 18 · Vite · React Router (HashRouter) · Context + useReducer · lucide-react

## Ishga tushirish

```bash
npm install
npm run dev
```

Production build: `npm run build` (natija `dist/` papkasida).

## GitHub Pages'ga joylash

`HashRouter` ishlatilgani uchun qo'shimcha sozlama shart emas.

1. `npm run build`
2. `dist/` papkasini `gh-pages` branchiga yuboring (masalan, `npx gh-pages -d dist`)
3. Repo Settings → Pages bo'limida `gh-pages` branchini tanlang

## Papkalar

```
src/
  components/   Sidebar, Column, TaskCard, TaskModal, WeekChart
  pages/        Dashboard, Board, Projects, Settings
  store/        StoreContext (reducer + localStorage)
  data/         constants, seed (namunaviy ma'lumotlar)
  utils/        date yordamchilari
```

## Keyingi qadamlar (g'oyalar)

- Backend (Supabase yoki Firebase) bilan sinxronlash
- Vazifaga teglar va izohlar qo'shish
- Taxta ichida tartibni saqlash (ustun ichida sudrab tartiblash)
# taxta
