import React, { Component } from 'react';
import 'react-date-picker/index.css';
import { DateField, Calendar } from 'react-date-picker'
import $ from 'jquery';
import DropdownList from 'react-widgets/lib/DropdownList';

class ScriptRemind extends Component {

  constructor(props) {
    super(props);
    this.state = {
      "currentDrug": "None",
      "dosageAmt": 0,
      "dosageMeasure": 'none',
      "date": null,
      "scheduleNum": "none",
      "scheduleDayWeek": "none"
  }
  this.updateDrugName = this.updateDrugName.bind(this);
  this.submitForm = this.submitForm.bind(this);


}

updateDrugName(event){
  console.log("value", event.target.value)
  console.log("hi");
  this.setState({
      currentDrug: event.target.value
    });
}

handleDayClick(date) {
  console.log("Selected Date:", date);
}

submitForm () {
  var script = {
    "name": this.state.currentDrug,
    "dosage": this.state.dosageAmt + ' ' + this.state.dosageMeasure,
    "refill": this.state.date,
    "frequency": this.state.scheduleNum + ' per ' + this.state.scheduleDayWeek
  }
  console.log("submitForm called for: ", script)

  $.ajax({
      type: 'POST',
      url: '/scriptRemind',
      dataType: 'json',
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify(script),
      success: function(data){
        console.log('A reminder was set for: ', data);
      },
      error: function(err){
        console.log('Reminder not set: ', err);
      }
    });

}

onChange (dateString, { dateMoment, timestamp }) {
  console.log(dateString)
}

  render() {
    var measurements = ['mg', 'mL', 'tablet'];
    var schedule = ['day', 'week']
    let date = new Date();
    return (
      <div>
        <div>
          <h1> Current Drug: {this.state.currentDrug} </h1>
          <input
          onChange={this.updateDrugName}
          placeholder='Name'
          />
        </div>
        <div>
          <input
          onChange={(text) => this.setState({"dosageAmt": text})}
          placeholder='Dosage (e.g. if "Take 1 tablet", type "1")'
          />
          <DropdownList
            data={measurements}
            defaultValue={'mg'}
            onChange={(measure) => this.setState({dosageMeasure: measure})}>
          </DropdownList>


        </div>
        <div>
          {/* <h1> Refill Date</h1> */}
          <Calendar
            dateFormat="YYYY-MM-DD"
            date={date}
            onChange={this.onChange}
          />

        </div>
        <div>
          <input
          onChange={(text) => this.setState({"scheduleNum": text})}
          placeholder='How often? (1x, 2x, etc..)'
          />
          <h1> per </h1>
           <DropdownList
            data={schedule}
            defaultValue={'day'}
            onChange={(frequency) => this.setState({scheduleDayWeek: frequency})}>
          </DropdownList>
        </div>
        <div>
          <button onClick={this.submitForm()}> Remind Me </button>
        </div>
      </div>

    );
  }
}

export default ScriptRemind;

/* const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  topbar: {
  flexDirection: 'row',
  justifyContent: 'flex-end',
  backgroundColor: 'black',
  paddingHorizontal: 5,
  paddingVertical: 10
  },
  submit: {
    textAlign: 'center'
  },

});

*/
