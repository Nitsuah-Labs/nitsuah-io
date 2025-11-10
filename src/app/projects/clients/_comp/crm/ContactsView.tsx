import React from "react";

interface Contact {
  id: number;
  name: string;
  company: string;
  email: string;
  phone: string;
  status: "lead" | "prospect" | "customer";
  value: number;
  lastContact: string;
}

interface ContactsViewProps {
  contacts: Contact[];
  searchQuery: string;
  selectedContact: number | null;
  onSearchChange: (query: string) => void;
  onContactSelect: (id: number) => void;
}

export const ContactsView: React.FC<ContactsViewProps> = ({
  contacts,
  searchQuery,
  selectedContact,
  onSearchChange,
  onContactSelect,
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "customer":
        return "#10b981";
      case "prospect":
        return "#3b82f6";
      case "lead":
        return "#f59e0b";
      default:
        return "#6b7280";
    }
  };

  const filteredContacts = contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1.5rem",
        }}
      >
        <h2
          style={{
            fontSize: "1.75rem",
            fontWeight: "700",
            color: "#4f46e5",
            margin: 0,
          }}
        >
          Contacts
        </h2>
        <input
          type="text"
          placeholder="Search contacts..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          style={{
            padding: "0.5rem 1rem",
            borderRadius: "6px",
            border: "2px solid rgba(79, 70, 229, 0.3)",
            background: "rgba(0,0,0,0.3)",
            color: "#fff",
            fontSize: "0.875rem",
            width: "250px",
          }}
        />
      </div>

      <div style={{ display: "grid", gap: "1rem" }}>
        {filteredContacts.map((contact) => (
          <div
            key={contact.id}
            className="crm-contact-card"
            style={{
              background: "rgba(79, 70, 229, 0.1)",
              border: "2px solid rgba(79, 70, 229, 0.3)",
              borderRadius: "8px",
              padding: "1.5rem",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onClick={() => onContactSelect(contact.id)}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#4f46e5";
              e.currentTarget.style.transform = "translateX(4px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(79, 70, 229, 0.3)";
              e.currentTarget.style.transform = "translateX(0)";
            }}
          >
            <div
              className="crm-card-content"
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
                  <h3
                    style={{
                      fontSize: "1.25rem",
                      fontWeight: "600",
                      color: "#4f46e5",
                      margin: 0,
                    }}
                  >
                    {contact.name}
                  </h3>
                  <span
                    style={{
                      padding: "0.25rem 0.75rem",
                      borderRadius: "4px",
                      fontSize: "0.75rem",
                      fontWeight: "600",
                      background: `${getStatusColor(contact.status)}20`,
                      color: getStatusColor(contact.status),
                      textTransform: "capitalize",
                    }}
                  >
                    {contact.status}
                  </span>
                </div>
                <div
                  style={{
                    fontSize: "0.875rem",
                    color: "rgba(255,255,255,0.8)",
                    marginBottom: "0.5rem",
                  }}
                >
                  🏢 {contact.company}
                </div>
                <div
                  style={{
                    fontSize: "0.875rem",
                    color: "rgba(255,255,255,0.7)",
                  }}
                >
                  📧 {contact.email} • 📞 {contact.phone}
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: "700",
                    color: "#10b981",
                  }}
                >
                  ${(contact.value / 1000).toFixed(0)}K
                </div>
                <div
                  style={{
                    fontSize: "0.75rem",
                    color: "rgba(255,255,255,0.6)",
                    marginTop: "0.25rem",
                  }}
                >
                  {contact.lastContact}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
