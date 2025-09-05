import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-screen flex flex-col bg-gray-50">
      {/* Logo */}
      <header className="p-4">
        <h1 className="text-2xl font-bold text-blue-600">TBcare</h1>
      </header>

      {/* Main content */}
      <main className="flex flex-col flex-1 items-center justify-center text-center px-4">
        <h2 className="text-3xl font-bold mb-4 text-blue-600">Welcome to TBcare</h2>
        <p className="text-gray-600 mb-8">
          Please select your role to continue
        </p>

        <div className="space-y-4 w-full max-w-xs">
          <button
            onClick={() => navigate("/SignUpPatient")}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700"
          >
            I’m a Patient
          </button>

          <button
            onClick={() => navigate("/SignUpDoctor")}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
          >
            I’m a Doctor
          </button>
        </div>
      </main>
    </div>
  );
};

export default Landing;
