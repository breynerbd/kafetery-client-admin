import toast from "react-hot-toast";

const baseStyle = {
    borderRadius: "8px",
    fontWeight: "600",
    fontFamily: "inherit",
    fontSize: "1rem",
    padding: "16px 24px",
    boxShadow: "0 2px 16px rgba(0, 0, 0, 0.08)",
};

export const showSuccess = (message) =>
  toast.success(message, {
    style: {
      ...baseStyle,
      background: "linear-gradient(90deg, #9fffff 0%, #76eaea 100%)",
      color: "#065f46", 
      border: "2px solid #76eaea",
      fontWeight: "600",
    },
    iconTheme: {
      primary: "#0d9488", 
      secondary: "#9fffff",
    },
  });
 
export const showError = (message) =>
  toast.error(message, {
    style: {
      ...baseStyle,
      background: "linear-gradient(90deg, #aa7650ff 0%, #af6f40ff 100%)",
      color: "#fff",
      border: "2px solid #EADDCA",
    },
    iconTheme: {
      primary: "#8B4513",
      secondary: "#fff",
    },
  });
 
export const showInfo = (message) =>
  toast(message, {
    style: {
      ...baseStyle,
      background: "linear-gradient(90deg, #0ea5e9 0%, #0369a1 100%)",
      color: "#fff",
      border: "2px solid #0ea5e9",
    },
    iconTheme: {
      primary: "#0ea5e9",
      secondary: "#fff",
    },
  });