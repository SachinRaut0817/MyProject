import React, { useEffect, useState } from "react";
import { Modal, Form, Input } from "antd";
import { toast } from "react-toastify";
import { addContent } from "../../services/ContentService";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const AddEditContentModal = (props) => {
  let [description, setDescription] = useState("");
  const {
    isAddContentModal,
    form,
    changeModelState,
    setLoader,
    editContentData,
    getAllContents,
    descriptionEdit,
  } = props;
  //setDescription(editContentData["description"]);
  let [addContentForm, SetaddContentForm] = useState({
    id:
      editContentData && editContentData["id"]
        ? editContentData["id"]
        : undefined,
    name:
      editContentData && editContentData["name"] ? editContentData["name"] : "",
  });
  useEffect(() => {
    setDescription(descriptionEdit);
  }, []);
  const inputChange = (event) => {
    let value = event.target.value;
    let name = event.target.name;
    let formData = { ...addContentForm };
    formData[name] = value;

    SetaddContentForm((contentData) => ({
      ...contentData,
      ...formData,
    }));
  };

  const submitContentForm = () => {
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      var id = addContentForm["id"];
      var name = addContentForm["name"];
      var desc = description;
      const data = {
        id: id,
        name: name,
        description: desc,
      };
      setLoader(true);
      if (addContentForm["id"] === undefined) {
        addContent(data)
          .then((res) => {
            if (res && res.data) {
              toast.success(res.message);
              changeModelState();
              SetaddContentForm({});
              getAllContents({});
              setDescription("");
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
        addContent(data)
          .then((res) => {
            if (res && res.data) {
              toast.success(res.message);
              changeModelState();
              SetaddContentForm({});
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
      }
    });
  };

  return (
    <>
      {console.log("Name : ", addContentForm["name"])}
      {console.log("Edit Name : ", editContentData["name"])}
      <Modal
        title="Add Content"
        visible={isAddContentModal}
        onCancel={changeModelState}
        onOk={submitContentForm}
      >
        <Form layout="vertical">
          <Form.Item label="Page Name">
            {form.getFieldDecorator("name", {
              rules: [
                {
                  required: true,
                  message: "Please input Page Name!",
                },
              ],

              initialValue: addContentForm["name"],
            })(
              <Input
                placeholder="Enter Page Name"
                name="name"
                disabled={
                  editContentData && editContentData["name"] !== undefined
                    ? true
                    : false
                }
                onChange={inputChange}
              />
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
              initialValue: addContentForm["description"],
            })(
              <CKEditor
                resizable={true}
                style={{ width: "565px" }}
                className="form-control"
                editor={ClassicEditor}
                config={{
                  removePlugins: [
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
                data={description}
                //   error={touched.description && errors.description}
                //   value={values.description}
                onChange={(e, editor) => {
                  const data = editor.getData();
                  // handleBlur(e)
                  setDescription(data);
                }}
              />
            )}
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddEditContentModal;
