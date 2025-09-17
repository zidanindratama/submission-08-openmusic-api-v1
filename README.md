# 🎵 OpenMusic API v1 (Hapi + PostgreSQL)

Proyek ini adalah **RESTful API** untuk mengelola **album** dan **lagu**, dibangun dengan **Node.js (CommonJS)**, **Hapi**, serta **PostgreSQL**.
API memenuhi **kriteria wajib** submission Dicoding (Hapi Plugin, Data Validation, Database dengan Amazon RDS / PostgreSQL) dan dapat dijalankan dengan runner `npm run start`.

---

## ⚙️ Environment Variables

Buat file `.env` di root proyek dengan isi seperti berikut (silakan sesuaikan username/password DB lokal kamu):

```ini
# Konfigurasi server
HOST=0.0.0.0
PORT=5000

# Konfigurasi database PostgreSQL
PGUSER=postgres
PGPASSWORD=yourpassword
PGDATABASE=openmusic
PGHOST=localhost
PGPORT=5432
```

> **Catatan:**
>
> - `PGUSER`, `PGPASSWORD`, `PGDATABASE`, `PGHOST`, dan `PGPORT` wajib diisi sesuai database PostgreSQL yang kamu buat.
> - Pastikan database `openmusic` sudah dibuat terlebih dahulu:
>
>   ```sql
>   CREATE DATABASE openmusic;
>   ```

---

## ✨ Fitur Utama

- **Kriteria 1 – Konfigurasi Proyek**

  - Server Hapi dapat dijalankan dengan `npm run start`.
  - Menggunakan `HOST` dan `PORT` dari `.env`.

- **Kriteria 2 – Pengelolaan Album**

  - CRUD endpoint `/albums` dengan validasi dan format respons sesuai spesifikasi.

- **Kriteria 3 – Pengelolaan Song**

  - CRUD endpoint `/songs`.
  - `GET /songs` mengembalikan daftar ringkas (id, title, performer).
  - `GET /songs/{id}` mengembalikan detail lengkap.

- **Kriteria 4 – Validasi Data**

  - Validasi payload menggunakan **Joi** (name, year, title, performer, genre, dll).

- **Kriteria 5 – Error Handling**

  - **400 Bad Request** → data tidak valid.
  - **404 Not Found** → resource tidak ditemukan.
  - **500 Internal Server Error** → error server.

- **Kriteria 6 – Database**

  - Data disimpan di **PostgreSQL** (persisten).
  - Struktur tabel dikelola dengan **node-pg-migrate**.
  - Kredensial database disimpan di `.env`.

- **Kriteria Opsional**

  - `GET /albums/{id}` menampilkan daftar lagu dalam album.
  - `GET /songs?title=...&performer=...` mendukung pencarian.

---

## 📂 Struktur Proyek

```
openmusic-api-v1/
├─ package.json
├─ .env
├─ pgmigrate.cjs             // konfigurasi migrasi
├─ migrations/               // file migrasi DB
├─ src/
│  ├─ server.js              // bootstrap server
│  ├─ app.js                 // register plugin & global error handler
│  ├─ db/pool.js             // koneksi ke PostgreSQL
│  ├─ utils/                 // custom error classes
│  │   ├─ ClientError.js
│  │   ├─ InvariantError.js
│  │   └─ NotFoundError.js
│  ├─ albums/                // modul album
│  │   ├─ index.js
│  │   ├─ routes.js
│  │   ├─ handler.js
│  │   ├─ service.js
│  │   └─ validator.js
│  └─ songs/                 // modul song
│      ├─ index.js
│      ├─ routes.js
│      ├─ handler.js
│      ├─ service.js
│      └─ validator.js
```

---

## 🧰 Teknologi

- **Node.js** (LTS ≥ 18.13.0)
- **@hapi/hapi** – HTTP server & routing
- **Joi** – validasi payload
- **pg** – koneksi PostgreSQL
- **node-pg-migrate** – migrasi DB
- **dotenv** – environment variable
- **nodemon** (dev)

---

## ▶️ Cara Menjalankan (Lokal/Submission)

1. **Clone & Install**

   ```bash
   git clone https://github.com/zidanindratama/submission-08-openmusic-api-v1
   cd submission-08-openmusic-api-v1
   npm install
   ```

2. **Setup Database**

   - Buat database `openmusic` di PostgreSQL.
   - Isi `.env` sesuai kredensial DB kamu.

3. **Migrasi DB**

   ```bash
   npm run migrate
   ```

4. **Start Server**

   ```bash
   npm run start
   # Server: http://localhost:5000
   ```

---

## 📡 Spesifikasi Endpoint

### 1) Tambah Album — `POST /albums`

**Body:**

```json
{ "name": "Viva la Vida", "year": 2008 }
```

**201:**

```json
{ "status": "success", "data": { "albumId": "album-abc123" } }
```

---

### 2) Detail Album — `GET /albums/{id}`

**200:**

```json
{
  "status": "success",
  "data": {
    "album": { "id": "album-abc123", "name": "Viva la Vida", "year": 2008 }
  }
}
```

**Opsional (dengan songs):**

```json
{
  "status": "success",
  "data": {
    "album": {
      "id": "album-abc123",
      "name": "Viva la Vida",
      "year": 2008,
      "songs": [
        {
          "id": "song-xyz",
          "title": "Life in Technicolor",
          "performer": "Coldplay"
        }
      ]
    }
  }
}
```

---

### 3) Tambah Lagu — `POST /songs`

**Body:**

```json
{
  "title": "Life in Technicolor",
  "year": 2008,
  "performer": "Coldplay",
  "genre": "Indie",
  "duration": 120,
  "albumId": "album-abc123"
}
```

**201:**

```json
{ "status": "success", "data": { "songId": "song-xyz" } }
```

---

### 4) Daftar Lagu — `GET /songs`

**200:**

```json
{
  "status": "success",
  "data": {
    "songs": [
      {
        "id": "song-xyz",
        "title": "Life in Technicolor",
        "performer": "Coldplay"
      }
    ]
  }
}
```

**Opsional – Query:**

- `?title=life`
- `?performer=coldplay`

---

### 5) Detail Lagu — `GET /songs/{id}`

**200:**

```json
{
  "status": "success",
  "data": {
    "song": {
      "id": "song-xyz",
      "title": "Life in Technicolor",
      "year": 2008,
      "performer": "Coldplay",
      "genre": "Indie",
      "duration": 120,
      "albumId": "album-abc123"
    }
  }
}
```

---

### 6) Perbarui Album / Lagu — `PUT /albums/{id}` & `PUT /songs/{id}`

**200:**

```json
{ "status": "success", "message": "Album berhasil diperbarui" }
```

---

### 7) Hapus Album / Lagu — `DELETE /albums/{id}` & `DELETE /songs/{id}`

**200:**

```json
{ "status": "success", "message": "Lagu berhasil dihapus" }
```

**404:**

```json
{ "status": "fail", "message": "Id tidak ditemukan" }
```

---

Semua format respons dan kode status sudah sesuai dengan spesifikasi pengujian Dicoding.
