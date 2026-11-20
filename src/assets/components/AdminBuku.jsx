
import React, { useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  BookOpen
} from "lucide-react";

function AdminBuku({
  buku = [],
  onTambah,
  onEdit,
  onHapus
}) {
  const formAwal = {
    judul: "",
    penulis: "",
    kategori: "",
    tahun: "",
    bahasa: "Indonesia",
    sinopsis: "",
    tema: "",
    gambar: "",
    terbaru: false
  };

  const [form, setForm] = useState(formAwal);
  const [editId, setEditId] = useState(null);
  const [tampilForm, setTampilForm] = useState(false);

  const ubahForm = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const simpanBuku = (e) => {
    e.preventDefault();

    const dataBuku = {
      ...form,
      id: editId ?? Date.now(),
      tahun: form.tahun.trim()
    };

    if (editId !== null) {
      onEdit(dataBuku);
    } else {
      onTambah(dataBuku);
    }

    kosongkanForm();
  };

  const editBuku = (item) => {
    setForm({
      judul: item.judul || "",
      penulis: item.penulis || "",
      kategori: item.kategori || "",
      tahun: String(item.tahun || ""),
      bahasa: item.bahasa || "Indonesia",
      sinopsis: item.sinopsis || "",
      tema: item.tema || "",
      gambar: item.gambar || "",
      terbaru: item.terbaru || false
    });

    setEditId(item.id);
    setTampilForm(true);
  };

  const hapusBuku = (id) => {
    if (window.confirm("Yakin ingin menghapus buku ini?")) {
      onHapus(id);
    }
  };

  const kosongkanForm = () => {
    setForm(formAwal);
    setEditId(null);
    setTampilForm(false);
  };

  return (
    <main className="admin-container">
      <div className="admin-header">
        <div>
          <span className="eyebrow">PENGELOLAAN KOLEKSI</span>
          <h1>Kelola Buku</h1>
          <p>Atur koleksi buku Pustaka Kita.</p>
        </div>

        <button
          className="admin-add-btn"
          onClick={() => {
            setForm(formAwal);
            setEditId(null);
            setTampilForm(true);
          }}
        >
          <Plus size={18} /> Tambah Buku
        </button>
      </div>

      <div className="admin-stats">
        <BookOpen size={25} />
        <div>
          <h2>{buku.length}</h2>
          <p>Total Buku Tambahan</p>
        </div>
      </div>

      {tampilForm && (
        <div className="admin-form-box">
          <div className="admin-form-header">
            <h2>
              {editId !== null ? "Edit Buku" : "Tambah Buku Baru"}
            </h2>

            <button type="button" onClick={kosongkanForm}>
              <X />
            </button>
          </div>

          <form onSubmit={simpanBuku}>
            <label>Judul Buku</label>
            <input
              name="judul"
              value={form.judul}
              onChange={ubahForm}
              placeholder="Masukkan judul buku"
              required
            />

            <label>Penulis</label>
            <input
              name="penulis"
              value={form.penulis}
              onChange={ubahForm}
              placeholder="Nama penulis"
              required
            />

            <label>Kategori</label>
            <input
              name="kategori"
              value={form.kategori}
              onChange={ubahForm}
              placeholder="Contoh: Novel"
              required
            />

            <label>Tahun Terbit</label>
            <input
              type="number"
              name="tahun"
              value={form.tahun}
              onChange={ubahForm}
              placeholder="Contoh: 2025"
              required
            />

            <label>Bahasa</label>
            <input
              name="bahasa"
              value={form.bahasa}
              onChange={ubahForm}
              required
            />

            <label>Link Gambar Sampul</label>
            <input
              name="gambar"
              value={form.gambar}
              onChange={ubahForm}
              placeholder="Masukkan URL gambar"
            />

            {form.gambar && (
              <div className="admin-preview">
                <p>Pratinjau sampul:</p>
                <img
                  src={form.gambar}
                  alt="Pratinjau sampul buku"
                />
              </div>
            )}

            <label>Sinopsis</label>
            <textarea
              name="sinopsis"
              value={form.sinopsis}
              onChange={ubahForm}
              placeholder="Tuliskan sinopsis buku"
              required
            />

            <label>Tema Cerita</label>
            <textarea
              name="tema"
              value={form.tema}
              onChange={ubahForm}
              placeholder="Tuliskan tema buku"
              required
            />

            <div className="admin-form-actions">
              <button type="button" onClick={kosongkanForm}>
                Batal
              </button>

              <button type="submit">
                {editId !== null
                  ? "Simpan Perubahan"
                  : "Simpan Buku"}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="admin-table-box">
        <h2>Daftar Buku Tambahan</h2>

        {buku.length === 0 ? (
          <p className="admin-empty">
            Belum ada buku tambahan. Klik Tambah Buku untuk memulai.
          </p>
        ) : (
          buku.map((item) => (
            <div className="admin-book-row" key={item.id}>
              <div className="admin-book-info">
                {item.gambar ? (
                  <img src={item.gambar} alt={item.judul} />
                ) : (
                  <div className="admin-no-image">
                    <BookOpen />
                  </div>
                )}

                <div>
                  <strong>{item.judul}</strong>
                  <p>{item.penulis} · {item.kategori}</p>
                  <small>{item.tahun}</small>
                </div>
              </div>

              <div className="admin-actions">
                <button
                  onClick={() => editBuku(item)}
                  title="Edit"
                >
                  <Pencil size={17} />
                </button>

                <button
                  onClick={() => hapusBuku(item.id)}
                  title="Hapus"
                >
                  <Trash2 size={17} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}

export default AdminBuku;
