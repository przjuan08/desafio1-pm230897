"use client"

import { useState } from "react"
import { Container, Row, Col, Alert } from "react-bootstrap"
import ListaClases from "@/componentes/ListaClases"
import ResumenReserva from "@/componentes/ResumenReserva"

// Datos iniciales de clases disponibles con múltiples horarios y categorías
const clasesIniciales = [
  {
    id: 1,
    nombre: "Yoga",
    descripcion: "Clase de yoga para todos los niveles",
    instructor: "María González",
    categoria: "Yoga",
    horarios: [
      { hora: "Lunes 10:00 AM - 11:30 AM", cuposDisponibles: 15 },
      { hora: "Martes 08:00 AM- 09:30 AM", cuposDisponibles: 12 },
      { hora: "Miércoles 5:00 PM - 6:30 PM", cuposDisponibles: 10 },
      { hora: "Jueves 7:00 PM - 8:30 PM", cuposDisponibles: 8 },
      { hora: "Viernes 07:00 AM - 08:30 AM", cuposDisponibles: 20 },
    ],
    imagen: "/imagenes/yoga.jpg",
  },
  {
    id: 2,
    nombre: "Spinning",
    descripcion: "Clase de ciclismo de alta intensidad",
    instructor: "Carlos Rodríguez",
    categoria: "Spinning",
    horarios: [
      { hora: "Lunes 6:00 PM - 7:00 PM", cuposDisponibles: 20 },
      { hora: "Miércoles 12:00 MD  - 1:00 PM", cuposDisponibles: 15 },
      { hora: "Jueves 4:00 PM - 5:00 PM", cuposDisponibles: 18 },
      { hora: "Viernes 7:00 PM - 8:00 PM", cuposDisponibles: 25 },
      { hora: "Sábado 08:00 AM - 09:00 AM", cuposDisponibles: 10 },
    ],
    imagen: "/imagenes/spinning.jpg",
  },
  {
    id: 3,
    nombre: "Zumba",
    descripcion: "Baila al ritmo de la música en una clase divertida y enérgica",
    instructor: "Laura Martínez",
    categoria: "Zumba",
    horarios: [
      { hora: "Lunes 12:00 MD - 1:00 PM", cuposDisponibles: 10 },
      { hora: "Martes 6:00 PM - 7:00 PM", cuposDisponibles: 15 },
      { hora: "Miércoles 10:00 AM - 11:00 AM", cuposDisponibles: 20 },
      { hora: "Jueves 4:00 PM - 5:00 PM", cuposDisponibles: 12 },
      { hora: "Viernes 09:00 AM - 10:00 AM", cuposDisponibles: 18 },
    ],
    imagen: "/imagenes/zumba.jpg",
  },
  {
    id: 4,
    nombre: "Pesas",
    descripcion: "Entrenamiento con pesas para mejorar fuerza y resistencia",
    instructor: "Juan Pérez",
    categoria: "Pesas",
    horarios: [
      { hora: "Lunes 08:00 AM - 09:30 AM", cuposDisponibles: 12 },
      { hora: "Martes 09:00 AM - 10:30 AM", cuposDisponibles: 15 },
      { hora: "Miércoles 5:00 PM - 6:30 PM", cuposDisponibles: 10 },
      { hora: "Jueves 4:00 PM - 5:30 PM", cuposDisponibles: 8 },
      { hora: "Viernes 06:30 AM - 08:00 AM", cuposDisponibles: 20 },
    ],
    imagen: "/imagenes/pesas.jpg",
  },
  {
    id: 5,
    nombre: "Boxeo",
    descripcion: "Clase intensa de boxeo para mejorar la resistencia y fuerza",
    instructor: "Javier Sánchez",
    categoria: "Boxeo",
    horarios: [
      { hora: "Lunes 4:00 PM - 5:00 PM", cuposDisponibles: 10 },
      { hora: "Martes 8:00 AM - 9:00 AM", cuposDisponibles: 14 },
      { hora: "Miércoles 6:00 PM - 7:00 PM", cuposDisponibles: 20 },
      { hora: "Jueves 4:00 PM - 5:00 PM", cuposDisponibles: 18 },
      { hora: "Sábado 09:00 AM - 10:00 AM", cuposDisponibles: 12 },
    ],
    imagen: "/imagenes/boxeo.jpeg",
  },
  {
    id: 6,
    nombre: "Pilates",
    descripcion: "Clase de pilates para mejorar la flexibilidad y fuerza",
    instructor: "Andrea Ruiz",
    categoria: "Pilates",
    horarios: [
      { hora: "Lunes 08:00 AM - 09:30 AM", cuposDisponibles: 12 },
      { hora: "Martes 11:00 AM - 12:30 MD", cuposDisponibles: 10 },
      { hora: "Miércoles 2:00 PM - 3:30 PM", cuposDisponibles: 8 },
      { hora: "Jueves 09:00 AM - 10:30 AM", cuposDisponibles: 15 },
      { hora: "Viernes 12:00 MD - 1:30 PM", cuposDisponibles: 20 },
    ],
    imagen: "/imagenes/pilates.jpg",
  },
]

