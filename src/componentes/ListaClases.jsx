"use client"

// Componente que muestra la lista de clases disponibles

import { useState } from "react"
import { Card, Row, Col, Badge, Button } from "react-bootstrap"
import Image from "next/image"
import ReservaClase from "./ReservaClase"

export default function ListaClases({ clases, onReservar }) {
  const [claseSeleccionada, setClaseSeleccionada] = useState(null)

  const abrirModalReserva = (clase) => {
    setClaseSeleccionada(clase)
  }

  const cerrarModalReserva = () => {
    setClaseSeleccionada(null)
  }

  return (
    <div>
      <h2 className="mb-4">Clases Disponibles</h2>

      <Row xs={1} md={2} className="g-4">
        {clases.map((clase) => (
          <Col key={clase.id}>
            <Card className="tarjeta-clase h-100">
              <div className="position-relative" style={{ height: "370px" }}>
                <Image
                  src={clase.imagen || "/placeholder.svg"}
                  alt={`Imagen de ${clase.nombre}`}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>

              <Card.Body>
                <Card.Title className="d-flex justify-content-between align-items-center">
                  {clase.nombre}
                  <Badge
                    bg={clase.horarios.some(h => h.cuposDisponibles > 5) ? "success" : "warning"}
                  >
                    {clase.horarios.reduce((total, h) => total + h.cuposDisponibles, 0)} cupos disponibles
                  </Badge>
                </Card.Title>

                <Card.Text>{clase.descripcion}</Card.Text>

                <div className="mb-3">
                  <strong>Instructor:</strong> {clase.instructor}
                </div>

                <Button
                  variant="primary"
                  className="w-100 btn-reservar"
                  onClick={() => abrirModalReserva(clase)}
                >
                  Reservar Clase
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {claseSeleccionada && (
        <ReservaClase
          clase={claseSeleccionada}
          onReservar={onReservar}
          onClose={cerrarModalReserva}
          show={!!claseSeleccionada}
        />
      )}
    </div>
  )
}
