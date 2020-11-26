import { Grid, Paper } from "@material-ui/core";
import React, { Component } from "react";
import "./App.css";
import Download from "./download.png";
import play from './play.png'
import ReactPlayer from './reactPlayer'
import ExpandView from './expand'
import $ from 'jquery'
// import individual service
import AWS from "aws-sdk";
import { Button, Icon } from 'semantic-ui-react'
import axios from 'axios'
export class SingleComponent extends Component {

  // downloadImage = url2 => {
  //   const s3 = new AWS.S3()
  //   AWS.config.update({accessKeyId: process.env.REACT_APP_ACCESS_ID, secretAccessKey: process.env.REACT_APP_ACCESS_KEY})

  //   const myBucket = process.env.REACT_APP_BUCKET_NAME
  //   const myKey = this.props.post.Key
  //   const signedUrlExpireSeconds = 60 * 5 // your expiry time in seconds.

  //   const url = s3.getSignedUrl('getObject', {
  //   Bucket: myBucket,
  //   Key: myKey,
  //   Expires: signedUrlExpireSeconds
  //   })


  //   consnsole.log(url);

  // }
   downloadImage = (filename) => {
    const s3 = new AWS.S3({
     accessKeyId: process.env.REACT_APP_ACCESS_ID,
     secretAccessKey: process.env.REACT_APP_ACCESS_KEY,
     signatureVersion: 'v4',
     region: 'ap-south-1'
   });
  //  s3.getObject({ Bucket: process.env.REACT_APP_BUCKET_NAME , Key: filename }, function (
  //    error,
  //    data
  //  ) {
  //    if (error != null) {
  //      alert("Object retrival was a failure");
  //    } else {
  //      let blob = new Blob([data.Body], { type: data.ContentType });
  //      let link = document.createElement("a");
  //      link.href = window.URL.createObjectURL(blob);
  //      link.download = filename;
  //      link.click();
  //    }
  //  });
  const url = s3.getSignedUrlPromise('getObject', {
    Bucket: process.env.REACT_APP_BUCKET_NAME , Key: filename,
    Expires: 300,
  });
         let link = document.createElement("a");
         link.href = url;
         link.setAttribute('download', filename);
          link.click();

        // console.log(url);
  }
  handleDownload = () => {
    let url=this.props.post.Location
    let filename= this.props.post.Key
    this.addDownloadCount();
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    // document.body.appendChild(link);
    // console.log("Download Strted")
    this.downloadImage(filename)
    // link.click();
    // this.download(url)

  }
  addDownloadCount = () => {
    axios
      .post("/adddownload",{
        "_id":this.props.post._id
      })
      .then((res) => {
        // console.log(res.data);
      })
      .catch((err) => {
        // console.log(err);
      });
  }
  // download(url){
  //   $('<iframe>', { id:'idown', src:url }).hide().appendTo('body').click();
  // }
  
  render() {
    
   const {label,Location,thumbLocation,mimetype} = this.props.post;
   const fromPost = this.props.fromPos ? true : false
   var back=null ;
   if(thumbLocation) back=thumbLocation;
   else if(!back) back = Location; 
   let playBtn = null;

   let downloadBtn = <Button onClick={this.handleDownload} animated 
   style={{background:'#EF5287',
   marginTop: 4}} >
   <Button.Content visible style={{ color: 'white' }} >Download</Button.Content>
   <Button.Content hidden>
     <Icon name='download' inverted />
   </Button.Content>
 </Button>
  
  

   if(mimetype.includes('video')) playBtn = <ReactPlayer post={this.props.post} src={Location} />
  //  console.log(post)
    return (
      <Grid xs={12} item sm={6} lg={6} style={{marginTop:-38}}  >
                <ExpandView post={this.props.post} />
        <center>
                <Paper className="paper" style={{ overflow: "hidden" }}>
                  <div style={{position:'relative'}} >
                  {playBtn}
                
                  <img
                    src={back}
                    alt="asd"
                    style={{
                      objectFit: "cover",
                      minWidth: "100%",
                      marginBottom: -5,
                      objectPosition: "center",
                      height: 200,
                    }}
                  />
                  </div>

                </Paper>
                {
                  fromPost ? <div>
                  <h5 style={{ marginTop: 4, marginBottom: 0 }}>{label}</h5>
                {/* <input
                  type="image"
                  src={Download}
                  style={{
                    height: 22,
                    marginTop: 4
                  }}
                  alt="go"
                  onClick={this.handleDownload}
                /> */}
                {downloadBtn}


                </div> : null
                }
                
                </center>
              </Grid>
    );
  }
}

export default SingleComponent;
