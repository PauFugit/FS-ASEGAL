'use client'

export default function Error({ error, reset }) {
  return (
    <div>
      <h2>Algo salió mal!</h2>
      <button onClick={() => reset()}>Intentar de nuevo</button>
    </div>
  )
}