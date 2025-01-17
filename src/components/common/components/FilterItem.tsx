'use client';
import React, { useEffect, useState } from 'react';
import { TimePicker, Dropdown, Menu } from 'antd';
import dayjs from 'dayjs';
import {
  ArrowRightOutlined,
  CaretDownFilled,
  ClockCircleOutlined,
} from '@ant-design/icons';
import RadioBtn from './RadioButton';
import DatePickerComponent from '../DatePickerComponent';
import locale from 'antd/es/date-picker/locale/vi_VN';

import styles from '../styles/FilterItem.module.scss';
import Arrow from '@public/icons/ArrowNarrowRight.svg';
import Image from 'next/image';
import RangePickerComponent from '../RangePickerComponent';

interface OptionItem {
  label: string;
  value: string;
}
interface FilterItemProps {
  filter: {
    title: string;
    name: string;
    options: OptionItem[];
  };
  onFilterChange: (filter: any) => void;
  isNeedReset: boolean;
  setIsNeedReset: () => void;
}

export const FilterItem: React.FC<FilterItemProps> = ({
  filter,
  onFilterChange,
  isNeedReset,
  setIsNeedReset,
}) => {
  const [activeTab, setActiveTab] = useState(filter.options[0]?.value || '');
  const [open, setOpen] = useState(true);
  const handleFilterChange = (value: string) => {
    onFilterChange(value);
    setActiveTab(value);
  };

  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState<[string, string]>(['', '']);

  const handleDateChange = (value: any) => {
    if (!value) {
      setDate('');
      return;
    }
    const newDate = dayjs(value)?.format('YYYY-MM-DD');
    setDate(newDate);
    handleSetTimeDate(newDate, time[0], time[1]);
  };

  const handleTimeChange = (value: any) => {
    if (!value) {
      setTime(['', '']);
      return;
    }
    const start = value[0] ? dayjs(value[0]).format('HH:mm') : '';
    const end = value[1] ? dayjs(value[1]).format('HH:mm') : '';
    setTime([start < end ? start : end, end > start ? start : end]);
    handleSetTimeDate(
      date,
      start < end ? start : end,
      end > start ? start : end,
    );
  };

  const handleSetTimeDate = (date: string, start: string, end: string) => {
    onFilterChange(JSON.stringify({ date, start, end }));
  };

  useEffect(() => {
    if (isNeedReset) {
      console.log('Resetting filter');
      setIsNeedReset();

      setActiveTab(filter.options[0]?.value || '');
      setDate('');
      setTime(['', '']);
    }
  }, [isNeedReset]);

  return (
    <div className={`flex w-full flex-col gap-5`}>
      <div className={`flex flex-row justify-between`}>
        <span className={`body-3 w-full font-bold text-natural-700`}>
          {filter.title}
        </span>
        <CaretDownFilled onClick={() => setOpen(!open)} />
      </div>
      {open &&
        (filter.name === 'time' ? (
          <div className={`flex w-full flex-col gap-3`}>
            <DatePickerComponent
              label="Ngày"
              onChange={handleDateChange}
              defaultValue={date ? date : undefined}
            ></DatePickerComponent>
            <RangePickerComponent
              label="Thời gian"
              onChange={handleTimeChange}
              defaultValue={time[0] && time[1] ? time : undefined}
            ></RangePickerComponent>
          </div>
        ) : (
          <div className={`flex w-full flex-col gap-3`}>
            {filter.options.map((option, index) => (
              <RadioBtn
                key={option.value}
                label={option.label}
                value={option.value}
                isActive={activeTab}
                onClick={handleFilterChange}
              ></RadioBtn>
            ))}
          </div>
        ))}
      {filter.name !== 'time' && (
        <span className="w-full border-b border-natural-200 pt-3"></span>
      )}
    </div>
  );
};
