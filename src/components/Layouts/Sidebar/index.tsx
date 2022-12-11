import React from 'react';
import styles from './Sidebar.module.scss';

interface SidebarProps {
  position?: 'left' | 'right';
  children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  return (
    <div className={styles.sidebar}>
      {children}
    </div>  
  )
}

export default Sidebar;