import React from 'react';

const menuItems = [
  'Invoices',
  'Customers',
  'My Business',
  'Invoice Journal',
  { label: 'Price List', active: true },
  'Multiple Invoicing',
  'Unpaid Invoices',
  'Offer',
  { label: 'Inventory Control', disabled: true },
  'Member Invoicing',
  'Import/Export',
  'Log out'
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
     
      <div className="menu-label">Menu</div>
      <ul className="menu-list">
        {menuItems.map((item,i) => {
          const cfg = typeof item === 'string' ? { label:item } : item;
          return (
            <li key={i} className={`menu-item${cfg.active ? ' active' : ''}${cfg.disabled ? ' disabled' : ''}`}>{cfg.label}</li>
          );
        })}
      </ul>
    </aside>
  );
}
