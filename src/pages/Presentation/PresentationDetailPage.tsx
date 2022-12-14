import React from 'react';
import { AppLayout, Sidebar } from 'components/Layouts';
import { SlidePreviewList, SlideContent, SlideOption } from 'components/Slide';
import { Row, Col, Button, Stack } from 'react-bootstrap';
import styles from './Presentation.module.scss';
import { useParams } from 'react-router-dom';
import Custom404 from 'components/Errors/Custom404';
import { Loader } from 'components/Common';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import config from 'config';
import { getItem } from 'utils';
import { Slide } from 'models/presentation.model';

function PresentationDetailPage() {
  const { presentationId, slideId } = useParams();
  const { data, isLoading, isError } = useQuery({
    queryKey: ['slideDetail', slideId],
    queryFn: async () => {
      const res = await axios.get(
        `${config.apiUrl}/presentation/${presentationId}/${slideId}`,
        {
          headers: {
            authorization: `Bearer ${getItem('h2t_access_token')}`,
          },
        }
      );
      return res.data;
    },
  });

  // eslint-disable-next-line no-console
  console.log(data);

  if (!presentationId && !slideId) {
    return (
      <AppLayout>
        <Custom404 />
      </AppLayout>
    );
  }

  if (isLoading) {
    return (
      <AppLayout>
        <Loader isFullPage />;
      </AppLayout>
    );
  }

  if (isError || !data) {
    return null;
  }

  return (
    <AppLayout fluid>
      <div className={styles.container}>
        <Row className="g-0 h-100">
          <Col xs={12} md={2} className="d-flex flex-column h-100">
            <Sidebar>
              <Stack direction="vertical" className="align-items-center">
                <SlidePreviewList />
                <Button variant="info" className="fw-semibold mt-2">
                  Add slide
                </Button>
              </Stack>
            </Sidebar>
          </Col>
          <Col>
            <SlideContent />
          </Col>
          <Col xs={0} md={3} className="d-flex flex-column h-100">
            <Sidebar>
              <SlideOption slideInfo={data.slide as Slide}/>
            </Sidebar>
          </Col>
        </Row>
      </div>
    </AppLayout>
  );
}

export default PresentationDetailPage;
