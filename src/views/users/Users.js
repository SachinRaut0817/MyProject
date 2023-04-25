import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
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
import { Card, Col, Row, Table } from "react-bootstrap";
import {
  getAllUser,
  deleteUser,
  changeUserStatus,
} from "../../services/UserService";

import { toast } from "react-toastify";
import "./users.css";
import AddEditUserModal from "./AddEditUserModal";

const User = (props) => {
  let [paginationFields, SetPaginationField] = useState({
    totalPage: 0,
    currentPage: 0,
    pageSize: 0,
    totalElements: 0,
  });
  let [users, SetUsers] = useState([]);
  const userRole = [
    {
      value: 3,
      label: "Politician",
    },
    {
      value: 2,
      label: "Account Holder",
    },
    {
      value: 1,
      label: "Admin",
    },
  ];

  let [filteredByRole, SetFilteredByRole] = useState(null);
  let [searchKeyword, SetSearchKeyword] = useState("");
  let [isAddUserModal, SetIsAddUserModal] = useState(false);
  let [defaultPageNumber, SetDefaultPageNumber] = useState(0);
  let [loader, SetLoader] = useState(false);
  let [editUserData, SetEditUserData] = useState({});

  const getAllUserDetails = (data) => {
    setLoader(true);

    getAllUser(data, defaultPageNumber)
      .then((res) => {
        if (res && res.data) {
          let userData = res.data;

          SetUsers(userData.content);

          SetPaginationField({
            totalPage: userData.totalPage,
            pageSize: userData.pageSize,
            totalElements: userData.totalElements,
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

  const onChange = (value) => {
    SetFilteredByRole(value);
  };

  const onSearch = (value) => {
    SetSearchKeyword(value);
  };

  useEffect(() => {
    if (filteredByRole > 0) {
      const data = {
        searchKeyword: searchKeyword,
        filteredByRole: filteredByRole,
      };
      getAllUserDetails(data);
    }
    if (searchKeyword !== "") {
      const data = {
        searchKeyword: searchKeyword,
        filteredByRole: filteredByRole,
      };
      getAllUserDetails(data);
    }
  }, [filteredByRole, searchKeyword]);

  const openModal = () => {
    SetIsAddUserModal(true);
  };

  const changeModelState = () => {
    SetIsAddUserModal(!isAddUserModal);
    SetEditUserData({});
    resetFormField();
  };

  const changePage = (pageNumber) => {
    SetDefaultPageNumber(pageNumber - 1);
  };

  useEffect(() => {
    let data = {
      searchKeyword: searchKeyword,
      filteredByRole: filteredByRole,
    };
    getAllUserDetails(data);
  }, [defaultPageNumber]);

  const setLoader = (loaderFlag) => {
    SetLoader(loaderFlag);
  };
  const editUser = (userData) => {
    SetIsAddUserModal(true);
    SetEditUserData(userData);
  };

  const confirmDelete = (id) => {
    setLoader(true);
    let data = {
      id: id,
    };
    deleteUser(data)
      .then((res) => {
        if (res && res.data) {
          toast.success(res.message);
          getAllUserDetails({});
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

  const manageUserStatus = (id) => {
    let data = {
      id: id,
    };
    setLoader(true);
    changeUserStatus(data)
      .then((res) => {
        if (res && res.data) {
          toast.success(res.message);
          setLoader(false);
          getAllUserDetails({});
        } else {
          toast.error(res.message);
        }
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  // useEffect(() => {
  //   SetDefaultPageNumber(0);
  //   getAllUserDetails({});
  // }, []);

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
              <Card.Title as="h5">User Management</Card.Title>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={5} xs={5} />
                <Col md={2} xs={2}>
                  <Select
                    showSearch
                    placeholder="Filter By Role"
                    optionFilterProp="children"
                    onChange={onChange}
                    onSearch={onSearch}
                    filterOption={(input, option) =>
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    notFoundContent="No Role Found"
                  >
                    {userRole.map((option) => (
                      <Select.Option key={option.name} value={option.value}>
                        {option.label}
                      </Select.Option>
                    ))}
                  </Select>
                </Col>

                <Col md={3} xl={3}>
                  <Search
                    onSearch={onSearch}
                    allowClear
                    placeholder="Search Name"
                  />
                </Col>
                <Col md={2} xl={2}>
                  <Button className="mb-1" type="primary" onClick={openModal}>
                    Add Politician
                  </Button>
                </Col>
              </Row>

              <Table responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Active</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users &&
                    users.map((user, index) => {
                      return (
                        <tr>
                          <th scope="row" key={index}>
                            {defaultPageNumber === 0
                              ? index + 1
                              : defaultPageNumber *
                                  paginationFields["pageSize"] +
                                index +
                                1}
                            {/* {index + 1} */}
                          </th>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>
                            {user.roles.length > 0
                              ? user.roles.map((role) => {
                                  return role.role.toString();
                                })
                              : "-"}
                          </td>
                          <td>
                            <Switch
                              checked={user.isActive}
                              onChange={() => manageUserStatus(user.id)}
                            />
                          </td>
                          <td>
                            <Tooltip placement="bottomLeft" title="Edit User">
                              <EditOutlined
                                className="mr-2"
                                onClick={() => editUser(user)}
                              />
                            </Tooltip>

                            <Popconfirm
                              title="Are you sure delete this record?"
                              onConfirm={() => confirmDelete(user.id)}
                              // onCancel={cancelDelete}
                              okText="Yes"
                              cancelText="No"
                            >
                              <Tooltip
                                placement="bottomLeft"
                                title="Delete User"
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
                  total={paginationFields["totalElements"]}
                  onChange={changePage}
                  current={defaultPageNumber + 1}
                />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {isAddUserModal && (
        <AddEditUserModal
          isAddUserModal={isAddUserModal}
          changeModelState={changeModelState}
          form={props.form}
          loader={loader}
          setLoader={setLoader}
          editUserData={editUserData}
          getAllUserDetails={() => getAllUserDetails({})}
        />
      )}
    </>
  );
};
const WrappedNormalLoginForm = Form.create({ name: "normal_login" })(User);
export default WrappedNormalLoginForm;
