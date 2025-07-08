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
            Nuestra misión es hacer realidad tus proyectos, facilitando el proceso de formalización, acompañándote en cada paso, para que solo pongas foco en tu negocio gastronómico. <br />
            Somos profesionales expertas en garantizar la seguridad alimentaria y el complimiento regulatorio, con nuestra cercanía y confiabilidad hacemos que tu emprendimiento logre que cada alimento servido sea de la más alta calidad, impulsando tu negocio al siguiente nivel.
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
            Ser la empresa líder en asesorías sobre seguridad alimentaria en la zona norte de Chile. Impulsar la cultura de la inocuidad alimentaria como prioridad en todos los emprendedores gastronómicos tanto nacionales como extranjeros, ser un aliado confiable y estratégico para su crecimiento y fortalecimiento en el mundo culinario. Promoviendo además incorporación de prácticas sustentables que permitan preservar nuestro medio ambiente.
          </p>
        </div>
      </div>
    </div>
  )
}

export default MisionVision;