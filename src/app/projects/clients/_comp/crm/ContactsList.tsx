// Contacts List View Component for CRM Demo
import React from "react";

interface Contact {
  id: number;
  name: string;
  company: string;
  role?: string;
  email: string;
  phone: string;
  status: string;
  lastContact: string;
}

interface ContactsListProps {
  contacts: Contact[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSelectContact: (contact: Contact) => void;
  getStatusColor: (status: string) => string;
}

export const ContactsList: React.FC<ContactsListProps> = ({
  contacts,
  searchQuery,
  onSearchChange,
  onSelectContact,
  getStatusColor,
}) => {
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
        Contacts
      </h2>

      <input
        type="text"
        placeholder="Search contacts..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        style={{
          width: "100%",
          padding: "0.75rem",
          marginBottom: "1.5rem",
          background: "rgba(79, 70, 229, 0.1)",
          border: "2px solid rgba(79, 70, 229, 0.3)",
          borderRadius: "8px",
          color: "#fff",
          fontSize: "1rem",
        }}
      />

      <div
        className="crm-contacts-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "1rem",
        }}
      >
        {contacts.map((contact) => (
          <div
            key={contact.id}
            onClick={() => onSelectContact(contact)}
            style={{
              background: "rgba(79, 70, 229, 0.1)",
              border: "2px solid rgba(79, 70, 229, 0.3)",
              borderRadius: "8px",
              padding: "1.25rem",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#4f46e5";
              e.currentTarget.style.background = "rgba(79, 70, 229, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(79, 70, 229, 0.3)";
              e.currentTarget.style.background = "rgba(79, 70, 229, 0.1)";
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "start",
                marginBottom: "1rem",
              }}
            >
              <div>
                <h3
                  style={{
                    fontSize: "1.125rem",
                    fontWeight: "600",
                    color: "#4f46e5",
                    marginBottom: "0.25rem",
                  }}
                >
                  {contact.name}
                </h3>
                <div
                  style={{
                    fontSize: "0.875rem",
                    color: "rgba(255,255,255,0.7)",
                  }}
                >
                  {contact.role}
                </div>
              </div>
              <span
                style={{
                  padding: "0.25rem 0.75rem",
                  borderRadius: "12px",
                  fontSize: "0.75rem",
                  fontWeight: "600",
                  background: getStatusColor(contact.status),
                  color: "#fff",
                }}
              >
                {contact.status}
              </span>
            </div>

            <div style={{ marginBottom: "0.75rem" }}>
              <div
                style={{
                  fontSize: "0.875rem",
                  color: "#4f46e5",
                  fontWeight: "600",
                  marginBottom: "0.25rem",
                }}
              >
                {contact.company}
              </div>
              <div
                style={{
                  fontSize: "0.75rem",
                  color: "rgba(255,255,255,0.6)",
                }}
              >
                {contact.email}
              </div>
              <div
                style={{
                  fontSize: "0.75rem",
                  color: "rgba(255,255,255,0.6)",
                }}
              >
                {contact.phone}
              </div>
            </div>

            <div
              style={{
                fontSize: "0.75rem",
                color: "rgba(255,255,255,0.6)",
                borderTop: "1px solid rgba(79, 70, 229, 0.3)",
                paddingTop: "0.75rem",
              }}
            >
              Last contact: {contact.lastContact}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
