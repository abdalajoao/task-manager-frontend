import { Link } from "react-router-dom";

export default function ActivityCard({ activity }) {
  return (
    <div style={styles.card}>
      <h3>{activity.name}</h3>
      <p>Type: {activity.type}</p>
      <p>Status: {activity.status}</p>

      <Link to={`/activity/${activity.id}`} style={styles.link}>
        View Details
      </Link>
    </div>
  );
}

const styles = {
  card: {
    background: "#111a2e",
    padding: "16px",
    borderRadius: "12px",
    marginBottom: "10px",
  },
  link: {
    color: "#0ea5e9",
    textDecoration: "none",
  },
};