export default function Home() {
  // Estado para almacenar las clases disponibles
  const [clases, setClases] = useState(clasesIniciales)

  // Estado para almacenar las reservas del usuario
  const [reservas, setReservas] = useState([])

  // Estado para mensajes de alerta
  const [alerta, setAlerta] = useState(null)

  // Función para reservar una clase
  const reservarClase = (claseId, horario) => {
    // Buscamos la clase seleccionada
    const claseSeleccionada = clases.find((clase) => clase.id === claseId)

    if (!claseSeleccionada) {
      mostrarAlerta("danger", "La clase seleccionada no existe")
      return
    }

    // Verificamos si el horario seleccionado tiene cupos disponibles
    const horarioSeleccionado = claseSeleccionada.horarios.find((h) => h.hora === horario)
    if (horarioSeleccionado.cuposDisponibles <= 0) {
      mostrarAlerta("danger", "No hay cupos disponibles para este horario")
      return
    }

    // Verificamos si el usuario ya tiene una reserva para esta clase
    const reservaExistente = reservas.find((reserva) => reserva.claseId === claseId && reserva.horario === horario)
    if (reservaExistente) {
      mostrarAlerta("warning", "Ya tienes una reserva para este horario")
      return
    }

    // Actualizamos los cupos disponibles
    const clasesActualizadas = clases.map((clase) => {
      if (clase.id === claseId) {
        const horariosActualizados = clase.horarios.map((h) => {
          if (h.hora === horario) {
            return { ...h, cuposDisponibles: h.cuposDisponibles - 1 }
          }
          return h
        })
        return { ...clase, horarios: horariosActualizados }
      }
      return clase
    })

    // Creamos la nueva reserva
    const nuevaReserva = {
      id: Date.now(), // Generamos un ID único basado en la fecha actual
      claseId,
      nombreClase: claseSeleccionada.nombre,
      horario,
      fechaReserva: new Date().toLocaleDateString(),
    }

    // Actualizamos los estados
    setClases(clasesActualizadas)
    setReservas([...reservas, nuevaReserva])
    mostrarAlerta("success", `¡Reserva para ${claseSeleccionada.nombre} en el horario ${horario} realizada con éxito!`)

    // Forzamos el desplazamiento a la parte superior después de la reserva
    setTimeout(() => {
      window.scrollTo(0, 0)
    }, 100) // Pequeño retraso para asegurarse de que se complete la acción
  }

  // Función para cancelar una reserva
  const cancelarReserva = (reservaId) => {
    const reservaACancelar = reservas.find((reserva) => reserva.id === reservaId)

    if (!reservaACancelar) {
      mostrarAlerta("danger", "La reserva no existe")
      return
    }

    const clasesActualizadas = clases.map((clase) => {
      if (clase.id === reservaACancelar.claseId) {
        const horariosActualizados = clase.horarios.map((h) => {
          if (h.hora === reservaACancelar.horario) {
            return { ...h, cuposDisponibles: h.cuposDisponibles + 1 }
          }
          return h
        })
        return { ...clase, horarios: horariosActualizados }
      }
      return clase
    })

    const reservasActualizadas = reservas.filter((reserva) => reserva.id !== reservaId)

    setClases(clasesActualizadas)
    setReservas(reservasActualizadas)
    mostrarAlerta("success", `Reserva para ${reservaACancelar.nombreClase} en el horario ${reservaACancelar.horario} cancelada con éxito`)
  }

  // Función para mostrar alertas temporales
  const mostrarAlerta = (tipo, mensaje) => {
    setAlerta({ tipo, mensaje })

    setTimeout(() => {
      setAlerta(null)
    }, 5000)
  }

  return (
    <Container fluid className="py-4">
      <h1 className="text-center mb-4">Sistema de Reservas de Gimnasio</h1>

      {/* Mostramos alertas si existen */}
      {alerta && (
        <Alert variant={alerta.tipo} className="mb-4">
          {alerta.mensaje}
        </Alert>
      )}

      <Row>
        <Col md={8}>
          <ListaClases clases={clases} onReservar={reservarClase} />
        </Col>
        <Col md={4}>
          <ResumenReserva reservas={reservas} onCancelar={cancelarReserva} />
        </Col>
      </Row>
    </Container>
  )
}
