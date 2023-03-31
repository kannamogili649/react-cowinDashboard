import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from 'recharts'

const VaccinationCoverage = props => {
  const {lastWeekData} = props
  const updatedData = lastWeekData.map(eachData => ({
    vaccineDate: eachData.vaccine_date,
    dose1: eachData.dose_1,
    dose2: eachData.dose_2,
  }))
  console.log(updatedData)

  const DataFormatter = number => {
    if (number > 1000) {
      return `${(number / 1000).toString()}k`
    }
    return number.toString()
  }

  return (
    <ResponsiveContainer width="90%" height={400}>
      <BarChart
        data={updatedData}
        margin={{
          top: 5,
        }}
      >
        <XAxis
          dataKey="vaccineDate"
          tick={{
            stroke: 'gray',
            strokeWidth: 1,
          }}
        />
        <YAxis
          tickFormatter={DataFormatter}
          tick={{
            stroke: 'gray',
            strokeWidth: 0,
          }}
        />
        <Legend
          wrapperStyle={{
            padding: 30,
          }}
        />
        <Bar dataKey="dose1" name="Dose1" fill=" #5a8dee" barSize="20%" />
        <Bar dataKey="dose2" name="Dose2" fill="#f54394" barSize="20%" />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default VaccinationCoverage
