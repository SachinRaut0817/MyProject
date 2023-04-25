import React, { useEffect, useState } from "react";
import { UploadOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { Button, Select, Modal, Form, Input, Upload, Tooltip } from "antd";
import {
  registerAccountHolder,
  updateAccountHolder,
} from "../../services/UserService";

import { toast } from "react-toastify";
import { getAllCountry } from "../../services/CountryService";
const AddEditUserModal = (props) => {
  const {
    isAddUserModal,
    form,
    changeModelState,
    setLoader,
    editUserData,
    getAllUserDetails,
  } = props;

  let [addUserForm, SetAddUserForm] = useState({
    id: editUserData && editUserData["id"] ? editUserData["id"] : undefined,
    email: editUserData && editUserData["email"] ? editUserData["email"] : "",
    password:
      editUserData && editUserData["password"] ? editUserData["password"] : "",
    name: editUserData && editUserData["name"] ? editUserData["name"] : "",
    mobileNo:
      editUserData && editUserData["mobileNo"] ? editUserData["mobileNo"] : "",
    roleIds: [2],
    countryId:
      editUserData && editUserData["country"] && editUserData["country"]["id"]
        ? editUserData["country"]["id"]
        : undefined,
  });

  let [uploadFileList, SetUploadFileList] = useState(
    editUserData &&
      editUserData.verificationDocumentPath && [
        {
          url: editUserData.verificationDocumentPath,
          status: "done",
          uid: "-1",
        },
      ]
  );

  let [countryList, SetCountryList] = useState([]);

  const inputChange = (event) => {
    let value = event.target.value;
    let name = event.target.name;
    let formData = { ...addUserForm };
    formData[name] = value;

    SetAddUserForm((userData) => ({
      ...userData,
      ...formData,
    }));
  };

  const submitUserForm = () => {
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      let formData = new FormData();
      formData.append("id", addUserForm["id"]);
      formData.append("name", addUserForm["name"]);
      formData.append("email", addUserForm["email"]);
      formData.append("password", addUserForm["password"]);
      formData.append("mobileNo", addUserForm["mobileNo"]);

      formData.append("country.id", addUserForm["countryId"]);
      formData.append("roleIds", [2]);

      if (uploadFileList[0].originFileObj !== undefined) {
        formData.append(
          "picture",
          uploadFileList && uploadFileList.length > 0
            ? uploadFileList[0].originFileObj
            : null
        );
      }

      setLoader(true);

      if (addUserForm["id"] === undefined) {
        registerAccountHolder(formData)
          .then((res) => {
            if (res && res.data) {
              toast.success(res.message);
              changeModelState();

              SetAddUserForm({});
              SetUploadFileList([]);

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
      } else {
        updateAccountHolder(formData)
          .then((res) => {
            if (res && res.data) {
              toast.success(res.message);

              changeModelState();

              SetAddUserForm({});
              SetUploadFileList([]);

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
      }
    });
  };

  const changeCountry = (countryId) => {
    addUserForm["countryId"] = countryId;
    SetAddUserForm((userData) => ({
      ...userData,
    }));
  };

  const changeUploadFile = (file) => {
    let fileArr = [file.fileList[file.fileList.length - 1]];
    fileArr[0].status = "done";

    SetUploadFileList(fileArr);
  };

  const getAllCountryDetails = () => {
    getAllCountry()
      .then((res) => {
        if (res && res.data) {
          SetCountryList(res.data);
        }
      })
      .catch((err) => {});
  };

  useEffect(() => {
    getAllCountryDetails();
  }, []);

  return (
    <>
      <Modal
        title="Add Politician"
        visible={isAddUserModal}
        onCancel={changeModelState}
        onOk={submitUserForm}
      >
        <Form layout="vertical">
          <Form.Item label="Upload Verification Doc" valuePropName="file">
            {form.getFieldDecorator("fileUpload", {
              rules: [
                {
                  required: true,
                  message: "Please upload file!",
                },
              ],
              initialValue: uploadFileList,
            })(
              <Upload
                listType="picture-card"
                maxCount={1}
                fileList={uploadFileList}
                onChange={changeUploadFile}
                headers={{
                  Authorization: "authorization-text",
                }}
                name="fileUpload"
              >
                <Button icon={<UploadOutlined />}>Upload document</Button>
              </Upload>
            )}
          </Form.Item>
          <Form.Item label="Name">
            {form.getFieldDecorator("name", {
              rules: [
                {
                  required: true,
                  message: "Please input your name!",
                },
              ],

              initialValue: addUserForm["name"],
            })(
              <Input
                placeholder="Enter Name"
                name="name"
                onChange={inputChange}
              />
            )}
          </Form.Item>
          <Form.Item label="Mobile Number">
            {form.getFieldDecorator("mobileNo", {
              rules: [
                {
                  required: true,
                  message: "Please input your mobile no!",
                },
              ],
              initialValue: addUserForm["mobileNo"],
            })(
              <Input
                placeholder="Enter Mobile Number"
                name="mobileNo"
                // value={addUserForm["mobileNo"]}
                onChange={inputChange}
              />
            )}
          </Form.Item>
          <Form.Item label="Country">
            {form.getFieldDecorator("countryId", {
              rules: [
                {
                  required: true,
                  message: "Please select country!",
                },
              ],
              initialValue: addUserForm["countryId"],
            })(
              <Select
                showSearch
                placeholder="Select Country"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                notFoundContent="No Country Found"
                onChange={changeCountry}
              >
                {countryList &&
                  countryList.map((option) => (
                    <Select.Option key={option.name} value={option.id}>
                      {option.name}
                    </Select.Option>
                  ))}
              </Select>
            )}
          </Form.Item>

          <Form.Item label="Email">
            {form.getFieldDecorator("email", {
              rules: [
                {
                  required: true,
                  message: "Please input your email!",
                },
              ],
              initialValue: addUserForm["email"],
            })(
              <Input
                placeholder="Enter Email Address"
                name="email"
                // value={addUserForm["email"]}
                onChange={inputChange}
              />
            )}
          </Form.Item>
          <Form.Item
            label={
              <span>
                Password &nbsp;
                <Tooltip title="Password must be eight characters with one upper letter, one number, one special character">
                  <InfoCircleOutlined />
                </Tooltip>
              </span>
            }
          >
            {form.getFieldDecorator("password", {
              rules: [
                {
                  required: true,
                  message: "Please input your password!",
                },
              ],
              initialValue: addUserForm["password"],
            })(
              <Input.Password
                placeholder="Enter Password"
                name="password"
                // value={addUserForm["password"]}
                onChange={inputChange}
              />
            )}
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddEditUserModal;
