import { useState } from "react";

function ResourceList({ resources = [], onDelete, onUpdate }) {
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    link: "",
    category: "",
    notes: "",
  });

  const startEditing = (item) => {
    setEditingId(item._id);
    setEditForm({
      title: item.title,
      link: item.link,
      category: item.category,
      notes: item.notes,
    });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const submitEdit = () => {
    onUpdate(editingId, editForm);
    setEditingId(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({ title: "", link: "", category: "", notes: "" });
  };

  if (!Array.isArray(resources)) return null;

  return (
    <div className="space-y-4 mt-6">
      {resources.length === 0 ? (
        <p className="text-center text-green-800">
          No resources available yet.
        </p>
      ) : (
        resources.map((item) => (
          <div
            key={item._id}
            className="p-4 border border-stone-300 rounded shadow-sm bg-white"
          >
            {editingId === item._id ? (
              <>
                <div className="space-y-2 mb-4">
                  <label className="block text-green-800 font-semibold">
                    Title:
                  </label>
                  <input
                    name="title"
                    value={editForm.title}
                    onChange={handleEditChange}
                    className="w-full p-2 border border-stone-300 rounded"
                  />

                  <label className="block text-green-800 font-semibold">
                    Link:
                  </label>
                  <input
                    name="link"
                    value={editForm.link}
                    onChange={handleEditChange}
                    className="w-full p-2 border border-stone-300 rounded"
                  />

                  <label className="block text-green-800 font-semibold">
                    Category:
                  </label>
                  <input
                    name="category"
                    value={editForm.category}
                    onChange={handleEditChange}
                    className="w-full p-2 border border-stone-300 rounded"
                  />

                  <label className="block text-green-800 font-semibold">
                    Notes:
                  </label>
                  <textarea
                    name="notes"
                    value={editForm.notes}
                    onChange={handleEditChange}
                    className="w-full p-2 border border-stone-300 rounded"
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={submitEdit}
                    className="bg-green-700 text-white px-3 py-1 rounded hover:bg-green-800 transition"
                  >
                    Save
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="bg-stone-500 text-white px-3 py-1 rounded hover:bg-stone-600 transition"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="text-green-900">
                  <span className="font-semibold text-green-800">Title:</span>{" "}
                  {item.title}
                </p>

                <p className="text-green-900">
                  <span className="font-semibold text-green-800">Link:</span>{" "}
                  <a
                    href={item.link}
                    className="text-green-700 underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.link}
                  </a>
                </p>

                <p className="text-green-900">
                  <span className="font-semibold text-green-800">
                    Category:
                  </span>{" "}
                  {item.category}
                </p>

                <p className="text-green-900">
                  <span className="font-semibold text-green-800">Notes:</span>{" "}
                  {item.notes}
                </p>

                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => startEditing(item)}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(item._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default ResourceList;
