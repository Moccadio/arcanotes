const API = import.meta.env.VITE_API_URL;

export const getCards = () =>
  fetch(`${API}/cards`).then((r) => r.json());

export const getCard = (id) =>
  fetch(`${API}/cards/${id}`).then((r) => r.json());

export const simulateReading = (method) =>
  fetch(`${API}/readings/simulate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ method })
  }).then((r) => r.json());
