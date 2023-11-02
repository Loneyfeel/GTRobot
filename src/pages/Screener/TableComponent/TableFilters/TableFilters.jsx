import React from 'react';
import { Input, Select } from 'antd';

const { Option } = Select;

const TableFilters = ({ onFilter }) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 40, width: '97%' }}>
            <Input
                placeholder="Фильтр по названию"
                onChange={(e) => onFilter({ name: e.target.value })}
            />
            <Select
                style={{ width: 150 }}
                placeholder="Сила не менее"
                onChange={(value) => onFilter({ power: value })}
            >
                <Option value="">Сила не менее</Option>
                <Option value="3">3</Option>
                <Option value="5">5</Option>
                <Option value="10">10</Option>
                <Option value="20">20</Option>
            </Select>
            <Select
                style={{ width: 150 }}
                placeholder="Плотность не менее"
                onChange={(value) => onFilter({ density: value })}
            >
                <Option value="">Плотность не менее</Option>
                <Option value="100000">100K</Option>
                <Option value="250000">250K</Option>
                <Option value="500000">500K</Option>
                <Option value="1000000">1M</Option>
                <Option value="2000000">2M</Option>
                <Option value="3000000">3M</Option>
            </Select>
            <Select
                style={{ width: 150 }}
                placeholder="Расстояние не менее"
                onChange={(value) => onFilter({ distance: value })}
            >
                <Option value="">Расстояние не менее</Option>
                <Option value="0.5">0.5</Option>
                <Option value="1">1</Option>
                <Option value="1.5">1.5</Option>
                <Option value="2">2</Option>
                <Option value="3">3</Option>
            </Select>
        </div>
    );
}

export default TableFilters;
