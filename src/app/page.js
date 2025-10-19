import Navbar from "./components/Navbar";
import Camera from "./components/Camera";
import Footer from "./components/Footer";
export default function Home() {
  return (
    
    <main className="bg-gray-950 min-h-screen py-2">
      <div className="max-w-2xl mx-auto space-y-8 px-4">
        <div>
          <header className="text-center">
            <h1
              className="text-4xl font-extrabold bg-gradient-to-r  from-green-600 via-green-400 to-green-400 text-transparent bg-clip-text shadow-lg inline-block"
              style={{ filter: "drop-shadow(5 5 10pxrgba(12, 185, 59, 0.5))" }}
            >
              KevFace | Prediksi Muka Jelek Anda
            </h1>
            <p className="text-green-500">
              Meramal Berdasarkan Foto Selfie Anda
            </p>
          </header>
        </div>
        <Camera />
        <Footer />
      </div>
    </main>
  );
}
