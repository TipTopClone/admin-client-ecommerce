import React from 'react';
import { Container } from 'react-bootstrap';
import { SideBar } from './SideBar';
import { Header } from './Header';
import { Footer } from './Footer';

const AdminLayout = ({ children, title }) => {
  return (
    <div className='admin-layout'>
      {/* sidebar */}
      <SideBar />

      {/* main area  */}
      <main className='main'>
        {/* header  */}
        <Header />

        <Container>
          <div className='mt-3'>
            <h3>{title}</h3>
            <hr />

            <div className='page-content'>{children}</div>
          </div>
        </Container>

        {/* footer  */}
        <Footer />
      </main>
    </div>
  );
};

export default AdminLayout;
