import React from 'react';

class DoctorSelect extends React.Component {
	constructor(props) {
		super(props);
    this.state = { };
	}

  render() {
    return (
      <div className={'doctor-select'}>
        <img src={this.props.doctor.image} />
        <h4 className={'doctor-name'}>
          {this.props.doctor.name}
        </h4>
        <span className={'doctor-address'}>
          {this.props.doctor.address}
        </span>
        <a className={'button'} href={'/thankyou.html'}>
          Book an Appointment
        </a>
      </div>
    );
  }
}

DoctorSelect.propTypes = {
  doctor: React.PropTypes.object.isRequired
};

export default DoctorSelect;
