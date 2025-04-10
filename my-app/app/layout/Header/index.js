import React from 'react';
import { Home, Info, Phone, User } from 'lucide-react';

const Header = () => {
  return (
    <header style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 2rem',
      backgroundColor: '#303a31',
      borderBottom: '1px solid #ccc',
      color:"#fff"
    }}>
      <div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
        MyWebsite
      </div>

      <nav style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }}>
          <Home size={20} /> <span>Home</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }}>
          <Info size={20} /> <span>About</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }}>
          <Phone size={20} /> <span>Contact</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }}>
          <User size={20} /> <span>Profile</span>
        </div>
      </nav>
    </header>
  );
};

export default Header;
