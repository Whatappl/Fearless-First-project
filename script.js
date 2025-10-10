asyncPI_BASE = "http://localhost:3000/api/chat"; // replace with your hosted API URL

aURLRLync function sendMessage(msg){
  const res = await fetch(API_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: msg })
  });
  const data = await res.json();
  return data.reply;
}
