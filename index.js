const express=require('express');
const app=express();
const PORT=3200;
const AWS = require('aws-sdk');
// Our default route
app.get('/',(req,res)=>{
AWS.config.update({
        accessKeyId: "IAJADVQTZSXBRMAXSQ",
        secretAccessKey: "vRD8zMjYLAIxiNU7NYHBJo34LMNWCS9+G/htO6Be"
      });
let s3 = new AWS.S3();
async function getImage(){
        const data =  s3.getObject(
          {
              Bucket: 'images.doni.md',
              Key: 'IMG_20180420_131317.jpg'
            }
          
        ).promise();
        return data;
      }
getImage()
      .then((img)=>{
          let image="<img src='data:image/jpeg;base64," + encode(img.Body) + "'" + "/>";
          let startHTML="<html><body></body>";
          let endHTML="</body></html>";
          let html=startHTML + image + endHTML;
        res.send(html)
      }).catch((e)=>{
        res.send(e)
      })
function encode(data){
          let buf = Buffer.from(data);
          let base64 = buf.toString('base64');
          return base64
      }
})
app.listen(PORT,()=>{
    console.log(`Web Server running on port ${PORT}`);
});