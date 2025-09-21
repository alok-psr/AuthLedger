import React, { useState } from 'react';

function RoleSelection({ roles, onRoleSelect }) {
  const [selectedRole, setSelectedRole] = useState(null);

  const handleRoleSelect = (roleId) => {
    setSelectedRole(roleId);
    // Add visual feedback delay
    setTimeout(() => {
      onRoleSelect(roleId);
    }, 500);
  };

  return (
    <div className="role-selection">
      <div className="role-selection__header">
        <h1 className="role-selection__title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px' }}>
          AuthLedger
        </h1>
        <p className="role-selection__subtitle">
          Professional Certificate Verification System
        </p>
        <p style={{ color: 'rgba(255, 255, 255, 0.7)', marginTop: '1rem' }}>
          Advanced blockchain-powered credential verification with AI-enhanced security and professional integrity
        </p>
      </div>

      <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: 'white' }}>
        Select Your Professional Role
      </h2>

      <div className="role-cards">
        {roles.map(role => (
          <div
            key={role.id}
            className={`role-card ${selectedRole === role.id ? 'role-card--selected' : ''}`}
            onClick={() => handleRoleSelect(role.id)}
          >
            <div className="role-card__icon">{role.icon}</div>
            <h3 className="role-card__name">{role.name}</h3>
            <p className="role-card__description">{role.description}</p>
            <ul className="role-card__features">
              {role.features.map(feature => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RoleSelection;
