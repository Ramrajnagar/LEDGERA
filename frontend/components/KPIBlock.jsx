import { motion } from "framer-motion";

export default function KPIBlock({ title, value }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-800 p-6 rounded-xl"
    >
      <h3>{title}</h3>
      <p className="text-2xl">{value}</p>
    </motion.div>
  );
}
