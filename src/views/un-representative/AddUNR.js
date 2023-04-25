import React, { useEffect, useState } from "react";
import Icon, { UploadOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { Button, Select, Modal, Form, Input, Upload, Tooltip } from "antd";
import { toast } from "react-toastify";
import { getAllCountry } from "../../services/CountryService";
import TextArea from "antd/lib/input/TextArea";
import { addRepresentetive } from "../../services/UnRepresentativeService";

const AddEditUNRModal = (props) => {
  const {
    isAddUNRModal,
    form,
    changeModelState,
    setLoader,
    editUNRData,
    getAllUNRDetails,
  } = props;

  let [addUNRForm, SetaddUNRForm] = useState({
    id: editUNRData && editUNRData["id"] ? editUNRData["id"] : undefined,
    name: editUNRData && editUNRData["name"] ? editUNRData["name"] : "",
    title: editUNRData && editUNRData["title"] ? editUNRData["title"] : "",
    description:
      editUNRData && editUNRData["description"]
        ? editUNRData["description"]
        : "",
    countryId:
      editUNRData && editUNRData["country"] && editUNRData["country"]["id"]
        ? editUNRData["country"]["id"]
        : undefined,
    blogspot:
      editUNRData && editUNRData["blogspot"] ? editUNRData["blogspot"] : "",
  });

  let [uploadFileList, SetUploadFileList] = useState(
    editUNRData &&
      editUNRData.imagePath && [
        {
          url: editUNRData.imagePath,
          status: "done",
          uid: "-1",
        },
      ]
  );

  let [countryList, SetCountryList] = useState([]);

  const inputChange = (event) => {
    let value = event.target.value;
    let name = event.target.name;
    let formData = { ...addUNRForm };
    formData[name] = value;

    SetaddUNRForm((unrData) => ({
      ...unrData,
      ...formData,
    }));
  };

  const submitUNRForm = () => {
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      let formData = new FormData();
      formData.append("id", addUNRForm["id"]);
      formData.append("name", addUNRForm["name"]);
      formData.append("title", addUNRForm["title"]);
      formData.append("description", addUNRForm["description"]);
      formData.append("countryId", addUNRForm["countryId"]);
      formData.append("blogspot", addUNRForm["blogspot"]);

      if (uploadFileList[0].originFileObj !== undefined) {
        formData.append(
          "picture",
          uploadFileList && uploadFileList.length > 0
            ? uploadFileList[0].originFileObj
            : null
        );
      }

      setLoader(true);

      if (addUNRForm["id"] === undefined) {
        addRepresentetive(formData)
          .then((res) => {
            if (res && res.data) {
              toast.success(res.message);
              changeModelState();

              SetaddUNRForm({});
              SetUploadFileList([]);

              getAllUNRDetails({});
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
        addRepresentetive(formData)
          .then((res) => {
            if (res && res.data) {
              toast.success(res.message);

              changeModelState();

              SetaddUNRForm({});
              SetUploadFileList([]);

              getAllUNRDetails({});
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
    addUNRForm["countryId"] = countryId;
    SetaddUNRForm((unrData) => ({
      ...unrData,
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
        title="Add UN-Representative"
        visible={isAddUNRModal}
        onCancel={changeModelState}
        onOk={submitUNRForm}
      >
        <Form layout="vertical">
          <Form.Item
            label={
              <span>
                Upload Image &nbsp;
                <Tooltip title="Image must be contain 500*500 resolution">
                  <InfoCircleOutlined />
                </Tooltip>
              </span>
            }
            valuePropName="file"
          >
            {form.getFieldDecorator("fileUpload", {
              rules: [
                {
                  required: true,
                  message: "Please upload image!",
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
                <Button icon={<UploadOutlined />}>Upload picture</Button>
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

              initialValue: addUNRForm["name"],
            })(
              <Input
                placeholder="Enter Name"
                name="name"
                onChange={inputChange}
              />
            )}
          </Form.Item>
          <Form.Item label="Title">
            {form.getFieldDecorator("title", {
              rules: [
                {
                  required: true,
                  message: "Please input Title!",
                },
              ],
              initialValue: addUNRForm["title"],
            })(
              <Input
                placeholder="Enter Title"
                name="title"
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
              initialValue: addUNRForm["countryId"],
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

          <Form.Item label="Description">
            {form.getFieldDecorator("description", {
              rules: [
                {
                  required: true,
                  message: "Please input Description!",
                },
              ],
              initialValue: addUNRForm["description"],
            })(
              <TextArea
                placeholder="Enter Description"
                name="description"
                rows={3}
                onChange={inputChange}
              />
            )}
          </Form.Item>
          <Form.Item label="Blog Spot" className="mt-1">
            <Input
              placeholder="Enter URL"
              name="blogspot"
              onChange={inputChange}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddEditUNRModal;
