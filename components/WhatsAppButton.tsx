"use client";

import { storeConfig } from '@/config/store';

export default function WhatsAppButton() {
  const phone = storeConfig.whatsapp;

  const message =
    "Olá, quero solicitar troca/devolução.%0A%0APedido:%0ANome:%0AMotivo:";

  const link = `https://wa.me/${phone}?text=${message}`;

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        backgroundColor: "#25D366",
        color: "#fff",
        borderRadius: "50%",
        width: "60px",
        height: "60px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "28px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
        zIndex: 9999,
        textDecoration: "none",
      }}
    >
      <img
        src="https://cdn-icons-png.flaticon.com/512/733/733585.png"
        alt="WhatsApp"
        style={{ width: "30px", height: "30px" }}
      />
    </a>
  );
}
