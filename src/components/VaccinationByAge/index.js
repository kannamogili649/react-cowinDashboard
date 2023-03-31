import {PieChart, Pie, Legend, Cell, ResponsiveContainer} from 'recharts'

const VaccinationByAge = props => {
  const {dataByAge} = props
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          cx="50%"
          cy="50%"
          data={dataByAge}
          startAngle={0}
          endAngle={360}
          innerRadius="0%"
          outerRadius="100%"
          dataKey="count"
        >
          <Cell name="18-44" fill="#2d87bb" />
          <Cell name="45-60" fill="#a3df9f" />
          <Cell name="Above 60" fill="#64c2a6" />
        </Pie>
        <Legend
          iconType="circle"
          layout="vertical"
          verticalAlign="middle"
          align="right"
        />
      </PieChart>
    </ResponsiveContainer>
  )
}

export default VaccinationByAge
