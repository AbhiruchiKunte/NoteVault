import { Link } from "react-router-dom"; // Correct import for react-router-dom
import { PlusIcon } from "lucide-react";

const Navbar = () => {
  return (
    <header className="fixed top-0 w-full bg-base-300 border-b border-base-content/10 z-50"> {/* Added fixed positioning and z-index */}
      <div className="mx-auto max-w-6xl p-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-3xl font-bold text-primary font-mono tracking-tight cursor-pointer">NoteVault</Link> {/* Made title clickable to go home */}
          <div className="flex items-center gap-4">
            <Link to={"/create"} className="btn btn-primary">
              <PlusIcon className="size-5" />
              <span>New Note</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Navbar;