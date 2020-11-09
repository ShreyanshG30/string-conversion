import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-json-conversion',
  templateUrl: './json-conversion.component.html',
  styleUrls: ['./json-conversion.component.css']
})
export class JsonConversionComponent implements OnInit {
  public outputValue: string = '';
  constructor() { }

  ngOnInit(): void {
  }

  public validateString(inputString) {
    this.outputValue = 'Syntax Invalid.'
    if (inputString.length > 0) {
      inputString = inputString.replace(/\s/g,'');
      let count = 0;
      let openingIndex = 0;
      let closingIndex = 0;
      for (let i = 0; i < inputString.length; i++) {
        if (count >= 0) {
          if (inputString[i] == '(') {
            openingIndex = i;
            count = count + 1;
          } else if (inputString[i] == ')') {
            if (closingIndex == 0 ) {
              closingIndex = i;
            }
            count = count - 1;
          }
        } else {
          return;
        }
      }
      if (count == 0) {
        this.outputValue = '';
        const outerOperator = inputString.substring(closingIndex + 1, openingIndex);
        this.outputValue = this.startConversion(inputString, outerOperator);
      }
    }
  }

  public startConversion(inputString, outerOperator) {
    let converted = {};
    const innerExpression = [];
    inputString = inputString.replace(/[()]/g,'');
    const splittedData = inputString.split(outerOperator);
    converted["query"] = {};
    splittedData.forEach(element => {
      let arrayObject = {};
      let innerOperator = element.substring(3,5);
      const innerSplittedData = element.split(innerOperator);
      let innerText = innerOperator == '&&' ? 'and' : innerOperator == '||' ? 'or': '';
      let innerObject = {};
      innerSplittedData.forEach(data => {
        innerObject[data[0]] = data[2];
      });
      arrayObject[innerText] = innerObject;
      innerExpression.push(arrayObject);
    });
    let outerText = outerOperator == '&&' ? 'and' : outerOperator == '||' ? 'or': '';
    converted["query"][outerText] = innerExpression;
    return JSON.stringify(converted);
  }

}
