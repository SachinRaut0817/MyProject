import {
  DeleteOutlined,
  EditOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import {
  Pagination,
  Switch,
  Button,
  Tooltip,
  Popconfirm,
  Spin,
  Form,
} from "antd";
import Search from "antd/lib/input/Search";
import React, { useEffect, useState } from "react";
import { Card, Col, Modal, Row, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import AddEditContentModal from "./AddContent";
import {
  deleteContent,
  getAllContent,
  updateContentStatus,
} from "../../services/ContentService";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import "./content.css";
//import "./displayContent.css";

const Content = (props) => {
  let [paginationFields, SetPaginationField] = useState({
    totalPage: 0,
    currentPage: 0,
    pageSize: 0,
    totalElements: 0,
  });
  let [contents, Setcontents] = useState([]);

  let [searchKeyword, SetSearchKeyword] = useState("");
  let [isAddContentModal, SetIsAddContentModal] = useState(false);
  let [defaultPageNumber, SetDefaultPageNumber] = useState(0);
  let [loader, SetLoader] = useState(false);
  let [contentDescription, SetContentDesription] = useState("");
  let [isInfoModel, SetIsInfoModel] = useState(false);
  let [editContentData, SetEditContentData] = useState({});
  let [description, setDescription] = useState("");

  const getAllContents = (data) => {
    setLoader(true);
    getAllContent(data, defaultPageNumber)
      .then((res) => {
        if (res && res.data) {
          let contentData = res.data;

          Setcontents(contentData.content);
          SetPaginationField({
            totalPage: contentData.totalPage,
            pageSize: contentData.pageSize,
            totalElements: contentData.totalElements,
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

  const openModal = () => {
    setDescription("");
    SetIsAddContentModal(true);
  };

  const changeModelState = () => {
    SetIsAddContentModal(!isAddContentModal);
    SetEditContentData({});
    resetFormField();
  };

  const changePage = (pageNumber) => {
    SetDefaultPageNumber(pageNumber - 1);
  };

  useEffect(() => {
    let data = {
      searchKeyword: searchKeyword,
    };
    getAllContents(data);
  }, [searchKeyword]);

  const setLoader = (loaderFlag) => {
    SetLoader(loaderFlag);
  };
  const editContent = (contentData) => {
    SetIsAddContentModal(true);
    SetEditContentData(contentData);
    setDescription(contentData["description"]);
  };

  const confirmDelete = (id) => {
    setLoader(true);

    deleteContent(id)
      .then((res) => {
        if (res && res.data) {
          toast.success(res.message);
          getAllContents({});
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

  const manageContentStatus = (id) => {
    setLoader(true);
    updateContentStatus(id)
      .then((res) => {
        if (res && res.data) {
          toast.success(res.message);
          setLoader(false);
          getAllContents({});
        } else {
          toast.error(res.message);
        }
      })
      .catch((err) => {
        toast.error(err);
      });
  };
  const openInfoModal = (desc) => {
    SetContentDesription(desc);
    SetIsInfoModel(true);
  };
  const changeInfoModelState = () => {
    SetIsInfoModel(!isInfoModel);
    SetContentDesription("");
  };

  const createMarkup = () => {
    return { __html: contentDescription };
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
              <Card.Title as="h5">Content Management</Card.Title>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={5} xs={5} />
                <Col md={2} xs={2} />
                <Col md={3} xl={3}>
                  <Search
                    onSearch={onSearch}
                    allowClear
                    placeholder="Search Name"
                  />
                </Col>
                <Col md={2} xl={2}>
                  <Button className="mb-1" type="primary" onClick={openModal}>
                    Add Content
                  </Button>
                </Col>
              </Row>

              <Table responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    {/* <th>Active</th> */}
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {contents &&
                    contents.map((content, index) => {
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

                          <td>{content.name}</td>
                          {/* <td>
                            <Switch
                              checked={content.isActive}
                              onChange={() => manageContentStatus(content.id)}
                            />
                          </td> */}
                          <td>
                            <Tooltip
                              placement="bottomLeft"
                              title="View Description"
                            >
                              <InfoCircleOutlined
                                className="mr-2"
                                onClick={() =>
                                  openInfoModal(content.description)
                                }
                              />
                            </Tooltip>
                            <Tooltip
                              placement="bottomLeft"
                              title="Edit Content"
                            >
                              <EditOutlined
                                className="mr-2"
                                onClick={() => editContent(content)}
                              />
                            </Tooltip>

                            <Popconfirm
                              title="Are you sure delete this record?"
                              onConfirm={() => confirmDelete(content.id)}
                              // onCancel={cancelDelete}
                              okText="Yes"
                              cancelText="No"
                            >
                              <Tooltip
                                placement="bottomLeft"
                                title="Delete Content"
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
                  defaultCurrent={defaultPageNumber + 1}
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
          <div className="description-wrapper">
            <CKEditor
              resizable={true}
              style={{ width: "565px" }}
              className="form-control"
              editor={ClassicEditor}
              disabled={true}
              config={{
                removePlugins: [
                  "Bold",
                  "Italic",
                  "Block quote",
                  "Heading",
                  "Bulleted List",
                  "Numbered List",
                  "Block quote",
                  "Link",
                  "Insert image",
                  "Essentials",
                  "Autoformat",
                  "CKFinder",
                  "EasyImage",
                  "Image",
                  "ImageCaption",
                  "ImageStyle",
                  "ImageToolbar",
                  "ImageUpload",
                  "Indent",
                  "MediaEmbed",
                  "PasteFromOffice",
                  "Table",
                  "TableToolbar",
                  "TextTransformation",
                ],
              }}
              name="description"
              data={contentDescription}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={changeInfoModelState}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {isAddContentModal && (
        <AddEditContentModal
          isAddContentModal={isAddContentModal}
          changeModelState={changeModelState}
          form={props.form}
          loader={loader}
          descriptionEdit={description}
          setLoader={setLoader}
          editContentData={editContentData}
          getAllContents={() => getAllContents({})}
        />
      )}
    </>
  );
};

const WrappedNormalLoginForm = Form.create({ name: "normal_login" })(Content);
export default WrappedNormalLoginForm;
