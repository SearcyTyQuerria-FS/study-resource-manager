import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Linking,
} from "react-native";
import { useState, useEffect, useCallback } from "react";

// Extract API base URL for cleaner code
const API_URL = "https://study-resource-manager.onrender.com/api/resources";

// Reusable card component
function ResourceCard({ resource, onEdit, onDelete }) {
  return (
    <View className="bg-slate-900 p-4 rounded-xl border border-slate-800 mb-4">
      <Text className="text-lg font-bold text-white mb-1">
        {resource.title}
      </Text>

      {/* Clickable link */}
      <TouchableOpacity onPress={() => Linking.openURL(resource.link)}>
        <Text className="text-purple-400 mb-1 underline">{resource.link}</Text>
      </TouchableOpacity>

      <Text className="text-slate-400 text-sm mb-2">
        Category: {resource.category}
      </Text>

      {resource.notes ? (
        <Text className="text-slate-300 mb-4">{resource.notes}</Text>
      ) : null}

      <View className="flex-row gap-3 mt-2">
        <TouchableOpacity
          className="bg-blue-600 px-4 py-2 rounded-md"
          onPress={() => onEdit(resource)}
        >
          <Text className="text-white font-medium">Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-red-600 px-4 py-2 rounded-md"
          onPress={() => onDelete(resource._id)}
        >
          <Text className="text-white font-medium">Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function Index() {
  // Combined form state
  const [form, setForm] = useState({
    title: "",
    link: "",
    category: "",
    notes: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(false);

  // Helper to reset form + exit edit mode
  const resetForm = () => {
    setForm({ title: "", link: "", category: "", notes: "" });
    setEditingId(null);
  };

  // Fetch resources on mount
  useEffect(() => {
    const fetchResources = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        setResources(data);
      } catch (err) {
        console.error("Error fetching resources:", err);
      }
    };

    fetchResources();
  }, []);

  // Edit handler
  const handleEditClick = useCallback((resource) => {
    setForm({
      title: resource.title,
      link: resource.link,
      category: resource.category,
      notes: resource.notes || "",
    });
    setEditingId(resource._id);
  }, []);

  // Submit handler (POST + PUT)
  const handleSubmit = useCallback(async () => {
    // Basic validation
    if (!form.title.trim() || !form.link.trim()) {
      Alert.alert("Missing Fields", "Title and link are required.");
      return;
    }

    setLoading(true);

    try {
      const resourceData = form;

      if (editingId) {
        // Update existing resource
        const res = await fetch(`${API_URL}/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(resourceData),
        });

        const updated = await res.json();

        setResources((prev) =>
          prev.map((item) => (item._id === editingId ? updated : item)),
        );

        resetForm();
      } else {
        // Create new resource
        const res = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(resourceData),
        });

        const newResource = await res.json();
        setResources((prev) => [newResource, ...prev]);

        resetForm();
      }
    } catch (err) {
      console.error("Error submitting resource:", err);
    } finally {
      setLoading(false);
    }
  }, [form, editingId]);

  // Delete handler
  const handleDeleteResource = useCallback((id) => {
    Alert.alert(
      "Delete Resource",
      "Are you sure you want to delete this resource?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await fetch(`${API_URL}/${id}`, { method: "DELETE" });
              setResources((prev) => prev.filter((r) => r._id !== id));
            } catch (err) {
              console.error("Error deleting resource:", err);
            }
          },
        },
      ],
    );
  }, []);

  return (
    <ScrollView className="flex-1 bg-slate-950 p-4">
      <Text className="text-3xl font-bold text-purple-400 text-center mt-8 mb-6">
        Resource Manager
      </Text>

      {/* Form */}
      <View className="bg-slate-900 p-5 rounded-xl border border-purple-500/30 mb-8">
        <Text className="text-xl font-semibold text-purple-300 mb-4">
          {editingId ? "Edit Resource" : "Add New Resource"}
        </Text>

        <TextInput
          className="bg-slate-800 text-white p-3 rounded-lg mb-3 border border-slate-700 focus:border-purple-500"
          placeholder="Title"
          placeholderTextColor="#94a3b8"
          value={form.title}
          onChangeText={(text) => setForm({ ...form, title: text })}
        />

        <TextInput
          className="bg-slate-800 text-white p-3 rounded-lg mb-3 border border-slate-700 focus:border-purple-500"
          placeholder="Link"
          placeholderTextColor="#94a3b8"
          value={form.link}
          onChangeText={(text) => setForm({ ...form, link: text })}
          autoCapitalize="none"
        />

        <TextInput
          className="bg-slate-800 text-white p-3 rounded-lg mb-3 border border-slate-700 focus:border-purple-500"
          placeholder="Category"
          placeholderTextColor="#94a3b8"
          value={form.category}
          onChangeText={(text) => setForm({ ...form, category: text })}
        />

        <TextInput
          className="bg-slate-800 text-white p-3 rounded-lg mb-4 border border-slate-700 focus:border-purple-500"
          placeholder="Notes"
          placeholderTextColor="#94a3b8"
          multiline
          numberOfLines={3}
          value={form.notes}
          onChangeText={(text) => setForm({ ...form, notes: text })}
          textAlignVertical="top"
        />

        <TouchableOpacity
          className={`${editingId ? "bg-emerald-600" : "bg-purple-600"} p-4 rounded-lg items-center active:opacity-80`}
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text className="text-white font-bold text-lg">
            {loading
              ? "Saving..."
              : editingId
                ? "Update Resource"
                : "Add Resource"}
          </Text>
        </TouchableOpacity>

        {editingId && (
          <TouchableOpacity
            className="mt-3 p-3 rounded-lg items-center border border-slate-700"
            onPress={resetForm}
          >
            <Text className="text-slate-300 font-medium text-base">
              Cancel Edit
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Empty state */}
      {resources.length === 0 && (
        <Text className="text-slate-400 text-center mt-10">
          No resources yet. Add one above!
        </Text>
      )}

      {/* Resource list */}
      <View className="mb-12">
        {resources.map((resource) => (
          <ResourceCard
            key={resource._id}
            resource={resource}
            onEdit={handleEditClick}
            onDelete={handleDeleteResource}
          />
        ))}
      </View>
    </ScrollView>
  );
}
