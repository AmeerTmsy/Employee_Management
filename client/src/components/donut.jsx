import React, { useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
export default function TaskCompletionChart({taskCompletion, taskPending}) {

    const testMeasurments = [
        {
            data: [
                { name: "Completed", value: taskCompletion, fill: '#139730ff' },
                { name: "Pending", value: taskPending, fill: "#ada4a4ff" },
            ]
        }
    ]

    return (
        <div style={{
            display: 'flex',
            justifyContent: "center",
            // alignItems: "flex-start"
        }}>
            <PieChart width={600} height={490}>
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
