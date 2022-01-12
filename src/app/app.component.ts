import { Component } from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import { ClipboardService } from 'ngx-clipboard';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-otmm';
  assets: any;
  assetsList: any;
  otdsTicketObj: any;
  otdsTokenObj:any;
  sessionObj:any;
  ticket:string = '';
  token:string='';
  isFolderClicked: boolean = true;
  isAssetClicked: boolean = false;
  sessionId: string = '';
  uploadedFile: any;
  filename: string = '';
  filetype: string = '';

  ngOnInit(){
    const url = "/otmmapi/v6/sessions";
    const otdsTicketBody = {
      "userName": "manikanta",
      "password": "TrainingP@ss123",
      "ticketType": "OTDSTICKET"
    }
    this.httpClient.post("http://training-otmm.acheron-tech.com:8080/otdsws/rest/authentication/credentials",otdsTicketBody)
    .subscribe((data) => {
      this.otdsTicketObj = data;
      this.ticket = this.otdsTicketObj.ticket;
      const otdsTokenBody = {
        "ticket": this.ticket,
        "targetResourceId": "e1332625-4b8e-4e40-94a8-012f81846665"
      }
      this.httpClient.post("http://training-otmm.acheron-tech.com:8080/otdsws/rest/authentication/resource/ticketforresource",otdsTokenBody)
      .subscribe((data)=>{
        this.otdsTokenObj = data;
        this.token = this.otdsTokenObj.ticket;
        const headers = new HttpHeaders()
        .set("OTDSToken",this.token)
        this.httpClient.get(url,{headers: headers}).subscribe((data)=>{
          const url = "/otmmapi/v6/sessions"
          const headers = new HttpHeaders()
        .set("OTDSToken",this.token)
        this.httpClient.get(url,{headers: headers}).subscribe((data)=>{
          this.sessionObj = data;
          this.sessionId = this.sessionObj.session_resource.session.id;
          console.log(this.sessionId);
        })
        });
          })
    });

    
  }

  constructor(private httpClient: HttpClient, private clipboardService:ClipboardService){}
  OnSearch = () => {
    let keywordEl = <HTMLInputElement>document.getElementById("keyword");
    let keyword = keywordEl.value;
    let scopeIdEl = <HTMLInputElement>document.getElementById("scope_id");
    let scopeId = scopeIdEl.value;
    const headers = new HttpHeaders()

    const url = "/otmmapi/v6/search/text?keyword_query=" + keyword +"&keyword_scope_id=" + scopeId;
    this.httpClient.get(url, {headers: headers}).subscribe(
      (data) => {
        this.assets = data;
        this.assetsList = this.assets['search_result_resource']['asset_list'];
        console.log(this.assetsList);
      } 
      );
  }

  folder = () => {
    if(this.isFolderClicked == false){
      this.isAssetClicked = false;
      this.isFolderClicked = true;
    }
  }

  asset = () => {
    if(this.isAssetClicked == false){
      this.isFolderClicked = false;
      this.isAssetClicked = true;
    }
  }

  createFolder = () => {
    let nameEl = <HTMLInputElement>document.getElementById("name");
    let name = nameEl.value;
    let assetIdEl = <HTMLInputElement>document.getElementById("assetId");
    let assetId = assetIdEl.value;
    const url = "/otmmapi/v6/folders/"+assetId;
    console.log(url);
    const httpSessionId = this.sessionId.toString();
    const headers = new HttpHeaders({
      "X-Requested-By": httpSessionId,
    })
    const createFolderBody= {
      "folder_resource": {
          "folder": {
              "name": name,
              "container_type_id": "TRAINING.FOLDER.TYPE",
              "security_policy_list": [
                  {
                      "id": 6
                  }
              ],
              "metadata": {
                  "metadata_element_list": [
                      {
                          "id": "TRAINING.FOLDER.DESCRIPTION",
                          "name": "Training Folder Description",
                          "type": "com.artesia.metadata.MetadataField",
                          "value": {
                              "value": {
                                  "type": "string",
                                  "value": "training folder value added from postman"
                              }
                          }
                      },
                      {
                          "id": "TRAINING.FOLDER.LABEL",
                          "name": "Training Folder Label",
                          "type": "com.artesia.metadata.MetadataField",
                          "value": {
                              "value": {
                                  "type": "string",
                                  "value": "training folder value added from postman"
                              }
                          }
                      }
                  ]
              },
              "metadata_model_id": "TRAINING.FOLDER.MODEL"
          }
      }
  }
    this.httpClient.post(url,createFolderBody,{headers:headers}).subscribe((data)=>{
      alert("folder added");
    });
  }

  handleFileInput = (event: any) => {
   if(event.target != null){
     this.uploadedFile = event.target.files[0]
     this.filename = this.uploadedFile.name;
     this.filetype = this.uploadedFile.type;
     console.log(this.uploadedFile);
   }
  }

  createAsset = () => {
    let parentFolderIdEl = <HTMLInputElement>document.getElementById("parentFolderId");
    let parentFolderId = parentFolderIdEl.value;
    const asset_representation=JSON.stringify({
      "asset_resource": {
        "asset": {
          "metadata": {
            "metadata_element_list": [{
              "id": "BOOK_NAME_FIELD",
              "name": "Book Name",
              "type": "com.artesia.metadata.MetadataField",
              "value": {
                "value": {
                  "value": "Pride and Prejudice",
                  "type": "string"
                }
              }
            },
            {
              "id":"101",
              "name":"First Name",
              "type":"com.artesia.metadata.MetadataTableField",
              "value": {
                "value":{
                  "type":"string",
                  "value":"manikanta"
                }
              }
            },{
              "id":"102",
              "name":"Last Name",
              "type":"com.artesia.metadata.MetadataTableField",
              "value": {
                "value":{
                  "type":"string",
                  "value":"Jakkamsetti"
                }
              }
            },
            {
              "id":"103",
              "name":"Department",
              "type":"com.artesia.metadata.MetadataTableField",
              
              "value": {
                "domain_value" : "true",
                "value":{
                  "type":"string",
                  "value":"2"
                }
              }
            }]
          },
          "metadata_model_id": "BOOK_MODEL",
          "security_policy_list": [{
            "id": 6
          }]
        }
      }
    })
    const manifest = JSON.stringify({
      "upload_manifest": {
          "master_files": [
              {
                  "file": {
                      "file_name": this.filename,
                      "file_type": this.filetype
                  }
              }
          ]
      }
  })
  var formData: any = new FormData();
    formData.append('asset_representation', asset_representation);
    formData.append(
      'import_template_id',
      '0b1a0a52043170dceed93a68b8307527c06989a2'
    );
    formData.append(
      'parent_folder_id',
      parentFolderId
    );
    formData.append('files', this.uploadedFile);
    formData.append('manifest', manifest);
    const httpSessionId = this.sessionId.toString();
    const headers = new HttpHeaders({
      "X-Requested-By": httpSessionId,
    })
    const url="otmmapi/v6/assets";
    this.httpClient.post(url,formData,{headers: headers}).subscribe((data) => alert("image added successfully"));
  }

  
}
