import React, { useEffect } from 'react';
import { AppLayout, Sidebar } from 'components/Layouts';
import { SlidePreviewList, SlideContent, SlideOption } from 'components/Slide';
import { Row, Col, Button, Stack } from 'react-bootstrap';
import styles from './Presentation.module.scss';
import { useParams, useNavigate } from 'react-router-dom';
import Custom404 from 'components/Errors/Custom404';
import { Loader } from 'components/Common';
import { useMutation, useQueryClient, useQueries } from '@tanstack/react-query';
import axios from 'axios';
import config from 'config';
import { axiosWithToken, getItem } from 'utils';
import { Slide } from 'models/presentation.model';
import { toast } from 'react-toastify';

function PresentationDetailPage() {
  const { presentationId, slideIndex } = useParams();
  const navigate = useNavigate();
  if (!slideIndex) {
    navigate(`/presentations/${presentationId}/0/edit`);
  }
  const queryClient = useQueryClient();

  const [slideDetailQuery, slidePreviewListQuery] = useQueries({
    queries: [
      {
        queryKey: ['slideDetail', slideIndex],
        queryFn: async () => {
          const res = await axiosWithToken.get(
            `${config.apiUrl}/presentation/${presentationId}/${slideIndex}`
          );
          return res.data;
        },
        onError: () => {
          return null;
        },
      },
      {
        queryKey: ['slidePreviewList'],
        queryFn: async () => {
          const res = await axiosWithToken.get(
            `${config.apiUrl}/presentation/${presentationId}/slidepreviews`
          );
          return res.data;
        },
      },
    ],
  });

  const addSlidemutation = useMutation({
    mutationFn: () =>
      axiosWithToken.post(`${config.apiUrl}/presentation/slide`, {
        presentId: presentationId,
        title: '',
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['slidePreviewList'] });
    },
    onError: (error) => {
      if (axios.isAxiosError(error) || error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error(String(error));
      }
    },
  });

  const removeSlidemutation = useMutation({
    mutationFn: (index: number) =>
      axios.delete(`${config.apiUrl}/presentation/slide`, {
        headers: {
          authorization: `Bearer ${getItem('h2t_access_token')}`,
        },
        data: {
          presentId: presentationId,
          index,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['slidePreviewList'] });
    },
    onError: (error) => {
      if (axios.isAxiosError(error) || error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error(String(error));
      }
    },
  });

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['slideDetail', slideIndex] });
  }, [slideIndex]);

  const handleAddSlide = () => {
    addSlidemutation.mutate();
  };

  const handleRemoveSlide = (index: number) => {
    removeSlidemutation.mutate(index);
  };

  if (!presentationId && !slideIndex) {
    return (
      <AppLayout>
        <Custom404 />
      </AppLayout>
    );
  }

  // if (slideDetailQuery.isLoading || slidePreviewListQuery.isLoading) {
  //   return (
  //     <AppLayout>
  //       <Loader isFullPage />;
  //     </AppLayout>
  //   );
  // }

  if (slideDetailQuery.isError || !slideDetailQuery.data) {
    return null;
  }

  if (slidePreviewListQuery.isError || !slidePreviewListQuery.data) {
    return null;
  }

  return (
    <AppLayout fluid>
      <div className={styles.container}>
        <Row className="g-0 h-100">
          <Col xs={12} md={2} className="d-flex flex-column h-100">
            <Sidebar>
              <Stack direction="vertical" className="aligns-items-center">
                <SlidePreviewList
                  previewList={slidePreviewListQuery.data.slidePreviewList}
                  onRemoveSlide={handleRemoveSlide}
                  currentSlide={Number(slideIndex)}
                />
                <Button
                  variant="info"
                  className="fw-semibold mt-2"
                  onClick={handleAddSlide}
                  disabled={addSlidemutation.isLoading}
                >
                  {addSlidemutation.isLoading ? (
                    <Loader
                      as="span"
                      isFullPage={false}
                      animation="border"
                      size="sm"
                      role="status"
                      className="me-2"
                    />
                  ) : (
                    'Add Slide'
                  )}
                </Button>
              </Stack>
            </Sidebar>
          </Col>
          <Col>
            <SlideContent />
          </Col>
          <Col xs={0} md={3} className="d-flex flex-column h-100">
            <Sidebar>
              <SlideOption
                slideInfo={slideDetailQuery.data.slide as Slide}
                presentationId={presentationId as string}
                slideIndex={slideIndex as string}
              />
            </Sidebar>
          </Col>
        </Row>
      </div>
    </AppLayout>
  );
}

export default PresentationDetailPage;
