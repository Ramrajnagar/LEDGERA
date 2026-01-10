module.exports = {
  reactStrictMode: true,
};
useEffect(() => {
  const ws = new WebSocket("ws://localhost:8000/ws/tracking");
  ws.onmessage = (msg) => console.log(JSON.parse(msg.data));
}, []);
