import {
  DeleteOutlined,
  EditOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import {
  Pagination,
  Switch,
  Button,
  Select,
  Tooltip,
  Popconfirm,
  Spin,
  Form,
} from "antd";
import Search from "antd/lib/input/Search";
import React, { useEffect, useState } from "react";
import { Card, Col, Modal, Row, Table } from "react-bootstrap";

import { toast } from "react-toastify";
import "./UNRepresentative.css";
import AddEditUNRModal from "./AddUNR";
import {
  deleteUNR,
  getAllUnRepresentative,
  updateUnRepStatus,
} from "../../services/UnRepresentativeService";
import TextArea from "antd/lib/input/TextArea";

const UNR = (props) => {
  let [paginationFields, SetPaginationField] = useState({
    totalPage: 0,
    currentPage: 0,
    pageSize: 0,
    totalElements: 0,
  });
  let [UNRs, SetUNRs] = useState([]);
  let [searchKeyword, SetSearchKeyword] = useState("");
  let [isAddUNRModal, SetIsAddUNRModal] = useState(false);
  let [unrDescription, SetUnrDesription] = useState("");
  let [isInfoModel, SetIsInfoModel] = useState(false);
  let [defaultPageNumber, SetDefaultPageNumber] = useState(0);
  let [loader, SetLoader] = useState(false);
  let [editUNRData, SetEditUNRData] = useState({});

  const getAllUNRs = (data) => {
    setLoader(true);
    getAllUnRepresentative(data, defaultPageNumber)
      .then((res) => {
        if (res && res.data) {
          let unrData = res.data;

          SetUNRs(unrData.content);
          SetPaginationField({
            totalPage: unrData.totalPage,
            pageSize: unrData.pageSize,
            totalElements: unrData.totalElements,
          });
          setLoader(false);
        }
      })
      .catch((err) => {
        setLoader(false);
        throw err;
      });
  };

  const resetFormField = () => {
    props.form.resetFields();
  };

  const onSearch = (value) => {
    SetSearchKeyword(value);
  };

  // useEffect(() => {
  //   if (searchKeyword !== undefined) {
  //     const data = {
  //       searchKeyword: searchKeyword,
  //     };
  //     getAllUNRs(data);
  //   }
  // }, [searchKeyword]);

  const openModal = () => {
    SetIsAddUNRModal(true);
  };

  const changeModelState = () => {
    SetIsAddUNRModal(!isAddUNRModal);
    SetEditUNRData({});
    resetFormField();
  };

  const changePage = (pageNumber) => {
    SetDefaultPageNumber(pageNumber - 1);
  };

  useEffect(() => {
    const data = {
      searchKeyword: searchKeyword,
    };
    getAllUNRs(data);
  }, [defaultPageNumber, searchKeyword]);

  const setLoader = (loaderFlag) => {
    SetLoader(loaderFlag);
  };
  const editUNR = (unrData) => {
    SetIsAddUNRModal(true);
    SetEditUNRData(unrData);
  };

  const confirmDelete = (id) => {
    setLoader(true);

    deleteUNR(id)
      .then((res) => {
        if (res && res.data) {
          toast.success(res.message);
          getAllUNRs({});
        } else {
          toast.error(res.message);
        }
        setLoader(false);
      })
      .catch((err) => {
        toast.error(err);
        setLoader(false);
      });
  };

  const manageUNRStatus = (id) => {
    setLoader(true);
    updateUnRepStatus(id)
      .then((res) => {
        if (res && res.data) {
          toast.success(res.message);
          setLoader(false);
          getAllUNRs({});
        } else {
          toast.error(res.message);
        }
      })
      .catch((err) => {
        toast.error(err);
      });
  };
  const openInfoModal = (desc) => {
    SetUnrDesription(desc);
    SetIsInfoModel(true);
  };
  const changeInfoModelState = () => {
    SetIsInfoModel(!isInfoModel);
    SetUnrDesription("");
  };
  return (
    <>
      {loader ? (
        <span className="loader-class">
          <Spin />
        </span>
      ) : (
        ""
      )}
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Un-Representative Management</Card.Title>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={5} xs={5} />
                <Col md={2} xs={2} />
                <Col md={3} xl={3}>
                  <Search
                    onSearch={onSearch}
                    allowClear
                    placeholder="Search UNR Name"
                  />
                </Col>
                <Col md={2} xl={2}>
                  <Button className="mb-1" type="primary" onClick={openModal}>
                    Add Representative
                  </Button>
                </Col>
              </Row>

              <Table responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Title</th>
                    <th>Country</th>
                    <th>Active</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {UNRs &&
                    UNRs.map((UNR, index) => {
                      return (
                        <tr>
                          <th scope="row" key={index}>
                            {defaultPageNumber === 0
                              ? index + 1
                              : defaultPageNumber *
                                  paginationFields["pageSize"] +
                                index +
                                1}
                          </th>
                          <td>
                            <img
                              src={UNR.imagePath}
                              className="imgCss rounded"
                            />
                          </td>
                          <td>{UNR.name}</td>
                          <td>{UNR.title}</td>
                          <td>{UNR.country.name}</td>
                          <td>
                            <Switch
                              checked={UNR.isActive}
                              onChange={() => manageUNRStatus(UNR.id)}
                            />
                          </td>
                          <td>
                            <InfoCircleOutlined
                              className="mr-2"
                              onClick={() => openInfoModal(UNR.description)}
                            />
                            <Tooltip placement="bottomLeft" title="Edit UNR">
                              <EditOutlined
                                className="mr-2"
                                onClick={() => editUNR(UNR)}
                              />
                            </Tooltip>

                            <Popconfirm
                              title="Are you sure delete this record?"
                              onConfirm={() => confirmDelete(UNR.id)}
                              // onCancel={cancelDelete}
                              okText="Yes"
                              cancelText="No"
                            >
                              <Tooltip
                                placement="bottomLeft"
                                title="Delete UNR"
                              >
                                <DeleteOutlined />
                              </Tooltip>
                            </Popconfirm>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </Table>
              <div>
                <Pagination
                  // defaultCurrent={defaultPageNumber + 1}
                  current={defaultPageNumber + 1}
                  total={paginationFields["totalElements"]}
                  onChange={changePage}
                />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Modal
        title="Description"
        show={isInfoModel}
        onHide={changeInfoModelState}
        okButtonProps={{ style: { display: "none" } }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Description</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TextArea value={unrDescription} rows={5} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={changeInfoModelState}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {isAddUNRModal && (
        <AddEditUNRModal
          isAddUNRModal={isAddUNRModal}
          changeModelState={changeModelState}
          form={props.form}
          loader={loader}
          setLoader={setLoader}
          editUNRData={editUNRData}
          getAllUNRDetails={() => getAllUNRs({})}
        />
      )}
    </>
  );
};

const WrappedNormalLoginForm = Form.create({ name: "normal_login" })(UNR);
export default WrappedNormalLoginForm;
