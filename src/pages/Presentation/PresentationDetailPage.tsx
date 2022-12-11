import { AppLayout, Sidebar } from 'components/Layouts';
import { SlidePreviewList } from 'components/Slide';
import React from 'react';
import { Row, Col, Button, Stack } from 'react-bootstrap';
import styles from './Presentation.module.scss';

function PresentationDetailPage() {

  return (
    <AppLayout fluid>
      <div className={styles.container}>
        <Row className="g-0 flex-grow-1">
          <Col xs={12} md={2} className="d-flex flex-column">
            <Sidebar>
              <Stack direction="vertical" className="align-items-center">
                <SlidePreviewList />
                <Button variant="info" className="fw-semibold mt-2">
                  Add slide
                </Button>
              </Stack>
            </Sidebar>
          </Col>
        </Row>
      </div>
    </AppLayout>
  )
}

export default PresentationDetailPage