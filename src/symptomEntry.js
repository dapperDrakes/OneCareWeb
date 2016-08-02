import React, { Component } from 'react';
import FilteredMultiSelect from 'react-filtered-multiselect';
import $ from 'jquery';

var SYMPTOMS = [ 
  {id: 1, name: 'Chronic fatigue'}, 
  {id: 2, name: 'Less stamina than others'},
  {id: 3, name: 'Long recovery period after any activity'},
  {id: 4, name: 'Inability to concentrate'},
  {id: 5, name: 'Sleep apnea'},
  {id: 6, name: 'Snoring'},
  {id: 7, name: 'Insomnia'},
  {id: 8, name: 'Need naps in the afternoon'},
  {id: 9, name: 'Weakness'},
  {id: 10, name: 'Wake feeling tired'},
  {id: 11, name: 'Frequently oversleep'},
  {id: 12, name: 'Weight gain'},
  {id: 13, name: 'Inability to lose weight'},
  {id: 14, name: 'Ascites (abdominal fluid accumulation)'},
  {id: 15, name: 'Metabolic Syndrome'},
  {id: 16, name: 'Weight loss'},
  {id: 17, name: 'Anorexia'},
  {id: 18, name: 'Heightened appetite'},
  {id: 19, name: 'Diminished appetite'},
  {id: 20, name: 'Obesity'},
  {id: 21, name: 'Cold extremities'},
  {id: 22, name: 'Cold sweats'},
  {id: 23, name: 'Night sweats'},
  {id: 24, name: 'Heat intolerance'},
  {id: 25, name: 'Cold intolerance'},
  {id: 26, name: 'Internal shivering'},
  {id: 27, name: 'Hypothermia'},
  {id: 28, name: 'Cold hands'},
  {id: 29, name: 'Clammy hands'},
  {id: 30, name: 'Cold feet'},
  {id: 31, name: 'Excessive perspiration'},
  {id: 32, name: 'Little perspiration'},
  {id: 33, name: 'Low basal body temperature (below 97.8 degrees Fahrenheit)'},
  {id: 34, name: 'Slow movements'},
  {id: 35, name: 'Slowed Achilles reflex'},
  {id: 36, name: 'Diminished reflexes'},
  {id: 37, name: 'Slow speech'},
  {id: 38, name: 'Frequent infections'},
  {id: 39, name: 'Chronic illness'},
  {id: 40, name: 'Low immune system'},
  {id: 41, name: 'Frequent colds'},
  {id: 42, name: 'Susceptibility to bronchitis'},
  {id: 43, name: 'Hard time recovering from infections'},
  {id: 44, name: 'Recurrent sinus infections'},
  {id: 45, name: 'Recurrent skin infections'},
  {id: 46, name: 'Recurrent ear infections'},
  {id: 47, name: 'Recurrent nose infections'},
  {id: 48, name: 'Recurrent throat infections'},
  {id: 49, name: 'Candida (yeast)'},
  {id: 50, name: 'Pelvic Inflammatory Disease (PID)'},
  {id: 51, name: 'Repeated urinary tract infections'},
  {id: 52, name: 'Upper respiratory tract infections'}
]; 

class SymptomEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSymptoms: []
    };
    this.handleDeselect = this.handleDeselect.bind(this);
    this.handleSelectionChange = this.handleSelectionChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  };

  handleDeselect(index) {
    var selectedSymptoms = this.state.selectedSymptoms.slice();
    selectedSymptoms.splice(index, 1);
    this.setState({ selectedSymptoms });
  };

  handleSelectionChange(selectedSymptoms) {
    this.setState({ selectedSymptoms });
  };

  submitForm() {
    $.ajax({
      type: 'POST',
      url: '/symptomEntry',
      dataType: 'json',
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify(selectedSymptoms),
      success: function(data) {
        console.log("Here's your shit", data);
      },
      error: function(err) {
        console.log('Congrats you are superhuman', err);
      }
    })
  };

  render() {
    var { selectedSymptoms } = this.state;

    return (
      <div>
        <h2>Choose your symptoms, weakling. They will appear at the bottom.</h2>
        <h4>Energy Level and Sleep</h4>
        <FilteredMultiSelect
          onChange={this.handleSelectionChange}
          options={SYMPTOMS.slice(0, 11)}
          selectedOptions={selectedSymptoms}
          textProp='name'
          valueProp='id' />
        <h4>Weight</h4>
        <FilteredMultiSelect
          onChange={this.handleSelectionChange}
          options={SYMPTOMS.slice(11, 21)}
          selectedOptions={selectedSymptoms}
          textProp='name'
          valueProp='id' />
        <h4>Body Temperature</h4>
        <FilteredMultiSelect
          onChange={this.handleSelectionChange}
          options={SYMPTOMS.slice(21, 34)}
          selectedOptions={selectedSymptoms}
          textProp='name'
          valueProp='id' />
        <h4>Slowness</h4>
        <FilteredMultiSelect
          onChange={this.handleSelectionChange}
          options={SYMPTOMS.slice(34, 38)}
          selectedOptions={selectedSymptoms}
          textProp='name'
          valueProp='id' />
        <h4>Infections</h4>
        <FilteredMultiSelect
          onChange={this.handleSelectionChange}
          options={SYMPTOMS.slice(38)}
          selectedOptions={selectedSymptoms}
          textProp='name'
          valueProp='id' />
        {selectedSymptoms.length === 0 && <p>(nothing selected yet)</p>}
        {selectedSymptoms.length > 0 && <ul>
          {selectedSymptoms.map((symptom, i) => <li key={symptom.id}>
            {`${symptom.name} `}
            <button type='button' onClick={this.handleDeselect.bind(null, i)}>
              &times;
            </button>
          </li>)}
        </ul>}
      </div>
    );
  }
}

export default SymptomEntry;
//add more bad boiz;