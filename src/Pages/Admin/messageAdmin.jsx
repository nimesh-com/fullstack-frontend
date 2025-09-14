import { useState, useEffect } from "react";
import { FiTrash2, FiMail, FiCheckCircle } from "react-icons/fi";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "../../Components/loader";
import Paginator from "../../Components/paginator";

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  // Fetch messages
  useEffect(() => {
    if (loading) {
      axios
        .get(
          import.meta.env.VITE_BACKEND_URL + "/api/contacts/" + page + "/" + limit,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`, // ✅ use adminToken
            },
          }
        )
        .then((res) => {
          setMessages(res.data.messages);
          setTotalPages(res.data.totalPages);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          toast.error("Failed to fetch messages");
          setLoading(false);
        });
    }
  }, [loading, page, limit]);

  // Mark as read/unread
  const toggleRead = async (id, currentStatus) => {
    try {
      await axios.put(
        import.meta.env.VITE_BACKEND_URL + "/api/contacts/" + id,
        { read: !currentStatus },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success(`Message marked as ${!currentStatus ? "read" : "unread"}`);
      setLoading(true);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update status");
    }
  };

  // Delete message
  const deleteMessage = async (id) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;
    try {
      await axios.delete(
        import.meta.env.VITE_BACKEND_URL + "/api/contacts/" + id,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success("Message deleted successfully");
      setLoading(true);
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete message");
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {/* Page Title with Icon */}
      <div className="flex items-center gap-2 mb-6">
        <FiMail className="text-[#00809D] text-3xl" />
        <h2 className="text-2xl font-bold text-[#00809D]">User Messages</h2>
      </div>

      {loading && <Loader />}

      <div className="space-y-4">
        {messages.map((msg) => (
          <div
            key={msg._id}
            className={`bg-white shadow-md rounded-lg p-4 flex justify-between items-start transition hover:shadow-lg border-l-4 ${
              msg.status ? "border-green-400" : "border-yellow-400"
            }`}
          >
            {/* Left: Message details */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="font-semibold text-lg">{msg.name}</h3>
                <span className="text-sm text-gray-500">{msg.email}</span>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    msg.status
                      ? "bg-green-100 text-green-600"
                      : "bg-yellow-100 text-yellow-600"
                  }`}
                >
                  {msg.status ? "Read" : "Unread"}
                </span>
              </div>
              <p className="text-gray-700 text-sm mb-1">{msg.subject}</p>
              <p className="text-gray-600 text-sm line-clamp-2">{msg.message}</p>
              {msg.phone && (
                <p className="text-gray-500 text-sm mt-1">Phone: {msg.phone}</p>
              )}
            </div>

            {/* Right: Actions */}
            <div className="flex flex-col gap-2 ml-4">
              <button
                onClick={() => toggleRead(msg._id, msg.read)}
                className={`flex items-center gap-1 px-3 py-1 rounded-lg text-white ${
                  msg.read
                    ? "bg-yellow-500 hover:bg-yellow-600"
                    : "bg-green-500 hover:bg-green-600"
                } transition`}
              >
                <FiCheckCircle />
                {msg.read ? "Mark Unread" : "Mark Read"}
              </button>
              <button
                onClick={() => deleteMessage(msg._id)}
                className="flex items-center gap-1 px-3 py-1 rounded-lg bg-red-500 hover:bg-red-600 text-white transition"
              >
                <FiTrash2 />
                Delete
              </button>
            </div>
          </div>
        ))}

        {messages.length === 0 && !loading && (
          <p className="text-gray-500 italic text-center">No messages found.</p>
        )}
      </div>

      {/* ✅ Paginator placed separately for visibility */}
      <div className="mt-6 flex justify-center">
        <Paginator
          currentPage={page}
          totalPages={totalPages}
          setLimit={setLimit}
          setCurrentPage={setPage}
          limit={limit}
          setLoading={setLoading}
        />
      </div>
    </div>
  );
}
