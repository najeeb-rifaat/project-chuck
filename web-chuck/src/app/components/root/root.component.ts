import { Component } from '@angular/core';
import request from 'request';

const getParameterByName = (name) => {
  const url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

@Component({
  selector: 'root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class RootComponent {
  tid = getParameterByName('tid') || 'NO_TID';
  phoneNumber = getParameterByName('phone') || 'NO_PHONE';
  title = `${this.phoneNumber} Click to opt-out`;

  optout() {
    request
    .get(`http://localhost:3000/delete?tid=${this.tid}`)
    .on('response', function(response) {
      console.log(response.statusCode) // 200
      console.log(response.headers['content-type']) // 'image/png'
    })
  }
}


