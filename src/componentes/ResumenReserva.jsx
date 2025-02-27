import { Card, ListGroup, Button, Badge } from "react-bootstrap"

export default function ResumenReserva({ reservas, onCancelar }) {
  return (
    <div>
      <h2 className="mb-4">Mis Reservas</h2>

      <Card>
        <Card.Body>
          {reservas.length === 0 ? (
            <p>No tienes reservas actualmente.</p>
          ) : (
            <ListGroup variant="flush">
              {reservas.map((reserva) => (
                <ListGroup.Item key={reserva.id}>
                  <div className="d-flex justify-content-between">
                    <div>
                      <strong>{reserva.nombreClase}</strong>
                      <br />
                      <small>{reserva.horario}</small>
                      <br />
                      <Badge bg="success">{reserva.fechaReserva}</Badge>
                    </div>
                    <Button
                      variant="danger"
                      onClick={() => onCancelar(reserva.id)}
                    >
                      Cancelar
                    </Button>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Card.Body>
      </Card>
    </div>
  )
}
