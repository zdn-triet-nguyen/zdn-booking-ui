'use client';
import React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import type { FormInstance, FormProps } from 'antd';
import { Button, Form, Input, InputNumber, Select, Upload } from 'antd';
import RangePickerComponent from '@/components/common/RangePickerComponent';
import styles from './formCreateSportField.module.scss';
import { cn } from '@/libs/utils';
const { TextArea } = Input;

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: '${label} không được để trống!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};
/* eslint-enable no-template-curly-in-string */

type FieldType = {
  name: string;
  category: string;
  address: string;
  phoneNumber: number;
  openTime: [string, string];
  price: number;
  rules: string;
  quantity: number;
  images: string[];
};

const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
  console.log('Success:', values);
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const FormCreateSportField: React.FC = () => {
  return (
    <div
      className={cn(
        styles.createSportFileContainer,
        'mx-auto mt-12 flex w-1/2 flex-col gap-8 rounded-form bg-neutral p-10',
      )}
    >
      <h4 className="font-bold text-natural-700">Tạo sân</h4>
      <Form
        // form={form}
        name="Create Sport Field"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        layout="horizontal"
        style={{ minWidth: '100%', maxWidth: 6 }}
        initialValues={{ remember: true }}
        requiredMark={false}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        size="large"
        validateMessages={validateMessages}
      >
        <div className="flex flex-col">
          <p className="body-2 mb-5 font-bold text-natural-700">
            Thông tin cơ bản
          </p>
          <Form.Item
            label="Tên sân"
            name="username"
            validateTrigger="onBlur"
            rules={[
              { required: true, message: 'Vui lòng nhập Tên sân!' },
              { type: 'string', min: 6, message: 'Tên sân tối thiểu 6 ký tự' },
              {
                type: 'string',
                max: 120,
                message: 'Tên sân không vượt quá 120 ký tự',
              },
            ]}
          >
            <Input
              showCount
              maxLength={120}
              placeholder="Nhập tên sân"
              style={{ width: '100%', borderRadius: '40px' }}
            />
          </Form.Item>
          <Form.Item
            label="Danh mục"
            name="category"
            rules={[{ required: true, message: 'Vui lòng nhập Danh mục' }]}
          >
            <Select placeholder="Nhập Danh mục">
              <Select.Option value="basketball">Sân bóng rổ</Select.Option>
              <Select.Option value="volleyball">Sân bóng chuyền</Select.Option>
              <Select.Option value="badminton">Sân cầu lông</Select.Option>
              <Select.Option value="tennis">Sân tennis</Select.Option>
              <Select.Option value="football">Sân bóng đá</Select.Option>
              <Select.Option value="tableTennis">Sân bóng bàn</Select.Option>
              <Select.Option value="billiards">Bi-da</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Địa chỉ"
            name="address"
            validateTrigger="onBlur"
            rules={[
              { required: true, message: 'Vui lòng nhập Địa chỉ' },
              {
                type: 'string',
                max: 64,
                message: 'Địa chỉ không vượt quá 64 ký tự',
              },
            ]}
          >
            <Input
              placeholder="Nhập địa chỉ"
              style={{ borderRadius: '40px' }}
            />
          </Form.Item>
          <Form.Item
            label="Số điện thoại"
            name="phone"
            validateTrigger="onBlur"
            rules={[
              { required: true, message: 'Vui lòng nhập Số điện thoại' },
              {
                type: 'string',
                max: 9,
                message: 'Số điện thoại không vượt quá 9 số',
              },
            ]}
          >
            <Input
              prefix="(+84) "
              style={{ width: '100%', borderRadius: '40px' }}
            />
          </Form.Item>
          <Form.Item
            label="Thời gian mở cửa"
            name="OpenTime"
            style={{ width: '100%', borderRadius: '40px' }}
            rules={[
              { required: true, message: 'Vui lòng nhập Thời gian mở cửa' },
            ]}
          >
            <RangePickerComponent />
          </Form.Item>
        </div>

        <div className="flex flex-col">
          <p className="body-2 mb-5 font-bold text-natural-700">Giá tiền</p>
          <Form.Item
            name="price"
            rules={[
              {
                type: 'number',
                required: true,
                message: 'Vui lòng nhập Giá tiền',
              },
            ]}
          >
            <InputNumber
              suffix="đ / tiếng"
              style={{ width: '120%', borderRadius: '40px' }}
            />
          </Form.Item>
        </div>

        <div className="flex w-full flex-col">
          <p className="body-2 mb-5 font-bold text-natural-700">Quy đinh sân</p>
          <Form.Item
            name="rule"
            rules={[{ required: true, message: 'Vui lòng nhập Quy định sân' }]}
            style={{ width: '120%' }}
          >
            <TextArea rows={5} style={{ borderRadius: '20px' }} />
          </Form.Item>
        </div>

        <div className="flex flex-col">
          <p className="body-2 mb-5 font-bold text-natural-700">Số sân</p>
          <Form.Item
            name="quantity"
            rules={[
              {
                type: 'number',
                required: true,
                message: 'Vui lòng nhập Số sân',
              },
            ]}
          >
            <InputNumber />
          </Form.Item>
        </div>

        <div className="flex flex-col">
          <p className="body-2 mb-5 font-bold text-natural-700">Hình ảnh</p>
          <Form.Item
            valuePropName="fileList"
            getValueFromEvent={normFile}
            name="images"
            rules={[{ required: true, message: 'Vui lòng nhập Hình ảnh' }]}
          >
            <Upload action="/upload.do" listType="picture-card">
              <button style={{ border: 0, background: 'none' }} type="button">
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Tải hình ảnh lên</div>
              </button>
            </Upload>
          </Form.Item>
        </div>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Xác nhận
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default () => <FormCreateSportField />;
