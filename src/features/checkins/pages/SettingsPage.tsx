/**
 * Settings Page
 * Manage emergency contacts and view disclaimer
 * Premium design with beautiful forms and animations
 */

import { useState } from 'react';
import { useDeviceUser } from '../hooks/useDeviceUser';
import { useCheckIns } from '../hooks/useCheckIns';
import { getEmergencyContacts, saveEmergencyContacts, exportCheckInData } from '../utils/storage';
import { DISCLAIMER } from '../constants';
import type { EmergencyContact } from '../types';
import styles from './SettingsPage.module.css';

export default function SettingsPage() {
  const { deviceUserId, isLoading: userLoading } = useDeviceUser();
  const { clearAll } = useCheckIns(deviceUserId || '');

  const [contacts, setContacts] = useState<EmergencyContact[]>(getEmergencyContacts());
  const [newContact, setNewContact] = useState({ name: '', phone: '', email: '' });

  const handleAddContact = () => {
    if (newContact.name) {
      const contact: EmergencyContact = {
        id: `contact_${Date.now()}`,
        name: newContact.name,
        phone: newContact.phone || undefined,
        email: newContact.email || undefined,
      };
      const updated = [...contacts, contact];
      setContacts(updated);
      saveEmergencyContacts(updated);
      setNewContact({ name: '', phone: '', email: '' });
    }
  };

  const handleDeleteContact = (id: string) => {
    const updated = contacts.filter((c) => c.id !== id);
    setContacts(updated);
    saveEmergencyContacts(updated);
  };

  const handleExport = () => {
    if (!deviceUserId) return;
    const data = exportCheckInData(deviceUserId);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `checkins_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  const handleClearData = () => {
    if (confirm('Are you sure? This will delete all your check-in data.')) {
      clearAll();
      alert('All data cleared');
    }
  };

  if (userLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner} />
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.title}>Settings</h1>
          <p className={styles.subtitle}>Manage your preferences and data</p>
        </div>

        {/* Emergency Contacts Section */}
        <div className={`${styles.section} ${styles.contactsSection}`}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.sectionTitleIcon}>📞</span>
            Emergency Contacts
          </h2>

          {/* Add Contact Form */}
          <div className={styles.addContactForm}>
            <h3 className={styles.addContactTitle}>Add New Contact</h3>
            <div className={styles.formInputs}>
              <input
                type="text"
                placeholder="Full Name"
                value={newContact.name}
                onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                className={styles.formInput}
                aria-label="Contact name"
              />
              <input
                type="tel"
                placeholder="Phone Number (optional)"
                value={newContact.phone}
                onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                className={styles.formInput}
                aria-label="Contact phone"
              />
              <input
                type="email"
                placeholder="Email Address (optional)"
                value={newContact.email}
                onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
                className={styles.formInput}
                aria-label="Contact email"
              />
            </div>
            <button
              onClick={handleAddContact}
              className={`${styles.button} ${styles.buttonPrimary}`}
            >
              ➕ Add Contact
            </button>
          </div>

          {/* Contacts List */}
          {contacts.length > 0 ? (
            <div className={styles.contactsList}>
              {contacts.map((contact) => (
                <div key={contact.id} className={styles.contactCard}>
                  <div className={styles.contactInfo}>
                    <p className={styles.contactName}>{contact.name}</p>
                    {contact.phone && <p className={styles.contactDetail}>📱 {contact.phone}</p>}
                    {contact.email && <p className={styles.contactDetail}>✉️ {contact.email}</p>}
                  </div>
                  <button
                    onClick={() => handleDeleteContact(contact.id)}
                    className={styles.deleteButton}
                    aria-label={`Delete ${contact.name}`}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className={styles.emptyContacts}>No emergency contacts added yet. Add one to stay prepared.</p>
          )}
        </div>

        {/* Data Management Section */}
        <div className={`${styles.section} ${styles.dataSection}`}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.sectionTitleIcon}>💾</span>
            Data Management
          </h2>

          <div className={styles.buttonGroup}>
            <button
              onClick={handleExport}
              className={`${styles.button} ${styles.buttonSuccess}`}
            >
              ⬇️ Export Data (JSON)
            </button>
            <button
              onClick={handleClearData}
              className={`${styles.button} ${styles.buttonDanger}`}
            >
              🗑️ Clear All Data
            </button>
          </div>
        </div>

        {/* Disclaimer Section */}
        <div className={`${styles.section} ${styles.disclaimerSection}`}>
          <div className={styles.disclaimerContent}>
            <h2 className={styles.disclaimerTitle}>⚠️ Important Disclaimer</h2>
            <p className={styles.disclaimerText}>{DISCLAIMER}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
