import { Inter } from "next/font/google"
import "./globals.css"
import "bootstrap/dist/css/bootstrap.min.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Reservas de Gimnasio",
  description: "Sistema de reservas para clases de gimnasio",
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      {/* Aplicamos la clase dark al body para activar el modo oscuro por defecto */}
      <body className={`${inter.className} dark`}>{children}</body>
    </html>
  )
}



import './globals.css'