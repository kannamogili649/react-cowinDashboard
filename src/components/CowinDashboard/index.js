import Loader from 'react-loader-spinner'
import './index.css'
import {Component} from 'react'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByAge from '../VaccinationByAge'
import VaccinationByGender from '../VaccinationByGender'

class CowinDashboard extends Component {
  state = {lastWeekData: [], dataByAge: [], dataByGender: [], processStatus: ''}

  componentDidMount() {
    this.getVaccinationData()
  }

  getVaccinationData = async () => {
    this.setState({processStatus: 'LOADING'})
    const url = 'https://apis.ccbp.in/covid-vaccination-data'
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const last7DaysVaccination = data.last_7_days_vaccination
      const vaccineByAge = data.vaccination_by_age
      const vaccineByGender = data.vaccination_by_gender
      this.setState({
        lastWeekData: last7DaysVaccination,
        dataByAge: vaccineByAge,
        dataByGender: vaccineByGender,
        processStatus: 'PROCESSED',
      })
    } else {
      this.setState({processStatus: 'FAILURE'})
    }
  }

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  renderOnFailure = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-image"
      />
      <h1>Something went wrong</h1>
    </div>
  )

  renderData = () => {
    const {lastWeekData, dataByAge, dataByGender} = this.state
    return (
      <div className="container">
        <div className="header">
          <img
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="website logo"
            className="logo"
          />
          <h1 className="heading">Co-WIN</h1>
        </div>
        <h1>CoWIN Vaccination in India</h1>
        <div className="vaccine-by-age-container">
          <h1>Vaccination Coverage</h1>
          <VaccinationCoverage lastWeekData={lastWeekData} />
        </div>
        <div className="vaccine-by-age-container">
          <h1>Vaccination by gender</h1>
          <VaccinationByGender dataByGender={dataByGender} />
        </div>
        <div className="vaccine-by-age-container">
          <h1>Vaccination by age</h1>
          <VaccinationByAge dataByAge={dataByAge} />
        </div>
      </div>
    )
  }

  renderDashBoard = () => {
    const {processStatus} = this.state
    switch (processStatus) {
      case 'PROCESSED':
        return this.renderData()

      case 'FAILURE':
        return this.renderOnFailure()

      case 'LOADING':
        return this.renderLoader()

      default:
        return null
    }
  }

  render() {
    return <>{this.renderDashBoard()}</>
  }
}

export default CowinDashboard
