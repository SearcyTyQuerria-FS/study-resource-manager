import { useState } from "react";

function ResourceForm({ onAdd }) {
  const [form, setForm] = useState({
    title: "",
    link: "",
    category: "",
    notes: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(
      "https://study-resource-manager.onrender.com/api/resources",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      },
    );

    const data = await res.json();
    onAdd(data);
    setForm({ title: "", link: "", category: "", notes: "" });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-6 mb-8 bg-stone-100 border border-stone-300 rounded shadow-md"
    >
      <h2 className="text-2xl font-semibold text-green-800 mb-2">
        Add New Resource
      </h2>

      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Title"
        className="w-full p-2 border border-stone-300 rounded focus:outline-none focus:ring-2 focus:ring-green-600"
      />
      <input
        name="link"
        value={form.link}
        onChange={handleChange}
        placeholder="Link"
        className="w-full p-2 border border-stone-300 rounded focus:outline-none focus:ring-2 focus:ring-green-600"
      />
      <input
        name="category"
        value={form.category}
        onChange={handleChange}
        placeholder="Category"
        className="w-full p-2 border border-stone-300 rounded focus:outline-none focus:ring-2 focus:ring-green-600"
      />
      <textarea
        name="notes"
        value={form.notes}
        onChange={handleChange}
        placeholder="Notes"
        className="w-full p-2 border border-stone-300 rounded focus:outline-none focus:ring-2 focus:ring-green-600"
      />

      <button
        type="submit"
        className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition"
      >
        Add Resource
      </button>
    </form>
  );
}

export default ResourceForm;
