import React from 'react';
import R from 'ramda';
import DoctorSelect from './DoctorSelect';

var doctors = [
  {
    name: 'Dr. Agdel Hernandez Colon, MD',
    address: '30 Broad Street, New York, NY 10004',
    image: '/assets/agd.png'
  },
  {
    name: 'Dr. Annie Li, MD',
    address: '156 William Street, New York, NY 10038',
    image: '/assets/anni.png'
  },
  {
    name: 'Dr. Edward Fruitman, MD',
    address: '115 Broadway, New York, NY 10006',
    image: '/assets/edw.png'
  }
];

class Recommendation extends React.Component {
	constructor(props) {
		super(props);
    this.state = { };
	}

  render() {
    return (
      <div>
        <p style={{margin: '50px 0'}}>
          Based on your score results, you may benefit from profesional consulatation. Here are some recomendations.
        </p>
        <div>
          {R.map((d) => (
            <DoctorSelect doctor={d} />
          ), doctors)}
        </div>
      </div>
    );
  }
}

export default Recommendation;
