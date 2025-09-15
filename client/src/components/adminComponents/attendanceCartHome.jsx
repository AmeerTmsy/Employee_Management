import React from 'react';
import { PieChart, Pie, Cell, Tooltip } from "recharts";

function AttendanceCartHome(props) {

    const taskCompletion = 75;
    const taskPending = 25;

    const testMeasurments = [
        {
            data: [
                { name: "Precent", value: taskCompletion, fill: '#139730ff' },
                { name: "Leave", value: taskPending, fill: "#ada4a4ff" },
            ]
        }
    ]
    return (
        <div style={{ display: 'flex', justifyContent: "center" }}>
            <PieChart width={500} height={350}>
                <Tooltip />
                {testMeasurments.map((s, idx) =>
                    <Pie
                        key={idx}
                        dataKey="value"
                        data={s.data}
                        innerRadius={80}
                        outerRadius={120}
                        paddingAngle={1}
                        startAngle={0}
                        endAngle={-360}
                        fill="#fff"
                        label={({ name, value }) =>
                            `${name}: ${value}%`
                        }
                    />
                )}
            </PieChart>
        </div>
    );
}

export default AttendanceCartHome;