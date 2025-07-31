import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import RateLimitedUI from "../components/RateLimitedUI";
import api from "../lib/axios";
import toast from "react-hot-toast";
import NoteCard from "../components/NoteCard";
import NotesNotFound from "../components/NotesNotFound";
import { SearchIcon } from "lucide-react";

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes");
        console.log(res.data);
        setNotes(res.data);
        setIsRateLimited(false);
      } catch (error) {
        console.log("Error fetching notes");
        console.log(error.response);
        if (error.response?.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Failed to load notes");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-base-100">
      <Navbar />
      <div className="max-w-7xl mx-auto p-4 pt-24"> {/* Changed pt-20 to pt-24 */}
        {isRateLimited && <RateLimitedUI />}
        {!isRateLimited && (
          <div className="space-y-12"> {/* Changed space-y-8 to space-y-12 */}
            <div className="relative mb-6">
              <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-base-content/60 size-5" />
              <input
                type="text"
                placeholder="Search notes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-base-300 border border-base-content/20 rounded-lg text-base-content placeholder-base-content/50
                           focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 shadow-inner-custom"
              />
            </div>
            {loading && <div className="text-center text-primary py-10 text-xl font-heading animate-pulse">Loading notes...</div>}
            {!loading && filteredNotes.length === 0 && (
              <NotesNotFound />
            )}
            {!loading && filteredNotes.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredNotes.map((note) => (
                  <NoteCard key={note._id} note={note} setNotes={setNotes} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default HomePage;