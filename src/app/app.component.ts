import { Component } from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-otmm';


  constructor(private httpClient: HttpClient){}
  OnSearch = () => {
    let keywordEl = <HTMLInputElement>document.getElementById("keyword");
    let keyword = keywordEl.value;
    let scopeIdEl = <HTMLInputElement>document.getElementById("scope_id");
    let scopeId = scopeIdEl.value;
    console.log(keyword);
    console.log(scopeId);
    const headers = new HttpHeaders()
      .set("X-Requested-By", "740370477")
      .set("OTDSToken", "*VER2*ABQZapqaQ60kTpcggKMDGUt5GdYkZAAQLcSchrI8wN7_s_1psWDy4QMwqD9KK3KNZvWwFR6OO3cZB4m2TQocOkNh_VKzsslWGq26s3r82odMHrmOqRzLV58SyC03u1nBFgiCEoWKM2Sf7zQL4C70NofGB08Ekxw5LzH21O9D1yFzsZSGVohFC4na0A8xNoC6SujXKaTxl4wsfHRz4E7hEaDOOLs8Zdq2I7xGDXKrmV3D7ma5XJqDUTRg1ZWFSB93m8lex4L6aaC2k7mnOQDHynuEv7d9Qh0K1OIgIIwwwkqW8Oq1qlMqlgNP38Tw9wcfeE9c6Hm4FEmOyX8cuGVsV1Hfhvhm4RGxPOQnxVlyg2fke1bDukAHE2jWL0xwPoD63khVEmDxnv0D_52yIp8b11fm-5cMOEwcf_z5VBQ7yRpCYxruhed7j-s5q7RIO_onax1G-KkiWsVNX7eBe0p9i4ozpTMzB4rqDflRhgAOJxJBC1fVgF0g8l4D3hPqrRDPrJ0Zjy1wxzMUbvRZQ-C1gk7A_0UQHPAjH5ouHe-rihc9QTUX6z7kPbUdfgNBFXTFBQCkZeJFIXdsnEClkPcMDdzuTPESXBm5CejsW_YX7Yz-A5nS203iStecEA6_I1r4prJGq4K4sWtDuf1BvE9X2LK2izFPhc0odpWSdkJwuK6-nuLjgblfBDiLz577uQ4jzfx9QJDxzMWZ9XGsjum5o8Q1EhtN9aOZr8dXnLkOJeJdxehMtC2QstEQ9wVEsvMyq-UcUFsfYqV5b3DekBMMRlimLdDY9X6cCEpgv5rdnA0PSX_svQVG-vU3rBb2zoet8V1BlI852_0XSSJizYCDZ5EJ4Otw6jSn6Tbq-9zIl5I8EmkH5yr90jPenEfQ4J8ivoM6k_581aLZWZywuoGrQb3CswPdVX_2MvDG3IW5COWItcPtU6S9Rr9qnu5mdqh2iPEVG0S5DfAzbPnQIxiogEDfzkIqeTa4N1Xrtchpay0IIlFbilRauUxPaXw3yPS4HgDHBsACotw9aY2Zbuy2c0MwqXb9n1IyeBqIf7ZSZkwSKmTDhIM_MWHzaO2sAMUGbjv80s-WGvc9yZ2KrlEu3RrOySuFEdMqvPY-deRNez9d2mKys8H9sW4z")

    const url = "/api/otmmapi/v6/search/text?keyword_query=" + keyword +"&keyword_scope_id=" + scopeId;
    this.httpClient.get(url, {headers: headers}).subscribe(
      (data) => {
        console.log(data);
      }
      );
  }

}
