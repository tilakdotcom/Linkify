// components/Footer.tsx

import Container from "../common/Container";

export default function Footer() {
  return (
    <Container className="py-0">
      <footer className="bg-gray-900 border-t border-gray-800 text-gray-400 text-sm py-6">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>&copy; {new Date().getFullYear()} Shorten URI — Built by Tilak </p>

          <div className="flex items-center gap-4">
            <a href="/docs" className="hover:text-white transition">
              API Docs
            </a>
            <a href="/features" className="hover:text-white transition">
              Features
            </a>
            <a href="/support" className="hover:text-white transition">
              Support
            </a>
          </div>
        </div>
      </footer>
    </Container>
  );
}
