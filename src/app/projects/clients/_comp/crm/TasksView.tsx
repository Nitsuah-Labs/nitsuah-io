import React from "react";

interface Task {
  id: number;
  title: string;
  dueDate: string;
  priority: "high" | "medium" | "low";
  status: "pending" | "completed";
  assignedTo: string;
  relatedTo: string;
}

interface TasksViewProps {
  tasks: Task[];
}

export const TasksView: React.FC<TasksViewProps> = ({ tasks }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "#10b981";
      case "high":
        return "#ef4444";
      case "medium":
        return "#f59e0b";
      case "low":
        return "#6b7280";
      default:
        return "#6b7280";
    }
  };

  return (
    <div>
      <h2
        style={{
          fontSize: "1.75rem",
          fontWeight: "700",
          color: "#4f46e5",
          marginBottom: "1.5rem",
        }}
      >
        Tasks & Activities
      </h2>

      <div style={{ display: "grid", gap: "1rem" }}>
        {tasks.map((task) => (
          <div
            key={task.id}
            style={{
              background: "rgba(79, 70, 229, 0.1)",
              border: "2px solid rgba(79, 70, 229, 0.3)",
              borderRadius: "8px",
              padding: "1.5rem",
              opacity: task.status === "completed" ? 0.6 : 1,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    marginBottom: "0.5rem",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={task.status === "completed"}
                    readOnly
                    style={{
                      width: "20px",
                      height: "20px",
                      cursor: "pointer",
                    }}
                  />
                  <h3
                    style={{
                      fontSize: "1.1rem",
                      fontWeight: "600",
                      color: "#4f46e5",
                      margin: 0,
                      textDecoration:
                        task.status === "completed" ? "line-through" : "none",
                    }}
                  >
                    {task.title}
                  </h3>
                </div>
                <div
                  style={{
                    fontSize: "0.875rem",
                    color: "rgba(255,255,255,0.7)",
                    marginLeft: "2rem",
                  }}
                >
                  👤 {task.assignedTo} • 🏢 {task.relatedTo}
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  gap: "0.5rem",
                }}
              >
                <span
                  style={{
                    padding: "0.25rem 0.75rem",
                    borderRadius: "4px",
                    fontSize: "0.75rem",
                    fontWeight: "600",
                    background: `${getStatusColor(task.priority)}20`,
                    color: getStatusColor(task.priority),
                    textTransform: "capitalize",
                  }}
                >
                  {task.priority}
                </span>
                <div
                  style={{
                    fontSize: "0.875rem",
                    color: "rgba(255,255,255,0.7)",
                  }}
                >
                  📅 {task.dueDate}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
