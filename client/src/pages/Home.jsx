import { useEffect, useState } from "react";
import ResourceForm from "../components/ResourceForm";
import ResourceList from "../components/ResourceList";

function Home() {
  const [resources, setResources] = useState([]);

  // Fetch all resources on load
  useEffect(() => {
    const fetchResources = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/resources");
        const data = await res.json();
        setResources(data);
      } catch (err) {
        console.error("Error fetching resources:", err);
      }
    };

    fetchResources();
  }, []);

  // create
  const handleAdd = (newResource) => {
    setResources((prev) => [newResource, ...prev]);
  };

  // delete
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3000/api/resources/${id}`, {
        method: "DELETE",
      });

      setResources((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Error deleting resource:", err);
    }
  };

  // Update
  const handleUpdate = async (id, updatedData) => {
    try {
      const res = await fetch(`http://localhost:3000/api/resources/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      const data = await res.json();

      setResources((prev) =>
        prev.map((item) => (item._id === id ? data : item)),
      );
    } catch (err) {
      console.error("Error updating resource:", err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-green-800">
        Resource Manager
      </h1>

      <ResourceForm onAdd={handleAdd} />

      <ResourceList
        resources={resources}
        onDelete={handleDelete}
        onUpdate={handleUpdate}
      />
    </div>
  );
}

export default Home;
