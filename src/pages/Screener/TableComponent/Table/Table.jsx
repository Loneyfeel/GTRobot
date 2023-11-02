import style from './table.module.sass'

import React, { useState } from "react";
import { Table, Input, Select } from 'antd';
import { AreaChartOutlined } from "@ant-design/icons";

const { Column } = Table;
const { Option } = Select;

const ScreenTable = ({ data }) => {
    const [nameFilter, setNameFilter] = useState('');
    const [powerFilter, setPowerFilter] = useState('');
    const [densityFilter, setDensityFilter] = useState('');
    const [distanceFilter, setDistanceFilter] = useState('');

    const handleNameFilterChange = (value) => {
        setNameFilter(value);
    };

    const handlePowerFilterChange = (value) => {
        setPowerFilter(value);
    };

    const handleDensityFilterChange = (value) => {
        setDensityFilter(value);
    };

    const handleDistanceFilterChange = (value) => {
        setDistanceFilter(value);
    };

    const filters = {
        name: data.map(item => item.name),
        power: [3, 5, 10, 20],
        density: [100000, 250000, 500000, 1000000, 2000000, 3000000],
        distance: [0.5, 1, 1.5, 2, 3]
    };

    const filteredData = data.filter((item) => {
        return (
            item.name.toLowerCase().includes(nameFilter.toLowerCase()) &&
            (powerFilter === '' || item.power >= powerFilter) &&
            (densityFilter === '' || item.density >= densityFilter) &&
            (distanceFilter === '' || item.distance >= distanceFilter)
        );
    });

    const styles = {
        width: "300px",
        color: "#ADAABF",
        marginRight: "30px"
    }
    return (
        <>
            <Input
                placeholder="Фильтр по названию"
                value={nameFilter}
                onChange={(e) => handleNameFilterChange(e.target.value)}
                defaultValue = "true"
                style = {styles}
            />
            <Select
                placeholder="Сила не менее"
                style={{ width: 120 }}
                value={powerFilter || undefined}
                onChange={handlePowerFilterChange}
            >
                {filters.power.map((value) => (
                    <Option key={value} value={value.toString()}>
                        {value}
                    </Option>
                ))}
            </Select>
            <Select
                placeholder="Плотность не менее"
                style={{ width: 120 }}
                value={densityFilter || undefined}
                onChange={handleDensityFilterChange}
            >
                {filters.density.map((value) => (
                    <Option key={value} value={value.toString()}>
                        {value}
                    </Option>
                ))}
            </Select>
            <Select
                placeholder="Расстояние не менее"
                style={{ width: 120 }}
                value={distanceFilter || undefined}
                onChange={handleDistanceFilterChange}
            >
                {filters.distance.map((value) => (
                    <Option key={value} value={value.toString()}>
                        {value}
                    </Option>
                ))}
            </Select>
            <Table
                dataSource={filteredData}
                style={{ width: 350 }}
            >
                <Column
                    title=""
                    dataIndex="graph"
                    key="graph"
                    width={30}
                    render={() => (
                        <button style={{ width: 30, height: 25, borderRadius: 7, backgroundColor: 'var(--tg-theme-bg-color)' }}>
                            <AreaChartOutlined style={{ backgroundColor: 'var(--tg-text-color)', fontSize: 15 }} />
                        </button>
                    )}
                />
                <Column
                    title="Монета"
                    dataIndex="name"
                    key="name"
                    width={60}
                    sorter={(a, b) => a.name.localeCompare(b.name)}
                />
                <Column
                    title="Сила"
                    dataIndex="power"
                    key="power"
                    width={60}
                    sorter={(a, b) => a.power - b.power}
                />
                <Column
                    title="Цена"
                    dataIndex="price"
                    key="price"
                    width={60}
                    sorter={(a, b) => a.price - b.price}
                />
                <Column
                    title="Плотн"
                    dataIndex="density"
                    key="density"
                    width={60}
                    sorter={(a, b) => a.density - b.density}
                />
                <Column
                    title="Расст"
                    dataIndex="distance"
                    key="distance"
                    width={60}
                    sorter={(a, b) => a.distance - b.distance}
                />
            </Table>
        </>
    );
}

export default ScreenTable
