// Tasks View Component for CRM Demo
import React from "react";

interface Task {
  id: number;
  title: string;
  // legacy optional description (not present in demo data)
  description?: string;
  dueDate: string;
  priority: "high" | "medium" | "low";
  // demo data uses 'status' and 'assignedTo'
  status?: "pending" | "completed";
  assignedTo?: string;
  relatedTo?: string;
  // keep completed for backward compatibility
  completed?: boolean;
}

interface TasksViewProps {
  tasks: Task[];
  getStatusColor: (status: string) => string;
}

export const TasksView: React.FC<TasksViewProps> = ({
  tasks,
  getStatusColor,
}) => {
  const priorities = ["high", "medium", "low"];

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
        Tasks
      </h2>

      {priorities.map((priority) => {
        const priorityTasks = tasks.filter(
          (task) => task.priority === priority,
        );
        if (priorityTasks.length === 0) return null;

        return (
          <div key={priority} style={{ marginBottom: "2rem" }}>
            <h3
              style={{
                fontSize: "1.125rem",
                fontWeight: "600",
                color: "#4f46e5",
                textTransform: "capitalize",
                marginBottom: "1rem",
              }}
            >
              {priority} Priority ({priorityTasks.length})
            </h3>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              {priorityTasks.map((task) => (
                <div
                  key={task.id}
                  style={{
                    background: "rgba(79, 70, 229, 0.1)",
                    border: "2px solid rgba(79, 70, 229, 0.3)",
                    borderRadius: "8px",
                    padding: "1rem",
                    opacity: task.completed ? 0.6 : 1,
                    transition: "all 0.3s ease",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "start",
                      gap: "1rem",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={
                        task.status
                          ? task.status === "completed"
                          : !!task.completed
                      }
                      readOnly
                      style={{
                        width: "20px",
                        height: "20px",
                        marginTop: "0.25rem",
                        cursor: "pointer",
                      }}
                    />

                    <div style={{ flex: 1 }}>
                      <h4
                        style={{
                          fontSize: "1rem",
                          fontWeight: "600",
                          color: "#4f46e5",
                          marginBottom: "0.5rem",
                          textDecoration: task.status
                            ? task.status === "completed"
                              ? "line-through"
                              : "none"
                            : task.completed
                              ? "line-through"
                              : "none",
                        }}
                      >
                        {task.title}
                      </h4>

                      <p
                        style={{
                          fontSize: "0.875rem",
                          color: "rgba(255,255,255,0.7)",
                          marginBottom: "0.75rem",
                        }}
                      >
                        {task.description}
                      </p>

                      <div
                        style={{
                          display: "flex",
                          gap: "1rem",
                          flexWrap: "wrap",
                          fontSize: "0.75rem",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                          }}
                        >
                          <span
                            style={{
                              padding: "0.25rem 0.75rem",
                              borderRadius: "12px",
                              fontWeight: "600",
                              background: getStatusColor(priority),
                              color: "#fff",
                            }}
                          >
                            {priority}
                          </span>
                          <span style={{ color: "rgba(255,255,255,0.6)" }}>
                            Due: {task.dueDate}
                          </span>
                          <span style={{ color: "rgba(255,255,255,0.6)" }}>
                            
                          </span>
                          <span style={{ color: "rgba(255,255,255,0.6)" }}>
                            {task.assignedTo ?? task.relatedTo ?? "—"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};
