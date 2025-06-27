'use client'
import React, { useState } from 'react'

function MisionVision() {
  const [hovered, setHovered] = useState({ mision: false, vision: false });

  return (
    <div style={{
      minHeight: '80vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ef 100%)',
      padding: '40px 20px'
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        gap: '32px',
        justifyContent: 'center',
        alignItems: 'stretch',
        width: '100%',
        maxWidth: '1280px'
      }}>
        <div style={{
          background: '#fff',
          borderRadius: '18px',
          boxShadow: '0 6px 32px rgba(60, 72, 88, 0.12)',
          maxWidth: '600px',
          width: '100%',
          padding: '36px 32px',
          textAlign: 'center',
          flex: 1
        }}>
          <h2
            style={{
              color: hovered.mision ? '#F59E42' : '#18148C',
              fontSize: '2.2rem',
              marginBottom: '18px',
              letterSpacing: '1px',
              transition: 'color 0.3s'
            }}
            onMouseEnter={() => setHovered(h => ({ ...h, mision: true }))}
            onMouseLeave={() => setHovered(h => ({ ...h, mision: false }))}
          >
            MISIÓN
          </h2>
          <p style={{
            color: '#18148C',
            fontSize: '1.15rem',
            lineHeight: '1.7'
          }}>
            Brindar soluciones innovadoras y de alta calidad en el sector, superando las expectativas de nuestros clientes y contribuyendo al desarrollo sostenible de la comunidad.
          </p>
        </div>
        <div style={{
          background: '#fff',
          borderRadius: '18px',
          boxShadow: '0 6px 32px rgba(60, 72, 88, 0.12)',
          maxWidth: '600px',
          width: '100%',
          padding: '36px 32px',
          textAlign: 'center',
          flex: 1
        }}>
          <h2
            style={{
              color: hovered.vision ? '#F59E42' : '#18148C',
              fontSize: '2.2rem',
              marginBottom: '18px',
              letterSpacing: '1px',
              transition: 'color 0.3s'
            }}
            onMouseEnter={() => setHovered(h => ({ ...h, vision: true }))}
            onMouseLeave={() => setHovered(h => ({ ...h, vision: false }))}
          >
            VISIÓN
          </h2>
          <p style={{
            color: '#18148C',
            fontSize: '1.15rem',
            lineHeight: '1.7'
          }}>
            Ser líderes reconocidos por nuestra excelencia, compromiso y responsabilidad, impulsando el crecimiento y la innovación en cada proyecto que emprendemos.
          </p>
        </div>
      </div>
    </div>
  )
}

export default MisionVision;