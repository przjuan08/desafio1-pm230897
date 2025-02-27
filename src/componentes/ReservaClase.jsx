import { useState } from "react"
import { Button, Modal, Form } from "react-bootstrap"

export default function ReservaClase({ clase, onReservar, onClose, show }) {
  const [horarioSeleccionado, setHorarioSeleccionado] = useState("")

  const handleReserva = () => {
    if (!horarioSeleccionado) {
      alert("Por favor, selecciona un horario antes de reservar.")
      return
    }
    onReservar(clase.id, horarioSeleccionado)
    onClose()
  }

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Reservar Clase: {clase.nombre}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          <strong>Descripción:</strong> {clase.descripcion}
        </p>
        <p>
          <strong>Instructor:</strong> {clase.instructor}
        </p>
        <p>
          <strong>Cupos disponibles:</strong> {clase.horarios.reduce((total, h) => total + h.cuposDisponibles, 0)}
        </p>

        <Form.Group className="mb-3">
          <Form.Label><strong>Selecciona un horario:</strong></Form.Label>
          <Form.Select
            value={horarioSeleccionado}
            onChange={(e) => setHorarioSeleccionado(e.target.value)}
          >
            <option value="">Selecciona un horario</option>
            {clase.horarios.map((horario, index) => (
              <option key={index} value={horario.hora} disabled={horario.cuposDisponibles <= 0}>
                {horario.hora} ({horario.cuposDisponibles} cupos disponibles)
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleReserva} disabled={!horarioSeleccionado}>
          Confirmar Reserva
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
